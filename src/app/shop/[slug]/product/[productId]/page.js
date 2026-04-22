// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { getProductById } from '@/services/productService';
// import { useCart } from '@/hooks/useCart';
// import toast from 'react-hot-toast';

// export default function ProductDetailPage() {
//   const { slug, productId } = useParams();
//   const router = useRouter();
//   const { addToCart } = useCart();

//   const [product, setProduct]     = useState(null);
//   const [loading, setLoading]     = useState(true);
//   const [quantity, setQuantity]   = useState(1);
//   const [activeImg, setActiveImg] = useState(0);
//   const [adding, setAdding]       = useState(false);

//   useEffect(() => {
//     if (productId) loadProduct();
//   }, [productId]);

//   const loadProduct = async () => {
//     try {
//       setLoading(true);
//       const res = await getProductById(productId);
//       setProduct(res.product);
//     } catch {
//       toast.error('Product load nahi hua!');
//       router.back();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddToCart = async () => {
//     if (!product) return;
//     setAdding(true);
//     try {
//       await addToCart({ productId: product._id, quantity, shopId: product.shopId._id });
//       toast.success('Cart mein add ho gaya! 🛒');
//     } catch {
//       toast.error('Cart mein add nahi hua!');
//     } finally {
//       setAdding(false);
//     }
//   };

//   const finalPrice = product?.offerPrice || product?.price;
//   const shop = product?.shopId;

//   if (loading) return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="text-center">
//         <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//         <p className="text-gray-400 text-sm font-medium">Loading...</p>
//       </div>
//     </div>
//   );

//   if (!product) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 pb-32">

//       {/* ── STICKY TOP BAR ── */}
//       <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
//         <button onClick={() => router.back()}
//           className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 font-bold">
//           ←
//         </button>
//         <p className="font-black text-gray-900 text-sm flex-1 truncate">{product.name}</p>
//         <Link href={`/shop/${slug}`}
//           className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl">
//           Shop →
//         </Link>
//       </div>

//       {/* ── IMAGE GALLERY ── */}
//       <div className="bg-white">
//         {/* Main Image */}
//         <div className="relative w-full bg-white flex items-center justify-center"
//           style={{ minHeight: '300px' }}>
//           {product.images?.length > 0 ? (
//             <img
//               src={product.images[activeImg]}
//               alt={product.name}
//               className="w-full object-contain"
//               style={{ maxHeight: '350px' }}
//             />
//           ) : (
//             <div className="flex items-center justify-center" style={{ height: '300px' }}>
//               <span className="text-8xl opacity-20">📦</span>
//             </div>
//           )}

//           {/* Offer badge */}
//           {product.offerPercent > 0 && (
//             <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full">
//               🏷️ {product.offerPercent}% OFF
//             </div>
//           )}

//           {/* Out of stock overlay */}
//           {!product.isAvailable && (
//             <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
//               <span className="bg-red-100 text-red-600 font-black px-4 py-2 rounded-xl text-sm">
//                 ❌ Out of Stock
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Thumbnail strip */}
//         {product.images?.length > 1 && (
//           <div className="flex gap-2 px-4 py-3 overflow-x-auto">
//             {product.images.map((img, i) => (
//               <button key={i} onClick={() => setActiveImg(i)}
//                 className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
//                   activeImg === i ? 'border-gray-900' : 'border-gray-200'
//                 }`}>
//                 <img src={img} className="w-full h-full object-cover" />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── PRODUCT INFO ── */}
//       <div className="px-4 py-4 bg-white mt-2">

//         {/* Category badge */}
//         <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
//           {product.category}
//         </span>

//         {/* Name */}
//         <h1 className="text-xl font-black text-gray-900 mt-2 leading-tight">{product.name}</h1>

//         {/* Unit */}
//         <p className="text-sm text-gray-400 mt-0.5">per {product.unit}</p>

//         {/* Price section */}
//         <div className="flex items-end gap-3 mt-4">
//           <span className="text-3xl font-black text-gray-900">₹{finalPrice}</span>
//           {product.offerPrice && (
//             <>
//               <span className="text-lg text-gray-400 line-through mb-0.5">₹{product.price}</span>
//               <span className="text-sm font-black text-green-600 mb-0.5">
//                 ₹{product.price - product.offerPrice} bachoge!
//               </span>
//             </>
//           )}
//         </div>

//         {/* Offer callout */}
//         {product.offerPercent > 0 && (
//           <div className="mt-3 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 flex items-center gap-2">
//             <span className="text-lg">🏷️</span>
//             <div>
//               <p className="text-xs font-black text-red-700">{product.offerPercent}% Special Offer!</p>
//               <p className="text-xs text-red-500">Limited time deal — abhi order karo</p>
//             </div>
//           </div>
//         )}

//         {/* Stock status */}
//         <div className="mt-3">
//           {product.stock === 0 ? (
//             <span className="text-sm font-bold text-red-500">❌ Out of Stock</span>
//           ) : product.stock <= 5 ? (
//             <span className="text-sm font-bold text-amber-500">⚠️ Sirf {product.stock} bacha hai — jaldi karo!</span>
//           ) : (
//             <span className="text-sm font-bold text-green-600">✅ Stock mein hai ({product.stock})</span>
//           )}
//         </div>
//       </div>

//       {/* ── DESCRIPTION ── */}
//       {product.description && (
//         <div className="px-4 py-4 bg-white mt-2">
//           <h2 className="font-black text-gray-900 mb-2">📋 Product Details</h2>
//           <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
//         </div>
//       )}

//       {/* ── SHOP INFO ── */}
//       {shop && (
//         <Link href={`/shop/${slug}`}
//           className="block px-4 py-4 bg-white mt-2 hover:bg-gray-50 transition-all">
//           <h2 className="font-black text-gray-900 mb-3">🏪 Is Shop ke baare mein</h2>
//           <div className="flex items-center gap-3">
//             {/* Shop logo */}
//             <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
//               {shop.logo
//                 ? <img src={shop.logo} className="w-full h-full object-cover" />
//                 : <span className="text-2xl">🏪</span>
//               }
//             </div>
//             <div className="flex-1">
//               <p className="font-black text-gray-900">{shop.shopName}</p>
//               <p className="text-xs text-gray-400">{shop.category}</p>
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-xs font-bold text-amber-500">
//                   {shop.rating > 0 ? `★ ${shop.rating?.toFixed(1)}` : '★ New'}
//                 </span>
//                 <span className="text-xs text-gray-400">•</span>
//                 <span className={`text-xs font-bold ${shop.isOpen ? 'text-green-600' : 'text-red-500'}`}>
//                   {shop.isOpen ? '● Open' : '● Closed'}
//                 </span>
//               </div>
//             </div>
//             <span className="text-gray-400 text-sm">→</span>
//           </div>
//         </Link>
//       )}

//       {/* ── BOTTOM ACTION BAR ── */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 z-40">
//         <div className="flex gap-3 items-center">

//           {/* Quantity selector */}
//           <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">
//             <button
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//               className="w-7 h-7 bg-white rounded-lg flex items-center justify-center font-black text-gray-700 shadow-sm active:scale-95 transition-all">
//               −
//             </button>
//             <span className="font-black text-gray-900 w-6 text-center text-sm">{quantity}</span>
//             <button
//               onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
//               disabled={quantity >= product.stock}
//               className="w-7 h-7 bg-white rounded-lg flex items-center justify-center font-black text-gray-700 shadow-sm active:scale-95 transition-all disabled:opacity-40">
//               +
//             </button>
//           </div>

//           {/* Total + Add to cart */}
//           <button
//             onClick={handleAddToCart}
//             disabled={adding || !product.isAvailable || product.stock === 0}
//             className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-black py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//             {adding ? (
//               <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>Adding...</>
//             ) : (
//               <>🛒 Add to Cart — ₹{(finalPrice * quantity).toLocaleString()}</>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '@/services/productService';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { slug, productId } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [quantity, setQuantity]   = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [adding, setAdding]       = useState(false);

  useEffect(() => {
    if (productId) loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await getProductById(productId);
      setProduct(res.product);
    } catch {
      toast.error('Product load nahi hua!');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addToCart(product._id, quantity);
      toast.success('Cart mein add ho gaya! 🛒');
    } catch {
      toast.error('Cart mein add nahi hua!');
    } finally {
      setAdding(false);
    }
  };

  const finalPrice = product?.offerPrice || product?.price;
  const shop = product?.shopId;

  if (loading) return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-[3px] border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm tracking-widest uppercase font-medium">Loading</p>
      </div>
    </div>
  );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#f8f8f8] pb-36">

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()}
          className="w-9 h-9 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-all active:scale-90">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="font-bold text-gray-900 text-sm flex-1 truncate tracking-tight">{product.name}</p>
        <Link href={`/shop/${slug}`}
          className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-all">
          Shop →
        </Link>
      </div>

      {/* ── IMAGE GALLERY ── */}
      <div className="bg-white mx-0">
        <div className="relative w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-white" style={{ minHeight: '320px' }}>
          {product.images?.length > 0 ? (
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full object-contain transition-all duration-300"
              style={{ maxHeight: '360px' }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3" style={{ height: '320px' }}>
              <span className="text-8xl opacity-10">📦</span>
              <p className="text-xs text-gray-300 font-medium tracking-wider uppercase">No Image</p>
            </div>
          )}

          {product.offerPercent > 0 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-black px-3 py-1.5 rounded-2xl shadow-lg shadow-red-200">
              {product.offerPercent}% OFF
            </div>
          )}

          {!product.isAvailable && (
            <div className="absolute inset-0 bg-white/75 backdrop-blur-sm flex items-center justify-center">
              <span className="bg-red-50 border border-red-100 text-red-500 font-black px-5 py-2.5 rounded-2xl text-sm shadow-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {product.images?.length > 1 && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                  activeImg === i ? 'border-gray-900 scale-105 shadow-md' : 'border-gray-100 opacity-60'
                }`}>
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── PRODUCT INFO ── */}
      <div className="mx-0 mt-2 bg-white px-5 py-5">

        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg tracking-wide uppercase">
            {product.category}
          </span>
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-[11px] font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg">
              Only {product.stock} left!
            </span>
          )}
        </div>

        <h1 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">{product.name}</h1>
        <p className="text-sm text-gray-400 mt-1 font-medium">per {product.unit}</p>

        <div className="flex items-end gap-3 mt-5">
          <span className="text-4xl font-black text-gray-900 tracking-tight">₹{finalPrice}</span>
          {product.offerPrice && (
            <div className="flex flex-col mb-1">
              <span className="text-base text-gray-300 line-through leading-none">₹{product.price}</span>
              <span className="text-xs font-black text-emerald-500 mt-0.5">Save ₹{product.price - product.offerPrice}</span>
            </div>
          )}
        </div>

        {product.offerPercent > 0 && (
          <div className="mt-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-base">🏷️</span>
            </div>
            <div>
              <p className="text-xs font-black text-red-600">{product.offerPercent}% Special Offer!</p>
              <p className="text-xs text-red-400 mt-0.5">Limited time — abhi order karo</p>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          {product.stock === 0 ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /> Out of Stock
            </span>
          ) : product.stock <= 5 ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" /> Hurry! Sirf {product.stock} bacha
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> In Stock ({product.stock})
            </span>
          )}
        </div>
      </div>

      {/* ── DESCRIPTION ── */}
      {product.description && (
        <div className="mx-0 mt-2 bg-white px-5 py-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-gray-900 rounded-full" />
            <h2 className="font-black text-gray-900 text-sm tracking-tight uppercase">Product Details</h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* ── SHOP INFO ── */}
      {shop && (
        <Link href={`/shop/${slug}`}
          className="block mx-0 mt-2 bg-white px-5 py-5 hover:bg-gray-50/80 transition-all active:scale-[0.99]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gray-900 rounded-full" />
            <h2 className="font-black text-gray-900 text-sm tracking-tight uppercase">Sold By</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
              {shop.logo
                ? <img src={shop.logo} className="w-full h-full object-cover" />
                : <span className="text-2xl">🏪</span>
              }
            </div>
            <div className="flex-1">
              <p className="font-black text-gray-900 text-base tracking-tight">{shop.shopName}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{shop.category}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg">
                  ★ {shop.rating > 0 ? shop.rating?.toFixed(1) : 'New'}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                  shop.isOpen
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-red-500 bg-red-50'
                }`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${shop.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`} />
                  {shop.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      )}

      {/* ── BOTTOM ACTION BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-4 z-40 shadow-2xl shadow-black/5">
        <div className="flex gap-3 items-center">

          <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 py-2.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-white rounded-xl flex items-center justify-center font-black text-gray-700 shadow-sm active:scale-90 transition-all text-lg leading-none">
              −
            </button>
            <span className="font-black text-gray-900 w-7 text-center text-sm tabular-nums">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
              className="w-8 h-8 bg-white rounded-xl flex items-center justify-center font-black text-gray-700 shadow-sm active:scale-90 transition-all disabled:opacity-30 text-lg leading-none">
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding || !product.isAvailable || product.stock === 0}
            className="flex-1 bg-gray-900 text-white font-black py-3.5 rounded-2xl transition-all active:scale-[0.97] disabled:opacity-40 flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20 text-sm tracking-tight">
            {adding ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Adding...
              </>
            ) : (
              <>
                🛒 Add to Cart
                <span className="bg-white/20 px-2 py-0.5 rounded-lg ml-1">
                  ₹{(finalPrice * quantity).toLocaleString()}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}