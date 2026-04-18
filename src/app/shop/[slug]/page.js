// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { getShopBySlug } from '@/services/shopService';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import ProductCard from '@/components/shop/ProductCard';
// import BottomNav from '@/components/common/BottomNav';
// import API from '@/services/api';
// import toast from 'react-hot-toast';

// export default function ShopPage() {
//   const { slug } = useParams();
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();
//   const { items } = useCart();

//   const [shop, setShop] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [favLoading, setFavLoading] = useState(false);

//   useEffect(() => {
//     loadShop();
//   }, [slug]);

//   const loadShop = async () => {
//     try {
//       setLoading(true);
//       const data = await getShopBySlug(slug);
//       setShop(data.shop);
//       setProducts(data.products);
//     } catch (error) {
//       toast.error('Shop nahi mili!');
//       router.push('/feed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFavourite = async () => {
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     setFavLoading(true);
//     try {
//       const res = await API.post(`/user/favourite/${shop._id}`);
//       setIsFavourite(res.data.isFavourite);
//       toast.success(res.data.isFavourite ? 'Favourite mein add hua!' : 'Favourite se hata diya');
//     } catch (error) {
//       toast.error('Error aaya!');
//     } finally {
//       setFavLoading(false);
//     }
//   };

//   const categories = ['all', ...new Set(products.map(p => p.category))];

//   const filteredProducts = activeCategory === 'all'
//     ? products
//     : products.filter(p => p.category === activeCategory);

//   const cartCount = items?.length || 0;

//   const categoryEmoji = {
//     kirana: '🛒', dairy: '🥛', fruits: '🍎',
//     food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="h-48 skeleton" />
//         <div className="px-4 pt-4 space-y-4">
//           <div className="h-20 skeleton rounded-2xl" />
//           <div className="grid grid-cols-2 gap-3">
//             {[1,2,3,4].map(i => <div key={i} className="h-48 skeleton rounded-2xl" />)}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!shop) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">

//       {/* Banner */}
// <div className="relative h-56 bg-gray-200 overflow-hidden">  {/* h-48 → h-56 */}
//   {shop.banner ? (
//     <img
//       src={shop.banner}
//       alt={shop.shopName}
//       className="w-full h-full object-cover object-center"  
//     />
//   ) : (
//     <div className="w-full h-full flex items-center justify-center"
//       style={{ background: `linear-gradient(135deg, ${shop.themeColor}33, ${shop.themeColor}66)` }}>
//       <span className="text-8xl opacity-20">
//         {categoryEmoji[shop.category] || '🏪'}
//       </span>
//     </div>
//   )}
//   {/* Back button */}
//   <button onClick={() => router.back()}
//     className="absolute top-4 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
//     ←
//   </button>
//   {/* Cart button */}
//   {cartCount > 0 && (
//     <Link href="/cart"
//       className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm relative">
//       🛒
//       <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
//         {cartCount}
//       </span>
//     </Link>
//   )}
// </div>

//       {/* Shop Info */}
//       <div className="bg-white border-b border-gray-100 px-4 pb-4">
//         <div className="flex items-end gap-3 -mt-8 mb-3">
//           {/* Logo */}
//           <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-white flex-shrink-0">
//             {shop.logo ? (
//               <img src={shop.logo} alt={shop.shopName} className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gray-50">
//                 <span className="text-2xl">{categoryEmoji[shop.category] || '🏪'}</span>
//               </div>
//             )}
//           </div>

//           <div className="flex-1 pt-8">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h1 className="text-xl font-black text-gray-900">{shop.shopName}</h1>
//                 <div className="flex items-center gap-2 mt-1 flex-wrap">
//                   <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
//                     shop.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
//                   }`}>
//                     {shop.isOpen ? '🟢 Open' : '🔴 Closed'}
//                   </span>
//                   <span className="text-xs text-gray-400">{shop.category}</span>
//                 </div>
//               </div>

//               <button onClick={toggleFavourite} disabled={favLoading}
//                 className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-lg transition-all active:scale-95">
//                 {isFavourite ? '❤️' : '🤍'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {shop.description && (
//           <p className="text-sm text-gray-500 mb-3">{shop.description}</p>
//         )}

//         {/* Stats row */}
//         <div className="grid grid-cols-3 gap-2">
//           <div className="bg-gray-50 rounded-xl p-2.5 text-center">
//             <div className="text-base font-black text-gray-900">
//               {shop.rating > 0 ? shop.rating.toFixed(1) : 'New'}
//             </div>
//             <div className="text-xs text-gray-400">Rating ⭐</div>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-2.5 text-center">
//             <div className="text-base font-black text-gray-900">{shop.totalOrders}</div>
//             <div className="text-xs text-gray-400">Orders 📦</div>
//           </div>
//           <div className="bg-gray-50 rounded-xl p-2.5 text-center">
//             <div className="text-base font-black text-gray-900">
//               {shop.deliverySettings?.deliveryEnabled ? 'Yes' : 'No'}
//             </div>
//             <div className="text-xs text-gray-400">Delivery 🚚</div>
//           </div>
//         </div>

//         {/* Announcement */}
//         {shop.homePage?.announcement && (
//           <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
//             <p className="text-xs text-amber-700 font-medium">
//               📢 {shop.homePage.announcement}
//             </p>
//           </div>
//         )}

//         {/* Offers */}
//         {shop.homePage?.offers?.length > 0 && (
//           <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
//             {shop.homePage.offers.map((offer, i) => (
//               <div key={i} className="flex-shrink-0 bg-green-50 border border-green-100 rounded-xl p-3 min-w-48">
//                 <div className="text-xs font-bold text-green-700">🎉 {offer.title}</div>
//                 <div className="text-xs text-green-600 mt-0.5">{offer.description}</div>
//                 {offer.discount && (
//                   <div className="text-lg font-black text-green-600 mt-1">{offer.discount}% OFF</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Category Filter */}
//       <div className="bg-white border-b border-gray-100 px-4 py-3">
//         <div className="flex gap-2 overflow-x-auto hide-scrollbar">
//           {categories.map((cat) => (
//             <button key={cat} onClick={() => setActiveCategory(cat)}
//               className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
//                 activeCategory === cat
//                   ? 'bg-gray-900 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}>
//               {cat === 'all' ? '🏠 All' : cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Products */}
//       <div className="px-4 pt-4">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-5xl mb-4">📦</div>
//             <p className="text-gray-600 font-bold">Koi product nahi hai</p>
//             <p className="text-gray-400 text-sm mt-1">Is category mein abhi koi product nahi</p>
//           </div>
//         ) : (
//           <>
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
//                 Products ({filteredProducts.length})
//               </h2>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               {filteredProducts.map(product => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Floating Cart Button */}
//       {cartCount > 0 && (
//         <div className="fixed bottom-20 left-4 right-4 z-40">
//           <Link href="/cart"
//             className="flex items-center justify-between bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl active:scale-95 transition-all">
//             <div className="flex items-center gap-2">
//               <span className="text-lg">🛒</span>
//               <span className="font-bold text-sm">{cartCount} items</span>
//             </div>
//             <span className="font-bold text-sm">View Cart →</span>
//           </Link>
//         </div>
//       )}

//       <BottomNav />
//     </div>
//   );
// }






// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { getShopBySlug } from '@/services/shopService';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import ProductCard from '@/components/shop/ProductCard';
// import BottomNav from '@/components/common/BottomNav';
// import API from '@/services/api';
// import toast from 'react-hot-toast';

// export default function ShopPage() {
//   const { slug } = useParams();
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();
//   const { items } = useCart();

//   const [shop, setShop] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [favLoading, setFavLoading] = useState(false);

//   useEffect(() => { loadShop(); }, [slug]);

//   const loadShop = async () => {
//     try {
//       setLoading(true);
//       const data = await getShopBySlug(slug);
//       setShop(data.shop);
//       setProducts(data.products);
//     } catch (error) {
//       toast.error('Shop nahi mili!');
//       router.push('/feed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFavourite = async () => {
//     if (!isAuthenticated) { router.push('/auth/login'); return; }
//     setFavLoading(true);
//     try {
//       const res = await API.post(`/user/favourite/${shop._id}`);
//       setIsFavourite(res.data.isFavourite);
//       toast.success(res.data.isFavourite ? 'Favourites mein add hua!' : 'Favourites se hata diya');
//     } catch { toast.error('Error aaya!'); }
//     finally { setFavLoading(false); }
//   };

//   const categories = ['all', ...new Set(products.map(p => p.category))];
//   const filteredProducts = activeCategory === 'all'
//     ? products
//     : products.filter(p => p.category === activeCategory);
//   const cartCount = items?.length || 0;

//   const categoryEmoji = {
//     kirana: '🛒', dairy: '🥛', fruits: '🍎',
//     food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#F7F7F8]">
//         <div className="h-72 bg-gray-200 animate-pulse" />
//         <div className="px-4 -mt-10 space-y-4">
//           <div className="h-28 bg-white rounded-3xl animate-pulse shadow-sm" />
//           <div className="grid grid-cols-2 gap-3">
//             {[1,2,3,4].map(i => <div key={i} className="h-52 bg-white rounded-2xl animate-pulse" />)}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!shop) return null;

//   return (
//     <div className="min-h-screen bg-[#F7F7F8] pb-28">

// {/* ── HERO BANNER ── */}
// <div style={{ width: '100%', position: 'relative' }}>
//   {shop.banner ? (
//     <img
//       src={shop.banner}
//       alt={shop.shopName}
//       style={{ width: '100%', height: 'auto', display: 'block' }}
//     />
//   ) : (
//     <div style={{
//       width: '100%',
//       height: '300px',
//       background: `linear-gradient(135deg, ${shop.themeColor}55, ${shop.themeColor}99)`,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     }}>
//       <span style={{ fontSize: '120px', opacity: 0.2 }}>
//         {categoryEmoji[shop.category] || '🏪'}
//       </span>
//     </div>
//   )}

//   {/* Dark gradient overlay */}
//   <div style={{
//     position: 'absolute', inset: 0,
//     background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
//     pointerEvents: 'none',
//   }} />

//   {/* Back button */}
//   <button onClick={() => router.back()}
//     style={{ position: 'absolute', top: '20px', left: '16px', width: '40px', height: '40px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
//     ←
//   </button>

//   {/* Cart button */}
//   {cartCount > 0 && (
//     <Link href="/cart"
//       style={{ position: 'absolute', top: '20px', right: '16px', width: '40px', height: '40px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <span style={{ fontSize: '18px' }}>🛒</span>
//       <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '20px', height: '20px', background: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
//         {cartCount}
//       </span>
//     </Link>
//   )}

//   {/* Shop name on banner */}
//   <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
//     <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '4px' }}>
//       {shop.category}
//     </p>
//     <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '900', lineHeight: 1.2 }}>
//       {shop.shopName}
//     </h1>
//   </div>
// </div>
      
//       {/* ── SHOP INFO CARD ── */}
//       <div className="mx-3 -mt-5 relative z-10">
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

//           {/* Logo + status row */}
//           <div className="flex items-center gap-4 px-5 pt-5 pb-4 border-b border-gray-50">
//             <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm">
//               {shop.logo ? (
//                 <img src={shop.logo} alt={shop.shopName} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center">
//                   <span className="text-2xl">{categoryEmoji[shop.category] || '🏪'}</span>
//                 </div>
//               )}
//             </div>

//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold ${
//                   shop.isOpen
//                     ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
//                     : 'bg-red-50 text-red-600 border border-red-100'
//                 }`}>
//                   <span className={`w-1.5 h-1.5 rounded-full ${shop.isOpen ? 'bg-emerald-500' : 'bg-red-500'}`} />
//                   {shop.isOpen ? 'Open Now' : 'Closed'}
//                 </span>
//                 {shop.deliverySettings?.deliveryEnabled && (
//                   <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-100">
//                     🚚 Delivery
//                   </span>
//                 )}
//               </div>
//               {shop.description && (
//                 <p className="text-gray-500 text-xs mt-1.5 leading-relaxed line-clamp-2">
//                   {shop.description}
//                 </p>
//               )}
//             </div>

//             <button
//               onClick={toggleFavourite}
//               disabled={favLoading}
//               className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg border transition-all active:scale-90 flex-shrink-0 ${
//                 isFavourite
//                   ? 'bg-red-50 border-red-100'
//                   : 'bg-gray-50 border-gray-100'
//               }`}
//             >
//               {isFavourite ? '❤️' : '🤍'}
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 divide-x divide-gray-100">
//             <div className="flex flex-col items-center py-4 gap-0.5">
//               <span className="text-lg font-black text-gray-900">
//                 {shop.rating > 0 ? shop.rating.toFixed(1) : '—'}
//               </span>
//               <span className="text-[11px] text-gray-400 font-medium">⭐ Rating</span>
//             </div>
//             <div className="flex flex-col items-center py-4 gap-0.5">
//               <span className="text-lg font-black text-gray-900">{shop.totalOrders}</span>
//               <span className="text-[11px] text-gray-400 font-medium">📦 Orders</span>
//             </div>
//             <div className="flex flex-col items-center py-4 gap-0.5">
//               <span className="text-lg font-black text-gray-900">
//                 {shop.deliverySettings?.deliveryEnabled ? '✓' : '✗'}
//               </span>
//               <span className="text-[11px] text-gray-400 font-medium">🚚 Delivery</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── ANNOUNCEMENT ── */}
//       {shop.homePage?.announcement && (
//         <div className="mx-3 mt-3">
//           <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-start gap-3">
//             <span className="text-base flex-shrink-0 mt-0.5">📢</span>
//             <p className="text-xs text-amber-800 font-medium leading-relaxed">
//               {shop.homePage.announcement}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ── OFFERS ── */}
//       {shop.homePage?.offers?.length > 0 && (
//         <div className="mt-3 px-3">
//           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
//             Offers
//           </h3>
//           <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">
//             {shop.homePage.offers.map((offer, i) => (
//               <div
//                 key={i}
//                 className="flex-shrink-0 bg-white border border-green-100 rounded-2xl p-4 min-w-[180px] shadow-sm"
//               >
//                 <div className="text-xs font-bold text-green-700 mb-1">🎉 {offer.title}</div>
//                 <div className="text-xs text-gray-500 leading-snug">{offer.description}</div>
//                 {offer.discount && (
//                   <div className="text-2xl font-black text-green-600 mt-2">
//                     {offer.discount}
//                     <span className="text-sm font-bold">% OFF</span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── CATEGORY FILTER ── */}
//       <div className="mt-4 px-3">
//         <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
//                 activeCategory === cat
//                   ? 'bg-gray-900 text-white shadow-sm'
//                   : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300'
//               }`}
//             >
//               {cat === 'all' ? 'All Products' : cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── PRODUCTS ── */}
//       <div className="px-3 pt-4">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
//             <div className="text-5xl mb-4">📦</div>
//             <p className="text-gray-800 font-bold">Koi product nahi mila</p>
//             <p className="text-gray-400 text-sm mt-1">Is category mein abhi kuch nahi hai</p>
//           </div>
//         ) : (
//           <>
//             <div className="flex items-center justify-between mb-3 px-1">
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
//                 {filteredProducts.length} Products
//               </p>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               {filteredProducts.map(product => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* ── FLOATING CART ── */}
//       {cartCount > 0 && (
//         <div className="fixed bottom-20 left-4 right-4 z-40">
//           <Link
//             href="/cart"
//             className="flex items-center justify-between bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl active:scale-[0.98] transition-all"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
//                 <span className="text-base">🛒</span>
//               </div>
//               <div>
//                 <p className="font-bold text-sm leading-none">{cartCount} items</p>
//                 <p className="text-white/50 text-[11px] mt-0.5">Cart mein hai</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-1 bg-white/10 px-4 py-2 rounded-xl">
//               <span className="font-bold text-sm">View Cart</span>
//               <span>→</span>
//             </div>
//           </Link>
//         </div>
//       )}

//       <BottomNav />
//     </div>
//   );
// }








// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { getShopBySlug } from '@/services/shopService';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import ProductCard from '@/components/shop/ProductCard';
// import BottomNav from '@/components/common/BottomNav';
// import API from '@/services/api';
// import toast from 'react-hot-toast';

// export default function ShopPage() {
//   const { slug } = useParams();
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();
//   const { items } = useCart();

//   const [shop, setShop] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [favLoading, setFavLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => { loadShop(); }, [slug]);

//   const loadShop = async () => {
//     try {
//       setLoading(true);
//       const data = await getShopBySlug(slug);
//       setShop(data.shop);
//       setProducts(data.products);
//     } catch {
//       toast.error('Shop nahi mili!');
//       router.push('/feed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleFavourite = async () => {
//     if (!isAuthenticated) { router.push('/auth/login'); return; }
//     setFavLoading(true);
//     try {
//       const res = await API.post(`/user/favourite/${shop._id}`);
//       setIsFavourite(res.data.isFavourite);
//       toast.success(res.data.isFavourite ? 'Wishlist mein add hua!' : 'Wishlist se hata diya');
//     } catch { toast.error('Error aaya!'); }
//     finally { setFavLoading(false); }
//   };

//   const categories = ['all', ...new Set(products.map(p => p.category))];
//   const filteredProducts = products.filter(p => {
//     const matchCat = activeCategory === 'all' || p.category === activeCategory;
//     const matchSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchCat && matchSearch;
//   });
//   const cartCount = items?.length || 0;

//   const categoryEmoji = {
//     kirana: '🛒', dairy: '🥛', fruits: '🍎',
//     food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
//   };

//   if (loading) {
//     return (
//       <div style={{ minHeight: '100vh', background: '#f1f3f6' }}>
//         <div style={{ background: '#2874f0', height: '56px' }} />
//         <div style={{ height: '200px', background: '#e0e0e0', animation: 'pulse 1.5s infinite' }} />
//         <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
//           {[1,2,3,4].map(i => (
//             <div key={i} style={{ height: '220px', background: '#fff', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!shop) return null;

//   return (
//     <div style={{ minHeight: '100vh', background: '#f1f3f6', paddingBottom: '80px', fontFamily: 'sans-serif' }}>

//       {/* ── TOP NAV BAR (Flipkart/Amazon style) ── */}
//       <div style={{
//         position: 'sticky', top: 0, zIndex: 50,
//         background: '#2874f0',
//         padding: '10px 16px',
//         display: 'flex', alignItems: 'center', gap: '12px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
//       }}>
//         <button onClick={() => router.back()}
//           style={{ color: 'white', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '0', lineHeight: 1 }}>
//           ←
//         </button>

//         {/* Search bar */}
//         <div style={{
//           flex: 1, background: 'white', borderRadius: '4px',
//           display: 'flex', alignItems: 'center', padding: '8px 12px', gap: '8px',
//         }}>
//           <span style={{ fontSize: '16px', color: '#888' }}>🔍</span>
//           <input
//             type="text"
//             placeholder={`Search in ${shop.shopName}...`}
//             value={searchQuery}
//             onChange={e => setSearchQuery(e.target.value)}
//             style={{
//               border: 'none', outline: 'none', flex: 1,
//               fontSize: '14px', color: '#333', background: 'transparent',
//             }}
//           />
//         </div>

//         {/* Cart */}
//         <Link href="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
//           <span style={{ fontSize: '24px' }}>🛒</span>
//           {cartCount > 0 && (
//             <span style={{
//               position: 'absolute', top: '-6px', right: '-6px',
//               background: '#ff6161', color: 'white',
//               fontSize: '10px', fontWeight: 'bold',
//               width: '18px', height: '18px', borderRadius: '50%',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>{cartCount}</span>
//           )}
//         </Link>

//         {/* Wishlist */}
//         <button onClick={toggleFavourite} disabled={favLoading}
//           style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', padding: 0 }}>
//           {isFavourite ? '❤️' : '🤍'}
//         </button>
//       </div>

//       {/* ── BANNER ── */}
//       <div style={{ width: '100%', position: 'relative' }}>
//         {shop.banner ? (
//           <img src={shop.banner} alt={shop.shopName}
//             style={{ width: '100%', height: 'auto', display: 'block' }} />
//         ) : (
//           <div style={{
//             width: '100%', height: '180px',
//             background: `linear-gradient(135deg, ${shop.themeColor}cc, ${shop.themeColor})`,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             <span style={{ fontSize: '80px', opacity: 0.3 }}>{categoryEmoji[shop.category] || '🏪'}</span>
//           </div>
//         )}
//       </div>

//       {/* ── SHOP INFO CARD ── */}
//       <div style={{
//         background: 'white', margin: '0 0 8px 0',
//         padding: '16px', borderBottom: '1px solid #e0e0e0',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
//           {/* Logo */}
//           <div style={{
//             width: '64px', height: '64px', borderRadius: '8px',
//             overflow: 'hidden', border: '1px solid #e0e0e0',
//             background: '#f5f5f5', flexShrink: 0,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>
//             {shop.logo
//               ? <img src={shop.logo} alt={shop.shopName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//               : <span style={{ fontSize: '28px' }}>{categoryEmoji[shop.category] || '🏪'}</span>
//             }
//           </div>

//           <div style={{ flex: 1 }}>
//             <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#212121', margin: '0 0 4px' }}>
//               {shop.shopName}
//             </h1>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
//               {/* Rating badge */}
//               {shop.rating > 0 && (
//                 <span style={{
//                   background: '#388e3c', color: 'white',
//                   fontSize: '12px', fontWeight: '700',
//                   padding: '2px 8px', borderRadius: '4px',
//                   display: 'flex', alignItems: 'center', gap: '3px',
//                 }}>
//                   {shop.rating.toFixed(1)} ★
//                 </span>
//               )}
//               <span style={{ fontSize: '12px', color: '#878787' }}>
//                 {shop.totalOrders} orders
//               </span>
//               <span style={{
//                 fontSize: '12px', fontWeight: '600',
//                 color: shop.isOpen ? '#388e3c' : '#d32f2f',
//                 background: shop.isOpen ? '#e8f5e9' : '#ffebee',
//                 padding: '2px 8px', borderRadius: '12px',
//               }}>
//                 {shop.isOpen ? '● Open' : '● Closed'}
//               </span>
//             </div>
//             {shop.description && (
//               <p style={{ fontSize: '13px', color: '#878787', margin: 0, lineHeight: 1.4 }}>
//                 {shop.description}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Delivery / offers strip */}
//         <div style={{
//           marginTop: '12px', paddingTop: '12px',
//           borderTop: '1px dashed #e0e0e0',
//           display: 'flex', gap: '16px', flexWrap: 'wrap',
//         }}>
//           {shop.deliverySettings?.deliveryEnabled && (
//             <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//               <span style={{ fontSize: '16px' }}>🚚</span>
//               <div>
//                 <div style={{ fontSize: '12px', fontWeight: '700', color: '#212121' }}>Free Delivery</div>
//                 <div style={{ fontSize: '11px', color: '#878787' }}>on ₹100+ orders</div>
//               </div>
//             </div>
//           )}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <span style={{ fontSize: '16px' }}>↩️</span>
//             <div>
//               <div style={{ fontSize: '12px', fontWeight: '700', color: '#212121' }}>Easy Returns</div>
//               <div style={{ fontSize: '11px', color: '#878787' }}>Hassle free</div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//             <span style={{ fontSize: '16px' }}>✅</span>
//             <div>
//               <div style={{ fontSize: '12px', fontWeight: '700', color: '#212121' }}>Verified Shop</div>
//               <div style={{ fontSize: '11px', color: '#878787' }}>Trusted seller</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── ANNOUNCEMENT ── */}
//       {shop.homePage?.announcement && (
//         <div style={{
//           background: '#fff8e1', borderLeft: '4px solid #ffc107',
//           margin: '0 0 8px', padding: '12px 16px',
//           display: 'flex', gap: '10px', alignItems: 'flex-start',
//         }}>
//           <span style={{ fontSize: '16px', flexShrink: 0 }}>📢</span>
//           <p style={{ fontSize: '13px', color: '#5d4037', margin: 0, fontWeight: '500' }}>
//             {shop.homePage.announcement}
//           </p>
//         </div>
//       )}

//       {/* ── OFFERS ── */}
//       {shop.homePage?.offers?.length > 0 && (
//         <div style={{ background: 'white', marginBottom: '8px', padding: '14px 16px' }}>
//           <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#212121', margin: '0 0 12px' }}>
//             🔥 Special Offers
//           </h2>
//           <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
//             {shop.homePage.offers.map((offer, i) => (
//               <div key={i} style={{
//                 flexShrink: 0, minWidth: '160px',
//                 background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
//                 borderRadius: '8px', padding: '12px',
//               }}>
//                 <div style={{ fontSize: '12px', fontWeight: '800', color: 'white' }}>{offer.title}</div>
//                 <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>{offer.description}</div>
//                 {offer.discount && (
//                   <div style={{ fontSize: '22px', fontWeight: '900', color: 'white', marginTop: '6px' }}>
//                     {offer.discount}% OFF
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── CATEGORY FILTER ── */}
//       <div style={{
//         background: 'white', marginBottom: '8px',
//         padding: '12px 16px', borderBottom: '1px solid #e0e0e0',
//       }}>
//         <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
//           {categories.map(cat => (
//             <button key={cat} onClick={() => setActiveCategory(cat)}
//               style={{
//                 flexShrink: 0, padding: '7px 16px', borderRadius: '20px',
//                 fontSize: '13px', fontWeight: '600', cursor: 'pointer',
//                 border: activeCategory === cat ? '2px solid #2874f0' : '1px solid #e0e0e0',
//                 background: activeCategory === cat ? '#e8f0fe' : 'white',
//                 color: activeCategory === cat ? '#2874f0' : '#555',
//                 transition: 'all 0.15s',
//               }}>
//               {cat === 'all' ? 'All' : cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── PRODUCTS ── */}
//       <div style={{ padding: '0 8px' }}>
//         {filteredProducts.length === 0 ? (
//           <div style={{
//             background: 'white', borderRadius: '8px', margin: '8px 0',
//             padding: '48px 16px', textAlign: 'center',
//           }}>
//             <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
//             <p style={{ fontSize: '16px', fontWeight: '700', color: '#212121', margin: '0 0 4px' }}>
//               Koi product nahi mila
//             </p>
//             <p style={{ fontSize: '13px', color: '#878787', margin: 0 }}>
//               Is category mein abhi kuch nahi hai
//             </p>
//           </div>
//         ) : (
//           <>
//             <div style={{
//               display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//               padding: '10px 8px 8px',
//             }}>
//               <span style={{ fontSize: '13px', color: '#878787' }}>
//                 {filteredProducts.length} products found
//               </span>
//             </div>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
//               {filteredProducts.map(product => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>

//       {/* ── FLOATING CART BAR ── */}
//       {cartCount > 0 && (
//         <div style={{
//           position: 'fixed', bottom: '64px', left: 0, right: 0, zIndex: 40,
//           padding: '0 16px',
//         }}>
//           <Link href="/cart" style={{ textDecoration: 'none' }}>
//             <div style={{
//               background: '#2874f0', borderRadius: '8px',
//               padding: '14px 20px',
//               display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//               boxShadow: '0 4px 20px rgba(40,116,240,0.4)',
//             }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <span style={{
//                   background: 'rgba(255,255,255,0.2)', borderRadius: '6px',
//                   padding: '4px 10px', fontSize: '13px', fontWeight: '700', color: 'white',
//                 }}>
//                   {cartCount} items
//                 </span>
//                 <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>Cart mein hai</span>
//               </div>
//               <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>
//                 View Cart →
//               </span>
//             </div>
//           </Link>
//         </div>
//       )}

//       <BottomNav />
//     </div>
//   );
// }



















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
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartBar, setShowCartBar] = useState(false); // ✅ naya

  useEffect(() => { loadShop(); }, [slug]);

  // ✅ cartCount change hone pe 3 second ke liye bar dikhao
  useEffect(() => {
    const cartCount = items?.length || 0;
    if (cartCount > 0) {
      setShowCartBar(true);
      const timer = setTimeout(() => setShowCartBar(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowCartBar(false);
    }
  }, [items?.length]);

  const loadShop = async () => {
    try {
      setLoading(true);
      const data = await getShopBySlug(slug);
      setShop(data.shop);
      setProducts(data.products);
    } catch {
      toast.error('Shop nahi mili!');
      router.push('/feed');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = async () => {
    if (!isAuthenticated) { router.push('/auth/login'); return; }
    setFavLoading(true);
    try {
      const res = await API.post(`/user/favourite/${shop._id}`);
      setIsFavourite(res.data.isFavourite);
      toast.success(res.data.isFavourite ? 'Wishlist mein add hua!' : 'Wishlist se hata diya');
    } catch { toast.error('Error aaya!'); }
    finally { setFavLoading(false); }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
  const cartCount = items?.length || 0;

  const categoryEmoji = {
    kirana: '🛒', dairy: '🥛', fruits: '🍎',
    food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f3f6' }}>
        <div style={{ background: '#2874f0', height: '56px' }} />
        <div style={{ height: '200px', background: '#e0e0e0', animation: 'pulse 1.5s infinite' }} />
        <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ height: '220px', background: '#fff', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
          ))}
        </div>
      </div>
    );
  }

  if (!shop) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#f1f3f6', paddingBottom: '80px', fontFamily: 'sans-serif' }}>

      {/* ── TOP NAV BAR ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#2874f0',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <button onClick={() => router.back()}
          style={{ color: 'white', background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '0', lineHeight: 1 }}>
          ←
        </button>

        {/* Search bar */}
        <div style={{
          flex: 1, background: 'white', borderRadius: '4px',
          display: 'flex', alignItems: 'center', padding: '8px 12px', gap: '8px',
        }}>
          <span style={{ fontSize: '16px', color: '#888' }}>🔍</span>
          <input
            type="text"
            placeholder={`Search in ${shop.shopName}...`}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              border: 'none', outline: 'none', flex: 1,
              fontSize: '14px', color: '#333', background: 'transparent',
            }}
          />
        </div>

        {/* Cart */}
        <Link href="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
          <span style={{ fontSize: '24px' }}>🛒</span>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: '-6px', right: '-6px',
              background: '#ff6161', color: 'white',
              fontSize: '10px', fontWeight: 'bold',
              width: '18px', height: '18px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{cartCount}</span>
          )}
        </Link>

        {/* Wishlist */}
        <button onClick={toggleFavourite} disabled={favLoading}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', padding: 0 }}>
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* ── BANNER ── */}
      <div style={{ width: '100%', position: 'relative' }}>
        {shop.banner ? (
          <img src={shop.banner} alt={shop.shopName}
            style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{
            width: '100%', height: '180px',
            background: `linear-gradient(135deg, ${shop.themeColor}cc, ${shop.themeColor})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '80px', opacity: 0.3 }}>{categoryEmoji[shop.category] || '🏪'}</span>
          </div>
        )}
      </div>

      {/* ── SHOP INFO CARD ── */}
      <div style={{
        background: 'white', margin: '0 0 8px 0',
        padding: '16px', borderBottom: '1px solid #e0e0e0',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          {/* Logo */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '8px',
            overflow: 'hidden', border: '1px solid #e0e0e0',
            background: '#f5f5f5', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {shop.logo
              ? <img src={shop.logo} alt={shop.shopName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: '28px' }}>{categoryEmoji[shop.category] || '🏪'}</span>
            }
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#212121', margin: '0 0 4px' }}>
              {shop.shopName}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
              {shop.rating > 0 && (
                <span style={{
                  background: '#388e3c', color: 'white',
                  fontSize: '12px', fontWeight: '700',
                  padding: '2px 8px', borderRadius: '4px',
                  display: 'flex', alignItems: 'center', gap: '3px',
                }}>
                  {shop.rating.toFixed(1)} ★
                </span>
              )}
              <span style={{ fontSize: '12px', color: '#878787' }}>
                {shop.totalOrders} orders
              </span>
              <span style={{
                fontSize: '12px', fontWeight: '600',
                color: shop.isOpen ? '#388e3c' : '#d32f2f',
                background: shop.isOpen ? '#e8f5e9' : '#ffebee',
                padding: '2px 8px', borderRadius: '12px',
              }}>
                {shop.isOpen ? '● Open' : '● Closed'}
              </span>
            </div>
            {shop.description && (
              <p style={{ fontSize: '13px', color: '#878787', margin: 0, lineHeight: 1.4 }}>
                {shop.description}
              </p>
            )}
          </div>
        </div>

        {/* Delivery / offers strip */}
        <div style={{
          marginTop: '12px', paddingTop: '12px',
          borderTop: '1px dashed #e0e0e0',
          display: 'flex', gap: '16px', flexWrap: 'wrap',
        }}>
          {shop.deliverySettings?.deliveryEnabled && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>🚚</span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#212121' }}>Free Delivery</div>
                <div style={{ fontSize: '11px', color: '#878787' }}>on ₹100+ orders</div>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '16px' }}>↩️</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#212121' }}>Easy Returns</div>
              <div style={{ fontSize: '11px', color: '#878787' }}>Hassle free</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '16px' }}>✅</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#212121' }}>Verified Shop</div>
              <div style={{ fontSize: '11px', color: '#878787' }}>Trusted seller</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ANNOUNCEMENT ── */}
      {shop.homePage?.announcement && (
        <div style={{
          background: '#fff8e1', borderLeft: '4px solid #ffc107',
          margin: '0 0 8px', padding: '12px 16px',
          display: 'flex', gap: '10px', alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '16px', flexShrink: 0 }}>📢</span>
          <p style={{ fontSize: '13px', color: '#5d4037', margin: 0, fontWeight: '500' }}>
            {shop.homePage.announcement}
          </p>
        </div>
      )}

      {/* ── OFFERS ── */}
      {shop.homePage?.offers?.length > 0 && (
        <div style={{ background: 'white', marginBottom: '8px', padding: '14px 16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#212121', margin: '0 0 12px' }}>
            🔥 Special Offers
          </h2>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {shop.homePage.offers.map((offer, i) => (
              <div key={i} style={{
                flexShrink: 0, minWidth: '160px',
                background: 'linear-gradient(135deg, #ff6b35, #f7c59f)',
                borderRadius: '8px', padding: '12px',
              }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: 'white' }}>{offer.title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>{offer.description}</div>
                {offer.discount && (
                  <div style={{ fontSize: '22px', fontWeight: '900', color: 'white', marginTop: '6px' }}>
                    {offer.discount}% OFF
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CATEGORY FILTER ── */}
      <div style={{
        background: 'white', marginBottom: '8px',
        padding: '12px 16px', borderBottom: '1px solid #e0e0e0',
      }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0, padding: '7px 16px', borderRadius: '20px',
                fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                border: activeCategory === cat ? '2px solid #2874f0' : '1px solid #e0e0e0',
                background: activeCategory === cat ? '#e8f0fe' : 'white',
                color: activeCategory === cat ? '#2874f0' : '#555',
                transition: 'all 0.15s',
              }}>
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div style={{ padding: '0 8px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{
            background: 'white', borderRadius: '8px', margin: '8px 0',
            padding: '48px 16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#212121', margin: '0 0 4px' }}>
              Koi product nahi mila
            </p>
            <p style={{ fontSize: '13px', color: '#878787', margin: 0 }}>
              Is category mein abhi kuch nahi hai
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 8px 8px',
            }}>
              <span style={{ fontSize: '13px', color: '#878787' }}>
                {filteredProducts.length} products found
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── FLOATING CART BAR — 3 second mein gayab ── */}
      {showCartBar && cartCount > 0 && (  // ✅ showCartBar condition
        <div style={{
          position: 'fixed', bottom: '64px', left: 0, right: 0, zIndex: 40,
          padding: '0 16px',
          animation: 'fadeIn 0.3s ease',
        }}>
          <Link href="/cart" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#2874f0', borderRadius: '8px',
              padding: '14px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(40,116,240,0.4)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  background: 'rgba(255,255,255,0.2)', borderRadius: '6px',
                  padding: '4px 10px', fontSize: '13px', fontWeight: '700', color: 'white',
                }}>
                  {cartCount} items
                </span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>Cart mein hai</span>
              </div>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>
                View Cart →
              </span>
            </div>
          </Link>
        </div>
      )}

      <BottomNav />
    </div>
  );
}