// 'use client';

// import { useState, useEffect } from 'react';
// import { getShopOrders, updateOrderStatus } from '@/services/orderService';
// import toast from 'react-hot-toast';

// const STATUS_CONFIG = {
//   pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', emoji: '⏳' },
//   accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-700', emoji: '✅' },
//   out_for_delivery: { label: 'Out for Delivery', color: 'bg-purple-100 text-purple-700', emoji: '🚚' },
//   delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', emoji: '🎉' },
//   cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600', emoji: '❌' },
// };

// const NEXT_STATUS = {
//   pending: 'accepted',
//   accepted: 'out_for_delivery',
//   out_for_delivery: 'delivered',
// };

// const NEXT_LABEL = {
//   pending: '✅ Accept Order',
//   accepted: '🚚 Mark Out for Delivery',
//   out_for_delivery: '🎉 Mark Delivered',
// };

// export default function ShopOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState('pending');
//   const [updatingId, setUpdatingId] = useState(null);

//   useEffect(() => {
//     loadOrders();
//   }, [activeFilter]);

//   const loadOrders = async () => {
//     try {
//       setLoading(true);
//       const params = activeFilter !== 'all' ? { status: activeFilter } : {};
//       const res = await getShopOrders(params);
//       setOrders(res.orders || []);
//     } catch (error) {
//       toast.error('Orders load nahi hue!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     setUpdatingId(orderId);
//     try {
//       await updateOrderStatus(orderId, newStatus);
//       toast.success(`Order ${newStatus} ho gaya!`);
//       loadOrders();
//     } catch (error) {
//       toast.error('Status update failed!');
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const handleReject = async (orderId) => {
//     if (!confirm('Order reject karna chahte ho?')) return;
//     setUpdatingId(orderId);
//     try {
//       await updateOrderStatus(orderId, 'cancelled');
//       toast.success('Order reject ho gaya!');
//       loadOrders();
//     } catch (error) {
//       toast.error('Reject failed!');
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       day: 'numeric', month: 'short',
//       hour: '2-digit', minute: '2-digit'
//     });
//   };

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-black text-gray-900">Orders 📦</h1>
//         <p className="text-gray-400 text-sm mt-0.5">Manage karo apne orders</p>
//       </div>

//       {/* Filter Tabs */}
//       <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
//         {[
//           { id: 'all', label: 'All' },
//           { id: 'pending', label: '⏳ Pending' },
//           { id: 'accepted', label: '✅ Accepted' },
//           { id: 'out_for_delivery', label: '🚚 On Way' },
//           { id: 'delivered', label: '🎉 Delivered' },
//           { id: 'cancelled', label: '❌ Cancelled' },
//         ].map((filter) => (
//           <button key={filter.id}
//             onClick={() => setActiveFilter(filter.id)}
//             className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
//               activeFilter === filter.id
//                 ? 'bg-gray-900 text-white shadow-sm'
//                 : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
//             }`}>
//             {filter.label}
//           </button>
//         ))}
//       </div>

//       {/* Orders List */}
//       {loading ? (
//         <div className="space-y-4">
//           {[1, 2, 3].map(i => (
//             <div key={i} className="h-48 skeleton rounded-3xl" />
//           ))}
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
//           <div className="text-5xl mb-4">📭</div>
//           <p className="font-bold text-gray-900">Koi order nahi!</p>
//           <p className="text-gray-400 text-sm mt-1">Is category mein koi order nahi hai</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => {
//             const status = STATUS_CONFIG[order.status];
//             const nextStatus = NEXT_STATUS[order.status];
//             return (
//               <div key={order._id}
//                 className="bg-white rounded-3xl border border-gray-100 overflow-hidden">

//                 {/* Order Header */}
//                 <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <p className="font-black text-gray-900 text-sm">#{order.orderId}</p>
//                       <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status.color}`}>
//                         {status.emoji} {status.label}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-black text-gray-900">₹{order.totalAmount}</p>
//                     <p className="text-xs text-gray-400">{order.paymentMethod}</p>
//                   </div>
//                 </div>

//                 {/* Customer */}
//                 <div className="px-5 py-3 border-b border-gray-50 flex items-center gap-3">
//                   <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
//                     {order.userId?.name?.charAt(0) || 'C'}
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-sm">{order.userId?.name || 'Customer'}</p>
//                     <p className="text-xs text-gray-400">{order.userId?.phone}</p>
//                   </div>
//                 </div>

//                 {/* Items */}
//                 <div className="px-5 py-3 border-b border-gray-50">
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items</p>
//                   <div className="space-y-1.5">
//                     {order.items.map((item, i) => (
//                       <div key={i} className="flex justify-between text-sm">
//                         <span className="text-gray-700">
//                           {item.name} × {item.quantity}
//                         </span>
//                         <span className="font-semibold text-gray-900">
//                           ₹{item.price * item.quantity}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between text-xs text-gray-400">
//                     <span>Delivery: {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span>
//                     <span className="font-bold text-gray-900">Total: ₹{order.totalAmount}</span>
//                   </div>
//                 </div>

//                 {/* Delivery Address */}
//                 <div className="px-5 py-3 border-b border-gray-50">
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Address</p>
//                   <p className="text-sm text-gray-700">
//                     {order.deliveryAddress?.fullAddress}, {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
//                   </p>
//                 </div>

//                 {/* Actions */}
//                 {(order.status === 'pending' || nextStatus) && (
//                   <div className="px-5 py-4 flex gap-3">
//                     {order.status === 'pending' && (
//                       <button
//                         onClick={() => handleReject(order._id)}
//                         disabled={updatingId === order._id}
//                         className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-sm transition-all active:scale-95 border border-red-200">
//                         ❌ Reject
//                       </button>
//                     )}
//                     {nextStatus && (
//                       <button
//                         onClick={() => handleStatusUpdate(order._id, nextStatus)}
//                         disabled={updatingId === order._id}
//                         className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//                         {updatingId === order._id ? (
//                           <>
//                             <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                             </svg>
//                             Updating...
//                           </>
//                         ) : NEXT_LABEL[order.status]}
//                       </button>
//                     )}
//                   </div>
//                 )}

//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }





// 'use client';

// import { useState, useEffect } from 'react';
// import { getShopOrders, updateOrderStatus } from '@/services/orderService';
// import toast from 'react-hot-toast';
// import API from '@/services/api';


// const STATUS_CONFIG = {
//   pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', emoji: '⏳' },
//   accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-700', emoji: '✅' },
//   out_for_delivery: { label: 'Out for Delivery', color: 'bg-purple-100 text-purple-700', emoji: '🚚' },
//   delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', emoji: '🎉' },
//   cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600', emoji: '❌' },
// };

// const NEXT_STATUS = {
//   pending: 'accepted',
//   accepted: 'out_for_delivery',
//   out_for_delivery: 'delivered',
// };

// const NEXT_LABEL = {
//   pending: '✅ Accept Order',
//   accepted: '🚚 Mark Out for Delivery',
//   out_for_delivery: '🎉 Mark Delivered',
// };

// export default function ShopOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState('pending');
//   const [updatingId, setUpdatingId] = useState(null);
//   const [confirmingUpi, setConfirmingUpi] = useState(null);

//   useEffect(() => {
//     loadOrders();
//   }, [activeFilter]);

//   const loadOrders = async () => {
//     try {
//       setLoading(true);
//       const params = activeFilter !== 'all' ? { status: activeFilter } : {};
//       const res = await getShopOrders(params);
//       setOrders(res.orders || []);
//     } catch (error) {
//       toast.error('Orders load nahi hue!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async (orderId, newStatus, isUdhar) => {
//     setUpdatingId(orderId);
//     try {
//       await updateOrderStatus(orderId, newStatus);

//       // Udhar order accept hone par inform karo
//       if (newStatus === 'accepted' && isUdhar) {
//         toast.success('Order accept ho gaya! 💳 Udhar tab mein auto add ho gaya!', {
//           duration: 4000,
//           icon: '📋'
//         });
//       } else {
//         toast.success(`Order ${newStatus} ho gaya!`);
//       }
//       loadOrders();
//     } catch (error) {
//       toast.error('Status update failed!');
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const handleUpiConfirm = async (orderId) => {
//   if (!confirm('UPI payment verify kar liya? Order accept hoga aur payment paid mark ho jaayega.')) return;
//   setConfirmingUpi(orderId);
//   try {
//     await API.put(`/payment/upi-verify/${orderId}`);
//     toast.success('Payment verified! Order accepted. ✅');
//     loadOrders();
//   } catch (error) {
//     toast.error(error.response?.data?.message || 'Verify failed!');
//   } finally {
//     setConfirmingUpi(null);
//   }
// };

//   const handleReject = async (orderId) => {
//     if (!confirm('Order reject karna chahte ho?')) return;
//     setUpdatingId(orderId);
//     try {
//       await updateOrderStatus(orderId, 'cancelled');
//       toast.success('Order reject ho gaya!');
//       loadOrders();
//     } catch (error) {
//       toast.error('Reject failed!');
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       day: 'numeric', month: 'short',
//       hour: '2-digit', minute: '2-digit'
//     });
//   };

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-black text-gray-900">Orders 📦</h1>
//         <p className="text-gray-400 text-sm mt-0.5">Manage karo apne orders</p>
//       </div>

//       {/* Filter Tabs */}
//       <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
//         {[
//           { id: 'all', label: 'All' },
//           { id: 'pending', label: '⏳ Pending' },
//           { id: 'accepted', label: '✅ Accepted' },
//           { id: 'out_for_delivery', label: '🚚 On Way' },
//           { id: 'delivered', label: '🎉 Delivered' },
//           { id: 'cancelled', label: '❌ Cancelled' },
//         ].map((filter) => (
//           <button key={filter.id}
//             onClick={() => setActiveFilter(filter.id)}
//             className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
//               activeFilter === filter.id
//                 ? 'bg-gray-900 text-white shadow-sm'
//                 : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
//             }`}>
//             {filter.label}
//           </button>
//         ))}
//       </div>

//       {/* Orders List */}
//       {loading ? (
//         <div className="space-y-4">
//           {[1, 2, 3].map(i => (
//             <div key={i} className="h-48 skeleton rounded-3xl" />
//           ))}
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
//           <div className="text-5xl mb-4">📭</div>
//           <p className="font-bold text-gray-900">Koi order nahi!</p>
//           <p className="text-gray-400 text-sm mt-1">Is category mein koi order nahi hai</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => {
//             const status = STATUS_CONFIG[order.status];
//             const nextStatus = NEXT_STATUS[order.status];
//             return (
//               <div key={order._id}
//                 className={`bg-white rounded-3xl border overflow-hidden ${
//                   order.isUdhar ? 'border-red-100' : 'border-gray-100'
//                 }`}>

//                 {/* Udhar badge — order ke top pe */}
//                 {order.isUdhar && (
//                   <div className="bg-red-50 px-5 py-2.5 flex items-center gap-2 border-b border-red-100">
//                     <span className="text-sm">💳</span>
//                     <span className="text-xs font-bold text-red-600">Udhar Order</span>
//                     {order.status === 'pending' && (
//                       <span className="text-xs text-red-400 ml-auto">Accept karne par auto Udhar tab mein jaayega</span>
//                     )}
//                     {order.status === 'accepted' && (
//                       <span className="text-xs text-green-600 font-bold ml-auto">✅ Udhar tab mein add ho gaya</span>
//                     )}
//                   </div>
//                 )}

//                 {/* Order Header */}
//                 <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <p className="font-black text-gray-900 text-sm">#{order.orderId}</p>
//                       <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status.color}`}>
//                         {status.emoji} {status.label}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-black text-gray-900">₹{order.totalAmount}</p>
//                     <p className={`text-xs font-bold ${order.isUdhar ? 'text-red-500' : 'text-gray-400'}`}>
//                       {order.isUdhar ? '💳 Udhar' : order.paymentMethod}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Customer */}
//                 <div className="px-5 py-3 border-b border-gray-50 flex items-center gap-3">
//                   <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
//                     {order.userId?.name?.charAt(0) || 'C'}
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900 text-sm">{order.userId?.name || 'Customer'}</p>
//                     <p className="text-xs text-gray-400">{order.userId?.phone}</p>
//                   </div>
//                 </div>

//                 {/* Items */}
//                 <div className="px-5 py-3 border-b border-gray-50">
//                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items</p>
//                   <div className="space-y-1.5">
//                     {order.items.map((item, i) => (
//                       <div key={i} className="flex justify-between text-sm">
//                         <span className="text-gray-700">{item.name} × {item.quantity}</span>
//                         <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between text-xs text-gray-400">
//                     <span>Delivery: {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span>
//                     <span className="font-bold text-gray-900">Total: ₹{order.totalAmount}</span>
//                   </div>
//                 </div>

//                 {/* Delivery Address */}
// <div className="px-5 py-3 border-b border-gray-50">
//   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Address</p>
//   <p className="text-sm text-gray-700">
//     {order.deliveryAddress?.fullAddress}, {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
//   </p>
// </div>

// {/* UPI Payment — alag block */}
// {order.paymentMethod === 'ONLINE' && (
//   <div className={`px-5 py-3 border-b border-gray-50 ${
//     order.paymentStatus === 'upi_submitted' ? 'bg-blue-50' : 'bg-orange-50'
//   }`}>
//     <p className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-500">
//       💳 UPI Payment
//     </p>
//     {order.paymentStatus === 'upi_pending' && (
//       <p className="text-xs text-orange-600 font-bold">⏳ Customer ne abhi pay nahi kiya</p>
//     )}
//     {order.paymentStatus === 'upi_submitted' && (
//       <div>
//         <p className="text-xs text-blue-700 font-bold mb-1">✅ Customer ne payment submit ki!</p>
//         <p className="text-xs text-blue-500">UTR: {order.utrNumber}</p>
//       </div>
//     )}
//     {order.paymentStatus === 'paid' && (
//       <p className="text-xs text-green-700 font-bold">✅ Payment Verified & Paid</p>
//     )}
//   </div>
// )}

//                 {/* Udhar note if any */}
//                 {order.isUdhar && order.udharNote && (
//                   <div className="px-5 py-3 border-b border-gray-50 bg-red-50">
//                     <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Udhar Note</p>
//                     <p className="text-sm text-red-700">{order.udharNote}</p>
//                   </div>
//                 )}

//                 {(order.status === 'pending' || nextStatus) && (
//   <div className="px-5 py-4 flex gap-3 flex-wrap">
 
//     {/* UPI Verify button — sirf tab jab upi_submitted ho */}
//     {order.paymentMethod === 'ONLINE' &&
//      order.paymentStatus === 'upi_submitted' &&
//      order.status === 'pending' && (
//       <button
//         onClick={() => handleUpiConfirm(order._id)}
//         disabled={confirmingUpi === order._id}
//         className="w-full mb-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//         {confirmingUpi === order._id ? (
//           <>
//             <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//             </svg>
//             Verifying...
//           </>
//         ) : '✅ UPI Payment Verify Karo — Accept Order'}
//       </button>
//     )}
 
//     {/* Reject button */}
//     {order.status === 'pending' && (
//       <button
//         onClick={() => handleReject(order._id)}
//         disabled={updatingId === order._id}
//         className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-sm transition-all active:scale-95 border border-red-200">
//         ❌ Reject
//       </button>
//     )}
 
//     {/* Next status button */}
//     {nextStatus && (
//       <button
//         onClick={() => handleStatusUpdate(order._id, nextStatus, order.isUdhar)}
//         disabled={updatingId === order._id}
//         className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//         {updatingId === order._id ? (
//           <>
//             <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//             </svg>
//             Updating...
//           </>
//         ) : NEXT_LABEL[order.status]}
//       </button>
//     )}
//   </div>
// )}

//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import { getShopOrders, updateOrderStatus } from '@/services/orderService';
import toast from 'react-hot-toast';
import API from '@/services/api';


const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', emoji: '⏳' },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-700', emoji: '✅' },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-purple-100 text-purple-700', emoji: '🚚' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', emoji: '🎉' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600', emoji: '❌' },
};

const NEXT_STATUS = {
  pending: 'accepted',
  accepted: 'out_for_delivery',
  out_for_delivery: 'delivered',
};

const NEXT_LABEL = {
  pending: '✅ Accept Order',
  accepted: '🚚 Mark Out for Delivery',
  out_for_delivery: '🎉 Mark Delivered',
};

export default function ShopOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('pending');
  const [updatingId, setUpdatingId] = useState(null);
  const [confirmingUpi, setConfirmingUpi] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [activeFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const params = activeFilter !== 'all' ? { status: activeFilter } : {};
      const res = await getShopOrders(params);
      setOrders(res.orders || []);
    } catch (error) {
      toast.error('Orders load nahi hue!');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus, isUdhar) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      if (newStatus === 'accepted' && isUdhar) {
        toast.success('Order accept ho gaya! 💳 Udhar tab mein auto add ho gaya!', {
          duration: 4000,
          icon: '📋'
        });
      } else {
        toast.success(`Order ${newStatus} ho gaya!`);
      }
      loadOrders();
    } catch (error) {
      toast.error('Status update failed!');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpiConfirm = async (orderId) => {
    if (!confirm('UPI payment verify kar liya? Order accept hoga aur payment paid mark ho jaayega.')) return;
    setConfirmingUpi(orderId);
    try {
      await API.put(`/payment/upi-verify/${orderId}`);
      toast.success('Payment verified! Order accepted. ✅');
      loadOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verify failed!');
    } finally {
      setConfirmingUpi(null);
    }
  };

  const handleReject = async (orderId) => {
    if (!confirm('Order reject karna chahte ho?')) return;
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, 'cancelled');
      toast.success('Order reject ho gaya!');
      loadOrders();
    } catch (error) {
      toast.error('Reject failed!');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short',
      hour: '2-digit', minute: '2-digit'
    });
  };

   const generateInvoice = (order) => {
  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice #${order.orderId}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; padding: 40px; color: #111; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #111; }
        .brand { font-size: 24px; font-weight: 900; }
        .brand span { color: #16a34a; }
        .invoice-info { text-align: right; }
        .invoice-info h2 { font-size: 20px; font-weight: 900; color: #111; }
        .invoice-info p { font-size: 12px; color: #666; margin-top: 4px; }
        .section { margin-bottom: 24px; }
        .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 8px; }
        .customer-info p { font-size: 13px; color: #333; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        th { background: #f5f5f5; padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #666; }
        td { padding: 10px 12px; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
        .total-row td { font-weight: 700; font-size: 14px; border-top: 2px solid #111; border-bottom: none; padding-top: 14px; }
        .status { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; background: #dcfce7; color: #16a34a; }
        .footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 11px; color: #999; }
        .payment-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        ${order.isUdhar ? '.payment-badge { background: #fff1f2; color: #e11d48; border-color: #fecdd3; }' : ''}
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">Apna <span>Market</span></div>
          <p style="font-size:12px;color:#666;margin-top:4px;">apnamarket.in</p>
        </div>
        <div class="invoice-info">
          <h2>INVOICE</h2>
          <p>#${order.orderId}</p>
          <p>${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <div style="margin-top:8px"><span class="status">${order.status.toUpperCase()}</span></div>
        </div>
      </div>

      <div style="display:flex;gap:40px;margin-bottom:28px;">
        <div class="section" style="flex:1">
          <div class="section-title">Customer</div>
          <div class="customer-info">
            <p><strong>${order.userId?.name || 'Customer'}</strong></p>
            <p>${order.userId?.phone || ''}</p>
          </div>
        </div>
        <div class="section" style="flex:1">
          <div class="section-title">Delivery Address</div>
          <div class="customer-info">
            <p>${order.deliveryAddress?.fullAddress || ''}</p>
            <p>${order.deliveryAddress?.city || ''} - ${order.deliveryAddress?.pincode || ''}</p>
          </div>
        </div>
        <div class="section" style="flex:1;text-align:right">
          <div class="section-title">Payment</div>
          <span class="payment-badge">${order.isUdhar ? '💳 Udhar' : order.paymentMethod}</span>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th style="text-align:center">Qty</th>
            <th style="text-align:right">Price</th>
            <th style="text-align:right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td style="text-align:center">${item.quantity}</td>
              <td style="text-align:right">₹${item.price}</td>
              <td style="text-align:right">₹${item.price * item.quantity}</td>
            </tr>
          `).join('')}
          <tr>
            <td colspan="3" style="text-align:right;color:#888;font-size:12px">Subtotal</td>
            <td style="text-align:right;color:#888;font-size:12px">₹${order.productTotal}</td>
          </tr>
          <tr>
            <td colspan="3" style="text-align:right;color:#888;font-size:12px">Delivery</td>
            <td style="text-align:right;color:#888;font-size:12px">${order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</td>
          </tr>
          <tr class="total-row">
            <td colspan="3" style="text-align:right">Total Amount</td>
            <td style="text-align:right">₹${order.totalAmount}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>Thank you for your order! 🙏</p>
        <p style="margin-top:4px">Apna Market — apnamarket.in</p>
      </div>
    </body>
    </html>
  `;

  const win = window.open('', '_blank');
  win.document.write(invoiceHTML);
  win.document.close();
  win.print();
};

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Orders 📦</h1>
        <div className="text-gray-400 text-sm mt-0.5">Manage karo apne orders</div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {[
          { id: 'all', label: 'All' },
          { id: 'pending', label: '⏳ Pending' },
          { id: 'accepted', label: '✅ Accepted' },
          { id: 'out_for_delivery', label: '🚚 On Way' },
          { id: 'delivered', label: '🎉 Delivered' },
          { id: 'cancelled', label: '❌ Cancelled' },
        ].map((filter) => (
          <button key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              activeFilter === filter.id
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
            }`}>
            {filter.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 skeleton rounded-3xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="text-5xl mb-4">📭</div>
          <div className="font-bold text-gray-900">Koi order nahi!</div>
          <div className="text-gray-400 text-sm mt-1">Is category mein koi order nahi hai</div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_CONFIG[order.status];
            const nextStatus = NEXT_STATUS[order.status];
            return (
              <div key={order._id}
                className={`bg-white rounded-3xl border overflow-hidden ${
                  order.isUdhar ? 'border-red-100' : 'border-gray-100'
                }`}>

                {/* Udhar badge */}
                {order.isUdhar && (
                  <div className="bg-red-50 px-5 py-2.5 flex items-center gap-2 border-b border-red-100">
                    <span className="text-sm">💳</span>
                    <span className="text-xs font-bold text-red-600">Udhar Order</span>
                    {order.status === 'pending' && (
                      <span className="text-xs text-red-400 ml-auto">Accept karne par auto Udhar tab mein jaayega</span>
                    )}
                    {order.status === 'accepted' && (
                      <span className="text-xs text-green-600 font-bold ml-auto">✅ Udhar tab mein add ho gaya</span>
                    )}
                  </div>
                )}

                {/* Order Header */}
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-black text-gray-900 text-sm">#{order.orderId}</div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status.color}`}>
                        {status.emoji} {status.label}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-gray-900">₹{order.totalAmount}</div>
                    <div className={`text-xs font-bold ${order.isUdhar ? 'text-red-500' : 'text-gray-400'}`}>
                      {order.isUdhar ? '💳 Udhar' : order.paymentMethod}
                    </div>
                  </div>
                </div>

                {/* Customer */}
                <div className="px-5 py-3 border-b border-gray-50 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                    {order.userId?.name?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{order.userId?.name || 'Customer'}</div>
                    <div className="text-xs text-gray-400">{order.userId?.phone}</div>
                  </div>
                </div>

                {/* Items */}
                <div className="px-5 py-3 border-b border-gray-50">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items</div>
                  <div className="space-y-1.5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.name} × {item.quantity}</span>
                        <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between text-xs text-gray-400">
                    <span>Delivery: {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span>
                    <span className="font-bold text-gray-900">Total: ₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="px-5 py-3 border-b border-gray-50">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Address</div>
                  <div className="text-sm text-gray-700">
                    {order.deliveryAddress?.fullAddress}, {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
                  </div>
                </div>

                {/* UPI Payment */}
                {order.paymentMethod === 'ONLINE' && (
                  <div className={`px-5 py-3 border-b border-gray-50 ${
                    order.paymentStatus === 'upi_submitted' ? 'bg-blue-50' : 'bg-orange-50'
                  }`}>
                    <div className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-500">
                      💳 UPI Payment
                    </div>
                    {order.paymentStatus === 'upi_pending' && (
                      <div className="text-xs text-orange-600 font-bold">⏳ Customer ne abhi pay nahi kiya</div>
                    )}
                    {order.paymentStatus === 'upi_submitted' && (
                      <div>
                        <div className="text-xs text-blue-700 font-bold mb-1">✅ Customer ne payment submit ki!</div>
                        <div className="text-xs text-blue-500">UTR: {order.utrNumber}</div>
                      </div>
                    )}
                    {order.paymentStatus === 'paid' && (
                      <div className="text-xs text-green-700 font-bold">✅ Payment Verified & Paid</div>
                    )}
                  </div>
                )}

                {/* Udhar Note */}
                {order.isUdhar && order.udharNote && (
                  <div className="px-5 py-3 border-b border-gray-50 bg-red-50">
                    <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Udhar Note</div>
                    <div className="text-sm text-red-700">{order.udharNote}</div>
                  </div>
                )}

                {/* ✅ Invoice Button — HAR ORDER PE */}
<div className="px-5 py-3 border-b border-gray-50">
  <button
    onClick={() => generateInvoice(order)}
    className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-sm transition-all active:scale-95 border border-gray-200 flex items-center justify-center gap-2">
    🧾 Invoice Print / Download
  </button>
</div>

                {/* Action Buttons */}
                {(order.status === 'pending' || nextStatus) && (
                  <div className="px-5 py-4 flex gap-3 flex-wrap">
                     
                  


                    {/* UPI Verify button */}
                    {order.paymentMethod === 'ONLINE' &&
                     order.paymentStatus === 'upi_submitted' &&
                     order.status === 'pending' && (
                      <button
                        onClick={() => handleUpiConfirm(order._id)}
                        disabled={confirmingUpi === order._id}
                        className="w-full mb-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                        {confirmingUpi === order._id ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Verifying...
                          </>
                        ) : '✅ UPI Payment Verify Karo — Accept Order'}
                      </button>
                    )}

                    {/* Reject button */}
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleReject(order._id)}
                        disabled={updatingId === order._id}
                        className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-sm transition-all active:scale-95 border border-red-200">
                        ❌ Reject
                      </button>
                    )}

                    {/* Next status button */}
                    {nextStatus && (
                      <button
                        onClick={() => handleStatusUpdate(order._id, nextStatus, order.isUdhar)}
                        disabled={updatingId === order._id}
                        className="flex-1 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                        {updatingId === order._id ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Updating...
                          </>
                        ) : NEXT_LABEL[order.status]}
                      </button>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}