'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import ShopCard from '@/components/shop/ShopCard';
import BottomNav from '@/components/common/BottomNav';
import { searchShops } from '@/services/shopService';
import { searchProducts } from '@/services/productService';

const POPULAR = [
  '🛒 Kirana', '🥛 Dairy', '💊 Medical',
  '🍱 Food', '📱 Electronics', '👗 Fashion'
];

export default function SearchPage() {
  const router = useRouter();
  const { isAuthenticated, isRestoring } = useAuth();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('shops');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (isRestoring) return;
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
  }, [isAuthenticated, isRestoring]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, searchType]);

  const handleSearch = async (q) => {
    setLoading(true);
    try {
      if (searchType === 'products') {
        const res = await searchProducts({ q });
        setResults(res.results || []);
      } else {
        const res = await searchShops({ q });
        setResults(res.shops || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 px-4 pt-4 pb-3">

        {/* Search Input */}
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.back()}
            className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
            ←
          </button>
          <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-gray-900 focus-within:border-transparent transition-all">
            <span className="text-gray-400">{loading ? '⏳' : '🔍'}</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Shops ya products search karo..."
              autoFocus
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            {query && (
              <button onClick={() => { setQuery(''); setResults([]); }}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none">
                ×
              </button>
            )}
          </div>
        </div>

        {/* Toggle */}
        <div className="flex gap-2">
          {['shops', 'products'].map(type => (
            <button key={type}
              onClick={() => setSearchType(type)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                searchType === type
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}>
              {type === 'shops' ? '🏪 Shops' : '📦 Products'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">

        {/* Empty state */}
        {!query && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((item) => (
                <button key={item}
                  onClick={() => setQuery(item.split(' ')[1])}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition-all active:scale-95">
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 skeleton rounded-2xl" />
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-bold text-gray-900 mb-1">Koi result nahi mila</p>
            <p className="text-gray-400 text-sm">"{query}" ke liye kuch nahi mila</p>
          </div>
        )}

        {/* Shop Results */}
        {!loading && searchType === 'shops' && results.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              {results.length} Shops mili
            </p>
            <div className="grid grid-cols-2 gap-3">
              {results.map(shop => (
                <ShopCard key={shop._id} shop={shop} />
              ))}
            </div>
          </div>
        )}

        {/* Product Results */}
        {!loading && searchType === 'products' && results.length > 0 && (
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              {results.length} Products mile — Total price se sort kiya
            </p>
            <div className="space-y-3">
              {results.map((result, i) => (
                <Link key={i} href={`/shop/${result.shop.slug}`}
                  className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-md transition-all active:scale-95">

                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {result.image ? (
                      <img src={result.image} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{result.productName}</p>
                    <p className="text-xs text-gray-400 truncate">📍 {result.shop.shopName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">₹{result.price}</span>
                      <span className="text-xs text-gray-300">+</span>
                      <span className="text-xs text-gray-500">
                        {result.deliveryCharge === 0 ? 'Free delivery' : `₹${result.deliveryCharge} delivery`}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-base font-black text-gray-900">₹{result.totalPrice}</div>
                    <div className="text-xs text-gray-400">total</div>
                    {i === 0 && (
                      <div className="text-xs bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-lg mt-1">
                        Best ⭐
                      </div>
                    )}
                  </div>

                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <BottomNav />
    </div>
  );
}