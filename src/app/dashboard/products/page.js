'use client';

import { useState, useEffect } from 'react';
import { getMyProducts, addProduct, updateProduct, deleteProduct, toggleProduct } from '@/services/productService';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
  name: '', category: '', price: '', stock: '', description: '', unit: 'piece'
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getMyProducts();
      setProducts(res.products || []);
    } catch (error) {
      toast.error('Products load nahi hue!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        });
        toast.success('Product update ho gaya!');
      } else {
        await addProduct({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        });
        toast.success('Product add ho gaya!');
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData(EMPTY_FORM);
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error aaya!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description || '',
      unit: product.unit || 'piece'
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Product delete karna chahte ho?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product delete ho gaya!');
      loadProducts();
    } catch (error) {
      toast.error('Delete failed!');
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleProduct(id);
      toast.success('Product status update ho gaya!');
      loadProducts();
    } catch (error) {
      toast.error('Toggle failed!');
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Products 🏷️</h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} total products</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingProduct(null); setFormData(EMPTY_FORM); }}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-sm">
          ➕ Add Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
              <h2 className="font-black text-gray-900">
                {editingProduct ? '✏️ Edit Product' : '➕ Add Product'}
              </h2>
              <button onClick={() => { setShowForm(false); setEditingProduct(null); }}
                className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Product Name *
                </label>
                <input type="text" name="name" value={formData.name}
                  onChange={handleChange} placeholder="Jaise: Dove Shampoo 200ml"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <input type="text" name="category" value={formData.category}
                    onChange={handleChange} placeholder="Grocery, Dairy..."
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Unit
                  </label>
                  <select name="unit" value={formData.unit} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
                    {['piece', 'kg', 'gram', 'liter', 'ml', 'dozen', 'packet', 'bottle', 'box'].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Price (₹) *
                  </label>
                  <input type="number" name="price" value={formData.price}
                    onChange={handleChange} placeholder="0"
                    required min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Stock
                  </label>
                  <input type="number" name="stock" value={formData.stock}
                    onChange={handleChange} placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea name="description" value={formData.description}
                  onChange={handleChange} placeholder="Product ke baare mein..."
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button"
                  onClick={() => { setShowForm(false); setEditingProduct(null); }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl transition-all active:scale-95">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saving...
                    </>
                  ) : editingProduct ? 'Update' : 'Add Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {categories.map((cat) => (
          <button key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              activeCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}>
            {cat === 'all' ? '🏠 All' : cat}
          </button>
        ))}
      </div>

      {/* Products List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-32 skeleton rounded-2xl" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="text-5xl mb-4">📦</div>
          <p className="font-bold text-gray-900">Koi product nahi!</p>
          <p className="text-gray-400 text-sm mt-1 mb-4">Pehla product add karo</p>
          <button onClick={() => setShowForm(true)}
            className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-all">
            ➕ Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">

              {/* Product Image */}
              <div className="h-28 bg-gray-50 relative flex items-center justify-center">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name}
                    className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl opacity-20">📦</span>
                )}
                {/* Toggle Switch */}
                <button onClick={() => handleToggle(product._id)}
                  className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    product.isAvailable
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-400 text-white'
                  }`}>
                  {product.isAvailable ? 'Active' : 'Inactive'}
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg font-medium">
                    {product.category}
                  </span>
                  <span className="text-xs text-gray-400">{product.unit}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-black text-gray-900">₹{product.price}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${
                      product.stock === 0 ? 'text-red-500' :
                      product.stock <= 5 ? 'text-amber-500' :
                      'text-green-600'
                    }`}>
                      {product.stock === 0 ? '❌ Out of stock' :
                       product.stock <= 5 ? `⚠️ ${product.stock} left` :
                       `✅ ${product.stock} in stock`}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleEdit(product)}
                    className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-xs transition-all active:scale-95 border border-gray-200">
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(product._id)}
                    className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-all active:scale-95 border border-red-200">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}