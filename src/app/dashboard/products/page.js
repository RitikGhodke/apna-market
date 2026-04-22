// 'use client';

// import { useState, useEffect } from 'react';
// import { getMyProducts, addProduct, updateProduct, deleteProduct, toggleProduct } from '@/services/productService';
// import toast from 'react-hot-toast';

// const EMPTY_FORM = {
//   name: '', category: '', price: '', stock: '', description: '', unit: 'piece'
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState(EMPTY_FORM);
//   const [submitting, setSubmitting] = useState(false);
//   const [activeCategory, setActiveCategory] = useState('all');

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await getMyProducts();
//       setProducts(res.products || []);
//     } catch (error) {
//       toast.error('Products load nahi hue!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       if (editingProduct) {
//         await updateProduct(editingProduct._id, {
//           ...formData,
//           price: Number(formData.price),
//           stock: Number(formData.stock)
//         });
//         toast.success('Product update ho gaya!');
//       } else {
//         await addProduct({
//           ...formData,
//           price: Number(formData.price),
//           stock: Number(formData.stock)
//         });
//         toast.success('Product add ho gaya!');
//       }
//       setShowForm(false);
//       setEditingProduct(null);
//       setFormData(EMPTY_FORM);
//       loadProducts();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error aaya!');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       category: product.category,
//       price: product.price,
//       stock: product.stock,
//       description: product.description || '',
//       unit: product.unit || 'piece'
//     });
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Product delete karna chahte ho?')) return;
//     try {
//       await deleteProduct(id);
//       toast.success('Product delete ho gaya!');
//       loadProducts();
//     } catch (error) {
//       toast.error('Delete failed!');
//     }
//   };

//   const handleToggle = async (id) => {
//     try {
//       await toggleProduct(id);
//       toast.success('Product status update ho gaya!');
//       loadProducts();
//     } catch (error) {
//       toast.error('Toggle failed!');
//     }
//   };

//   const categories = ['all', ...new Set(products.map(p => p.category))];

//   const filteredProducts = activeCategory === 'all'
//     ? products
//     : products.filter(p => p.category === activeCategory);

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-black text-gray-900">Products 🏷️</h1>
//           <p className="text-gray-400 text-sm mt-0.5">{products.length} total products</p>
//         </div>
//         <button
//           onClick={() => { setShowForm(true); setEditingProduct(null); setFormData(EMPTY_FORM); }}
//           className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-sm">
//           ➕ Add Product
//         </button>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
//           <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

//             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
//               <h2 className="font-black text-gray-900">
//                 {editingProduct ? '✏️ Edit Product' : '➕ Add Product'}
//               </h2>
//               <button onClick={() => { setShowForm(false); setEditingProduct(null); }}
//                 className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200">
//                 ×
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-4">

//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Product Name *
//                 </label>
//                 <input type="text" name="name" value={formData.name}
//                   onChange={handleChange} placeholder="Jaise: Dove Shampoo 200ml"
//                   required
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                     Category *
//                   </label>
//                   <input type="text" name="category" value={formData.category}
//                     onChange={handleChange} placeholder="Grocery, Dairy..."
//                     required
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                     Unit
//                   </label>
//                   <select name="unit" value={formData.unit} onChange={handleChange}
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
//                     {['piece', 'kg', 'gram', 'liter', 'ml', 'dozen', 'packet', 'bottle', 'box'].map(u => (
//                       <option key={u} value={u}>{u}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                     Price (₹) *
//                   </label>
//                   <input type="number" name="price" value={formData.price}
//                     onChange={handleChange} placeholder="0"
//                     required min="0"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                     Stock
//                   </label>
//                   <input type="number" name="stock" value={formData.stock}
//                     onChange={handleChange} placeholder="0"
//                     min="0"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Description
//                 </label>
//                 <textarea name="description" value={formData.description}
//                   onChange={handleChange} placeholder="Product ke baare mein..."
//                   rows={2}
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button type="button"
//                   onClick={() => { setShowForm(false); setEditingProduct(null); }}
//                   className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl transition-all active:scale-95">
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={submitting}
//                   className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//                   {submitting ? (
//                     <>
//                       <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                       </svg>
//                       Saving...
//                     </>
//                   ) : editingProduct ? 'Update' : 'Add Product'}
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* Category Filter */}
//       <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
//         {categories.map((cat) => (
//           <button key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
//               activeCategory === cat
//                 ? 'bg-gray-900 text-white'
//                 : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
//             }`}>
//             {cat === 'all' ? '🏠 All' : cat}
//           </button>
//         ))}
//       </div>

//       {/* Products List */}
//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[1,2,3,4,5,6].map(i => (
//             <div key={i} className="h-32 skeleton rounded-2xl" />
//           ))}
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
//           <div className="text-5xl mb-4">📦</div>
//           <p className="font-bold text-gray-900">Koi product nahi!</p>
//           <p className="text-gray-400 text-sm mt-1 mb-4">Pehla product add karo</p>
//           <button onClick={() => setShowForm(true)}
//             className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-all">
//             ➕ Add Product
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredProducts.map((product) => (
//             <div key={product._id}
//               className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">

//               {/* Product Image */}
//               <div className="h-28 bg-gray-50 relative flex items-center justify-center">
//                 {product.images?.[0] ? (
//                   <img src={product.images[0]} alt={product.name}
//                     className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl opacity-20">📦</span>
//                 )}
//                 {/* Toggle Switch */}
//                 <button onClick={() => handleToggle(product._id)}
//                   className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
//                     product.isAvailable
//                       ? 'bg-green-500 text-white'
//                       : 'bg-gray-400 text-white'
//                   }`}>
//                   {product.isAvailable ? 'Active' : 'Inactive'}
//                 </button>
//               </div>

//               {/* Info */}
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg font-medium">
//                     {product.category}
//                   </span>
//                   <span className="text-xs text-gray-400">{product.unit}</span>
//                 </div>

//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <span className="text-lg font-black text-gray-900">₹{product.price}</span>
//                   </div>
//                   <div className="text-right">
//                     <span className={`text-xs font-bold ${
//                       product.stock === 0 ? 'text-red-500' :
//                       product.stock <= 5 ? 'text-amber-500' :
//                       'text-green-600'
//                     }`}>
//                       {product.stock === 0 ? '❌ Out of stock' :
//                        product.stock <= 5 ? `⚠️ ${product.stock} left` :
//                        `✅ ${product.stock} in stock`}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <button onClick={() => handleEdit(product)}
//                     className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-xs transition-all active:scale-95 border border-gray-200">
//                     ✏️ Edit
//                   </button>
//                   <button onClick={() => handleDelete(product._id)}
//                     className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-all active:scale-95 border border-red-200">
//                     🗑️ Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }













// 'use client';

// import { useState, useEffect } from 'react';
// import { getMyProducts, addProduct, updateProduct, deleteProduct, toggleProduct, uploadProductImage } from '@/services/productService';
// import toast from 'react-hot-toast';

// const EMPTY_FORM = {
//   name: '', category: '', price: '', stock: '', description: '', unit: 'piece'
// };

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData] = useState(EMPTY_FORM);
//   const [submitting, setSubmitting] = useState(false);
//   const [activeCategory, setActiveCategory] = useState('all');

//   // ✅ NEW: Image states
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await getMyProducts();
//       setProducts(res.products || []);
//     } catch (error) {
//       toast.error('Products load nahi hue!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       if (editingProduct) {
//         await updateProduct(editingProduct._id, {
//           ...formData,
//           price: Number(formData.price),
//           stock: Number(formData.stock)
//         });
//         // ✅ NEW: image upload on edit
//         if (imageFile) await uploadProductImage(editingProduct._id, imageFile);
//         toast.success('Product update ho gaya!');
//       } else {
//         const res = await addProduct({
//           ...formData,
//           price: Number(formData.price),
//           stock: Number(formData.stock)
//         });
//         // ✅ NEW: image upload on add
//         if (imageFile) await uploadProductImage(res.product._id, imageFile);
//         toast.success('Product add ho gaya!');
//       }
//       setShowForm(false);
//       setEditingProduct(null);
//       setFormData(EMPTY_FORM);
//       // ✅ NEW: reset image states
//       setImageFile(null);
//       setImagePreview(null);
//       loadProducts();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error aaya!');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       category: product.category,
//       price: product.price,
//       stock: product.stock,
//       description: product.description || '',
//       unit: product.unit || 'piece'
//     });
//     // ✅ NEW: show existing image in preview
//     setImageFile(null);
//     setImagePreview(product.images?.[0] || null);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Product delete karna chahte ho?')) return;
//     try {
//       await deleteProduct(id);
//       toast.success('Product delete ho gaya!');
//       loadProducts();
//     } catch (error) {
//       toast.error('Delete failed!');
//     }
//   };

//   const handleToggle = async (id) => {
//     try {
//       await toggleProduct(id);
//       toast.success('Product status update ho gaya!');
//       loadProducts();
//     } catch (error) {
//       toast.error('Toggle failed!');
//     }
//   };

//   const categories = ['all', ...new Set(products.map(p => p.category))];

//   const filteredProducts = activeCategory === 'all'
//     ? products
//     : products.filter(p => p.category === activeCategory);

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-black text-gray-900">Products 🏷️</h1>
//           <p className="text-gray-400 text-sm mt-0.5">{products.length} total products</p>
//         </div>
//         <button
//           onClick={() => { setShowForm(true); setEditingProduct(null); setFormData(EMPTY_FORM); setImageFile(null); setImagePreview(null); }}
//           className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-sm">
//           ➕ Add Product
//         </button>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
//           <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

//             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
//               <h2 className="font-black text-gray-900">
//                 {editingProduct ? '✏️ Edit Product' : '➕ Add Product'}
//               </h2>
//               <button onClick={() => { setShowForm(false); setEditingProduct(null); setImageFile(null); setImagePreview(null); }}
//                 className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200">
//                 ×
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-4">

//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Product Name *
//                 </label>
//                 <input type="text" name="name" value={formData.name}
//                   onChange={handleChange} placeholder="Jaise: Dove Shampoo 200ml"
//                   required
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                     Category *
//                   </label>
//                   <input type="text" name="category" value={formData.category}
//                     onChange={handleChange} placeholder="Grocery, Dairy..."
//                     required
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                     Unit
//                   </label>
//                   <select name="unit" value={formData.unit} onChange={handleChange}
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
//                     {['piece', 'kg', 'gram', 'liter', 'ml', 'dozen', 'packet', 'bottle', 'box'].map(u => (
//                       <option key={u} value={u}>{u}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                     Price (₹) *
//                   </label>
//                   <input type="number" name="price" value={formData.price}
//                     onChange={handleChange} placeholder="0"
//                     required min="0"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                     Stock
//                   </label>
//                   <input type="number" name="stock" value={formData.stock}
//                     onChange={handleChange} placeholder="0"
//                     min="0"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Description
//                 </label>
//                 <textarea name="description" value={formData.description}
//                   onChange={handleChange} placeholder="Product ke baare mein..."
//                   rows={2}
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
//               </div>

//               {/* ✅ NEW: Image Upload Field */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Product Image
//                 </label>
//                 <div
//                   onClick={() => document.getElementById('productImgInput').click()}
//                   className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-gray-400 transition-all"
//                 >
//                   {imagePreview ? (
//                     <div className="relative">
//                       <img
//                         src={imagePreview}
//                         alt="preview"
//                         className="max-h-36 mx-auto rounded-xl object-contain"
//                       />
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setImageFile(null);
//                           setImagePreview(null);
//                         }}
//                         className="mt-2 text-xs text-red-500 font-bold underline"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="py-2">
//                       <span className="text-3xl">🖼️</span>
//                       <p className="text-sm text-gray-500 mt-1">Click karke image choose karo</p>
//                       <p className="text-xs text-gray-400">JPG, PNG — max 5MB</p>
//                     </div>
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   id="productImgInput"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (!file) return;
//                     if (file.size > 5 * 1024 * 1024) {
//                       toast.error('Image 5MB se kam honi chahiye!');
//                       return;
//                     }
//                     setImageFile(file);
//                     const reader = new FileReader();
//                     reader.onloadend = () => setImagePreview(reader.result);
//                     reader.readAsDataURL(file);
//                   }}
//                 />
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button type="button"
//                   onClick={() => { setShowForm(false); setEditingProduct(null); setImageFile(null); setImagePreview(null); }}
//                   className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl transition-all active:scale-95">
//                   Cancel
//                 </button>
//                 <button type="submit" disabled={submitting}
//                   className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//                   {submitting ? (
//                     <>
//                       <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                       </svg>
//                       Saving...
//                     </>
//                   ) : editingProduct ? 'Update' : 'Add Product'}
//                 </button>
//               </div>

//             </form>
//           </div>
//         </div>
//       )}

//       {/* Category Filter */}
//       <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
//         {categories.map((cat) => (
//           <button key={cat}
//             onClick={() => setActiveCategory(cat)}
//             className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
//               activeCategory === cat
//                 ? 'bg-gray-900 text-white'
//                 : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
//             }`}>
//             {cat === 'all' ? '🏠 All' : cat}
//           </button>
//         ))}
//       </div>

//       {/* Products List */}
//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[1,2,3,4,5,6].map(i => (
//             <div key={i} className="h-32 skeleton rounded-2xl" />
//           ))}
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
//           <div className="text-5xl mb-4">📦</div>
//           <p className="font-bold text-gray-900">Koi product nahi!</p>
//           <p className="text-gray-400 text-sm mt-1 mb-4">Pehla product add karo</p>
//           <button onClick={() => setShowForm(true)}
//             className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-all">
//             ➕ Add Product
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredProducts.map((product) => (
//             <div key={product._id}
//               className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">

//              {/* Product Image */}
// <div className="h-48 bg-white relative flex items-center justify-center overflow-hidden">
//   {product.images?.[0] ? (
//     <img
//       src={product.images[0]}
//       alt={product.name}
//       className="w-full h-full object-contain p-2"
//     />
//   ) : (
//     <span className="text-4xl opacity-20">📦</span>
//   )}
//   {/* Toggle Switch */}
//   <button
//     onClick={() => handleToggle(product._id)}
//     className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
//       product.isAvailable
//         ? 'bg-green-500 text-white'
//         : 'bg-gray-400 text-white'
//     }`}>
//     {product.isAvailable ? 'Active' : 'Inactive'}
//   </button>
// </div>

//               {/* Info */}
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg font-medium">
//                     {product.category}
//                   </span>
//                   <span className="text-xs text-gray-400">{product.unit}</span>
//                 </div>

//                 <div className="flex items-center justify-between mb-3">
//                   <div>
//                     <span className="text-lg font-black text-gray-900">₹{product.price}</span>
//                   </div>
//                   <div className="text-right">
//                     <span className={`text-xs font-bold ${
//                       product.stock === 0 ? 'text-red-500' :
//                       product.stock <= 5 ? 'text-amber-500' :
//                       'text-green-600'
//                     }`}>
//                       {product.stock === 0 ? '❌ Out of stock' :
//                        product.stock <= 5 ? `⚠️ ${product.stock} left` :
//                        `✅ ${product.stock} in stock`}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <button onClick={() => handleEdit(product)}
//                     className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-xs transition-all active:scale-95 border border-gray-200">
//                     ✏️ Edit
//                   </button>
//                   <button onClick={() => handleDelete(product._id)}
//                     className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-all active:scale-95 border border-red-200">
//                     🗑️ Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

















// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   getMyProducts, addProduct, updateProduct,
//   deleteProduct, toggleProduct, uploadProductImage,
//   setFeaturedProducts
// } from '@/services/productService';
// import toast from 'react-hot-toast';

// const EMPTY_FORM = {
//   name: '', category: '', price: '', stock: '', description: '', unit: 'piece'
// };

// export default function ProductsPage() {
//   const [products, setProducts]           = useState([]);
//   const [loading, setLoading]             = useState(true);
//   const [showForm, setShowForm]           = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [formData, setFormData]           = useState(EMPTY_FORM);
//   const [submitting, setSubmitting]       = useState(false);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [imageFile, setImageFile]         = useState(null);
//   const [imagePreview, setImagePreview]   = useState(null);

//   // ── FEATURED STATE ──
//   const [showFeaturedPanel, setShowFeaturedPanel] = useState(false);
//   const [selectedFeatured, setSelectedFeatured]   = useState([]);   // max 2 ids
//   const [offers, setOffers]                       = useState({});   // { id: discountPercent }
//   const [savingFeatured, setSavingFeatured]       = useState(false);

//   useEffect(() => { loadProducts(); }, []);

//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await getMyProducts();
//       const list = res.products || [];
//       setProducts(list);
//       // Pre-select already featured products
//       const alreadyFeatured = list.filter(p => p.isFeatured).map(p => p._id);
//       setSelectedFeatured(alreadyFeatured);
//       const existingOffers = {};
//       list.filter(p => p.isFeatured && p.offerPercent > 0).forEach(p => {
//         existingOffers[p._id] = p.offerPercent;
//       });
//       setOffers(existingOffers);
//     } catch {
//       toast.error('Products load nahi hue!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       if (editingProduct) {
//         await updateProduct(editingProduct._id, {
//           ...formData, price: Number(formData.price), stock: Number(formData.stock)
//         });
//         if (imageFile) await uploadProductImage(editingProduct._id, imageFile);
//         toast.success('Product update ho gaya!');
//       } else {
//         const res = await addProduct({
//           ...formData, price: Number(formData.price), stock: Number(formData.stock)
//         });
//         if (imageFile) await uploadProductImage(res.product._id, imageFile);
//         toast.success('Product add ho gaya!');
//       }
//       closeForm();
//       loadProducts();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error aaya!');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const closeForm = () => {
//     setShowForm(false); setEditingProduct(null);
//     setFormData(EMPTY_FORM); setImageFile(null); setImagePreview(null);
//   };

//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name, category: product.category,
//       price: product.price, stock: product.stock,
//       description: product.description || '', unit: product.unit || 'piece'
//     });
//     setImageFile(null);
//     setImagePreview(product.images?.[0] || null);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Product delete karna chahte ho?')) return;
//     try {
//       await deleteProduct(id);
//       toast.success('Product delete ho gaya!');
//       loadProducts();
//     } catch { toast.error('Delete failed!'); }
//   };

//   const handleToggle = async (id) => {
//     try {
//       await toggleProduct(id);
//       toast.success('Status update ho gaya!');
//       loadProducts();
//     } catch { toast.error('Toggle failed!'); }
//   };

//   // ── FEATURED HANDLERS ──
//   const toggleFeaturedSelect = (productId) => {
//     if (selectedFeatured.includes(productId)) {
//       setSelectedFeatured(selectedFeatured.filter(id => id !== productId));
//       const newOffers = { ...offers };
//       delete newOffers[productId];
//       setOffers(newOffers);
//     } else {
//       if (selectedFeatured.length >= 2) {
//         toast.error('Sirf 2 products select kar sakte ho!');
//         return;
//       }
//       setSelectedFeatured([...selectedFeatured, productId]);
//     }
//   };

//   const handleOfferChange = (productId, value) => {
//     const num = Math.min(99, Math.max(0, Number(value)));
//     setOffers({ ...offers, [productId]: num });
//   };

//   const saveFeatured = async () => {
//     setSavingFeatured(true);
//     try {
//       await setFeaturedProducts(selectedFeatured, offers);
//       toast.success('Featured products save ho gaye! 🎉');
//       setShowFeaturedPanel(false);
//       loadProducts();
//     } catch {
//       toast.error('Save nahi hua, dobara try karo!');
//     } finally {
//       setSavingFeatured(false);
//     }
//   };

//   const categories = ['all', ...new Set(products.map(p => p.category))];
//   const filteredProducts = activeCategory === 'all'
//     ? products
//     : products.filter(p => p.category === activeCategory);

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* ── HEADER ── */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-black text-gray-900">Products 🏷️</h1>
//           <p className="text-gray-400 text-sm mt-0.5">{products.length} total products</p>
//         </div>
//         <div className="flex gap-2">
//           {/* Featured Button */}
//           <button
//             onClick={() => setShowFeaturedPanel(true)}
//             className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-3 py-2.5 rounded-xl transition-all active:scale-95 text-sm">
//             ⭐ Feed
//           </button>
//           <button
//             onClick={() => { setShowForm(true); setEditingProduct(null); setFormData(EMPTY_FORM); setImageFile(null); setImagePreview(null); }}
//             className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-sm">
//             ➕ Add
//           </button>
//         </div>
//       </div>

//       {/* ── FEATURED PANEL MODAL ── */}
//       {showFeaturedPanel && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
//           <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

//             {/* Header */}
//             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
//               <div>
//                 <h2 className="font-black text-gray-900">⭐ Feed mein dikhane wale Products</h2>
//                 <p className="text-xs text-gray-400 mt-0.5">Max 2 products choose karo • Offer optional hai</p>
//               </div>
//               <button onClick={() => setShowFeaturedPanel(false)}
//                 className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">✕</button>
//             </div>

//             {/* Selected count badge */}
//             <div className="px-6 pt-4 pb-2">
//               <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
//                 selectedFeatured.length === 2
//                   ? 'bg-green-100 text-green-700'
//                   : 'bg-yellow-100 text-yellow-700'
//               }`}>
//                 {selectedFeatured.length === 2 ? '✅' : '⚠️'} {selectedFeatured.length}/2 selected
//               </span>
//             </div>

//             {/* Products List */}
//             <div className="px-6 pb-4 space-y-3">
//               {products.map((product) => {
//                 const isSelected = selectedFeatured.includes(product._id);
//                 return (
//                   <div key={product._id}
//                     className={`rounded-2xl border-2 overflow-hidden transition-all ${
//                       isSelected ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 bg-white'
//                     }`}>

//                     {/* Product row — click to select */}
//                     <div className="flex items-center gap-3 p-3 cursor-pointer"
//                       onClick={() => toggleFeaturedSelect(product._id)}>

//                       {/* Image */}
//                       <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
//                         {product.images?.[0]
//                           ? <img src={product.images[0]} className="w-full h-full object-cover" />
//                           : <span className="text-2xl opacity-30">📦</span>
//                         }
//                       </div>

//                       {/* Info */}
//                       <div className="flex-1 min-w-0">
//                         <p className="font-bold text-gray-900 text-sm truncate">{product.name}</p>
//                         <p className="text-xs text-gray-400">{product.category}</p>
//                         <p className="text-sm font-black text-gray-900 mt-0.5">₹{product.price}</p>
//                       </div>

//                       {/* Checkbox */}
//                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
//                         isSelected
//                           ? 'bg-yellow-400 border-yellow-400 text-white'
//                           : 'border-gray-300'
//                       }`}>
//                         {isSelected && <span className="text-xs font-black">✓</span>}
//                       </div>
//                     </div>

//                     {/* Offer input — only show if selected */}
//                     {isSelected && (
//                       <div className="px-3 pb-3 pt-0">
//                         <div className="bg-white rounded-xl border border-yellow-200 p-3">
//                           <p className="text-xs font-bold text-gray-600 mb-2">🏷️ Offer / Discount (optional)</p>
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="number"
//                               min="0"
//                               max="99"
//                               placeholder="0"
//                               value={offers[product._id] || ''}
//                               onChange={(e) => handleOfferChange(product._id, e.target.value)}
//                               onClick={(e) => e.stopPropagation()}
//                               className="w-20 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             />
//                             <span className="text-sm text-gray-600 font-bold">% off</span>
//                             {offers[product._id] > 0 && (
//                               <span className="text-xs font-black text-green-600 ml-auto">
//                                 ₹{Math.round(product.price - (product.price * offers[product._id]) / 100)} hoga price
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Save Button */}
//             <div className="px-6 pb-6 sticky bottom-0 bg-white pt-3 border-t border-gray-100">
//               <button
//                 onClick={saveFeatured}
//                 disabled={savingFeatured || selectedFeatured.length === 0}
//                 className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 text-sm">
//                 {savingFeatured ? '⏳ Saving...' : '💾 Save Featured Products'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── ADD/EDIT FORM MODAL ── */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
//           <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

//             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
//               <h2 className="font-black text-gray-900">
//                 {editingProduct ? '✏️ Edit Product' : '➕ Add Product'}
//               </h2>
//               <button onClick={closeForm}
//                 className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">×</button>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 space-y-4">

//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Product Name *</label>
//                 <input type="text" name="name" value={formData.name}
//                   onChange={handleChange} placeholder="Jaise: Dove Shampoo 200ml" required
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Category *</label>
//                   <input type="text" name="category" value={formData.category}
//                     onChange={handleChange} placeholder="Grocery, Dairy..." required
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Unit</label>
//                   <select name="unit" value={formData.unit} onChange={handleChange}
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
//                     {['piece','kg','gram','liter','ml','dozen','packet','bottle','box'].map(u => (
//                       <option key={u} value={u}>{u}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Price (₹) *</label>
//                   <input type="number" name="price" value={formData.price}
//                     onChange={handleChange} placeholder="0" required min="0"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Stock</label>
//                   <input type="number" name="stock" value={formData.stock}
//                     onChange={handleChange} placeholder="0" min="0"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
//                 <textarea name="description" value={formData.description}
//                   onChange={handleChange} placeholder="Product ke baare mein..." rows={2}
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Product Image</label>
//                 <div onClick={() => document.getElementById('productImgInput').click()}
//                   className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-gray-400 transition-all">
//                   {imagePreview ? (
//                     <div className="relative">
//                       <img src={imagePreview} alt="preview" className="max-h-36 mx-auto rounded-xl object-contain" />
//                       <button type="button"
//                         onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
//                         className="mt-2 text-xs text-red-500 font-bold underline">Remove</button>
//                     </div>
//                   ) : (
//                     <div className="py-2">
//                       <span className="text-3xl">🖼️</span>
//                       <p className="text-sm text-gray-500 mt-1">Click karke image choose karo</p>
//                       <p className="text-xs text-gray-400">JPG, PNG — max 5MB</p>
//                     </div>
//                   )}
//                 </div>
//                 <input type="file" id="productImgInput" accept="image/*" className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (!file) return;
//                     if (file.size > 5 * 1024 * 1024) { toast.error('Image 5MB se kam honi chahiye!'); return; }
//                     setImageFile(file);
//                     const reader = new FileReader();
//                     reader.onloadend = () => setImagePreview(reader.result);
//                     reader.readAsDataURL(file);
//                   }} />
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button type="button" onClick={closeForm}
//                   className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl transition-all active:scale-95">Cancel</button>
//                 <button type="submit" disabled={submitting}
//                   className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//                   {submitting ? (
//                     <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                     </svg>Saving...</>
//                   ) : editingProduct ? 'Update' : 'Add Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ── CATEGORY FILTER ── */}
//       <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
//         {categories.map((cat) => (
//           <button key={cat} onClick={() => setActiveCategory(cat)}
//             className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
//               activeCategory === cat
//                 ? 'bg-gray-900 text-white'
//                 : 'bg-white border border-gray-200 text-gray-600'
//             }`}>
//             {cat === 'all' ? '🏠 All' : cat}
//           </button>
//         ))}
//       </div>

//       {/* ── PRODUCTS GRID ── */}
//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[1,2,3,4,5,6].map(i => <div key={i} className="h-32 skeleton rounded-2xl" />)}
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
//           <div className="text-5xl mb-4">📦</div>
//           <p className="font-bold text-gray-900">Koi product nahi!</p>
//           <p className="text-gray-400 text-sm mt-1 mb-4">Pehla product add karo</p>
//           <button onClick={() => setShowForm(true)}
//             className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl active:scale-95 transition-all">
//             ➕ Add Product
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredProducts.map((product) => (
//             <div key={product._id}
//               className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">

//               {/* Product Image */}
//               <div className="h-48 bg-white relative flex items-center justify-center overflow-hidden">
//                 {product.images?.[0]
//                   ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-2" />
//                   : <span className="text-4xl opacity-20">📦</span>
//                 }
//                 {/* Toggle */}
//                 <button onClick={() => handleToggle(product._id)}
//                   className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
//                     product.isAvailable ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
//                   }`}>
//                   {product.isAvailable ? 'Active' : 'Inactive'}
//                 </button>
//                 {/* Featured badge */}
//                 {product.isFeatured && (
//                   <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full">
//                     ⭐ Feed
//                   </span>
//                 )}
//                 {/* Offer badge */}
//                 {product.offerPercent > 0 && (
//                   <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
//                     🏷️ {product.offerPercent}% OFF
//                   </span>
//                 )}
//               </div>

//               {/* Info */}
//               <div className="p-4">
//                 <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg font-medium">{product.category}</span>
//                   <span className="text-xs text-gray-400">{product.unit}</span>
//                 </div>

//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     {product.offerPrice ? (
//                       <>
//                         <span className="text-lg font-black text-green-600">₹{product.offerPrice}</span>
//                         <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
//                       </>
//                     ) : (
//                       <span className="text-lg font-black text-gray-900">₹{product.price}</span>
//                     )}
//                   </div>
//                   <span className={`text-xs font-bold ${
//                     product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-amber-500' : 'text-green-600'
//                   }`}>
//                     {product.stock === 0 ? '❌ Out' : product.stock <= 5 ? `⚠️ ${product.stock} left` : `✅ ${product.stock}`}
//                   </span>
//                 </div>

//                 <div className="flex gap-2">
//                   <button onClick={() => handleEdit(product)}
//                     className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-xs transition-all active:scale-95 border border-gray-200">
//                     ✏️ Edit
//                   </button>
//                   <button onClick={() => handleDelete(product._id)}
//                     className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-xs transition-all active:scale-95 border border-red-200">
//                     🗑️ Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }









'use client';

import { useState, useEffect } from 'react';
import {
  getMyProducts, addProduct, updateProduct,
  deleteProduct, toggleProduct, uploadProductImage,
  setFeaturedProducts
} from '@/services/productService';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
  name: '', category: '', price: '', stock: '',
  description: '', unit: 'piece', offerPercent: ''
};

export default function ProductsPage() {
  const [products, setProducts]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [showForm, setShowForm]               = useState(false);
  const [editingProduct, setEditingProduct]   = useState(null);
  const [formData, setFormData]               = useState(EMPTY_FORM);
  const [submitting, setSubmitting]           = useState(false);
  const [activeCategory, setActiveCategory]   = useState('all');

  // ── MULTI IMAGE STATE ──
  const [imageFiles, setImageFiles]           = useState([]);      // new File[]
  const [imagePreviews, setImagePreviews]     = useState([]);      // base64[]
  const [existingImages, setExistingImages]   = useState([]);      // already uploaded URLs

  // ── FEATURED STATE ──
  const [showFeaturedPanel, setShowFeaturedPanel] = useState(false);
  const [selectedFeatured, setSelectedFeatured]   = useState([]);
  const [offers, setOffers]                       = useState({});
  const [savingFeatured, setSavingFeatured]       = useState(false);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await getMyProducts();
      const list = res.products || [];
      setProducts(list);
      const alreadyFeatured = list.filter(p => p.isFeatured).map(p => p._id);
      setSelectedFeatured(alreadyFeatured);
      const existingOffers = {};
      list.filter(p => p.isFeatured && p.offerPercent > 0).forEach(p => {
        existingOffers[p._id] = p.offerPercent;
      });
      setOffers(existingOffers);
    } catch {
      toast.error('Products load nahi hue!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ── IMAGE HANDLERS ──
  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    const totalAllowed = 5 - existingImages.length - imagePreviews.length;
    if (files.length > totalAllowed) {
      toast.error(`Sirf ${totalAllowed} aur images add kar sakte ho!`);
      return;
    }
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) { toast.error('Image 5MB se kam honi chahiye!'); return; }
      setImageFiles(prev => [...prev, file]);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviews(prev => [...prev, reader.result]);
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeNewImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        offerPercent: Number(formData.offerPercent) || 0,
      };

      let productId;
      if (editingProduct) {
        await updateProduct(editingProduct._id, { ...payload, existingImages });
        productId = editingProduct._id;
        toast.success('Product update ho gaya!');
      } else {
        const res = await addProduct(payload);
        productId = res.product._id;
        toast.success('Product add ho gaya!');
      }

      // Upload new images one by one
      for (const file of imageFiles) {
        await uploadProductImage(productId, file);
      }

      closeForm();
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error aaya!');
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false); setEditingProduct(null);
    setFormData(EMPTY_FORM); setImageFiles([]); setImagePreviews([]); setExistingImages([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, category: product.category,
      price: product.price, stock: product.stock,
      description: product.description || '',
      unit: product.unit || 'piece',
      offerPercent: product.offerPercent || '',
    });
    setExistingImages(product.images || []);
    setImageFiles([]);
    setImagePreviews([]);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Product delete karna chahte ho?')) return;
    try {
      await deleteProduct(id);
      toast.success('Delete ho gaya!');
      loadProducts();
    } catch { toast.error('Delete failed!'); }
  };

  const handleToggle = async (id) => {
    try {
      await toggleProduct(id);
      loadProducts();
    } catch { toast.error('Toggle failed!'); }
  };

  const toggleFeaturedSelect = (productId) => {
    if (selectedFeatured.includes(productId)) {
      setSelectedFeatured(selectedFeatured.filter(id => id !== productId));
      const newOffers = { ...offers }; delete newOffers[productId]; setOffers(newOffers);
    } else {
      if (selectedFeatured.length >= 2) { toast.error('Sirf 2 products!'); return; }
      setSelectedFeatured([...selectedFeatured, productId]);
    }
  };

  const handleOfferChange = (productId, value) => {
    setOffers({ ...offers, [productId]: Math.min(99, Math.max(0, Number(value))) });
  };

  const saveFeatured = async () => {
    setSavingFeatured(true);
    try {
      await setFeaturedProducts(selectedFeatured, offers);
      toast.success('Featured save ho gaye! 🎉');
      setShowFeaturedPanel(false);
      loadProducts();
    } catch { toast.error('Save nahi hua!'); }
    finally { setSavingFeatured(false); }
  };

  const totalImages = existingImages.length + imagePreviews.length;
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filteredProducts = activeCategory === 'all'
    ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Products 🏷️</h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} total products</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowFeaturedPanel(true)}
            className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold px-3 py-2.5 rounded-xl transition-all active:scale-95 text-sm">
            ⭐ Feed
          </button>
          <button onClick={() => { setShowForm(true); setEditingProduct(null); setFormData(EMPTY_FORM); setImageFiles([]); setImagePreviews([]); setExistingImages([]); }}
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-4 py-2.5 rounded-xl transition-all active:scale-95 text-sm">
            ➕ Add
          </button>
        </div>
      </div>

      {/* ── FEATURED PANEL ── */}
      {showFeaturedPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
              <div>
                <h2 className="font-black text-gray-900">⭐ Feed Products</h2>
                <p className="text-xs text-gray-400 mt-0.5">Max 2 • Offer optional</p>
              </div>
              <button onClick={() => setShowFeaturedPanel(false)}
                className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">✕</button>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                selectedFeatured.length === 2 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {selectedFeatured.length === 2 ? '✅' : '⚠️'} {selectedFeatured.length}/2 selected
              </span>
            </div>
            <div className="px-6 pb-4 space-y-3">
              {products.map((product) => {
                const isSelected = selectedFeatured.includes(product._id);
                return (
                  <div key={product._id} className={`rounded-2xl border-2 overflow-hidden transition-all ${
                    isSelected ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 bg-white'
                  }`}>
                    <div className="flex items-center gap-3 p-3 cursor-pointer" onClick={() => toggleFeaturedSelect(product._id)}>
                      <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {product.images?.[0] ? <img src={product.images[0]} className="w-full h-full object-cover" /> : <span className="text-2xl opacity-30">📦</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.category}</p>
                        <p className="text-sm font-black text-gray-900 mt-0.5">₹{product.price}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected ? 'bg-yellow-400 border-yellow-400 text-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <span className="text-xs font-black">✓</span>}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="px-3 pb-3">
                        <div className="bg-white rounded-xl border border-yellow-200 p-3">
                          <p className="text-xs font-bold text-gray-600 mb-2">🏷️ Discount % (optional)</p>
                          <div className="flex items-center gap-2">
                            <input type="number" min="0" max="99" placeholder="0"
                              value={offers[product._id] || ''}
                              onChange={(e) => handleOfferChange(product._id, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-20 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                            <span className="text-sm text-gray-600 font-bold">% off</span>
                            {offers[product._id] > 0 && (
                              <span className="text-xs font-black text-green-600 ml-auto">
                                ₹{Math.round(product.price - (product.price * offers[product._id]) / 100)} hoga
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="px-6 pb-6 sticky bottom-0 bg-white pt-3 border-t border-gray-100">
              <button onClick={saveFeatured} disabled={savingFeatured || selectedFeatured.length === 0}
                className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 text-sm">
                {savingFeatured ? '⏳ Saving...' : '💾 Save Featured Products'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD / EDIT FORM ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
              <h2 className="font-black text-gray-900">
                {editingProduct ? '✏️ Edit Product' : '➕ Add Product'}
              </h2>
              <button onClick={closeForm}
                className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Jaise: Dove Shampoo 200ml" required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
              </div>

              {/* Category + Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category *</label>
                  <input type="text" name="category" value={formData.category} onChange={handleChange}
                    placeholder="Grocery, Dairy..." required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Unit</label>
                  <select name="unit" value={formData.unit} onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all">
                    {['piece','kg','gram','liter','ml','dozen','packet','bottle','box'].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price + Stock + Discount */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Price ₹ *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange}
                    placeholder="0" required min="0"
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Stock</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                    placeholder="0" min="0"
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Discount %</label>
                  <input type="number" name="offerPercent" value={formData.offerPercent} onChange={handleChange}
                    placeholder="0" min="0" max="99"
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all" />
                </div>
              </div>

              {/* Live discount preview */}
              {formData.price && formData.offerPercent > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-red-600">🏷️ {formData.offerPercent}% OFF lagega</span>
                  <span className="text-sm font-black text-red-700">
                    ₹{Math.round(formData.price - (formData.price * formData.offerPercent) / 100)} final price
                  </span>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}
                  placeholder="Product ke baare mein..." rows={2}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
              </div>

              {/* ── MULTI IMAGE UPLOAD ── */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Product Images
                  </label>
                  <span className="text-xs text-gray-400 font-medium">{totalImages}/5</span>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">

                  {/* Existing images (edit mode) */}
                  {existingImages.map((url, i) => (
                    <div key={`existing-${i}`} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <img src={url} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute top-1 left-1 bg-gray-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">Cover</span>
                      )}
                      <button type="button" onClick={() => removeExistingImage(i)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow">✕</button>
                    </div>
                  ))}

                  {/* New image previews */}
                  {imagePreviews.map((src, i) => (
                    <div key={`new-${i}`} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                      <img src={src} className="w-full h-full object-cover" />
                      {existingImages.length === 0 && i === 0 && (
                        <span className="absolute top-1 left-1 bg-gray-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">Cover</span>
                      )}
                      <button type="button" onClick={() => removeNewImage(i)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow">✕</button>
                    </div>
                  ))}

                  {/* Add more button */}
                  {totalImages < 5 && (
                    <button type="button"
                      onClick={() => document.getElementById('productImgInput').click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 hover:border-gray-400 transition-all bg-gray-50 active:scale-95">
                      <span className="text-xl text-gray-300">+</span>
                      <span className="text-[10px] text-gray-400 font-medium">Add</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-400">Pehli image cover banega • Max 5 images • JPG/PNG 5MB</p>
                <input type="file" id="productImgInput" accept="image/*" multiple className="hidden"
                  onChange={handleImageAdd} />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl transition-all active:scale-95">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>Saving...</>
                  ) : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CATEGORY FILTER ── */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              activeCategory === cat ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600'
            }`}>
            {cat === 'all' ? '🏠 All' : cat}
          </button>
        ))}
      </div>

      {/* ── PRODUCTS GRID ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />)}
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

              {/* Image */}
              <div className="h-48 bg-gray-50 relative flex items-center justify-center overflow-hidden">
                {product.images?.[0]
                  ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain p-2" />
                  : <span className="text-4xl opacity-20">📦</span>
                }
                {/* Image count badge */}
                {product.images?.length > 1 && (
                  <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-lg">
                    📷 {product.images.length}
                  </span>
                )}
                <button onClick={() => handleToggle(product._id)}
                  className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    product.isAvailable ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                  }`}>
                  {product.isAvailable ? 'Active' : 'Inactive'}
                </button>
                {product.isFeatured && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-0.5 rounded-full">
                    ⭐ Feed
                  </span>
                )}
                {product.offerPercent > 0 && (
                  <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                    🏷️ {product.offerPercent}% OFF
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg font-medium">{product.category}</span>
                  <span className="text-xs text-gray-400">{product.unit}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {product.offerPrice ? (
                      <>
                        <span className="text-lg font-black text-green-600">₹{product.offerPrice}</span>
                        <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                      </>
                    ) : (
                      <span className="text-lg font-black text-gray-900">₹{product.price}</span>
                    )}
                  </div>
                  <span className={`text-xs font-bold ${
                    product.stock === 0 ? 'text-red-500' : product.stock <= 5 ? 'text-amber-500' : 'text-green-600'
                  }`}>
                    {product.stock === 0 ? '❌ Out' : product.stock <= 5 ? `⚠️ ${product.stock}` : `✅ ${product.stock}`}
                  </span>
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