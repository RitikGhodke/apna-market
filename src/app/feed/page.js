// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { useDebounce } from '@/hooks/useDebounce';
// import ShopCard from '@/components/shop/ShopCard';
// import BottomNav from '@/components/common/BottomNav';
// import { searchShops, getNearbyShops, getFeaturedShops } from '@/services/shopService';
// import { searchProducts } from '@/services/productService';
// import toast from 'react-hot-toast';

// const CATEGORIES = [
//   { id: 'all', label: 'All', emoji: '🏠' },
//   { id: 'kirana', label: 'Kirana', emoji: '🛒' },
//   { id: 'dairy', label: 'Dairy', emoji: '🥛' },
//   { id: 'fruits', label: 'Fruits', emoji: '🍎' },
//   { id: 'food', label: 'Food', emoji: '🍱' },
//   { id: 'medical', label: 'Medical', emoji: '💊' },
//   { id: 'fashion', label: 'Fashion', emoji: '👗' },
//   { id: 'electronics', label: 'Electronics', emoji: '📱' },
// ];

// export default function FeedPage() {
//   const router = useRouter();
//   const { user, isAuthenticated, logoutUser, isRestoring } = useAuth();
//   const [shops, setShops] = useState([]);
//   const [featured, setFeatured] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [loading, setLoading] = useState(true);
//   const [searching, setSearching] = useState(false);
//   const [searchType, setSearchType] = useState('shops');

//   const debouncedSearch = useDebounce(searchQuery, 500);

//   useEffect(() => {
//     if (isRestoring) return;
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     loadShops();
//   }, [isAuthenticated, isRestoring]);

//   useEffect(() => {
//     if (debouncedSearch) {
//       handleSearch(debouncedSearch);
//     } else {
//       setSearchResults([]);
//     }
//   }, [debouncedSearch]);

//   useEffect(() => {
//     if (activeCategory !== 'all') {
//       loadShopsByCategory(activeCategory);
//     } else {
//       loadShops();
//     }
//   }, [activeCategory]);

//   const loadShops = async () => {
//     try {
//       setLoading(true);
//       const [nearbyRes, featuredRes] = await Promise.all([
//         searchShops({}),
//         getFeaturedShops()
//       ]);
//       setShops(nearbyRes.shops || []);
//       setFeatured(featuredRes.featuredShops || []);
//     } catch (error) {
//       console.log('Error loading shops:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadShopsByCategory = async (category) => {
//     try {
//       setLoading(true);
//       const res = await searchShops({ category });
//       setShops(res.shops || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (query) => {
//     if (!query.trim()) return;
//     setSearching(true);
//     try {
//       if (searchType === 'products') {
//         const res = await searchProducts({ q: query });
//         setSearchResults(res.results || []);
//       } else {
//         const res = await searchShops({ q: query });
//         setSearchResults(res.shops || []);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setSearching(false);
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">

//       {/* Top Header */}
//       <div className="bg-white sticky top-0 z-40 border-b border-gray-100">
//         <div className="px-4 pt-4 pb-3">

//           {/* User greeting */}
//           <div className="flex items-center justify-between mb-3">
//             <div>
//               <p className="text-xs text-gray-400 font-medium">Namaste 👋</p>
//               <h1 className="text-lg font-black text-gray-900">
//                 {user?.name?.split(' ')[0] || 'User'}
//               </h1>
//             </div>
//             <div className="flex items-center gap-2">
//               <button className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-base">
//                 🔔
//               </button>
//               <Link href="/profile"
//                 className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center">
//                 <span className="text-white text-xs font-bold">{getInitials(user?.name)}</span>
//               </Link>
//             </div>
//           </div>

//           {/* Search bar */}
//           <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-gray-900 focus-within:border-transparent transition-all">
//             <span className="text-gray-400 text-base flex-shrink-0">
//               {searching ? '⏳' : '🔍'}
//             </span>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Shops ya products search karo..."
//               className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
//             />
//             {searchQuery && (
//               <button onClick={() => { setSearchQuery(''); setSearchResults([]); }}
//                 className="text-gray-400 hover:text-gray-600 text-lg">
//                 ×
//               </button>
//             )}
//           </div>

//           {/* Search type toggle */}
//           {searchQuery && (
//             <div className="flex gap-2 mt-2">
//               {['shops', 'products'].map(type => (
//                 <button key={type} onClick={() => setSearchType(type)}
//                   className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
//                     searchType === type
//                       ? 'bg-gray-900 text-white'
//                       : 'bg-gray-100 text-gray-500'
//                   }`}>
//                   {type === 'shops' ? '🏪 Shops' : '📦 Products'}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Category Pills */}
//         <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
//           {CATEGORIES.map((cat) => (
//             <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
//               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
//                 activeCategory === cat.id
//                   ? 'bg-gray-900 text-white shadow-sm'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}>
//               <span>{cat.emoji}</span>
//               <span>{cat.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Search Results */}
//       {searchQuery && (
//         <div className="px-4 pt-4">
//           <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
//             Search Results ({searchResults.length})
//           </h2>

//           {searching ? (
//             <div className="space-y-3">
//               {[1, 2, 3].map(i => (
//                 <div key={i} className="h-24 skeleton rounded-2xl" />
//               ))}
//             </div>
//           ) : searchResults.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-4xl mb-3">🔍</div>
//               <p className="text-gray-500 font-medium">Koi result nahi mila</p>
//               <p className="text-gray-400 text-sm mt-1">Alag keyword try karo</p>
//             </div>
//           ) : searchType === 'shops' ? (
//             <div className="grid grid-cols-2 gap-3">
//               {searchResults.map(shop => (
//                 <ShopCard key={shop._id} shop={shop} />
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {searchResults.map((result, i) => (
//                 <Link key={i} href={`/shop/${result.shop.slug}`}
//                   className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-md transition-all">
//                   <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                     {result.image ? (
//                       <img src={result.image} className="w-full h-full object-cover rounded-xl" />
//                     ) : (
//                       <span className="text-xl">📦</span>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-bold text-gray-900 text-sm truncate">{result.productName}</p>
//                     <p className="text-xs text-gray-500 truncate">{result.shop.shopName}</p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-xs font-bold text-gray-900">₹{result.price}</span>
//                       <span className="text-xs text-gray-400">+₹{result.deliveryCharge} delivery</span>
//                     </div>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <div className="text-sm font-black text-green-600">₹{result.totalPrice}</div>
//                     <div className="text-xs text-gray-400">total</div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Main Feed */}
//       {!searchQuery && (
//         <div className="px-4 pt-4 space-y-6">

//           {/* Featured Shops */}
//           {featured.length > 0 && (
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-base font-black text-gray-900">⭐ Featured Shops</h2>
//               </div>
//               <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
//                 {featured.map(shop => (
//                   <div key={shop._id} className="flex-shrink-0 w-48">
//                     <ShopCard shop={shop} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* All Shops */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-base font-black text-gray-900">
//                 {activeCategory === 'all' ? '🏪 Sab Shops' : `${CATEGORIES.find(c => c.id === activeCategory)?.emoji} ${CATEGORIES.find(c => c.id === activeCategory)?.label} Shops`}
//               </h2>
//               <span className="text-xs text-gray-400 font-medium">{shops.length} shops</span>
//             </div>

//             {loading ? (
//               <div className="grid grid-cols-2 gap-3">
//                 {[1, 2, 3, 4].map(i => (
//                   <div key={i} className="h-48 skeleton rounded-2xl" />
//                 ))}
//               </div>
//             ) : shops.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="text-5xl mb-4">🏪</div>
//                 <p className="text-gray-600 font-bold">Koi shop nahi mili</p>
//                 <p className="text-gray-400 text-sm mt-1">Is area mein abhi koi shop nahi hai</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-3">
//                 {shops.map(shop => (
//                   <ShopCard key={shop._id} shop={shop} />
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>
//       )}

//       {/* Bottom Nav */}
//       <BottomNav />
//     </div>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import ShopCard from '@/components/shop/ShopCard';
import BottomNav from '@/components/common/BottomNav';
import { searchShops, getNearbyShops, getFeaturedShops } from '@/services/shopService';
import { searchProducts } from '@/services/productService';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { id: 'all',         label: 'All',         emoji: '🏠' },
  { id: 'kirana',      label: 'Kirana',      emoji: '🛒' },
  { id: 'dairy',       label: 'Dairy',       emoji: '🥛' },
  { id: 'fruits',      label: 'Fruits',      emoji: '🍎' },
  { id: 'food',        label: 'Food',        emoji: '🍱' },
  { id: 'medical',     label: 'Medical',     emoji: '💊' },
  { id: 'fashion',     label: 'Fashion',     emoji: '👗' },
  { id: 'electronics', label: 'Electronics', emoji: '📱' },
];

export default function FeedPage() {
  const router = useRouter();
  const { user, isAuthenticated, isRestoring } = useAuth();
  const [shops, setShops] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchType, setSearchType] = useState('shops');

  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (isRestoring) return;
    if (!isAuthenticated) { router.push('/auth/login'); return; }
    loadShops();
  }, [isAuthenticated, isRestoring]);

  useEffect(() => {
    if (debouncedSearch) handleSearch(debouncedSearch);
    else setSearchResults([]);
  }, [debouncedSearch, searchType]);

  useEffect(() => {
    if (activeCategory !== 'all') loadShopsByCategory(activeCategory);
    else loadShops();
  }, [activeCategory]);

  const loadShops = async () => {
    try {
      setLoading(true);
      const [nearbyRes, featuredRes] = await Promise.all([
        searchShops({}),
        getFeaturedShops()
      ]);
      setShops(nearbyRes.shops || []);
      setFeatured(featuredRes.featuredShops || []);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  const loadShopsByCategory = async (category) => {
    try {
      setLoading(true);
      const res = await searchShops({ category });
      setShops(res.shops || []);
    } catch (e) { console.log(e); }
    finally { setLoading(false); }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      if (searchType === 'products') {
        const res = await searchProducts({ q: query });
        setSearchResults(res.results || []);
      } else {
        const res = await searchShops({ q: query });
        setSearchResults(res.shops || []);
      }
    } catch (e) { console.log(e); }
    finally { setSearching(false); }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-40" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
        <div className="px-4 pt-5 pb-0">

          {/* Greeting row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Namaste 👋</p>
              <h1 className="text-xl font-black text-white">{user?.name?.split(' ')[0] || 'User'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
                🔔
              </button>
              <Link href="/profile"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black"
                style={{ background: 'linear-gradient(135deg, #6c63ff, #a855f7)' }}>
                {getInitials(user?.name)}
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-2 rounded-2xl px-4 py-2.5 mb-3"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span className="text-sm flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {searching ? '⏳' : '🔍'}
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Shops ya products search karo..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
              style={{ color: 'white' }}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                className="text-sm transition-all" style={{ color: 'rgba(255,255,255,0.5)' }}>✕</button>
            )}
          </div>

          {/* Search type toggle */}
          {searchQuery && (
            <div className="flex gap-2 mb-3">
              {['shops', 'products'].map(type => (
                <button key={type} onClick={() => setSearchType(type)}
                  className="text-xs px-3 py-1.5 rounded-xl font-bold transition-all"
                  style={{
                    background: searchType === type ? '#fff' : 'rgba(255,255,255,0.12)',
                    color: searchType === type ? '#1a1a2e' : 'rgba(255,255,255,0.7)'
                  }}>
                  {type === 'shops' ? '🏪 Shops' : '📦 Products'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto hide-scrollbar">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap flex-shrink-0 transition-all"
              style={{
                background: activeCategory === cat.id ? '#fff' : 'rgba(255,255,255,0.12)',
                color: activeCategory === cat.id ? '#1a1a2e' : 'rgba(255,255,255,0.7)'
              }}>
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── SEARCH RESULTS ── */}
      {searchQuery && (
        <div className="px-4 pt-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
            Results ({searchResults.length})
          </h2>
          {searching ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-20 skeleton rounded-2xl" />)}
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-black text-gray-900">Koi result nahi mila</p>
              <p className="text-gray-400 text-xs mt-1">Alag keyword try karo</p>
            </div>
          ) : searchType === 'shops' ? (
            <div className="grid grid-cols-2 gap-3">
              {searchResults.map(shop => <ShopCard key={shop._id} shop={shop} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {searchResults.map((result, i) => (
                <Link key={i} href={`/shop/${result.shop.slug}`}
                  className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-gray-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {result.image
                      ? <img src={result.image} className="w-full h-full object-cover rounded-xl" />
                      : <span className="text-xl">📦</span>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm truncate">{result.productName}</p>
                    <p className="text-xs text-gray-400 truncate">{result.shop.shopName}</p>
                    <p className="text-xs font-bold text-gray-900 mt-0.5">₹{result.price}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-black text-green-600">₹{result.totalPrice}</div>
                    <div className="text-xs text-gray-400">total</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MAIN FEED ── */}
      {!searchQuery && (
        <div className="px-4 pt-5 space-y-6">

          {/* Featured */}
          {featured.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-black text-gray-900">⭐ Featured Shops</h2>
                <span className="text-xs font-bold text-purple-600">See all →</span>
              </div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                {featured.map(shop => (
                  <div key={shop._id} className="flex-shrink-0 w-52">
                    <ShopCard shop={shop} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All shops */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-gray-900">
                {activeCategory === 'all'
                  ? '🏪 Sab Shops'
                  : `${CATEGORIES.find(c => c.id === activeCategory)?.emoji} ${CATEGORIES.find(c => c.id === activeCategory)?.label} Shops`
                }
              </h2>
              <span className="text-xs text-gray-400 font-medium">{shops.length} shops</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-3">
                {[1,2,3,4].map(i => <div key={i} className="h-52 skeleton rounded-2xl" />)}
              </div>
            ) : shops.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                <div className="text-5xl mb-4">🏪</div>
                <p className="font-black text-gray-900">Koi shop nahi mili</p>
                <p className="text-gray-400 text-xs mt-1">Is area mein abhi koi shop nahi hai</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {shops.map(shop => <ShopCard key={shop._id} shop={shop} />)}
              </div>
            )}
          </div>

        </div>
      )}

      <BottomNav />
    </div>
  );
}
