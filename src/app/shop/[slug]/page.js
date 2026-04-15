'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getShopBySlug } from '@/services/shopService';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import ProductCard from '@/components/shop/ProductCard';
import BottomNav from '@/components/common/BottomNav';
import API from '@/services/api';
import toast from 'react-hot-toast';

export default function ShopPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { items } = useCart();

  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isFavourite, setIsFavourite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    loadShop();
  }, [slug]);

  const loadShop = async () => {
    try {
      setLoading(true);
      const data = await getShopBySlug(slug);
      setShop(data.shop);
      setProducts(data.products);
    } catch (error) {
      toast.error('Shop nahi mili!');
      router.push('/feed');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setFavLoading(true);
    try {
      const res = await API.post(`/user/favourite/${shop._id}`);
      setIsFavourite(res.data.isFavourite);
      toast.success(res.data.isFavourite ? 'Favourite mein add hua!' : 'Favourite se hata diya');
    } catch (error) {
      toast.error('Error aaya!');
    } finally {
      setFavLoading(false);
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const cartCount = items?.length || 0;

  const categoryEmoji = {
    kirana: '🛒', dairy: '🥛', fruits: '🍎',
    food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-48 skeleton" />
        <div className="px-4 pt-4 space-y-4">
          <div className="h-20 skeleton rounded-2xl" />
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => <div key={i} className="h-48 skeleton rounded-2xl" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!shop) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Banner */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {shop.banner ? (
          <img src={shop.banner} alt={shop.shopName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${shop.themeColor}33, ${shop.themeColor}66)` }}>
            <span className="text-8xl opacity-20">
              {categoryEmoji[shop.category] || '🏪'}
            </span>
          </div>
        )}

        {/* Back button */}
        <button onClick={() => router.back()}
          className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
          ←
        </button>

        {/* Cart button */}
        {cartCount > 0 && (
          <Link href="/cart"
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm relative">
            🛒
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        )}
      </div>

      {/* Shop Info */}
      <div className="bg-white border-b border-gray-100 px-4 pb-4">
        <div className="flex items-end gap-3 -mt-8 mb-3">
          {/* Logo */}
          <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-white flex-shrink-0">
            {shop.logo ? (
              <img src={shop.logo} alt={shop.shopName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <span className="text-2xl">{categoryEmoji[shop.category] || '🏪'}</span>
              </div>
            )}
          </div>

          <div className="flex-1 pt-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-black text-gray-900">{shop.shopName}</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    shop.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {shop.isOpen ? '🟢 Open' : '🔴 Closed'}
                  </span>
                  <span className="text-xs text-gray-400">{shop.category}</span>
                </div>
              </div>

              <button onClick={toggleFavourite} disabled={favLoading}
                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-lg transition-all active:scale-95">
                {isFavourite ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </div>

        {shop.description && (
          <p className="text-sm text-gray-500 mb-3">{shop.description}</p>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <div className="text-base font-black text-gray-900">
              {shop.rating > 0 ? shop.rating.toFixed(1) : 'New'}
            </div>
            <div className="text-xs text-gray-400">Rating ⭐</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <div className="text-base font-black text-gray-900">{shop.totalOrders}</div>
            <div className="text-xs text-gray-400">Orders 📦</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <div className="text-base font-black text-gray-900">
              {shop.deliverySettings?.deliveryEnabled ? 'Yes' : 'No'}
            </div>
            <div className="text-xs text-gray-400">Delivery 🚚</div>
          </div>
        </div>

        {/* Announcement */}
        {shop.homePage?.announcement && (
          <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <p className="text-xs text-amber-700 font-medium">
              📢 {shop.homePage.announcement}
            </p>
          </div>
        )}

        {/* Offers */}
        {shop.homePage?.offers?.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
            {shop.homePage.offers.map((offer, i) => (
              <div key={i} className="flex-shrink-0 bg-green-50 border border-green-100 rounded-xl p-3 min-w-48">
                <div className="text-xs font-bold text-green-700">🎉 {offer.title}</div>
                <div className="text-xs text-green-600 mt-0.5">{offer.description}</div>
                {offer.discount && (
                  <div className="text-lg font-black text-green-600 mt-1">{offer.discount}% OFF</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {cat === 'all' ? '🏠 All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-4 pt-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-gray-600 font-bold">Koi product nahi hai</p>
            <p className="text-gray-400 text-sm mt-1">Is category mein abhi koi product nahi</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Products ({filteredProducts.length})
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <Link href="/cart"
            className="flex items-center justify-between bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl active:scale-95 transition-all">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛒</span>
              <span className="font-bold text-sm">{cartCount} items</span>
            </div>
            <span className="font-bold text-sm">View Cart →</span>
          </Link>
        </div>
      )}

      <BottomNav />
    </div>
  );
}