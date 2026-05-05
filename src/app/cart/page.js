// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import { placeOrder } from '@/services/orderService';
// import BottomNav from '@/components/common/BottomNav';
// import toast from 'react-hot-toast';

// export default function CartPage() {
//   const router = useRouter();
//   const { isAuthenticated, user } = useAuth();
//   const { items, shopId, totalProductPrice, deliveryCharge, totalAmount, fetchCart, updateCartItem, removeFromCart, emptyCart } = useCart();

//   const [loading, setLoading] = useState(true);
//   const [orderLoading, setOrderLoading] = useState(false);
//   const [address, setAddress] = useState({
//     fullAddress: user?.address?.fullAddress || '',
//     city: user?.address?.city || '',
//     pincode: user?.address?.pincode || '',
//   });
//   const [paymentMethod, setPaymentMethod] = useState('COD');

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     loadCart();
//   }, [isAuthenticated]);

//   const loadCart = async () => {
//     setLoading(true);
//     await fetchCart();
//     setLoading(false);
//   };

//   const handleQuantityChange = async (productId, currentQty, change) => {
//     const newQty = currentQty + change;
//     if (newQty <= 0) {
//       await removeFromCart(productId);
//     } else {
//       await updateCartItem(productId, newQty);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.fullAddress || !address.city) {
//       toast.error('Delivery address fill karo!');
//       return;
//     }
//     setOrderLoading(true);
//     try {
//       const data = await placeOrder({
//         paymentMethod,
//         deliveryAddress: address
//       });
//       toast.success('Order place ho gaya! 🎉');
//       await emptyCart();
//       router.push(`/orders`);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Order failed!');
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pb-24">
//         <div className="px-4 pt-16 space-y-4">
//           {[1, 2, 3].map(i => (
//             <div key={i} className="h-24 skeleton rounded-2xl" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!items || items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
//         <div className="text-center">
//           <div className="text-7xl mb-6">🛒</div>
//           <h2 className="text-2xl font-black text-gray-900 mb-2">Cart khaali hai!</h2>
//           <p className="text-gray-500 mb-8">Koi product add nahi kiya abhi tak</p>
//           <Link href="/feed"
//             className="bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl inline-block active:scale-95 transition-all">
//             Shops Browse Karo →
//           </Link>
//         </div>
//         <BottomNav />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">

//       {/* Header */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
//         <div className="px-4 py-4 flex items-center gap-3">
//           <button onClick={() => router.back()}
//             className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
//             ←
//           </button>
//           <div>
//             <h1 className="text-lg font-black text-gray-900">Cart</h1>
//             <p className="text-xs text-gray-400">{items.length} items</p>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-4">

//         {/* Cart Items */}
//         <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//           <div className="px-4 py-3 border-b border-gray-50">
//             <h2 className="font-bold text-gray-900 text-sm">Your Items</h2>
//           </div>
//           <div className="divide-y divide-gray-50">
//             {items.map((item) => (
//               <div key={item.productId} className="flex items-center gap-3 px-4 py-3">

//                 {/* Image */}
//                 <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
//                   {item.image ? (
//                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                   ) : (
//                     <span className="text-2xl">📦</span>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1 min-w-0">
//                   <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
//                   <p className="text-xs text-gray-400">₹{item.price} each</p>
//                 </div>

//                 {/* Quantity */}
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <button
//                     onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
//                     className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-sm transition-all active:scale-95">
//                     −
//                   </button>
//                   <span className="w-6 text-center font-bold text-gray-900 text-sm">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
//                     className="w-7 h-7 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all active:scale-95">
//                     +
//                   </button>
//                 </div>

//                 {/* Price */}
//                 <div className="text-right flex-shrink-0 min-w-12">
//                   <p className="font-black text-gray-900 text-sm">₹{item.price * item.quantity}</p>
//                 </div>

//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Delivery Address */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">📍 Delivery Address</h2>
//           <div className="space-y-3">
//             <textarea
//               value={address.fullAddress}
//               onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
//               placeholder="Ghar ka address, gali, mohalla..."
//               rows={2}
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
//             />
//             <div className="grid grid-cols-2 gap-3">
//               <input
//                 type="text"
//                 value={address.city}
//                 onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                 placeholder="City"
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//               <input
//                 type="text"
//                 value={address.pincode}
//                 onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                 placeholder="Pincode"
//                 maxLength={6}
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Payment Method */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">💳 Payment Method</h2>
//           <div className="grid grid-cols-2 gap-3">
//             {[
//               { id: 'COD', label: 'Cash on Delivery', emoji: '💵' },
//               { id: 'ONLINE', label: 'Online Payment', emoji: '💳' },
//             ].map((method) => (
//               <button key={method.id}
//                 onClick={() => setPaymentMethod(method.id)}
//                 className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
//                   paymentMethod === method.id
//                     ? 'border-gray-900 bg-gray-50'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}>
//                 <span className="text-2xl">{method.emoji}</span>
//                 <span className="text-xs font-bold text-gray-900 text-center">{method.label}</span>
//                 {paymentMethod === method.id && (
//                   <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Bill Summary */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">🧾 Bill Summary</h2>
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Items total</span>
//               <span className="font-semibold text-gray-900">₹{totalProductPrice}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Delivery charge</span>
//               <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-gray-900'}`}>
//                 {deliveryCharge === 0 ? 'FREE 🎉' : `₹${deliveryCharge}`}
//               </span>
//             </div>
//             <div className="border-t border-gray-100 pt-2 flex justify-between">
//               <span className="font-black text-gray-900">Total</span>
//               <span className="font-black text-gray-900 text-lg">₹{totalAmount}</span>
//             </div>
//           </div>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={orderLoading}
//           className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50 text-lg flex items-center justify-center gap-2">
//           {orderLoading ? (
//             <>
//               <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               Order place ho raha hai...
//             </>
//           ) : (
//             <>🚀 Order Place Karo — ₹{totalAmount}</>
//           )}
//         </button>

//       </div>

//       <BottomNav />
//     </div>
//   );
// }











// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import { placeOrder } from '@/services/orderService';
// import BottomNav from '@/components/common/BottomNav';
// import toast from 'react-hot-toast';

// export default function CartPage() {
//   const router = useRouter();
//   const { isAuthenticated, user } = useAuth();
//   const { items, shopId, totalProductPrice, deliveryCharge, totalAmount, fetchCart, updateCartItem, removeFromCart, emptyCart } = useCart();

//   const [loading, setLoading] = useState(true);
//   const [orderLoading, setOrderLoading] = useState(false);
//   const [address, setAddress] = useState({
//     fullAddress: user?.address?.fullAddress || '',
//     city: user?.address?.city || '',
//     pincode: user?.address?.pincode || '',
//   });
//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [udharNote, setUdharNote] = useState('');

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     loadCart();
//   }, [isAuthenticated]);

//   const loadCart = async () => {
//     setLoading(true);
//     await fetchCart();
//     setLoading(false);
//   };

//   const handleQuantityChange = async (productId, currentQty, change) => {
//     const newQty = currentQty + change;
//     if (newQty <= 0) {
//       await removeFromCart(productId);
//     } else {
//       await updateCartItem(productId, newQty);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.fullAddress || !address.city) {
//       toast.error('Delivery address fill karo!');
//       return;
//     }
//     setOrderLoading(true);
//     try {
//       const data = await placeOrder({
//         paymentMethod,
//         deliveryAddress: address,
//         udharNote
//       });
//       toast.success('Order place ho gaya! 🎉');
//       await emptyCart();
//       router.push(`/orders`);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Order failed!');
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pb-24">
//         <div className="px-4 pt-16 space-y-4">
//           {[1, 2, 3].map(i => (
//             <div key={i} className="h-24 skeleton rounded-2xl" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!items || items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
//         <div className="text-center">
//           <div className="text-7xl mb-6">🛒</div>
//           <h2 className="text-2xl font-black text-gray-900 mb-2">Cart khaali hai!</h2>
//           <p className="text-gray-500 mb-8">Koi product add nahi kiya abhi tak</p>
//           <Link href="/feed"
//             className="bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl inline-block active:scale-95 transition-all">
//             Shops Browse Karo →
//           </Link>
//         </div>
//         <BottomNav />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">

//       {/* Header */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
//         <div className="px-4 py-4 flex items-center gap-3">
//           <button onClick={() => router.back()}
//             className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
//             ←
//           </button>
//           <div>
//             <h1 className="text-lg font-black text-gray-900">Cart</h1>
//             <p className="text-xs text-gray-400">{items.length} items</p>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-4">

//         {/* Cart Items */}
//         <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//           <div className="px-4 py-3 border-b border-gray-50">
//             <h2 className="font-bold text-gray-900 text-sm">Your Items</h2>
//           </div>
//           <div className="divide-y divide-gray-50">
//             {items.map((item) => (
//               <div key={item.productId} className="flex items-center gap-3 px-4 py-3">
//                 <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
//                   {item.image ? (
//                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                   ) : (
//                     <span className="text-2xl">📦</span>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
//                   <p className="text-xs text-gray-400">₹{item.price} each</p>
//                 </div>
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                   <button
//                     onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
//                     className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-sm transition-all active:scale-95">
//                     −
//                   </button>
//                   <span className="w-6 text-center font-bold text-gray-900 text-sm">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
//                     className="w-7 h-7 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all active:scale-95">
//                     +
//                   </button>
//                 </div>
//                 <div className="text-right flex-shrink-0 min-w-12">
//                   <p className="font-black text-gray-900 text-sm">₹{item.price * item.quantity}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Delivery Address */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">📍 Delivery Address</h2>
//           <div className="space-y-3">
//             <textarea
//               value={address.fullAddress}
//               onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
//               placeholder="Ghar ka address, gali, mohalla..."
//               rows={2}
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
//             />
//             <div className="grid grid-cols-2 gap-3">
//               <input
//                 type="text"
//                 value={address.city}
//                 onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                 placeholder="City"
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//               <input
//                 type="text"
//                 value={address.pincode}
//                 onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                 placeholder="Pincode"
//                 maxLength={6}
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Payment Method */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">💳 Payment Method</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {[
//               { id: 'COD', label: 'Cash on Delivery', emoji: '💵' },
//               { id: 'ONLINE', label: 'Online Payment', emoji: '💳' },
//               { id: 'UDHAR', label: 'Udhar (Baad mein)', emoji: '🤝' },
//             ].map((method) => (
//               <button key={method.id}
//                 onClick={() => setPaymentMethod(method.id)}
//                 className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
//                   paymentMethod === method.id
//                     ? 'border-gray-900 bg-gray-50'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}>
//                 <span className="text-2xl">{method.emoji}</span>
//                 <span className="text-xs font-bold text-gray-900 text-center">{method.label}</span>
//                 {paymentMethod === method.id && (
//                   <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Udhar note — sirf UDHAR select pe dikhega */}
//           {paymentMethod === 'UDHAR' && (
//             <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl">
//               <p className="text-xs text-amber-700 font-bold mb-2">🤝 Udhar — 30 din mein pay karna hoga</p>
//               <textarea
//                 value={udharNote}
//                 onChange={(e) => setUdharNote(e.target.value)}
//                 placeholder="Koi note shop owner ke liye... (optional)"
//                 rows={2}
//                 className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
//               />
//             </div>
//           )}
//         </div>

//         {/* Bill Summary */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">🧾 Bill Summary</h2>
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Items total</span>
//               <span className="font-semibold text-gray-900">₹{totalProductPrice}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Delivery charge</span>
//               <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-gray-900'}`}>
//                 {deliveryCharge === 0 ? 'FREE 🎉' : `₹${deliveryCharge}`}
//               </span>
//             </div>
//             <div className="border-t border-gray-100 pt-2 flex justify-between">
//               <span className="font-black text-gray-900">Total</span>
//               <span className="font-black text-gray-900 text-lg">₹{totalAmount}</span>
//             </div>
//           </div>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={orderLoading}
//           className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50 text-lg flex items-center justify-center gap-2">
//           {orderLoading ? (
//             <>
//               <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               Order place ho raha hai...
//             </>
//           ) : (
//             <>🚀 Order Place Karo — ₹{totalAmount}</>
//           )}
//         </button>

//       </div>

//       <BottomNav />
//     </div>
//   );
// }






// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import { placeOrder } from '@/services/orderService';
// import BottomNav from '@/components/common/BottomNav';
// import toast from 'react-hot-toast';

// export default function CartPage() {
//   const router = useRouter();
//   const { isAuthenticated, isRestoring, user } = useAuth(); // ✅ isRestoring add kiya
//   const { items, shopId, totalProductPrice, deliveryCharge, totalAmount, fetchCart, updateCartItem, removeFromCart, emptyCart } = useCart();

//   const [loading, setLoading] = useState(true);
//   const [orderLoading, setOrderLoading] = useState(false);
//   const [address, setAddress] = useState(() => {
//   if (typeof window === 'undefined') return { fullAddress: '', city: '', pincode: '' };
//   const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//   const addr = savedUser.address || {};
//   return {
//     fullAddress: addr.fullAddress || '',
//     city: addr.city || '',
//     pincode: addr.pincode || '',
//   };
// });
//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [udharNote, setUdharNote] = useState('');

//   // ✅ isRestoring check — restore hone tak wait karo, phir check karo
//   useEffect(() => {
//     if (isRestoring) return;
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     loadCart();
//   }, [isAuthenticated, isRestoring]);

//   useEffect(() => {
//   const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//   const addr = user?.address || savedUser.address || {};
//   if (addr.fullAddress || addr.city) {
//     setAddress({
//       fullAddress: addr.fullAddress || '',
//       city: addr.city || '',
//       pincode: addr.pincode || '',
//     });
//   }
// }, [user]);

//   const loadCart = async () => {
//     setLoading(true);
//     await fetchCart();
//     setLoading(false);
//   };

//   const handleQuantityChange = async (productId, currentQty, change) => {
//     const id = productId?._id || productId;
//     const newQty = currentQty + change;

//     if (newQty <= 0) {
//       // await removeFromCart(productId);
//       // await removeFromCart(item.productId?._id || item.productId);
//       await removeFromCart(id);
//     } else {
//       await updateCartItem(productId, newQty);
//     }
//   };

//   // ✅ Dedicated remove handler
//   const handleRemove = async (productId) => {
//      const id = productId?._id || productId;
//     await removeFromCart(id);
//     toast.success('Item remove ho gaya!');
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.fullAddress || !address.city) {
//       toast.error('Delivery address fill karo!');
//       return;
//     }
//     setOrderLoading(true);
//     try {
//       await placeOrder({
//         paymentMethod,
//         deliveryAddress: address,
//         udharNote
//       });
//       toast.success('Order place ho gaya! 🎉');
//       await emptyCart();
//       router.push('/orders');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Order failed!');
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   // ✅ isRestoring ke dauran bhi skeleton dikhao — logout nahi hoga
//   if (isRestoring || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pb-24">
//         <div className="px-4 pt-16 space-y-4">
//           {[1, 2, 3].map(i => (
//             <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />
//           ))}
//         </div>
//         <BottomNav />
//       </div>
//     );
//   }

//   if (!items || items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
//         <div className="text-center">
//           <div className="text-7xl mb-6">🛒</div>
//           <h2 className="text-2xl font-black text-gray-900 mb-2">Cart khaali hai!</h2>
//           <p className="text-gray-500 mb-8">Koi product add nahi kiya abhi tak</p>
//           <Link href="/feed"
//             className="bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl inline-block active:scale-95 transition-all">
//             Shops Browse Karo →
//           </Link>
//         </div>
//         <BottomNav />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">

//       {/* Header */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
//         <div className="px-4 py-4 flex items-center gap-3">
//           <button onClick={() => router.back()}
//             className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
//             ←
//           </button>
//           <div>
//             <h1 className="text-lg font-black text-gray-900">Cart</h1>
//             <p className="text-xs text-gray-400">{items.length} items</p>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-4">

//         {/* Cart Items */}
//         <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//           <div className="px-4 py-3 border-b border-gray-50">
//             <h2 className="font-bold text-gray-900 text-sm">Your Items</h2>
//           </div>
//           <div className="divide-y divide-gray-50">
//             {items.map((item) => (
//               <div key={item.productId?._id || item.productId} className="px-4 py-3 space-y-2">

//                 {/* Item row */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
//                     {item.image ? (
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     ) : (
//                       <span className="text-2xl">📦</span>
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
//                     <p className="text-xs text-gray-400">₹{item.price} each</p>
//                   </div>
//                   <div className="flex items-center gap-2 flex-shrink-0">
//                     <button
//                       onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
//                       className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-sm transition-all active:scale-95">
//                       −
//                     </button>
//                     <span className="w-6 text-center font-bold text-gray-900 text-sm">
//                       {item.quantity}
//                     </span>
//                     <button
//                       onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
//                       className="w-7 h-7 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all active:scale-95">
//                       +
//                     </button>
//                   </div>
//                   <div className="text-right flex-shrink-0 min-w-12">
//                     <p className="font-black text-gray-900 text-sm">₹{item.price * item.quantity}</p>
//                   </div>
//                 </div>

//                 {/* ✅ Remove button — har item ke neeche */}
//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => handleRemove(item.productId)}
//                     className="text-xs text-red-500 font-bold px-3 py-1 border border-red-100 rounded-lg hover:bg-red-50 active:scale-95 transition-all">
//                     🗑️ Remove
//                   </button>
//                 </div>

//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Delivery Address */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">📍 Delivery Address</h2>

//           {/* ✅ Profile se saved address show karo */}
//           {user?.address?.fullAddress && (
//             <div className="mb-3 p-3 bg-green-50 border border-green-100 rounded-xl flex items-center justify-between gap-2">
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs font-bold text-green-700">✅ Saved Address</p>
//                 <p className="text-xs text-green-600 truncate">{user.address.fullAddress}, {user.address.city}</p>
//               </div>
//               <button
//                 onClick={() => setAddress({
//                   fullAddress: user.address.fullAddress || '',
//                   city: user.address.city || '',
//                   pincode: user.address.pincode || '',
//                 })}
//                 className="text-xs bg-green-600 text-white font-bold px-2 py-1 rounded-lg flex-shrink-0">
//                 Use
//               </button>
//             </div>
//           )}

//           <div className="space-y-3">
//             <textarea
//               value={address.fullAddress}
//               onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
//               placeholder="Ghar ka address, gali, mohalla..."
//               rows={2}
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
//             />
//             <div className="grid grid-cols-2 gap-3">
//               <input
//                 type="text"
//                 value={address.city}
//                 onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                 placeholder="City"
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//               <input
//                 type="text"
//                 value={address.pincode}
//                 onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                 placeholder="Pincode"
//                 maxLength={6}
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Payment Method */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">💳 Payment Method</h2>
//           <div className="grid grid-cols-3 gap-3">
//             {[
//               { id: 'COD', label: 'Cash on Delivery', emoji: '💵' },
//               { id: 'ONLINE', label: 'Online Payment', emoji: '💳' },
//               { id: 'UDHAR', label: 'Udhar (Baad mein)', emoji: '🤝' },
//             ].map((method) => (
//               <button key={method.id}
//                 onClick={() => setPaymentMethod(method.id)}
//                 className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
//                   paymentMethod === method.id
//                     ? 'border-gray-900 bg-gray-50'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}>
//                 <span className="text-2xl">{method.emoji}</span>
//                 <span className="text-xs font-bold text-gray-900 text-center">{method.label}</span>
//                 {paymentMethod === method.id && (
//                   <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>

//           {paymentMethod === 'UDHAR' && (
//             <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl">
//               <p className="text-xs text-amber-700 font-bold mb-2">🤝 Udhar — 30 din mein pay karna hoga</p>
//               <textarea
//                 value={udharNote}
//                 onChange={(e) => setUdharNote(e.target.value)}
//                 placeholder="Koi note shop owner ke liye... (optional)"
//                 rows={2}
//                 className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
//               />
//             </div>
//           )}
//         </div>

//         {/* Bill Summary */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-4">
//           <h2 className="font-bold text-gray-900 text-sm mb-3">🧾 Bill Summary</h2>
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Items total</span>
//               <span className="font-semibold text-gray-900">₹{totalProductPrice}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Delivery charge</span>
//               <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-gray-900'}`}>
//                 {deliveryCharge === 0 ? 'FREE 🎉' : `₹${deliveryCharge}`}
//               </span>
//             </div>
//             <div className="border-t border-gray-100 pt-2 flex justify-between">
//               <span className="font-black text-gray-900">Total</span>
//               <span className="font-black text-gray-900 text-lg">₹{totalAmount}</span>
//             </div>
//           </div>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={orderLoading}
//           className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50 text-lg flex items-center justify-center gap-2">
//           {orderLoading ? (
//             <>
//               <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               Order place ho raha hai...
//             </>
//           ) : (
//             <>🚀 Order Place Karo — ₹{totalAmount}</>
//           )}
//         </button>

//       </div>

//       <BottomNav />
//     </div>
//   );
// }







// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import { placeOrder } from '@/services/orderService';
// import BottomNav from '@/components/common/BottomNav';
// import toast from 'react-hot-toast';

// export default function CartPage() {
//   const router = useRouter();
//   const { isAuthenticated, isRestoring, user } = useAuth();
//   const { items, shopId, totalProductPrice, deliveryCharge, totalAmount, fetchCart, updateCartItem, removeFromCart, emptyCart } = useCart();

//   const [loading, setLoading] = useState(true);
//   const [orderLoading, setOrderLoading] = useState(false);
//   const [address, setAddress] = useState(() => {
//     if (typeof window === 'undefined') return { fullAddress: '', city: '', pincode: '' };
//     const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const addr = savedUser.address || {};
//     return {
//       fullAddress: addr.fullAddress || '',
//       city: addr.city || '',
//       pincode: addr.pincode || '',
//     };
//   });
//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [udharNote, setUdharNote] = useState('');

//   useEffect(() => {
//     if (isRestoring) return;
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     loadCart();
//   }, [isAuthenticated, isRestoring]);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const addr = user?.address || savedUser.address || {};
//     if (addr.fullAddress || addr.city) {
//       setAddress({
//         fullAddress: addr.fullAddress || '',
//         city: addr.city || '',
//         pincode: addr.pincode || '',
//       });
//     }
//   }, [user]);

//   const loadCart = async () => {
//     setLoading(true);
//     await fetchCart();
//     setLoading(false);
//   };

//   const handleQuantityChange = async (productId, currentQty, change) => {
//     const id = productId?._id || productId;
//     const newQty = currentQty + change;
//     if (newQty <= 0) {
//       await removeFromCart(id);
//     } else {
//       await updateCartItem(id, newQty);
//     }
//   };

//   const handleRemove = async (productId) => {
//     const id = productId?._id || productId;
//     await removeFromCart(id);
//     toast.success('Item remove ho gaya!');
//   };

//   const handlePlaceOrder = async () => {
//     if (!address.fullAddress || !address.city) {
//       toast.error('Delivery address fill karo!');
//       return;
//     }
//     setOrderLoading(true);
//     try {
//       await placeOrder({ paymentMethod, deliveryAddress: address, udharNote });
//       toast.success('Order place ho gaya! 🎉');
//       await emptyCart();
//       router.push('/orders');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Order failed!');
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   if (isRestoring || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pb-24 px-4 pt-6 space-y-3">
//         {[1, 2, 3].map(i => (
//           <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />
//         ))}
//         <BottomNav />
//       </div>
//     );
//   }

//   if (!items || items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
//         <div className="text-center">
//           <div className="w-28 h-28 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 border border-gray-100">
//             <span className="text-5xl">🛒</span>
//           </div>
//           <h2 className="text-2xl font-black text-gray-900 mb-2">Cart Khaali Hai</h2>
//           <p className="text-gray-400 text-sm mb-8">Koi product add nahi kiya abhi tak</p>
//           <Link href="/feed"
//             className="bg-gray-900 text-white font-bold px-8 py-3.5 rounded-2xl inline-block active:scale-95 transition-all text-sm tracking-wide">
//             Shops Browse Karo →
//           </Link>
//         </div>
//         <BottomNav />
//       </div>
//     );
//   }

//   const PAYMENT_METHODS = [
//     { id: 'COD', label: 'Cash on Delivery', emoji: '💵', desc: 'Deliver hone pe pay karo' },
//     { id: 'ONLINE', label: 'Online Pay', emoji: '💳', desc: 'UPI / Card' },
//     { id: 'UDHAR', label: 'Udhar', emoji: '🤝', desc: '30 din mein pay karo' },
//   ];

//   return (
//     <div className="min-h-screen pb-28" style={{ background: '#f7f7f5' }}>

//       {/* ── HEADER ── */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
//         <div className="px-4 py-4 flex items-center gap-3">
//           <button onClick={() => router.back()}
//             className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 active:scale-90 transition-all">
//             ←
//           </button>
//           <div className="flex-1">
//             <h1 className="text-lg font-black text-gray-900 leading-none">My Cart</h1>
//             <p className="text-xs text-gray-400 mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
//           </div>
//           <div className="bg-gray-900 text-white text-xs font-black px-3 py-2 rounded-xl tracking-wide">
//             ₹{totalAmount}
//           </div>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-3">

//         {/* ── CART ITEMS ── */}
//         <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
//           <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//             <h2 className="font-black text-gray-900 text-sm">🛍️ Your Items</h2>
//             <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg font-medium">{items.length} products</span>
//           </div>

//           <div className="divide-y divide-gray-50">
//             {items.map((item) => (
//               <div key={item.productId?._id || item.productId} className="p-4">

//                 {/* Top row — image + name + total */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center">
//                     {item.image
//                       ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                       : <span className="text-2xl">📦</span>
//                     }
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-black text-gray-900 text-sm leading-tight line-clamp-2">{item.name}</p>
//                     <p className="text-xs text-gray-400 mt-1">₹{item.price} per item</p>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <p className="font-black text-gray-900 text-base">₹{item.price * item.quantity}</p>
//                   </div>
//                 </div>

//                 {/* Bottom row — remove + qty */}
//                 <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
//                   <button
//                     onClick={() => handleRemove(item.productId)}
//                     className="flex items-center gap-1.5 text-xs text-red-400 font-bold hover:text-red-600 transition-colors active:scale-95">
//                     <span>🗑️</span>
//                     <span>Remove</span>
//                   </button>

//                   {/* Qty controls */}
//                   <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
//                     <button
//                       onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
//                       className="w-8 h-8 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-gray-700 font-black text-lg active:scale-90 transition-all">
//                       −
//                     </button>
//                     <span className="w-8 text-center font-black text-gray-900 text-sm">
//                       {item.quantity}
//                     </span>
//                     <button
//                       onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
//                       className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-lg active:scale-90 transition-all">
//                       +
//                     </button>
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── DELIVERY ADDRESS ── */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">📍 Delivery Address</h2>
//             <p className="text-xs text-gray-400 mt-0.5">Profile se auto-fill ho gaya</p>
//           </div>

//           <div className="p-4 space-y-3">
//             {/* Saved address banner */}
//             {address.fullAddress && (
//               <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
//                 <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-black text-emerald-700">Saved Address</p>
//                   <p className="text-xs text-emerald-600 truncate mt-0.5">
//                     {address.fullAddress}, {address.city}
//                   </p>
//                 </div>
//               </div>
//             )}

//             <textarea
//               value={address.fullAddress}
//               onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
//               placeholder="Ghar ka address, gali, mohalla..."
//               rows={2}
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
//             />
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="text"
//                 value={address.city}
//                 onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                 placeholder="City"
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//               <input
//                 type="text"
//                 value={address.pincode}
//                 onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                 placeholder="Pincode"
//                 maxLength={6}
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* ── PAYMENT METHOD ── */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">💳 Payment Method</h2>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-3 gap-2">
//               {PAYMENT_METHODS.map((method) => (
//                 <button key={method.id}
//                   onClick={() => setPaymentMethod(method.id)}
//                   className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${
//                     paymentMethod === method.id
//                       ? 'border-gray-900 bg-gray-900'
//                       : 'border-gray-100 bg-gray-50 hover:border-gray-300'
//                   }`}>
//                   <span className="text-2xl">{method.emoji}</span>
//                   <p className={`font-black text-xs text-center leading-tight ${
//                     paymentMethod === method.id ? 'text-white' : 'text-gray-800'
//                   }`}>
//                     {method.label}
//                   </p>
//                   {paymentMethod === method.id && (
//                     <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
//                       <div className="w-2 h-2 bg-gray-900 rounded-full" />
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {paymentMethod === 'UDHAR' && (
//               <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
//                 <p className="text-xs text-amber-700 font-black mb-2">🤝 30 din mein pay karna hoga</p>
//                 <textarea
//                   value={udharNote}
//                   onChange={(e) => setUdharNote(e.target.value)}
//                   placeholder="Shop owner ke liye note... (optional)"
//                   rows={2}
//                   className="w-full px-3 py-2.5 bg-white border border-amber-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── BILL SUMMARY ── */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">🧾 Bill Summary</h2>
//           </div>
//           <div className="p-4 space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">Items total</span>
//               <span className="font-bold text-gray-900">₹{totalProductPrice}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">Delivery charge</span>
//               {deliveryCharge === 0
//                 ? <span className="font-bold text-emerald-600 text-sm">FREE 🎉</span>
//                 : <span className="font-bold text-gray-900">₹{deliveryCharge}</span>
//               }
//             </div>
//             {deliveryCharge === 0 && (
//               <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 flex items-center gap-2">
//                 <span className="text-sm">✨</span>
//                 <p className="text-xs text-emerald-600 font-bold">₹100+ order pe free delivery!</p>
//               </div>
//             )}
//             <div className="border-t-2 border-dashed border-gray-100 pt-3 flex justify-between items-center">
//               <span className="font-black text-gray-900 text-base">Total Payable</span>
//               <span className="font-black text-gray-900 text-2xl">₹{totalAmount}</span>
//             </div>
//           </div>
//         </div>

//         {/* ── PLACE ORDER BUTTON ── */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={orderLoading}
//           className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 text-base flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20">
//           {orderLoading ? (
//             <>
//               <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               Order place ho raha hai...
//             </>
//           ) : (
//             <>🚀 Order Place Karo — ₹{totalAmount}</>
//           )}
//         </button>

//       </div>

//       <BottomNav />
//     </div>
//   );
// }






// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import { placeOrder } from '@/services/orderService';
// import API from '@/services/api';
// import BottomNav from '@/components/common/BottomNav';
// import toast from 'react-hot-toast';

// export default function CartPage() {
//   const router = useRouter();
//   const { isAuthenticated, isRestoring, user } = useAuth();
//   const {
//     items, shopId, totalProductPrice, deliveryCharge,
//     totalAmount, fetchCart, updateCartItem, removeFromCart, emptyCart
//   } = useCart();

//   const [loading, setLoading] = useState(true);
//   const [orderLoading, setOrderLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [udharNote, setUdharNote] = useState('');
//   const [address, setAddress] = useState(() => {
//     if (typeof window === 'undefined') return { fullAddress: '', city: '', pincode: '' };
//     const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const addr = savedUser.address || {};
//     return {
//       fullAddress: addr.fullAddress || '',
//       city: addr.city || '',
//       pincode: addr.pincode || '',
//     };
//   });

//   // UPI states
//   const [upiStep, setUpiStep] = useState('idle'); // idle | show_upi | confirm_utr
//   const [shopUpiId, setShopUpiId] = useState('');
//   const [placedOrderId, setPlacedOrderId] = useState(null);
//   const [utrNumber, setUtrNumber] = useState('');
//   const [utrLoading, setUtrLoading] = useState(false);

//   useEffect(() => {
//     if (isRestoring) return;
//     if (!isAuthenticated) { router.push('/auth/login'); return; }
//     loadCart();
//   }, [isAuthenticated, isRestoring]);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const addr = user?.address || savedUser.address || {};
//     if (addr.fullAddress || addr.city) {
//       setAddress({
//         fullAddress: addr.fullAddress || '',
//         city: addr.city || '',
//         pincode: addr.pincode || '',
//       });
//     }
//   }, [user]);

//   const loadCart = async () => {
//     setLoading(true);
//     await fetchCart();
//     setLoading(false);
//   };

//   const handleQuantityChange = async (productId, currentQty, change) => {
//     const id = productId?._id || productId;
//     const newQty = currentQty + change;
//     if (newQty <= 0) await removeFromCart(id);
//     else await updateCartItem(id, newQty);
//   };

//   const handleRemove = async (productId) => {
//     const id = productId?._id || productId;
//     await removeFromCart(id);
//     toast.success('Item remove ho gaya!');
//   };

//   // ── COD / UDHAR order place ──
//   const handlePlaceOrder = async () => {
//     if (!address.fullAddress || !address.city) {
//       toast.error('Delivery address fill karo!');
//       return;
//     }

//     // ONLINE select hai to UPI flow chalao
//     if (paymentMethod === 'ONLINE') {
//       handleUpiFlow();
//       return;
//     }

//     setOrderLoading(true);
//     try {
//       await placeOrder({ paymentMethod, deliveryAddress: address, udharNote });
//       toast.success('Order place ho gaya! 🎉');
//       await emptyCart();
//       router.push('/orders');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Order failed!');
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   // ── UPI Step 1: Order banao + Shop UPI fetch karo ──
//   const handleUpiFlow = async () => {
//     if (!address.fullAddress || !address.city) {
//       toast.error('Delivery address fill karo!');
//       return;
//     }
//     setOrderLoading(true);
//     try {
//       // Order place karo with ONLINE method (payment pending rahega)
//       const res = await API.post('/payment/upi-order', {
//         deliveryAddress: address,
//       });

//       setShopUpiId(res.data.upiId);
//       setPlacedOrderId(res.data.order._id);
//       setUpiStep('show_upi');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Order failed!');
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   // UPI deep link — GPay/PhonePe/Paytm sab open kar leta hai
//   const getUpiLink = () => {
//     const name = encodeURIComponent('Apna Market');
//     const note = encodeURIComponent('Order Payment');
//     return `upi://pay?pa=${shopUpiId}&pn=${name}&am=${totalAmount}&tn=${note}&cu=INR`;
//   };

//   // ── UPI Step 2: UTR submit karo ──
//   const handleUtrSubmit = async () => {
//     if (!utrNumber.trim() || utrNumber.trim().length < 6) {
//       toast.error('Valid UTR / Transaction ID dalo!');
//       return;
//     }
//     setUtrLoading(true);
//     try {
//       await API.post('/payment/upi-confirm', {
//         orderId: placedOrderId,
//         utrNumber: utrNumber.trim(),
//       });
//       toast.success('Payment details submit ho gaya! Shop owner confirm karega. 🎉');
//       await emptyCart();
//       router.push('/orders');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Submit failed!');
//     } finally {
//       setUtrLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────
//   // UPI Screen — Step: show_upi
//   // ─────────────────────────────────────────────
//   if (upiStep === 'show_upi') {
//     return (
//       <div className="min-h-screen bg-gray-50 pb-28">
//         <div className="bg-white border-b border-gray-100 sticky top-0 z-40 px-4 py-4 flex items-center gap-3">
//           <button onClick={() => setUpiStep('idle')}
//             className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600">
//             ←
//           </button>
//           <h1 className="text-lg font-black text-gray-900">UPI Payment 💳</h1>
//         </div>

//         <div className="px-4 pt-6 space-y-4">

//           {/* Amount */}
//           <div className="bg-gray-900 rounded-3xl p-6 text-center text-white">
//             <p className="text-sm text-gray-400 mb-1">Pay karo</p>
//             <p className="text-4xl font-black">₹{totalAmount}</p>
//             <p className="text-xs text-gray-400 mt-2">UPI ID: {shopUpiId}</p>
//           </div>

//           {/* Pay via UPI App */}
//           <div className="bg-white rounded-3xl border border-gray-100 p-5">
//             <p className="font-black text-gray-900 mb-1">📱 UPI App se pay karo</p>
//             <p className="text-xs text-gray-400 mb-4">
//               Neeche button dabao — GPay, PhonePe, Paytm ya koi bhi UPI app khulega
//             </p>

//             <a
//               href={getUpiLink()}
//               className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl text-center block active:scale-95 transition-all text-base">
//               📲 UPI App Open Karo
//             </a>

//             <p className="text-xs text-gray-400 text-center mt-3">
//               Ya manually UPI ID copy karo:
//             </p>

//             {/* Manual UPI copy */}
//             <div className="mt-2 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-3">
//               <p className="flex-1 text-sm font-bold text-gray-900 truncate">{shopUpiId}</p>
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(shopUpiId);
//                   toast.success('UPI ID copy ho gaya!');
//                 }}
//                 className="text-xs bg-gray-900 text-white font-bold px-3 py-1.5 rounded-xl active:scale-95 flex-shrink-0">
//                 Copy
//               </button>
//             </div>
//           </div>

//           {/* UTR input */}
//           <div className="bg-white rounded-3xl border border-gray-100 p-5">
//             <p className="font-black text-gray-900 mb-1">✅ Payment ke baad</p>
//             <p className="text-xs text-gray-400 mb-4">
//               Payment hone ke baad apna UTR / Transaction ID dalo — shop owner verify karega
//             </p>
//             <input
//               type="text"
//               value={utrNumber}
//               onChange={(e) => setUtrNumber(e.target.value)}
//               placeholder="UTR / Transaction ID (e.g. 423198765432)"
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//             />
//             <p className="text-xs text-gray-400 mt-2">
//               💡 UPI app me payment history me milega — 12 digit number
//             </p>
//           </div>

//           {/* Submit button */}
//           <button
//             onClick={handleUtrSubmit}
//             disabled={utrLoading || !utrNumber.trim()}
//             className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
//             {utrLoading ? (
//               <>
//                 <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Submit ho raha hai...
//               </>
//             ) : '✅ Payment Done — Submit Karo'}
//           </button>

//           <p className="text-xs text-gray-400 text-center pb-4">
//             ⚠️ Payment karne ke baad hi submit karo — shop owner verify karega
//           </p>
//         </div>

//         <BottomNav />
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────────
//   // Loading / Empty Cart screens
//   // ─────────────────────────────────────────────
//   if (isRestoring || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pb-24 px-4 pt-6 space-y-3">
//         {[1, 2, 3].map(i => (
//           <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />
//         ))}
//         <BottomNav />
//       </div>
//     );
//   }

//   if (!items || items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
//         <div className="text-center">
//           <div className="w-28 h-28 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 border border-gray-100">
//             <span className="text-5xl">🛒</span>
//           </div>
//           <h2 className="text-2xl font-black text-gray-900 mb-2">Cart Khaali Hai</h2>
//           <p className="text-gray-400 text-sm mb-8">Koi product add nahi kiya abhi tak</p>
//           <Link href="/feed"
//             className="bg-gray-900 text-white font-bold px-8 py-3.5 rounded-2xl inline-block active:scale-95 transition-all text-sm tracking-wide">
//             Shops Browse Karo →
//           </Link>
//         </div>
//         <BottomNav />
//       </div>
//     );
//   }

//   const PAYMENT_METHODS = [
//     { id: 'COD', label: 'Cash on Delivery', emoji: '💵', desc: 'Deliver hone pe pay karo' },
//     { id: 'ONLINE', label: 'Online Pay', emoji: '💳', desc: 'UPI se pay karo' },
//     { id: 'UDHAR', label: 'Udhar', emoji: '🤝', desc: '30 din mein pay karo' },
//   ];

//   // ─────────────────────────────────────────────
//   // Main Cart Screen
//   // ─────────────────────────────────────────────
//   return (
//     <div className="min-h-screen pb-28" style={{ background: '#f7f7f5' }}>

//       {/* Header */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
//         <div className="px-4 py-4 flex items-center gap-3">
//           <button onClick={() => router.back()}
//             className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 active:scale-90 transition-all">
//             ←
//           </button>
//           <div className="flex-1">
//             <h1 className="text-lg font-black text-gray-900 leading-none">My Cart</h1>
//             <p className="text-xs text-gray-400 mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
//           </div>
//           <div className="bg-gray-900 text-white text-xs font-black px-3 py-2 rounded-xl tracking-wide">
//             ₹{totalAmount}
//           </div>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-3">

//         {/* Cart Items */}
//         <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
//           <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//             <h2 className="font-black text-gray-900 text-sm">🛍️ Your Items</h2>
//             <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg font-medium">{items.length} products</span>
//           </div>

//           <div className="divide-y divide-gray-50">
//             {items.map((item) => (
//               <div key={item.productId?._id || item.productId} className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center">
//                     {item.image
//                       ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                       : <span className="text-2xl">📦</span>
//                     }
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-black text-gray-900 text-sm leading-tight line-clamp-2">{item.name}</p>
//                     <p className="text-xs text-gray-400 mt-1">₹{item.price} per item</p>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <p className="font-black text-gray-900 text-base">₹{item.price * item.quantity}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
//                   <button
//                     onClick={() => handleRemove(item.productId)}
//                     className="flex items-center gap-1.5 text-xs text-red-400 font-bold hover:text-red-600 transition-colors active:scale-95">
//                     <span>🗑️</span><span>Remove</span>
//                   </button>
//                   <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
//                     <button
//                       onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
//                       className="w-8 h-8 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-gray-700 font-black text-lg active:scale-90 transition-all">
//                       −
//                     </button>
//                     <span className="w-8 text-center font-black text-gray-900 text-sm">{item.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
//                       className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-lg active:scale-90 transition-all">
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Delivery Address */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">📍 Delivery Address</h2>
//             <p className="text-xs text-gray-400 mt-0.5">Profile se auto-fill ho gaya</p>
//           </div>
//           <div className="p-4 space-y-3">
//             {address.fullAddress && (
//               <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
//                 <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-black text-emerald-700">Saved Address</p>
//                   <p className="text-xs text-emerald-600 truncate mt-0.5">
//                     {address.fullAddress}, {address.city}
//                   </p>
//                 </div>
//               </div>
//             )}
//             <textarea
//               value={address.fullAddress}
//               onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
//               placeholder="Ghar ka address, gali, mohalla..."
//               rows={2}
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
//             />
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="text" value={address.city}
//                 onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                 placeholder="City"
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//               <input
//                 type="text" value={address.pincode}
//                 onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                 placeholder="Pincode" maxLength={6}
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Payment Method */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">💳 Payment Method</h2>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-3 gap-2">
//               {PAYMENT_METHODS.map((method) => (
//                 <button key={method.id}
//                   onClick={() => setPaymentMethod(method.id)}
//                   className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${
//                     paymentMethod === method.id
//                       ? 'border-gray-900 bg-gray-900'
//                       : 'border-gray-100 bg-gray-50 hover:border-gray-300'
//                   }`}>
//                   <span className="text-2xl">{method.emoji}</span>
//                   <p className={`font-black text-xs text-center leading-tight ${
//                     paymentMethod === method.id ? 'text-white' : 'text-gray-800'
//                   }`}>
//                     {method.label}
//                   </p>
//                   {paymentMethod === method.id && (
//                     <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
//                       <div className="w-2 h-2 bg-gray-900 rounded-full" />
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* ONLINE info */}
//             {paymentMethod === 'ONLINE' && (
//               <div className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
//                 <p className="text-xs text-blue-700 font-black mb-1">💳 UPI se pay karo</p>
//                 <p className="text-xs text-blue-500">
//                   Order button dabane ke baad shop ka UPI ID dikhega — GPay / PhonePe / Paytm se pay karo
//                 </p>
//               </div>
//             )}

//             {/* UDHAR note */}
//             {paymentMethod === 'UDHAR' && (
//               <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
//                 <p className="text-xs text-amber-700 font-black mb-2">🤝 30 din mein pay karna hoga</p>
//                 <textarea
//                   value={udharNote}
//                   onChange={(e) => setUdharNote(e.target.value)}
//                   placeholder="Shop owner ke liye note... (optional)"
//                   rows={2}
//                   className="w-full px-3 py-2.5 bg-white border border-amber-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bill Summary */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">🧾 Bill Summary</h2>
//           </div>
//           <div className="p-4 space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">Items total</span>
//               <span className="font-bold text-gray-900">₹{totalProductPrice}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">Delivery charge</span>
//               {deliveryCharge === 0
//                 ? <span className="font-bold text-emerald-600 text-sm">FREE 🎉</span>
//                 : <span className="font-bold text-gray-900">₹{deliveryCharge}</span>
//               }
//             </div>
//             {deliveryCharge === 0 && (
//               <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 flex items-center gap-2">
//                 <span className="text-sm">✨</span>
//                 <p className="text-xs text-emerald-600 font-bold">₹100+ order pe free delivery!</p>
//               </div>
//             )}
//             <div className="border-t-2 border-dashed border-gray-100 pt-3 flex justify-between items-center">
//               <span className="font-black text-gray-900 text-base">Total Payable</span>
//               <span className="font-black text-gray-900 text-2xl">₹{totalAmount}</span>
//             </div>
//           </div>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={orderLoading}
//           className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 text-base flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20">
//           {orderLoading ? (
//             <>
//               <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               {paymentMethod === 'ONLINE' ? 'UPI details la raha hai...' : 'Order place ho raha hai...'}
//             </>
//           ) : (
//             <>
//               {paymentMethod === 'ONLINE' ? '💳 Pay via UPI' : '🚀 Order Place Karo'} — ₹{totalAmount}
//             </>
//           )}
//         </button>

//       </div>
//       <BottomNav />
//     </div>
//   );
// }








// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { useCart } from '@/hooks/useCart';
// import { placeOrder } from '@/services/orderService';
// import API from '@/services/api';
// import BottomNav from '@/components/common/BottomNav';
// import toast from 'react-hot-toast';

// export default function CartPage() {
//   const router = useRouter();
//   const { isAuthenticated, isRestoring, user } = useAuth();
//   const {
//     items, shopId, totalProductPrice, deliveryCharge,
//     totalAmount, fetchCart, updateCartItem, removeFromCart, emptyCart
//   } = useCart();

//   const [loading, setLoading] = useState(true);
//   const [orderLoading, setOrderLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('COD');
//   const [udharNote, setUdharNote] = useState('');
//   const [address, setAddress] = useState(() => {
//     if (typeof window === 'undefined') return { fullAddress: '', city: '', pincode: '' };
//     const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const addr = savedUser.address || {};
//     return {
//       fullAddress: addr.fullAddress || '',
//       city: addr.city || '',
//       pincode: addr.pincode || '',
//     };
//   });

//   // UPI states
//   const [upiStep, setUpiStep] = useState('idle'); // idle | show_upi | confirm_utr
//   const [shopUpiId, setShopUpiId] = useState('');
//   const [placedOrderId, setPlacedOrderId] = useState(null);
//   const [utrNumber, setUtrNumber] = useState('');
//   const [utrLoading, setUtrLoading] = useState(false);

//   useEffect(() => {
//     if (isRestoring) return;
//     if (!isAuthenticated) { router.push('/auth/login'); return; }
//     loadCart();
//   }, [isAuthenticated, isRestoring]);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const addr = user?.address || savedUser.address || {};
//     if (addr.fullAddress || addr.city) {
//       setAddress({
//         fullAddress: addr.fullAddress || '',
//         city: addr.city || '',
//         pincode: addr.pincode || '',
//       });
//     }
//   }, [user]);

//   const loadCart = async () => {
//     setLoading(true);
//     await fetchCart();
//     setLoading(false);
//   };

//   const handleQuantityChange = async (productId, currentQty, change) => {
//     const id = productId?._id || productId;
//     const newQty = currentQty + change;
//     if (newQty <= 0) await removeFromCart(id);
//     else await updateCartItem(id, newQty);
//   };

//   const handleRemove = async (productId) => {
//     const id = productId?._id || productId;
//     await removeFromCart(id);
//     toast.success('Item remove ho gaya!');
//   };

//   // ── COD / UDHAR order place ──
//   const handlePlaceOrder = async () => {
//    if (!address.fullAddress?.trim() || !address.city?.trim()) {
//       toast.error('Delivery address fill karo!');
//       return;
//     }

//     // ONLINE select hai to UPI flow chalao
//     if (paymentMethod === 'ONLINE') {
//       handleUpiFlow();
//       return;
//     }

//     setOrderLoading(true);
//     try {
//       await placeOrder({ paymentMethod, deliveryAddress: address, udharNote });
//       toast.success('Order place ho gaya! 🎉');
//       await emptyCart();
//       router.push('/orders');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Order failed!');
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   // ── UPI Step 1: Order banao + Shop UPI fetch karo ──
//   const handleUpiFlow = async () => {
//     if (!address.fullAddress || !address.city) {
//       toast.error('Delivery address fill karo!');
//       return;
//     }
//     setOrderLoading(true);
//     try {
//       // Order place karo with ONLINE method (payment pending rahega)
//       const res = await API.post('/payment/upi-order', {
//         deliveryAddress: address,
//       });

//       setShopUpiId(res.data.upiId);
//       setPlacedOrderId(res.data.order._id);
//       setUpiStep('show_upi');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Order failed!');
//     } finally {
//       setOrderLoading(false);
//     }
//   };

//   // UPI deep link — GPay/PhonePe/Paytm sab open kar leta hai
//   const getUpiLink = () => {
//     const name = encodeURIComponent('Apna Market');
//     const note = encodeURIComponent('Order Payment');
//     return `upi://pay?pa=${shopUpiId}&pn=${name}&am=${totalAmount}&tn=${note}&cu=INR`;
//   };

//   // ── UPI Step 2: UTR submit karo ──
//   const handleUtrSubmit = async () => {
//     if (!utrNumber.trim() || utrNumber.trim().length < 6) {
//       toast.error('Valid UTR / Transaction ID dalo!');
//       return;
//     }
//     setUtrLoading(true);
//     try {
//       await API.post('/payment/upi-confirm', {
//         orderId: placedOrderId,
//         utrNumber: utrNumber.trim(),
//       });
//       toast.success('Payment details submit ho gaya! Shop owner confirm karega. 🎉');
//       await emptyCart();
//       router.push('/orders');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Submit failed!');
//     } finally {
//       setUtrLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────
//   // UPI Screen — Step: show_upi
//   // ─────────────────────────────────────────────
//   if (upiStep === 'show_upi') {
//     return (
//       <div className="min-h-screen bg-gray-50 pb-28">
//         <div className="bg-white border-b border-gray-100 sticky top-0 z-40 px-4 py-4 flex items-center gap-3">
//           <button onClick={() => setUpiStep('idle')}
//             className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600">
//             ←
//           </button>
//           <h1 className="text-lg font-black text-gray-900">UPI Payment 💳</h1>
//         </div>

//         <div className="px-4 pt-6 space-y-4">

//           {/* Amount */}
//           <div className="bg-gray-900 rounded-3xl p-6 text-center text-white">
//             <p className="text-sm text-gray-400 mb-1">Pay karo</p>
//             <p className="text-4xl font-black">₹{totalAmount}</p>
//             <p className="text-xs text-gray-400 mt-2">UPI ID: {shopUpiId}</p>
//           </div>

//           {/* Pay via UPI App */}
//           <div className="bg-white rounded-3xl border border-gray-100 p-5">
//             <p className="font-black text-gray-900 mb-1">📱 UPI App se pay karo</p>
//             <p className="text-xs text-gray-400 mb-4">
//               Neeche button dabao — GPay, PhonePe, Paytm ya koi bhi UPI app khulega
//             </p>

//             <a
//               href={getUpiLink()}
//               className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl text-center block active:scale-95 transition-all text-base">
//               📲 UPI App Open Karo
//             </a>

//             <p className="text-xs text-gray-400 text-center mt-3">
//               Ya manually UPI ID copy karo:
//             </p>

//             {/* Manual UPI copy */}
//             <div className="mt-2 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-3">
//               <p className="flex-1 text-sm font-bold text-gray-900 truncate">{shopUpiId}</p>
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(shopUpiId);
//                   toast.success('UPI ID copy ho gaya!');
//                 }}
//                 className="text-xs bg-gray-900 text-white font-bold px-3 py-1.5 rounded-xl active:scale-95 flex-shrink-0">
//                 Copy
//               </button>
//             </div>
//           </div>

//           {/* UTR input */}
//           <div className="bg-white rounded-3xl border border-gray-100 p-5">
//             <p className="font-black text-gray-900 mb-1">✅ Payment ke baad</p>
//             <p className="text-xs text-gray-400 mb-4">
//               Payment hone ke baad apna UTR / Transaction ID dalo — shop owner verify karega
//             </p>
//             <input
//               type="text"
//               value={utrNumber}
//               onChange={(e) => setUtrNumber(e.target.value)}
//               placeholder="UTR / Transaction ID (e.g. 423198765432)"
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//             />
//             <p className="text-xs text-gray-400 mt-2">
//               💡 UPI app me payment history me milega — 12 digit number
//             </p>
//           </div>

//           {/* Submit button */}
//           <button
//             onClick={handleUtrSubmit}
//             disabled={utrLoading || !utrNumber.trim()}
//             className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
//             {utrLoading ? (
//               <>
//                 <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Submit ho raha hai...
//               </>
//             ) : '✅ Payment Done — Submit Karo'}
//           </button>

//           <p className="text-xs text-gray-400 text-center pb-4">
//             ⚠️ Payment karne ke baad hi submit karo — shop owner verify karega
//           </p>
//         </div>

//         <BottomNav />
//       </div>
//     );
//   }

//   // ─────────────────────────────────────────────
//   // Loading / Empty Cart screens
//   // ─────────────────────────────────────────────
//   if (isRestoring || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pb-24 px-4 pt-6 space-y-3">
//         {[1, 2, 3].map(i => (
//           <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />
//         ))}
//         <BottomNav />
//       </div>
//     );
//   }

//   if (!items || items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
//         <div className="text-center">
//           <div className="w-28 h-28 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 border border-gray-100">
//             <span className="text-5xl">🛒</span>
//           </div>
//           <h2 className="text-2xl font-black text-gray-900 mb-2">Cart Khaali Hai</h2>
//           <p className="text-gray-400 text-sm mb-8">Koi product add nahi kiya abhi tak</p>
//           <Link href="/feed"
//             className="bg-gray-900 text-white font-bold px-8 py-3.5 rounded-2xl inline-block active:scale-95 transition-all text-sm tracking-wide">
//             Shops Browse Karo →
//           </Link>
//         </div>
//         <BottomNav />
//       </div>
//     );
//   }

//   const PAYMENT_METHODS = [
//     { id: 'COD', label: 'Cash on Delivery', emoji: '💵', desc: 'Deliver hone pe pay karo' },
//     { id: 'ONLINE', label: 'Online Pay', emoji: '💳', desc: 'UPI se pay karo' },
//     { id: 'UDHAR', label: 'Udhar', emoji: '🤝', desc: '30 din mein pay karo' },
//   ];

//   // ─────────────────────────────────────────────
//   // Main Cart Screen
//   // ─────────────────────────────────────────────
//   return (
//     <div className="min-h-screen pb-28" style={{ background: '#f7f7f5' }}>

//       {/* Header */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
//         <div className="px-4 py-4 flex items-center gap-3">
//           <button onClick={() => router.back()}
//             className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 active:scale-90 transition-all">
//             ←
//           </button>
//           <div className="flex-1">
//             <h1 className="text-lg font-black text-gray-900 leading-none">My Cart</h1>
//             <p className="text-xs text-gray-400 mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
//           </div>
//           <div className="bg-gray-900 text-white text-xs font-black px-3 py-2 rounded-xl tracking-wide">
//             ₹{totalAmount}
//           </div>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-3">

//         {/* Cart Items */}
//         <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
//           <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//             <h2 className="font-black text-gray-900 text-sm">🛍️ Your Items</h2>
//             <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg font-medium">{items.length} products</span>
//           </div>

//           <div className="divide-y divide-gray-50">
//             {items.map((item) => (
//               <div key={item.productId?._id || item.productId} className="p-4">
//                 <div className="flex items-center gap-3">
//                   <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center">
//                     {item.image
//                       ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                       : <span className="text-2xl">📦</span>
//                     }
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-black text-gray-900 text-sm leading-tight line-clamp-2">{item.name}</p>
//                     <p className="text-xs text-gray-400 mt-1">₹{item.price} per item</p>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <p className="font-black text-gray-900 text-base">₹{item.price * item.quantity}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
//                   <button
//                     onClick={() => handleRemove(item.productId)}
//                     className="flex items-center gap-1.5 text-xs text-red-400 font-bold hover:text-red-600 transition-colors active:scale-95">
//                     <span>🗑️</span><span>Remove</span>
//                   </button>
//                   <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
//                     <button
//                       onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
//                       className="w-8 h-8 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-gray-700 font-black text-lg active:scale-90 transition-all">
//                       −
//                     </button>
//                     <span className="w-8 text-center font-black text-gray-900 text-sm">{item.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
//                       className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-lg active:scale-90 transition-all">
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Delivery Address */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">📍 Delivery Address</h2>
//             <p className="text-xs text-gray-400 mt-0.5">Profile se auto-fill ho gaya</p>
//           </div>
//           <div className="p-4 space-y-3">
//             {address.fullAddress && (
//               <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
//                 <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-black text-emerald-700">Saved Address</p>
//                   <p className="text-xs text-emerald-600 truncate mt-0.5">
//                     {address.fullAddress}, {address.city}
//                   </p>
//                 </div>
//               </div>
//             )}
//             <textarea
//               value={address.fullAddress}
//               onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
//               placeholder="Ghar ka address, gali, mohalla..."
//               rows={2}
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
//             />
//             <div className="grid grid-cols-2 gap-2">
//               <input
//                 type="text" value={address.city}
//                 onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                 placeholder="City"
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//               <input
//                 type="text" value={address.pincode}
//                 onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
//                 placeholder="Pincode" maxLength={6}
//                 className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Payment Method */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">💳 Payment Method</h2>
//           </div>
//           <div className="p-4">
//             <div className="grid grid-cols-3 gap-2">
//               {PAYMENT_METHODS.map((method) => (
//                 <button key={method.id}
//                   onClick={() => setPaymentMethod(method.id)}
//                   className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${
//                     paymentMethod === method.id
//                       ? 'border-gray-900 bg-gray-900'
//                       : 'border-gray-100 bg-gray-50 hover:border-gray-300'
//                   }`}>
//                   <span className="text-2xl">{method.emoji}</span>
//                   <p className={`font-black text-xs text-center leading-tight ${
//                     paymentMethod === method.id ? 'text-white' : 'text-gray-800'
//                   }`}>
//                     {method.label}
//                   </p>
//                   {paymentMethod === method.id && (
//                     <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
//                       <div className="w-2 h-2 bg-gray-900 rounded-full" />
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* ONLINE info */}
//             {paymentMethod === 'ONLINE' && (
//               <div className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
//                 <p className="text-xs text-blue-700 font-black mb-1">💳 UPI se pay karo</p>
//                 <p className="text-xs text-blue-500">
//                   Order button dabane ke baad shop ka UPI ID dikhega — GPay / PhonePe / Paytm se pay karo
//                 </p>
//               </div>
//             )}

//             {/* UDHAR note */}
//             {paymentMethod === 'UDHAR' && (
//               <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
//                 <p className="text-xs text-amber-700 font-black mb-2">🤝 30 din mein pay karna hoga</p>
//                 <textarea
//                   value={udharNote}
//                   onChange={(e) => setUdharNote(e.target.value)}
//                   placeholder="Shop owner ke liye note... (optional)"
//                   rows={2}
//                   className="w-full px-3 py-2.5 bg-white border border-amber-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Bill Summary */}
//         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="px-5 py-4 border-b border-gray-50">
//             <h2 className="font-black text-gray-900 text-sm">🧾 Bill Summary</h2>
//           </div>
//           <div className="p-4 space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">Items total</span>
//               <span className="font-bold text-gray-900">₹{totalProductPrice}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-500">Delivery charge</span>
//               {deliveryCharge === 0
//                 ? <span className="font-bold text-emerald-600 text-sm">FREE 🎉</span>
//                 : <span className="font-bold text-gray-900">₹{deliveryCharge}</span>
//               }
//             </div>
//             {deliveryCharge === 0 && (
//               <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 flex items-center gap-2">
//                 <span className="text-sm">✨</span>
//                 <p className="text-xs text-emerald-600 font-bold">₹100+ order pe free delivery!</p>
//               </div>
//             )}
//             <div className="border-t-2 border-dashed border-gray-100 pt-3 flex justify-between items-center">
//               <span className="font-black text-gray-900 text-base">Total Payable</span>
//               <span className="font-black text-gray-900 text-2xl">₹{totalAmount}</span>
//             </div>
//           </div>
//         </div>

//         {/* Place Order Button */}
//         <button
//           onClick={handlePlaceOrder}
//           disabled={orderLoading}
//           className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 text-base flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20">
//           {orderLoading ? (
//             <>
//               <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               {paymentMethod === 'ONLINE' ? 'UPI details la raha hai...' : 'Order place ho raha hai...'}
//             </>
//           ) : (
//             <>
//               {paymentMethod === 'ONLINE' ? '💳 Pay via UPI' : '🚀 Order Place Karo'} — ₹{totalAmount}
//             </>
//           )}
//         </button>

//       </div>
//       <BottomNav />
//     </div>
//   );
// }









'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { placeOrder } from '@/services/orderService';
import API from '@/services/api';
import BottomNav from '@/components/common/BottomNav';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated, isRestoring, user } = useAuth();
  const {
    items, shopId, totalProductPrice, deliveryCharge,
    totalAmount, fetchCart, updateCartItem, removeFromCart, emptyCart
  } = useCart();

  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [udharNote, setUdharNote] = useState('');

  // ✅ Mobile double tap fix
  const [removingId, setRemovingId] = useState(null);
  const [qtyLoadingId, setQtyLoadingId] = useState(null);

  const [address, setAddress] = useState(() => {
    if (typeof window === 'undefined') return { fullAddress: '', city: '', pincode: '' };
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const addr = savedUser.address || {};
    return {
      fullAddress: addr.fullAddress || '',
      city: addr.city || '',
      pincode: addr.pincode || '',
    };
  });

  // UPI states
  const [upiStep, setUpiStep] = useState('idle');
  const [shopUpiId, setShopUpiId] = useState('');
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [utrNumber, setUtrNumber] = useState('');
  const [utrLoading, setUtrLoading] = useState(false);

  useEffect(() => {
    if (isRestoring) return;
    if (!isAuthenticated) { router.push('/auth/login'); return; }
    loadCart();
  }, [isAuthenticated, isRestoring]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const addr = user?.address || savedUser.address || {};
    if (addr.fullAddress || addr.city) {
      setAddress({
        fullAddress: addr.fullAddress || '',
        city: addr.city || '',
        pincode: addr.pincode || '',
      });
    }
  }, [user]);

  const loadCart = async () => {
    setLoading(true);
    await fetchCart();
    setLoading(false);
  };

  // ✅ Quantity change — double tap fix
  const handleQuantityChange = async (productId, currentQty, change) => {
    const id = productId?._id || productId;
    if (qtyLoadingId === id) return;
    setQtyLoadingId(id);
    try {
      const newQty = currentQty + change;
      if (newQty <= 0) await removeFromCart(id);
      else await updateCartItem(id, newQty);
    } catch (err) {
      toast.error('Update nahi hua, dobara try karo!');
    } finally {
      setQtyLoadingId(null);
    }
  };

  // ✅ Remove — double tap fix
  const handleRemove = async (productId) => {
    const id = productId?._id || productId;
    if (removingId === id) return;
    setRemovingId(id);
    try {
      await removeFromCart(id);
      toast.success('Item remove ho gaya!');
    } catch (err) {
      toast.error('Remove nahi hua, dobara try karo!');
    } finally {
      setRemovingId(null);
    }
  };

  // ── COD / UDHAR order place ──
  const handlePlaceOrder = async () => {
    if (!address.fullAddress?.trim() || !address.city?.trim()) {
      toast.error('Delivery address fill karo!');
      return;
    }

    if (paymentMethod === 'ONLINE') {
      handleUpiFlow();
      return;
    }

    setOrderLoading(true);
    try {
      await placeOrder({ paymentMethod, deliveryAddress: address, udharNote });
      toast.success('Order place ho gaya! 🎉');
      await emptyCart();
      router.push('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order failed!');
    } finally {
      setOrderLoading(false);
    }
  };

  // ── UPI Step 1 ──
  const handleUpiFlow = async () => {
    if (!address.fullAddress || !address.city) {
      toast.error('Delivery address fill karo!');
      return;
    }
    setOrderLoading(true);
    try {
      const res = await API.post('/payment/upi-order', {
        deliveryAddress: address,
      });
      setShopUpiId(res.data.upiId);
      setPlacedOrderId(res.data.order._id);
      setUpiStep('show_upi');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order failed!');
    } finally {
      setOrderLoading(false);
    }
  };

  const getUpiLink = () => {
    const name = encodeURIComponent('Apna Market');
    const note = encodeURIComponent('Order Payment');
    return `upi://pay?pa=${shopUpiId}&pn=${name}&am=${totalAmount}&tn=${note}&cu=INR`;
  };

  // ── UPI Step 2 ──
  const handleUtrSubmit = async () => {
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      toast.error('Valid UTR / Transaction ID dalo!');
      return;
    }
    setUtrLoading(true);
    try {
      await API.post('/payment/upi-confirm', {
        orderId: placedOrderId,
        utrNumber: utrNumber.trim(),
      });
      toast.success('Payment details submit ho gaya! Shop owner confirm karega. 🎉');
      await emptyCart();
      router.push('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submit failed!');
    } finally {
      setUtrLoading(false);
    }
  };

  // ── UPI Screen ──
  if (upiStep === 'show_upi') {
    return (
      <div className="min-h-screen bg-gray-50 pb-28">
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40 px-4 py-4 flex items-center gap-3">
          <button onClick={() => setUpiStep('idle')}
            className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600">
            ←
          </button>
          <h1 className="text-lg font-black text-gray-900">UPI Payment 💳</h1>
        </div>

        <div className="px-4 pt-6 space-y-4">
          <div className="bg-gray-900 rounded-3xl p-6 text-center text-white">
            <p className="text-sm text-gray-400 mb-1">Pay karo</p>
            <p className="text-4xl font-black">₹{totalAmount}</p>
            <p className="text-xs text-gray-400 mt-2">UPI ID: {shopUpiId}</p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-5">
            <p className="font-black text-gray-900 mb-1">📱 UPI App se pay karo</p>
            <p className="text-xs text-gray-400 mb-4">
              Neeche button dabao — GPay, PhonePe, Paytm ya koi bhi UPI app khulega
            </p>
            <a
              href={getUpiLink()}
              className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl text-center block active:scale-95 transition-all text-base">
              📲 UPI App Open Karo
            </a>
            <p className="text-xs text-gray-400 text-center mt-3">
              Ya manually UPI ID copy karo:
            </p>
            <div className="mt-2 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-3">
              <p className="flex-1 text-sm font-bold text-gray-900 truncate">{shopUpiId}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shopUpiId);
                  toast.success('UPI ID copy ho gaya!');
                }}
                className="text-xs bg-gray-900 text-white font-bold px-3 py-1.5 rounded-xl active:scale-95 flex-shrink-0">
                Copy
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-5">
            <p className="font-black text-gray-900 mb-1">✅ Payment ke baad</p>
            <p className="text-xs text-gray-400 mb-4">
              Payment hone ke baad apna UTR / Transaction ID dalo — shop owner verify karega
            </p>
            <input
              type="text"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              placeholder="UTR / Transaction ID (e.g. 423198765432)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
            <p className="text-xs text-gray-400 mt-2">
              💡 UPI app me payment history me milega — 12 digit number
            </p>
          </div>

          <button
            onClick={handleUtrSubmit}
            disabled={utrLoading || !utrNumber.trim()}
            className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
            {utrLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submit ho raha hai...
              </>
            ) : '✅ Payment Done — Submit Karo'}
          </button>

          <p className="text-xs text-gray-400 text-center pb-4">
            ⚠️ Payment karne ke baad hi submit karo — shop owner verify karega
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  // ── Loading ──
  if (isRestoring || loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 px-4 pt-6 space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />
        ))}
        <BottomNav />
      </div>
    );
  }

  // ── Empty Cart ──
  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
        <div className="text-center">
          <div className="w-28 h-28 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 border border-gray-100">
            <span className="text-5xl">🛒</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Cart Khaali Hai</h2>
          <p className="text-gray-400 text-sm mb-8">Koi product add nahi kiya abhi tak</p>
          <Link href="/feed"
            className="bg-gray-900 text-white font-bold px-8 py-3.5 rounded-2xl inline-block active:scale-95 transition-all text-sm tracking-wide">
            Shops Browse Karo →
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  const PAYMENT_METHODS = [
    { id: 'COD', label: 'Cash on Delivery', emoji: '💵', desc: 'Deliver hone pe pay karo' },
    { id: 'ONLINE', label: 'Online Pay', emoji: '💳', desc: 'UPI se pay karo' },
    { id: 'UDHAR', label: 'Udhar', emoji: '🤝', desc: '30 din mein pay karo' },
  ];

  // ── Main Cart ──
  return (
    <div className="min-h-screen pb-28" style={{ background: '#f7f7f5' }}>

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()}
            className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 active:scale-90 transition-all">
            ←
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black text-gray-900 leading-none">My Cart</h1>
            <p className="text-xs text-gray-400 mt-0.5">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          <div className="bg-gray-900 text-white text-xs font-black px-3 py-2 rounded-xl tracking-wide">
            ₹{totalAmount}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">

        {/* Cart Items */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-black text-gray-900 text-sm">🛍️ Your Items</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg font-medium">{items.length} products</span>
          </div>

          <div className="divide-y divide-gray-50">
            {items.map((item) => {
              const itemId = item.productId?._id || item.productId;
              const isRemoving = removingId === itemId;
              const isQtyLoading = qtyLoadingId === itemId;

              return (
                <div key={itemId} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center">
                      {item.image
                        ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        : <span className="text-2xl">📦</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-gray-900 text-sm leading-tight line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-1">₹{item.price} per item</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-black text-gray-900 text-base">₹{item.price * item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    {/* ✅ Remove button - double tap fix */}
                    <button
                      onClick={() => handleRemove(item.productId)}
                      disabled={isRemoving}
                      className="flex items-center gap-1.5 text-xs text-red-400 font-bold hover:text-red-600 transition-colors active:scale-95 disabled:opacity-50">
                      <span>🗑️</span>
                      <span>{isRemoving ? 'Removing...' : 'Remove'}</span>
                    </button>

                    {/* ✅ Quantity buttons - double tap fix */}
                    <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
                        disabled={isQtyLoading}
                        className="w-8 h-8 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-gray-700 font-black text-lg active:scale-90 transition-all disabled:opacity-50">
                        −
                      </button>
                      <span className="w-8 text-center font-black text-gray-900 text-sm">
                        {isQtyLoading ? '...' : item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
                        disabled={isQtyLoading}
                        className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-lg active:scale-90 transition-all disabled:opacity-50">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-black text-gray-900 text-sm">📍 Delivery Address</h2>
            <p className="text-xs text-gray-400 mt-0.5">Profile se auto-fill ho gaya</p>
          </div>
          <div className="p-4 space-y-3">
            {address.fullAddress && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-emerald-700">Saved Address</p>
                  <p className="text-xs text-emerald-600 truncate mt-0.5">
                    {address.fullAddress}, {address.city}
                  </p>
                </div>
              </div>
            )}
            <textarea
              value={address.fullAddress}
              onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
              placeholder="Ghar ka address, gali, mohalla..."
              rows={2}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text" value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
              <input
                type="text" value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                placeholder="Pincode" maxLength={6}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-black text-gray-900 text-sm">💳 Payment Method</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((method) => (
                <button key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95 ${
                    paymentMethod === method.id
                      ? 'border-gray-900 bg-gray-900'
                      : 'border-gray-100 bg-gray-50 hover:border-gray-300'
                  }`}>
                  <span className="text-2xl">{method.emoji}</span>
                  <p className={`font-black text-xs text-center leading-tight ${
                    paymentMethod === method.id ? 'text-white' : 'text-gray-800'
                  }`}>
                    {method.label}
                  </p>
                  {paymentMethod === method.id && (
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {paymentMethod === 'ONLINE' && (
              <div className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="text-xs text-blue-700 font-black mb-1">💳 UPI se pay karo</p>
                <p className="text-xs text-blue-500">
                  Order button dabane ke baad shop ka UPI ID dikhega — GPay / PhonePe / Paytm se pay karo
                </p>
              </div>
            )}

            {paymentMethod === 'UDHAR' && (
              <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                <p className="text-xs text-amber-700 font-black mb-2">🤝 30 din mein pay karna hoga</p>
                <textarea
                  value={udharNote}
                  onChange={(e) => setUdharNote(e.target.value)}
                  placeholder="Shop owner ke liye note... (optional)"
                  rows={2}
                  className="w-full px-3 py-2.5 bg-white border border-amber-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all resize-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-black text-gray-900 text-sm">🧾 Bill Summary</h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Items total</span>
              <span className="font-bold text-gray-900">₹{totalProductPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Delivery charge</span>
              {deliveryCharge === 0
                ? <span className="font-bold text-emerald-600 text-sm">FREE 🎉</span>
                : <span className="font-bold text-gray-900">₹{deliveryCharge}</span>
              }
            </div>
            {deliveryCharge === 0 && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 flex items-center gap-2">
                <span className="text-sm">✨</span>
                <p className="text-xs text-emerald-600 font-bold">₹100+ order pe free delivery!</p>
              </div>
            )}
            <div className="border-t-2 border-dashed border-gray-100 pt-3 flex justify-between items-center">
              <span className="font-black text-gray-900 text-base">Total Payable</span>
              <span className="font-black text-gray-900 text-2xl">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={orderLoading}
          className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 text-base flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20">
          {orderLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {paymentMethod === 'ONLINE' ? 'UPI details la raha hai...' : 'Order place ho raha hai...'}
            </>
          ) : (
            <>
              {paymentMethod === 'ONLINE' ? '💳 Pay via UPI' : '🚀 Order Place Karo'} — ₹{totalAmount}
            </>
          )}
        </button>

      </div>
      <BottomNav />
    </div>
  );
}