'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
    setLoading(true);
    try {
      await addToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200">

      {/* Image */}
      <div className="h-32 bg-gray-50 relative overflow-hidden">
        {product.images && product.images[0] ? (
          <img src={product.images[0]} alt={product.name}
            className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-30">📦</span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-bold bg-red-500 px-2 py-1 rounded-lg">Out of Stock</span>
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 left-2 bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{product.unit}</p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-black text-gray-900">₹{product.price}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={loading || product.stock === 0}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-50 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}>
            {loading ? '...' : added ? '✓ Added' : '+ Add'}
          </button>
        </div>

        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-xs text-red-500 font-medium mt-1.5">
            ⚠️ Sirf {product.stock} bacha hai
          </p>
        )}
      </div>
    </div>
  );
}