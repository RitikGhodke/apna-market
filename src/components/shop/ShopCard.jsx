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







'use client';
import Link from 'next/link';

const categoryColors = {
  kirana:      { bg: 'from-green-100 to-green-200',   tag: 'bg-green-100 text-green-800',   text: '#166534' },
  dairy:       { bg: 'from-blue-100 to-blue-200',     tag: 'bg-blue-100 text-blue-800',     text: '#1e40af' },
  fruits:      { bg: 'from-red-100 to-red-200',       tag: 'bg-red-100 text-red-800',       text: '#991b1b' },
  food:        { bg: 'from-orange-100 to-orange-200', tag: 'bg-orange-100 text-orange-800', text: '#9a3412' },
  medical:     { bg: 'from-purple-100 to-purple-200', tag: 'bg-purple-100 text-purple-800', text: '#581c87' },
  fashion:     { bg: 'from-pink-100 to-pink-200',     tag: 'bg-pink-100 text-pink-800',     text: '#9d174d' },
  electronics: { bg: 'from-cyan-100 to-cyan-200',     tag: 'bg-cyan-100 text-cyan-800',     text: '#155e75' },
};

const categoryEmoji = {
  kirana: '🛒', dairy: '🥛', fruits: '🍎',
  food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
};

export default function ShopCard({ shop }) {
  const theme = categoryColors[shop.category] || { bg: 'from-gray-100 to-gray-200', tag: 'bg-gray-100 text-gray-700' };
  const emoji = categoryEmoji[shop.category] || '🏪';

  return (
    <Link href={`/shop/${shop.slug}`}
      className="block bg-white rounded-2xl border border-gray-100 overflow-hidden 
                 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95">

      {/* Banner */}
      <div className={`h-20 bg-gradient-to-br ${theme.bg} relative flex items-center justify-center`}>
        {shop.banner ? (
          <img src={shop.banner} alt={shop.shopName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl opacity-60">{emoji}</span>
        )}

        {/* Open/Closed */}
        <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${
          shop.isOpen ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
        }`}>
          {shop.isOpen ? 'Open' : 'Closed'}
        </span>

        {/* Featured ad badge */}
        {shop.isFeatured && (
          <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            Ad
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-2.5">
        <div className="flex items-start gap-2">
          {/* Logo */}
          <div className="w-9 h-9 rounded-xl border-2 border-white shadow-sm bg-white 
                          flex items-center justify-center flex-shrink-0 -mt-5 overflow-hidden">
            {shop.logo
              ? <img src={shop.logo} alt={shop.shopName} className="w-full h-full object-cover" />
              : <span className="text-base">{emoji}</span>}
          </div>

          <div className="flex-1 min-w-0 mt-0.5">
            <h3 className="text-xs font-bold text-gray-900 truncate leading-tight">{shop.shopName}</h3>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold ${theme.tag}`}>
                {emoji} {shop.category}
              </span>
              {shop.distance != null && (
                <span className="text-[9px] text-gray-400">📍 {shop.distance} km</span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-0.5">
            <span className="text-yellow-400 text-[10px]">★</span>
            <span className="text-[10px] font-semibold text-gray-700">
              {shop.rating > 0 ? shop.rating.toFixed(1) : 'New'}
            </span>
          </div>
          <span className="text-[9px] text-gray-400">{shop.totalOrders} orders</span>
          <span className={`text-[9px] font-semibold ${
            shop.deliverySettings?.deliveryEnabled ? 'text-green-600' : 'text-gray-500'
          }`}>
            {shop.deliverySettings?.deliveryEnabled ? '🚚 Del' : '🏪 Pickup'}
          </span>
        </div>
      </div>
    </Link>
  );
}