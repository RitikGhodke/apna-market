// 'use client';

// import Link from 'next/link';
// import { formatPrice } from '@/utils/helpers';

// export default function ShopCard({ shop }) {
//   const categoryColors = {
//     kirana: 'bg-green-100 text-green-700',
//     dairy: 'bg-blue-100 text-blue-700',
//     fruits: 'bg-red-100 text-red-700',
//     food: 'bg-orange-100 text-orange-700',
//     medical: 'bg-purple-100 text-purple-700',
//     fashion: 'bg-pink-100 text-pink-700',
//     electronics: 'bg-cyan-100 text-cyan-700',
//   };

//   const categoryEmoji = {
//     kirana: '🛒',
//     dairy: '🥛',
//     fruits: '🍎',
//     food: '🍱',
//     medical: '💊',
//     fashion: '👗',
//     electronics: '📱',
//   };

//   return (
//     <Link href={`/shop/${shop.slug}`}
//       className="block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-95">

//       {/* Banner */}
//       <div className="h-28 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
//         {shop.banner ? (
//           <img src={shop.banner} alt={shop.shopName}
//             className="w-full h-full object-cover" />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center"
//             style={{ background: `linear-gradient(135deg, ${shop.themeColor}22, ${shop.themeColor}44)` }}>
//             <span className="text-5xl opacity-50">
//               {categoryEmoji[shop.category] || '🏪'}
//             </span>
//           </div>
//         )}

//         {/* Open/Closed badge */}
//         <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold ${
//           shop.isOpen ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
//         }`}>
//           {shop.isOpen ? 'Open' : 'Closed'}
//         </div>
//       </div>

//       {/* Info */}
//       <div className="p-3">
//         <div className="flex items-start gap-2">
//           {/* Logo */}
//           <div className="w-10 h-10 rounded-xl border-2 border-white shadow-sm overflow-hidden flex-shrink-0 -mt-6 bg-white">
//             {shop.logo ? (
//               <img src={shop.logo} alt={shop.shopName} className="w-full h-full object-cover" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gray-50">
//                 <span className="text-lg">{categoryEmoji[shop.category] || '🏪'}</span>
//               </div>
//             )}
//           </div>

//           <div className="flex-1 min-w-0">
//             <h3 className="font-bold text-gray-900 text-sm truncate">{shop.shopName}</h3>
//             <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
//               <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[shop.category] || 'bg-gray-100 text-gray-600'}`}>
//                 {categoryEmoji[shop.category]} {shop.category}
//               </span>
//               {shop.distance !== null && shop.distance !== undefined && (
//                 <span className="text-xs text-gray-400">
//                   📍 {shop.distance} km
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Rating & Orders */}
//         <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
//           <div className="flex items-center gap-1">
//             <span className="text-yellow-400 text-xs">⭐</span>
//             <span className="text-xs font-semibold text-gray-700">
//               {shop.rating > 0 ? shop.rating.toFixed(1) : 'New'}
//             </span>
//           </div>
//           <span className="text-xs text-gray-400">
//             {shop.totalOrders} orders
//           </span>
//           <span className="text-xs text-green-600 font-medium">
//             {shop.deliverySettings?.deliveryEnabled ? '🚚 Delivery' : '🏪 Pickup'}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }







// 'use client';
// import Link from 'next/link';

// const categoryColors = {
//   kirana:      { bg: 'from-green-100 to-green-200',   tag: 'bg-green-100 text-green-800',   text: '#166534' },
//   dairy:       { bg: 'from-blue-100 to-blue-200',     tag: 'bg-blue-100 text-blue-800',     text: '#1e40af' },
//   fruits:      { bg: 'from-red-100 to-red-200',       tag: 'bg-red-100 text-red-800',       text: '#991b1b' },
//   food:        { bg: 'from-orange-100 to-orange-200', tag: 'bg-orange-100 text-orange-800', text: '#9a3412' },
//   medical:     { bg: 'from-purple-100 to-purple-200', tag: 'bg-purple-100 text-purple-800', text: '#581c87' },
//   fashion:     { bg: 'from-pink-100 to-pink-200',     tag: 'bg-pink-100 text-pink-800',     text: '#9d174d' },
//   electronics: { bg: 'from-cyan-100 to-cyan-200',     tag: 'bg-cyan-100 text-cyan-800',     text: '#155e75' },
// };

// const categoryEmoji = {
//   kirana: '🛒', dairy: '🥛', fruits: '🍎',
//   food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
// };

// export default function ShopCard({ shop }) {
//   const theme = categoryColors[shop.category] || { bg: 'from-gray-100 to-gray-200', tag: 'bg-gray-100 text-gray-700' };
//   const emoji = categoryEmoji[shop.category] || '🏪';

//   return (
//     <Link href={`/shop/${shop.slug}`}
//       className="block bg-white rounded-2xl border border-gray-100 overflow-hidden 
//                  hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95">

//       {/* Banner */}
//       <div className={`h-20 bg-gradient-to-br ${theme.bg} relative flex items-center justify-center`}>
//         {shop.banner ? (
//           <img src={shop.banner} alt={shop.shopName} className="w-full h-full object-cover" />
//         ) : (
//           <span className="text-4xl opacity-60">{emoji}</span>
//         )}

//         {/* Open/Closed */}
//         <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${
//           shop.isOpen ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
//         }`}>
//           {shop.isOpen ? 'Open' : 'Closed'}
//         </span>

//         {/* Featured ad badge */}
//         {shop.isFeatured && (
//           <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
//             Ad
//           </span>
//         )}
//       </div>

//       {/* Body */}
//       <div className="p-2.5">
//         <div className="flex items-start gap-2">
//           {/* Logo */}
//           <div className="w-9 h-9 rounded-xl border-2 border-white shadow-sm bg-white 
//                           flex items-center justify-center flex-shrink-0 -mt-5 overflow-hidden">
//             {shop.logo
//               ? <img src={shop.logo} alt={shop.shopName} className="w-full h-full object-cover" />
//               : <span className="text-base">{emoji}</span>}
//           </div>

//           <div className="flex-1 min-w-0 mt-0.5">
//             <h3 className="text-xs font-bold text-gray-900 truncate leading-tight">{shop.shopName}</h3>
//             <div className="flex items-center gap-1.5 mt-1 flex-wrap">
//               <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold ${theme.tag}`}>
//                 {emoji} {shop.category}
//               </span>
//               {shop.distance != null && (
//                 <span className="text-[9px] text-gray-400">📍 {shop.distance} km</span>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-50">
//           <div className="flex items-center gap-0.5">
//             <span className="text-yellow-400 text-[10px]">★</span>
//             <span className="text-[10px] font-semibold text-gray-700">
//               {shop.rating > 0 ? shop.rating.toFixed(1) : 'New'}
//             </span>
//           </div>
//           <span className="text-[9px] text-gray-400">{shop.totalOrders} orders</span>
//           <span className={`text-[9px] font-semibold ${
//             shop.deliverySettings?.deliveryEnabled ? 'text-green-600' : 'text-gray-500'
//           }`}>
//             {shop.deliverySettings?.deliveryEnabled ? '🚚 Del' : '🏪 Pickup'}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }




// 'use client';
// import Link from 'next/link';

// const categoryTheme = {
//   kirana:      { grad: 'from-green-400 to-emerald-500',   light: '#f0fdf4', text: '#166534', soft: '#86efac' },
//   dairy:       { grad: 'from-blue-400 to-cyan-500',       light: '#eff6ff', text: '#1e40af', soft: '#93c5fd' },
//   fruits:      { grad: 'from-red-400 to-orange-500',      light: '#fff7ed', text: '#9a3412', soft: '#fdba74' },
//   food:        { grad: 'from-orange-400 to-yellow-500',   light: '#fffbeb', text: '#92400e', soft: '#fcd34d' },
//   medical:     { grad: 'from-purple-400 to-fuchsia-500',  light: '#faf5ff', text: '#581c87', soft: '#c4b5fd' },
//   fashion:     { grad: 'from-pink-400 to-rose-500',       light: '#fdf2f8', text: '#9d174d', soft: '#f9a8d4' },
//   electronics: { grad: 'from-cyan-400 to-blue-500',       light: '#ecfeff', text: '#155e75', soft: '#67e8f9' },
// };

// const categoryEmoji = {
//   kirana: '🛒', dairy: '🥛', fruits: '🍎',
//   food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
// };

// export default function ShopCard({ shop }) {
//   const theme = categoryTheme[shop.category] || {
//     grad: 'from-gray-400 to-gray-500',
//     light: '#f9fafb', text: '#374151', soft: '#d1d5db'
//   };
//   const emoji = categoryEmoji[shop.category] || '🏪';
//   const topProducts = shop.products?.slice(0, 2) || [];

//   return (
//     <Link href={`/shop/${shop.slug}`}
//       className="block bg-white rounded-2xl border border-gray-100 overflow-hidden
//                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 active:scale-95">

//       {/* Banner */}
//       <div className={`bg-gradient-to-br ${theme.grad} relative`}>
//         {shop.banner ? (
//           <img
//             src={shop.banner}
//             alt={shop.shopName}
//             style={{ width: '100%', height: 'auto', display: 'block' }}
//           />
//         ) : (
//           <div style={{ height: '120px' }} className="flex items-center justify-center">
//             <span className="text-6xl opacity-20">{emoji}</span>
//           </div>
//         )}

//         {/* Dark overlay */}
//         <div className="absolute inset-0 bg-black/10 pointer-events-none" />

//         {/* Open/Closed badge */}
//         <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full z-10 ${
//           shop.isOpen ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
//         }`}>
//           {shop.isOpen ? '● Open' : '● Closed'}
//         </span>

//         {/* Featured badge */}
//         {shop.isFeatured && (
//           <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900 z-10">
//             ⭐ Featured
//           </span>
//         )}

//         {/* Logo — floating */}
//         <div className="absolute z-10"
//           style={{
//             bottom: '-18px',
//             left: '12px',
//             width: '40px',
//             height: '40px',
//             borderRadius: '12px',
//             border: '3px solid white',
//             background: 'white',
//             overflow: 'hidden',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           }}>
//           {shop.logo
//             ? <img src={shop.logo} alt={shop.shopName}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//             : <span style={{ fontSize: '18px' }}>{emoji}</span>
//           }
//         </div>
//       </div>

//       {/* Body */}
//       <div style={{ paddingTop: '26px' }} className="px-3 pb-3">

//         {/* Shop name */}
//         <div className="font-black text-gray-900 text-xs truncate">{shop.shopName}</div>

//         {/* Category + Distance */}
//         <div className="flex items-center gap-1.5 mt-1 mb-2">
//           <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
//             style={{ background: theme.light, color: theme.text }}>
//             {emoji} {shop.category}
//           </span>
//           {shop.distance != null && (
//             <span className="text-[9px] text-gray-400">📍 {shop.distance}km</span>
//           )}
//         </div>

//         {/* Products mini grid */}
//         {topProducts.length > 0 && (
//           <div className="grid grid-cols-2 gap-1.5 mb-2">
//             {topProducts.map((p, i) => (
//               <div key={i} className="rounded-xl overflow-hidden"
//                 style={{ border: `1px solid ${theme.light}` }}>
//                 {/* Product Image */}
//                 <div style={{ width: '100%', overflow: 'hidden', background: '#f3f4f6' }}>
//                   {p.images?.[0] ? (
//                     <img
//                       src={p.images[0]}
//                       alt={p.name}
//                       style={{ width: '100%', height: 'auto', display: 'block' }}
//                     />
//                   ) : (
//                     <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <span style={{ fontSize: '24px', opacity: 0.4 }}>{emoji}</span>
//                     </div>
//                   )}
//                 </div>
//                 {/* Price + Name */}
//                 <div style={{ background: theme.light, padding: '4px 6px', textAlign: 'center' }}>
//                   <div style={{ fontSize: '10px', fontWeight: '900', color: theme.text }}>
//                     ₹{p.price}
//                   </div>
//                   <div style={{
//                     fontSize: '8px', color: theme.soft,
//                     overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
//                   }}>
//                     {p.name}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-2 border-t border-gray-50">
//           <span className="text-[10px] font-bold text-amber-500">
//             {shop.rating > 0 ? `★ ${shop.rating.toFixed(1)}` : '★ New'}
//           </span>
//           <span className="text-[9px] text-gray-400">{shop.totalOrders} orders</span>
//           <span className={`text-[9px] font-bold ${
//             shop.deliverySettings?.deliveryEnabled ? 'text-green-600' : 'text-gray-400'
//           }`}>
//             {shop.deliverySettings?.deliveryEnabled ? '🚚 Del' : '🏪 Pickup'}
//           </span>
//         </div>

//       </div>
//     </Link>
//   );
// }






// 'use client';
// import Link from 'next/link';

// const categoryTheme = {
//   kirana:      { grad: 'from-green-400 to-emerald-500',   light: '#f0fdf4', text: '#166534', soft: '#86efac' },
//   dairy:       { grad: 'from-blue-400 to-cyan-500',       light: '#eff6ff', text: '#1e40af', soft: '#93c5fd' },
//   fruits:      { grad: 'from-red-400 to-orange-500',      light: '#fff7ed', text: '#9a3412', soft: '#fdba74' },
//   food:        { grad: 'from-orange-400 to-yellow-500',   light: '#fffbeb', text: '#92400e', soft: '#fcd34d' },
//   medical:     { grad: 'from-purple-400 to-fuchsia-500',  light: '#faf5ff', text: '#581c87', soft: '#c4b5fd' },
//   fashion:     { grad: 'from-pink-400 to-rose-500',       light: '#fdf2f8', text: '#9d174d', soft: '#f9a8d4' },
//   electronics: { grad: 'from-cyan-400 to-blue-500',       light: '#ecfeff', text: '#155e75', soft: '#67e8f9' },
// };

// const categoryEmoji = {
//   kirana: '🛒', dairy: '🥛', fruits: '🍎',
//   food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
// };

// export default function ShopCard({ shop }) {
//   const theme = categoryTheme[shop.category] || {
//     grad: 'from-gray-400 to-gray-500',
//     light: '#f9fafb', text: '#374151', soft: '#d1d5db'
//   };
//   const emoji = categoryEmoji[shop.category] || '🏪';

//   // Featured products — already populated from backend
//   const featuredProducts = shop.featuredProducts?.slice(0, 2) || shop.products?.filter(p => p.isFeatured).slice(0, 2) || [];
//   // Fallback: agar featured nahi hain to pehle 2 products dikhao
//   const topProducts = featuredProducts.length > 0 ? featuredProducts : (shop.products?.slice(0, 2) || []);

//   return (
//     <Link href={`/shop/${shop.slug}`}
//       className="block bg-white rounded-2xl border border-gray-100 overflow-hidden
//                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 active:scale-95">

//       {/* ── BANNER ── */}
//       <div className={`bg-gradient-to-br ${theme.grad} relative`}>
//         {shop.banner ? (
//           <img src={shop.banner} alt={shop.shopName}
//             style={{ width: '100%', height: 'auto', display: 'block' }} />
//         ) : (
//           <div style={{ height: '120px' }} className="flex items-center justify-center">
//             <span className="text-6xl opacity-20">{emoji}</span>
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/10 pointer-events-none" />

//         {/* Open/Closed badge */}
//         <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full z-10 ${
//           shop.isOpen ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
//         }`}>
//           {shop.isOpen ? '● Open' : '● Closed'}
//         </span>

//         {/* Featured badge */}
//         {shop.isFeatured && (
//           <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900 z-10">
//             ⭐ Featured
//           </span>
//         )}

//         {/* Logo */}
//         <div className="absolute z-10"
//           style={{
//             bottom: '-18px', left: '12px',
//             width: '40px', height: '40px', borderRadius: '12px',
//             border: '3px solid white', background: 'white', overflow: 'hidden',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           }}>
//           {shop.logo
//             ? <img src={shop.logo} alt={shop.shopName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//             : <span style={{ fontSize: '18px' }}>{emoji}</span>
//           }
//         </div>
//       </div>

//       {/* ── BODY ── */}
//       <div style={{ paddingTop: '26px' }} className="px-3 pb-3">

//         {/* Shop name */}
//         <div className="font-black text-gray-900 text-xs truncate">{shop.shopName}</div>

//         {/* Category + Distance */}
//         <div className="flex items-center gap-1.5 mt-1 mb-2">
//           <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
//             style={{ background: theme.light, color: theme.text }}>
//             {emoji} {shop.category}
//           </span>
//           {shop.distance != null && (
//             <span className="text-[9px] text-gray-400">📍 {shop.distance}km</span>
//           )}
//         </div>

//         {/* ── FEATURED PRODUCTS MINI GRID ── */}
//         {topProducts.length > 0 && (
//           <div className="grid grid-cols-2 gap-1.5 mb-2">
//             {topProducts.map((p, i) => (
//               <div key={i} className="rounded-xl overflow-hidden relative"
//                 style={{ border: `1px solid ${theme.light}` }}>

//                 {/* Offer badge — NEW */}
//                 {p.offerPercent > 0 && (
//                   <div className="absolute top-1 left-1 z-10 bg-red-500 text-white text-[7px] font-black px-1 py-0.5 rounded-md">
//                     {p.offerPercent}% OFF
//                   </div>
//                 )}

//                 {/* Product Image */}
//                 <div style={{ width: '100%', overflow: 'hidden', background: '#f3f4f6' }}>
//                   {p.images?.[0] ? (
//                     <img src={p.images[0]} alt={p.name}
//                       style={{ width: '100%', height: 'auto', display: 'block' }} />
//                   ) : (
//                     <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <span style={{ fontSize: '24px', opacity: 0.4 }}>{emoji}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Price + Name */}
//                 <div style={{ background: theme.light, padding: '4px 6px', textAlign: 'center' }}>
//                   {/* Price with offer support */}
//                   {p.offerPrice ? (
//                     <div className="flex items-center justify-center gap-1">
//                       <div style={{ fontSize: '10px', fontWeight: '900', color: '#16a34a' }}>
//                         ₹{p.offerPrice}
//                       </div>
//                       <div style={{ fontSize: '8px', color: theme.soft, textDecoration: 'line-through' }}>
//                         ₹{p.price}
//                       </div>
//                     </div>
//                   ) : (
//                     <div style={{ fontSize: '10px', fontWeight: '900', color: theme.text }}>
//                       ₹{p.price}
//                     </div>
//                   )}
//                   <div style={{
//                     fontSize: '8px', color: theme.soft,
//                     overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
//                   }}>
//                     {p.name}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── FOOTER ── */}
//         <div className="flex items-center justify-between pt-2 border-t border-gray-50">
//           <span className="text-[10px] font-bold text-amber-500">
//             {shop.rating > 0 ? `★ ${shop.rating.toFixed(1)}` : '★ New'}
//           </span>
//           <span className="text-[9px] text-gray-400">{shop.totalOrders} orders</span>
//           <span className={`text-[9px] font-bold ${
//             shop.deliverySettings?.deliveryEnabled ? 'text-green-600' : 'text-gray-400'
//           }`}>
//             {shop.deliverySettings?.deliveryEnabled ? '🚚 Del' : '🏪 Pickup'}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }







// 'use client';
// import Link from 'next/link';

// const categoryTheme = {
//   kirana:      { grad: 'from-green-400 to-emerald-500',   light: '#f0fdf4', text: '#166534', soft: '#86efac' },
//   dairy:       { grad: 'from-blue-400 to-cyan-500',       light: '#eff6ff', text: '#1e40af', soft: '#93c5fd' },
//   fruits:      { grad: 'from-red-400 to-orange-500',      light: '#fff7ed', text: '#9a3412', soft: '#fdba74' },
//   food:        { grad: 'from-orange-400 to-yellow-500',   light: '#fffbeb', text: '#92400e', soft: '#fcd34d' },
//   medical:     { grad: 'from-purple-400 to-fuchsia-500',  light: '#faf5ff', text: '#581c87', soft: '#c4b5fd' },
//   fashion:     { grad: 'from-pink-400 to-rose-500',       light: '#fdf2f8', text: '#9d174d', soft: '#f9a8d4' },
//   electronics: { grad: 'from-cyan-400 to-blue-500',       light: '#ecfeff', text: '#155e75', soft: '#67e8f9' },
// };

// const categoryEmoji = {
//   kirana: '🛒', dairy: '🥛', fruits: '🍎',
//   food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
// };

// export default function ShopCard({ shop }) {
//   const theme = categoryTheme[shop.category] || {
//     grad: 'from-gray-400 to-gray-500',
//     light: '#f9fafb', text: '#374151', soft: '#d1d5db'
//   };
//   const emoji = categoryEmoji[shop.category] || '🏪';

//   // Featured products — already populated from backend
//   const featuredProducts = shop.featuredProducts?.slice(0, 2) || shop.products?.filter(p => p.isFeatured).slice(0, 2) || [];
//   // Fallback: agar featured nahi hain to pehle 2 products dikhao
//   const topProducts = featuredProducts.length > 0 ? featuredProducts : (shop.products?.slice(0, 2) || []);

//   return (
//     <Link href={`/shop/${shop.slug}`}
//       className="block bg-white rounded-2xl border border-gray-100 overflow-hidden
//                  hover:shadow-lg hover:-translate-y-1 transition-all duration-200 active:scale-95">

//       {/* ── BANNER ── */}
//       <div className={`bg-gradient-to-br ${theme.grad} relative`}>
//         {shop.banner ? (
//           <img src={shop.banner} alt={shop.shopName}
//             style={{ width: '100%', height: 'auto', display: 'block' }} />
//         ) : (
//           <div style={{ height: '120px' }} className="flex items-center justify-center">
//             <span className="text-6xl opacity-20">{emoji}</span>
//           </div>
//         )}

//         <div className="absolute inset-0 bg-black/10 pointer-events-none" />

//         {/* Open/Closed badge */}
//         <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full z-10 ${
//           shop.isOpen ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
//         }`}>
//           {shop.isOpen ? '● Open' : '● Closed'}
//         </span>

//         {/* Featured badge */}
//         {shop.isFeatured && (
//           <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900 z-10">
//             ⭐ Featured
//           </span>
//         )}

//         {/* Logo */}
//         <div className="absolute z-10"
//           style={{
//             bottom: '-18px', left: '12px',
//             width: '40px', height: '40px', borderRadius: '12px',
//             border: '3px solid white', background: 'white', overflow: 'hidden',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           }}>
//           {shop.logo
//             ? <img src={shop.logo} alt={shop.shopName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//             : <span style={{ fontSize: '18px' }}>{emoji}</span>
//           }
//         </div>
//       </div>

//       {/* ── BODY ── */}
//       <div style={{ paddingTop: '26px' }} className="px-3 pb-3">

//         {/* Shop name */}
//         <div className="font-black text-gray-900 text-xs truncate">{shop.shopName}</div>

//         {/* Category + Distance */}
//         <div className="flex items-center gap-1.5 mt-1 mb-2">
//           <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
//             style={{ background: theme.light, color: theme.text }}>
//             {emoji} {shop.category}
//           </span>
//           {shop.distance != null && (
//             <span className="text-[9px] text-gray-400">📍 {shop.distance}km</span>
//           )}
//         </div>

//         {/* ── FEATURED PRODUCTS MINI GRID ── */}
//         {topProducts.length > 0 && (
//           <div className="grid grid-cols-2 gap-1.5 mb-2">
//             {topProducts.map((p, i) => (
//               <div key={i} className="rounded-xl overflow-hidden relative"
//                 style={{ border: `1px solid ${theme.light}` }}>

//                 {/* Offer badge — NEW */}
//                 {p.offerPercent > 0 && (
//                   <div className="absolute top-1 left-1 z-10 bg-red-500 text-white text-[7px] font-black px-1 py-0.5 rounded-md">
//                     {p.offerPercent}% OFF
//                   </div>
//                 )}

//                 {/* Product Image */}
//                 <div style={{ width: '100%', overflow: 'hidden', background: '#f3f4f6' }}>
//                   {p.images?.[0] ? (
//                     <img src={p.images[0]} alt={p.name}
//                       style={{ width: '100%', height: 'auto', display: 'block' }} />
//                   ) : (
//                     <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                       <span style={{ fontSize: '24px', opacity: 0.4 }}>{emoji}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Price + Name */}
//                 <div style={{ background: theme.light, padding: '4px 6px', textAlign: 'center' }}>
//                   {/* Price with offer support */}
//                   {p.offerPrice ? (
//                     <div className="flex items-center justify-center gap-1">
//                       <div style={{ fontSize: '10px', fontWeight: '900', color: '#16a34a' }}>
//                         ₹{p.offerPrice}
//                       </div>
//                       <div style={{ fontSize: '8px', color: theme.soft, textDecoration: 'line-through' }}>
//                         ₹{p.price}
//                       </div>
//                     </div>
//                   ) : (
//                     <div style={{ fontSize: '10px', fontWeight: '900', color: theme.text }}>
//                       ₹{p.price}
//                     </div>
//                   )}
//                   <div style={{
//                     fontSize: '8px', color: theme.soft,
//                     overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
//                   }}>
//                     {p.name}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── FOOTER ── */}
//         <div className="flex items-center justify-between pt-2 border-t border-gray-50">
//           <span className="text-[10px] font-bold text-amber-500">
//             {shop.rating > 0 ? `★ ${shop.rating.toFixed(1)}` : '★ New'}
//           </span>
//           <span className="text-[9px] text-gray-400">{shop.totalOrders} orders</span>
//           <span className={`text-[9px] font-bold ${
//             shop.deliverySettings?.deliveryEnabled ? 'text-green-600' : 'text-gray-400'
//           }`}>
//             {shop.deliverySettings?.deliveryEnabled ? '🚚 Del' : '🏪 Pickup'}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// }





// 'use client';
// import Link from 'next/link';

// // ─── Theme Config ────────────────────────────────────────────────────────────
// const categoryTheme = {
//   kirana:      { grad: ['#bbf7d0', '#4ade80'], light: '#f0fdf4', text: '#166534', accent: '#16a34a' },
//   dairy:       { grad: ['#bfdbfe', '#3b82f6'], light: '#eff6ff', text: '#1e40af', accent: '#2563eb' },
//   fruits:      { grad: ['#fed7aa', '#f97316'], light: '#fff7ed', text: '#9a3412', accent: '#ea580c' },
//   food:        { grad: ['#fde68a', '#f59e0b'], light: '#fffbeb', text: '#92400e', accent: '#d97706' },
//   medical:     { grad: ['#e9d5ff', '#a855f7'], light: '#faf5ff', text: '#581c87', accent: '#9333ea' },
//   fashion:     { grad: ['#fbcfe8', '#ec4899'], light: '#fdf2f8', text: '#9d174d', accent: '#db2777' },
//   electronics: { grad: ['#a5f3fc', '#06b6d4'], light: '#ecfeff', text: '#155e75', accent: '#0891b2' },
// };

// const fallbackTheme = {
//   grad: ['#e5e7eb', '#9ca3af'], light: '#f9fafb', text: '#374151', accent: '#6b7280',
// };

// const categoryEmoji = {
//   kirana: '🛒', dairy: '🥛', fruits: '🍎',
//   food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
// };

// // ─── Sub-components ──────────────────────────────────────────────────────────

// function ProductMini({ product, theme, emoji }) {
//   const hasOffer = product.offerPercent > 0 && product.offerPrice;

//   return (
//     <div style={{
//       borderRadius: '14px',
//       overflow: 'hidden',
//       border: '0.5px solid rgba(0,0,0,0.07)',
//       background: '#f9fafb',
//       position: 'relative',
//     }}>
//       {/* Offer badge */}
//       {hasOffer && (
//         <div style={{
//           position: 'absolute', top: 6, left: 6, zIndex: 2,
//           background: '#ef4444', color: '#fff',
//           fontSize: '7px', fontWeight: 800,
//           padding: '2px 5px', borderRadius: '6px',
//           letterSpacing: '0.3px',
//           fontFamily: '"Sora", sans-serif',
//         }}>
//           {product.offerPercent}% OFF
//         </div>
//       )}

//       {/* Image */}
//       <div style={{
//         width: '100%', height: '90px',
//         background: '#f8f8f8', display: 'flex',
//         alignItems: 'center', justifyContent: 'center',
//         overflow: 'hidden',
//       }}>
//         {product.images?.[0] ? (
//           <img
//             src={product.images[0]}
//             alt={product.name}
//             style={{
//               maxWidth: '100%', maxHeight: '100%',
//               objectFit: 'contain', display: 'block',
//             }}
//           />
//         ) : (
//           <span style={{ fontSize: '26px', opacity: 0.4 }}>{emoji}</span>
//         )}
//       </div>

//       {/* Price + Name */}
//       <div style={{ padding: '6px 7px' }}>
//         <div style={{
//           fontSize: '9px', color: '#6b7280',
//           whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//           marginBottom: '2px',
//         }}>
//           {product.name}
//         </div>
//         <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
//           <span style={{
//             fontFamily: '"Sora", sans-serif',
//             fontWeight: 700, fontSize: '12px',
//             color: hasOffer ? '#16a34a' : theme.text,
//           }}>
//             ₹{hasOffer ? product.offerPrice : product.price}
//           </span>
//           {hasOffer && (
//             <span style={{ fontSize: '8px', color: '#9ca3af', textDecoration: 'line-through' }}>
//               ₹{product.price}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main ShopCard ────────────────────────────────────────────────────────────

// export default function ShopCard({ shop }) {
//   const theme = categoryTheme[shop.category] || fallbackTheme;
//   const emoji = categoryEmoji[shop.category] || '🏪';

//   const featuredProducts = shop.featuredProducts?.slice(0, 2) ||
//     shop.products?.filter(p => p.isFeatured).slice(0, 2) || [];
//   const topProducts = featuredProducts.length > 0
//     ? featuredProducts
//     : (shop.products?.slice(0, 2) || []);

//   const bannerGradient = `linear-gradient(135deg, ${theme.grad[0]} 0%, ${theme.grad[1]} 100%)`;

//   return (
//     <Link
//       href={`/shop/${shop.slug}`}
//       style={{ textDecoration: 'none', display: 'block' }}
//     >
//       <div style={{
//         background: '#ffffff',
//         borderRadius: '20px',
//         overflow: 'hidden',
//         border: '0.5px solid rgba(0,0,0,0.07)',
//         cursor: 'pointer',
//         transition: 'transform 0.2s ease',
//         fontFamily: '"DM Sans", -apple-system, sans-serif',
//       }}
//         onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
//         onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
//         onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
//         onMouseUp={e => e.currentTarget.style.transform = 'translateY(-4px)'}
//       >

//         {/* ── BANNER ── */}
//         <div style={{ position: 'relative', height: '110px', overflow: 'hidden', background: '#f3f4f6' }}>

//           {/* Background */}
//           {shop.banner ? (
//             <img
//               src={shop.banner}
//               alt={shop.shopName}
//               style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#f8f8f8' }}
//             />
//           ) : (
//             <div style={{
//               width: '100%', height: '100%',
//               background: bannerGradient,
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//             }}>
//               <span style={{
//                 fontSize: '52px', opacity: 0.18,
//                 position: 'absolute', right: '12px', bottom: '4px',
//               }}>
//                 {emoji}
//               </span>
//             </div>
//           )}

//           {/* Overlay */}
//           <div style={{
//             position: 'absolute', inset: 0,
//             background: 'linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.22))',
//             pointerEvents: 'none',
//           }} />

//           {/* Open / Closed pill */}
//           <span style={{
//             position: 'absolute', top: 10, right: 10, zIndex: 2,
//             fontSize: '9px', fontWeight: 700,
//             fontFamily: '"Sora", sans-serif',
//             padding: '3px 8px', borderRadius: '20px',
//             letterSpacing: '0.3px',
//             background: shop.isOpen ? '#22c55e' : 'rgba(0,0,0,0.45)',
//             color: '#fff',
//           }}>
//             ● {shop.isOpen ? 'Open' : 'Closed'}
//           </span>

//           {/* Featured pill */}
//           {shop.isFeatured && (
//             <span style={{
//               position: 'absolute', top: 10, left: 10, zIndex: 2,
//               fontSize: '9px', fontWeight: 700,
//               fontFamily: '"Sora", sans-serif',
//               padding: '3px 8px', borderRadius: '20px',
//               background: 'rgba(255,210,0,0.92)', color: '#5a3e00',
//               letterSpacing: '0.2px',
//             }}>
//               ★ Featured
//             </span>
//           )}

//           {/* Logo */}
//           <div style={{
//             position: 'absolute', bottom: '-18px', left: '14px', zIndex: 3,
//             width: '42px', height: '42px',
//             borderRadius: '14px',
//             border: '3px solid #ffffff',
//             background: '#ffffff',
//             overflow: 'hidden',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: '20px',
//           }}>
//             {shop.logo ? (
//               <img
//                 src={shop.logo}
//                 alt={shop.shopName}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//               />
//             ) : (
//               <span>{emoji}</span>
//             )}
//           </div>
//         </div>

//         {/* ── BODY ── */}
//         <div style={{ padding: '26px 14px 14px' }}>

//           {/* Shop name */}
//           <div style={{
//             fontFamily: '"Sora", sans-serif',
//             fontWeight: 800, fontSize: '13px',
//             color: '#111827', lineHeight: 1.3,
//             whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//           }}>
//             {shop.shopName}
//           </div>

//           {/* Category + Distance */}
//           <div style={{
//             display: 'flex', alignItems: 'center',
//             gap: '6px', marginTop: '6px', marginBottom: '10px',
//             flexWrap: 'wrap',
//           }}>
//             <span style={{
//               fontSize: '10px', fontWeight: 600,
//               fontFamily: '"Sora", sans-serif',
//               padding: '3px 8px', borderRadius: '20px',
//               background: theme.light, color: theme.text,
//               letterSpacing: '0.1px',
//             }}>
//               {emoji} {shop.category}
//             </span>
//             {shop.distance != null && (
//               <span style={{ fontSize: '10px', color: '#9ca3af' }}>
//                 📍 {shop.distance} km
//               </span>
//             )}
//           </div>

//           {/* Product mini grid */}
//           {topProducts.length > 0 && (
//             <div style={{
//               display: 'grid', gridTemplateColumns: '1fr 1fr',
//               gap: '8px', marginBottom: '12px',
//             }}>
//               {topProducts.map((p, i) => (
//                 <ProductMini key={i} product={p} theme={theme} emoji={emoji} />
//               ))}
//             </div>
//           )}

//           {/* Footer */}
//           <div style={{
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             paddingTop: '10px',
//             borderTop: '0.5px solid rgba(0,0,0,0.06)',
//           }}>
//             <span style={{
//               fontFamily: '"Sora", sans-serif',
//               fontWeight: 700, fontSize: '11px',
//               color: '#f59e0b',
//               display: 'flex', alignItems: 'center', gap: '2px',
//             }}>
//               ★ {shop.rating > 0 ? shop.rating.toFixed(1) : 'New'}
//             </span>

//             <span style={{ fontSize: '9px', color: '#9ca3af' }}>
//               {shop.totalOrders} orders
//             </span>

//             <span style={{
//               fontSize: '9px', fontWeight: 600,
//               fontFamily: '"Sora", sans-serif',
//               color: shop.deliverySettings?.deliveryEnabled ? '#16a34a' : '#9ca3af',
//             }}>
//               {shop.deliverySettings?.deliveryEnabled ? '🚚 Del' : '🏪 Pickup'}
//             </span>
//           </div>
//         </div>

//       </div>
//     </Link>
//   );
// }






'use client';
import Link from 'next/link';

// ─── Theme Config ────────────────────────────────────────────────────────────
const categoryTheme = {
  kirana:      { grad: ['#bbf7d0', '#4ade80'], light: '#f0fdf4', text: '#166534', accent: '#16a34a' },
  dairy:       { grad: ['#bfdbfe', '#3b82f6'], light: '#eff6ff', text: '#1e40af', accent: '#2563eb' },
  fruits:      { grad: ['#fed7aa', '#f97316'], light: '#fff7ed', text: '#9a3412', accent: '#ea580c' },
  food:        { grad: ['#fde68a', '#f59e0b'], light: '#fffbeb', text: '#92400e', accent: '#d97706' },
  medical:     { grad: ['#e9d5ff', '#a855f7'], light: '#faf5ff', text: '#581c87', accent: '#9333ea' },
  fashion:     { grad: ['#fbcfe8', '#ec4899'], light: '#fdf2f8', text: '#9d174d', accent: '#db2777' },
  electronics: { grad: ['#a5f3fc', '#06b6d4'], light: '#ecfeff', text: '#155e75', accent: '#0891b2' },
};

const fallbackTheme = {
  grad: ['#e5e7eb', '#9ca3af'], light: '#f9fafb', text: '#374151', accent: '#6b7280',
};

const categoryEmoji = {
  kirana: '🛒', dairy: '🥛', fruits: '🍎',
  food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProductMini({ product, theme, emoji }) {
  const hasOffer = product.offerPercent > 0 && product.offerPrice;

  return (
    <div style={{
      borderRadius: '14px',
      overflow: 'hidden',
      border: '0.5px solid rgba(0,0,0,0.07)',
      background: '#f9fafb',
      position: 'relative',
    }}>
      {/* Offer badge */}
      {hasOffer && (
        <div style={{
          position: 'absolute', top: 6, left: 6, zIndex: 2,
          background: '#ef4444', color: '#fff',
          fontSize: '7px', fontWeight: 800,
          padding: '2px 5px', borderRadius: '6px',
          letterSpacing: '0.3px',
          fontFamily: '"Sora", sans-serif',
        }}>
          {product.offerPercent}% OFF
        </div>
      )}

      {/* Image */}
      <div style={{
        width: '100%', height: '90px',
        background: '#f8f8f8', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain', display: 'block',
            }}
          />
        ) : (
          <span style={{ fontSize: '26px', opacity: 0.4 }}>{emoji}</span>
        )}
      </div>

      {/* Price + Name */}
      <div style={{ padding: '6px 7px' }}>
        <div style={{
          fontSize: '9px', color: '#6b7280',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          marginBottom: '2px',
        }}>
          {product.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span style={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 700, fontSize: '12px',
            color: hasOffer ? '#16a34a' : theme.text,
          }}>
            ₹{hasOffer ? product.offerPrice : product.price}
          </span>
          {hasOffer && (
            <span style={{ fontSize: '8px', color: '#9ca3af', textDecoration: 'line-through' }}>
              ₹{product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main ShopCard ────────────────────────────────────────────────────────────

export default function ShopCard({ shop }) {
  const theme = categoryTheme[shop.category] || fallbackTheme;
  const emoji = categoryEmoji[shop.category] || '🏪';

  const featuredProducts = shop.featuredProducts?.slice(0, 2) ||
    shop.products?.filter(p => p.isFeatured).slice(0, 2) || [];
  const topProducts = featuredProducts.length > 0
    ? featuredProducts
    : (shop.products?.slice(0, 2) || []);

  const bannerGradient = `linear-gradient(135deg, ${theme.grad[0]} 0%, ${theme.grad[1]} 100%)`;

  return (
    <Link
      href={`/shop/${shop.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '0.5px solid rgba(0,0,0,0.07)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        fontFamily: '"DM Sans", -apple-system, sans-serif',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
        onMouseUp={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      >

        {/* ── BANNER ── */}
        <div style={{ position: 'relative', height: '120px', overflow: 'hidden', background: '#e5e7eb' }}>

          {/* Background */}
          {shop.banner ? (
            <img
              src={shop.banner}
              alt={shop.shopName}
              style={{ width: '100%', height: '120px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: bannerGradient,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '52px', opacity: 0.18,
                position: 'absolute', right: '12px', bottom: '4px',
              }}>
                {emoji}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.22))',
            pointerEvents: 'none',
          }} />

          {/* Open / Closed pill */}
          <span style={{
            position: 'absolute', top: 10, right: 10, zIndex: 2,
            fontSize: '9px', fontWeight: 700,
            fontFamily: '"Sora", sans-serif',
            padding: '3px 8px', borderRadius: '20px',
            letterSpacing: '0.3px',
            background: shop.isOpen ? '#22c55e' : 'rgba(0,0,0,0.45)',
            color: '#fff',
          }}>
            ● {shop.isOpen ? 'Open' : 'Closed'}
          </span>

          {/* Featured pill */}
          {shop.isFeatured && (
            <span style={{
              position: 'absolute', top: 10, left: 10, zIndex: 2,
              fontSize: '9px', fontWeight: 700,
              fontFamily: '"Sora", sans-serif',
              padding: '3px 8px', borderRadius: '20px',
              background: 'rgba(255,210,0,0.92)', color: '#5a3e00',
              letterSpacing: '0.2px',
            }}>
              ★ Featured
            </span>
          )}

          {/* Logo */}
          <div style={{
            position: 'absolute', bottom: '-20px', left: '12px', zIndex: 3,
            width: '44px', height: '44px',
            borderRadius: '12px',
            border: '3px solid #ffffff',
            background: '#ffffff',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px',
            flexShrink: 0,
          }}>
            {shop.logo ? (
              <img
                src={shop.logo}
                alt={shop.shopName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <span>{emoji}</span>
            )}
          </div>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: '28px 14px 14px' }}>

          {/* Shop name */}
          <div style={{
            fontFamily: '"Sora", sans-serif',
            fontWeight: 800, fontSize: '13px',
            color: '#111827', lineHeight: 1.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {shop.shopName}
          </div>

          {/* Category + Distance */}
          <div style={{
            display: 'flex', alignItems: 'center',
            gap: '6px', marginTop: '6px', marginBottom: '10px',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontSize: '10px', fontWeight: 600,
              fontFamily: '"Sora", sans-serif',
              padding: '3px 8px', borderRadius: '20px',
              background: theme.light, color: theme.text,
              letterSpacing: '0.1px',
            }}>
              {emoji} {shop.category}
            </span>
            {shop.distance != null && (
              <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                📍 {shop.distance} km
              </span>
            )}
          </div>

          {/* Product mini grid */}
          {topProducts.length > 0 && (
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '8px', marginBottom: '12px',
            }}>
              {topProducts.map((p, i) => (
                <ProductMini key={i} product={p} theme={theme} emoji={emoji} />
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '0.5px solid rgba(0,0,0,0.06)',
          }}>
            <span style={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700, fontSize: '11px',
              color: '#f59e0b',
              display: 'flex', alignItems: 'center', gap: '2px',
            }}>
              ★ {shop.rating > 0 ? shop.rating.toFixed(1) : 'New'}
            </span>

            <span style={{ fontSize: '9px', color: '#9ca3af' }}>
              {shop.totalOrders} orders
            </span>

            <span style={{
              fontSize: '9px', fontWeight: 600,
              fontFamily: '"Sora", sans-serif',
              color: shop.deliverySettings?.deliveryEnabled ? '#16a34a' : '#9ca3af',
            }}>
              {shop.deliverySettings?.deliveryEnabled ? '🚚 Del' : '🏪 Pickup'}
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}