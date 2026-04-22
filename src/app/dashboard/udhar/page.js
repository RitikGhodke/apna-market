// 'use client';

// import { useState, useEffect } from 'react';
// import API from '@/services/api';
// import toast from 'react-hot-toast';

// export default function UdharPage() {
//   const [udhars, setUdhars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showPayForm, setShowPayForm] = useState(false);
//   const [formData, setFormData] = useState({ customerPhone: '', amount: '', note: '' });
//   const [submitting, setSubmitting] = useState(false);
//   const [totalDue, setTotalDue] = useState(0);
//   const [totalRecovered, setTotalRecovered] = useState(0);

//   useEffect(() => {
//     loadUdhars();
//   }, []);

//   const loadUdhars = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get('/udhar/list');
//       setUdhars(res.data.udhars || []);
//       setTotalDue(res.data.totalDue || 0);
//       setTotalRecovered(res.data.totalRecovered || 0);
//     } catch (error) {
//       toast.error('Udhar load nahi hua!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddUdhar = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await API.post('/udhar/add-udhar', {
//         customerPhone: formData.customerPhone,
//         amount: Number(formData.amount),
//         note: formData.note
//       });
//       toast.success('Udhar add ho gaya!');
//       setShowAddForm(false);
//       setFormData({ customerPhone: '', amount: '', note: '' });
//       loadUdhars();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error aaya!');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await API.post('/udhar/add-payment', {
//         customerPhone: formData.customerPhone,
//         amount: Number(formData.amount),
//         note: formData.note
//       });
//       toast.success('Payment record ho gaya!');
//       setShowPayForm(false);
//       setFormData({ customerPhone: '', amount: '', note: '' });
//       loadUdhars();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error aaya!');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const UdharForm = ({ onSubmit, title }) => (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
//       <div className="bg-white rounded-3xl w-full max-w-md">
//         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//           <h2 className="font-black text-gray-900">{title}</h2>
//           <button onClick={() => { setShowAddForm(false); setShowPayForm(false); }}
//             className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">×</button>
//         </div>
//         <form onSubmit={onSubmit} className="p-6 space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//               Customer Phone *
//             </label>
//             <div className="flex">
//               <div className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500 font-medium flex items-center">
//                 +91
//               </div>
//               <input type="tel" value={formData.customerPhone}
//                 onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
//                 placeholder="Customer ka number" required maxLength={10}
//                 className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//               Amount (₹) *
//             </label>
//             <input type="number" value={formData.amount}
//               onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//               placeholder="0" required min="1"
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//               Note
//             </label>
//             <input type="text" value={formData.note}
//               onChange={(e) => setFormData({ ...formData, note: e.target.value })}
//               placeholder="Kya liya, kab dega..."
//               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//           </div>
//           <div className="flex gap-3">
//             <button type="button"
//               onClick={() => { setShowAddForm(false); setShowPayForm(false); }}
//               className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">
//               Cancel
//             </button>
//             <button type="submit" disabled={submitting}
//               className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
//               {submitting ? (
//                 <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//               ) : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {showAddForm && <UdharForm onSubmit={handleAddUdhar} title="💳 Udhar Add Karo" />}
//       {showPayForm && <UdharForm onSubmit={handlePayment} title="✅ Payment Record Karo" />}

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-black text-gray-900">Udhar Book 💳</h1>
//           <p className="text-gray-400 text-sm mt-0.5">Digital credit management</p>
//         </div>
//         <div className="flex gap-2">
//           <button onClick={() => { setShowPayForm(true); setFormData({ customerPhone: '', amount: '', note: '' }); }}
//             className="px-3 py-2.5 bg-green-600 text-white font-bold rounded-xl text-sm active:scale-95 transition-all">
//             ✅ Payment
//           </button>
//           <button onClick={() => { setShowAddForm(true); setFormData({ customerPhone: '', amount: '', note: '' }); }}
//             className="px-3 py-2.5 bg-gray-900 text-white font-bold rounded-xl text-sm active:scale-95 transition-all">
//             ➕ Udhar
//           </button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
//           <div className="text-2xl mb-1">😟</div>
//           <div className="text-2xl font-black text-red-600">₹{totalDue}</div>
//           <div className="text-xs text-red-400 font-medium">Total Due</div>
//         </div>
//         <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//           <div className="text-2xl mb-1">🎉</div>
//           <div className="text-2xl font-black text-green-600">₹{totalRecovered}</div>
//           <div className="text-xs text-green-400 font-medium">Recovered</div>
//         </div>
//       </div>

//       {/* Udhar List */}
//       {loading ? (
//         <div className="space-y-3">
//           {[1,2,3].map(i => <div key={i} className="h-24 skeleton rounded-2xl" />)}
//         </div>
//       ) : udhars.length === 0 ? (
//         <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
//           <div className="text-5xl mb-4">💳</div>
//           <p className="font-bold text-gray-900">Koi udhar nahi!</p>
//           <p className="text-gray-400 text-sm mt-1">Sab clear hai 🎉</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {udhars.map((udhar) => (
//             <div key={udhar._id}
//               className="bg-white rounded-2xl border border-gray-100 p-4">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
//                   <span className="text-white font-black text-sm">
//                     {udhar.customerName?.charAt(0) || 'C'}
//                   </span>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-bold text-gray-900 truncate">{udhar.customerName}</p>
//                   <p className="text-xs text-gray-400">{udhar.customerPhone}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className={`font-black text-lg ${udhar.remainingAmount > 0 ? 'text-red-500' : 'text-green-600'}`}>
//                     ₹{udhar.remainingAmount}
//                   </p>
//                   <p className="text-xs text-gray-400">remaining</p>
//                 </div>
//               </div>

//               <div className="flex gap-3 text-xs">
//                 <div className="flex-1 bg-gray-50 rounded-xl p-2 text-center">
//                   <p className="font-black text-gray-900">₹{udhar.totalAmount}</p>
//                   <p className="text-gray-400">Total Udhar</p>
//                 </div>
//                 <div className="flex-1 bg-green-50 rounded-xl p-2 text-center">
//                   <p className="font-black text-green-600">₹{udhar.paidAmount}</p>
//                   <p className="text-green-400">Paid</p>
//                 </div>
//                 <div className="flex-1 bg-red-50 rounded-xl p-2 text-center">
//                   <p className="font-black text-red-500">₹{udhar.remainingAmount}</p>
//                   <p className="text-red-400">Due</p>
//                 </div>
//               </div>

//               {udhar.remainingAmount === 0 && (
//                 <div className="mt-3 text-center">
//                   <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">
//                     ✅ Cleared!
//                   </span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }








'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';
import toast from 'react-hot-toast';

export default function UdharPage() {
  const [udhars, setUdhars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDue, setTotalDue] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const [reminding, setReminding] = useState(null);

  // Manual payment modal
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedUdhar, setSelectedUdhar] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [payNote, setPayNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadUdhars();
  }, []);

  const loadUdhars = async () => {
    try {
      setLoading(true);
      const res = await API.get('/udhar/list');
      setUdhars(res.data.udhars || []);
      setTotalDue(res.data.totalDue || 0);
      setTotalRecovered(res.data.totalRecovered || 0);
    } catch (error) {
      toast.error('Udhar load nahi hua!');
    } finally {
      setLoading(false);
    }
  };

  // Kitne din se pending hai
  const getDaysPending = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  // Color coding based on days
  const getUdharColor = (udhar) => {
    if (udhar.remainingAmount === 0) return { dot: 'bg-green-500', border: 'border-green-100', badge: 'bg-green-100 text-green-700' };
    const days = getDaysPending(udhar.lastUdharDate);
    if (days >= 7) return { dot: 'bg-red-500', border: 'border-red-100', badge: 'bg-red-100 text-red-700' };
    if (days >= 3) return { dot: 'bg-amber-500', border: 'border-amber-100', badge: 'bg-amber-100 text-amber-700' };
    return { dot: 'bg-blue-500', border: 'border-blue-100', badge: 'bg-blue-100 text-blue-700' };
  };

  // Transactions ko date wise group karo (sirf credit wale)
  const groupByDate = (transactions) => {
    const credits = transactions.filter(t => t.type === 'credit');
    const groups = {};
    credits.forEach(t => {
      const date = new Date(t.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
      if (!groups[date]) groups[date] = [];
      groups[date].push(t);
    });
    // Latest first
    return Object.entries(groups).sort((a, b) =>
      new Date(b[0]) - new Date(a[0])
    );
  };

  const handleRemind = async (customerId) => {
    setReminding(customerId);
    try {
      await API.post(`/udhar/remind/${customerId}`);
      toast.success('Reminder bhej diya! 🔔');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reminder failed!');
    } finally {
      setReminding(null);
    }
  };

  const openPayModal = (udhar) => {
    setSelectedUdhar(udhar);
    setPayAmount('');
    setPayNote('');
    setShowPayModal(true);
  };

  const handleManualPayment = async (e) => {
    e.preventDefault();
    if (!payAmount || Number(payAmount) <= 0) {
      toast.error('Valid amount dalo!');
      return;
    }
    setSubmitting(true);
    try {
      await API.post('/udhar/add-payment', {
        customerPhone: selectedUdhar.customerPhone,
        amount: Number(payAmount),
        note: payNote || 'Cash payment'
      });
      toast.success('Payment record ho gaya! ✅');
      setShowPayModal(false);
      loadUdhars();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error aaya!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Manual Payment Modal */}
      {showPayModal && selectedUdhar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-black text-gray-900">💵 Cash Payment Record</h2>
                <p className="text-xs text-gray-400 mt-0.5">{selectedUdhar.customerName} • Remaining: ₹{selectedUdhar.remainingAmount}</p>
              </div>
              <button onClick={() => setShowPayModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 font-bold">×</button>
            </div>
            <form onSubmit={handleManualPayment} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  placeholder={`Max ₹${selectedUdhar.remainingAmount}`}
                  max={selectedUdhar.remainingAmount}
                  min="1"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Note
                </label>
                <input
                  type="text"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  placeholder="Cash mila, UPI mila..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowPayModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : '✅ Save Payment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Udhar Book 💳</h1>
        <p className="text-gray-400 text-sm mt-0.5">Orders accept hone par auto update hota hai</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
          <div className="text-2xl mb-1">😟</div>
          <div className="text-2xl font-black text-red-600">₹{totalDue.toLocaleString('en-IN')}</div>
          <div className="text-xs text-red-400 font-medium">Total Due</div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <div className="text-2xl mb-1">🎉</div>
          <div className="text-2xl font-black text-green-600">₹{totalRecovered.toLocaleString('en-IN')}</div>
          <div className="text-xs text-green-400 font-medium">Recovered</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-3 text-xs">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-gray-500">0–2 din</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-gray-500">3–6 din</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /><span className="text-gray-500">7+ din ⚠️</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-gray-500">Cleared</span></div>
      </div>

      {/* Udhar List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 skeleton rounded-2xl" />)}
        </div>
      ) : udhars.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="text-5xl mb-4">💳</div>
          <p className="font-bold text-gray-900">Koi udhar nahi!</p>
          <p className="text-gray-400 text-sm mt-1">Jab customer udhar order kare aur tum accept karo, yahan auto aayega 🎉</p>
        </div>
      ) : (
        <div className="space-y-3">
          {udhars.map((udhar) => {
            const colors = getUdharColor(udhar);
            const isExpanded = expandedId === udhar._id;
            const days = getDaysPending(udhar.lastUdharDate);
            const dateGroups = groupByDate(udhar.transactions);
            const payments = udhar.transactions.filter(t => t.type === 'payment');

            return (
              <div key={udhar._id}
                className={`bg-white rounded-2xl border ${colors.border} overflow-hidden transition-all`}>

                {/* Collapsed Card — always visible */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : udhar._id)}>
                  <div className="flex items-center gap-3">

                    {/* Avatar with color dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-11 h-11 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
    {udhar.customerProfilePic ? (
      <img
        src={udhar.customerProfilePic}
        alt={udhar.customerName}
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-white font-black text-sm">
        {udhar.customerName?.charAt(0) || 'C'}
      </span>
    )}
  </div>

  {/* Color dot — ye waise hi rahega */}
  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${colors.dot}`} />
</div>

                    {/* Name + phone + days */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">{udhar.customerName}</p>
                      <p className="text-xs text-gray-400">{udhar.customerPhone}</p>
                      {udhar.remainingAmount > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {days === 0 ? 'Aaj se' : `${days} din se`} pending
                        </p>
                      )}
                    </div>

                    {/* Amount + expand arrow */}
                    <div className="text-right flex-shrink-0">
                      <p className={`font-black text-lg ${udhar.remainingAmount > 0 ? 'text-red-500' : 'text-green-600'}`}>
                        ₹{udhar.remainingAmount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-gray-400">remaining</p>
                    </div>

                    {/* Arrow */}
                    <div className={`ml-1 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Mini stats always visible */}
                  {!isExpanded && (
                    <div className="flex gap-3 mt-3 text-xs">
                      <div className="flex-1 bg-gray-50 rounded-xl p-2 text-center">
                        <p className="font-black text-gray-900">₹{udhar.totalAmount.toLocaleString('en-IN')}</p>
                        <p className="text-gray-400">Total Udhar</p>
                      </div>
                      <div className="flex-1 bg-green-50 rounded-xl p-2 text-center">
                        <p className="font-black text-green-600">₹{udhar.paidAmount.toLocaleString('en-IN')}</p>
                        <p className="text-green-400">Paid</p>
                      </div>
                      <div className="flex-1 bg-red-50 rounded-xl p-2 text-center">
                        <p className="font-black text-red-500">₹{udhar.remainingAmount.toLocaleString('en-IN')}</p>
                        <p className="text-red-400">Due</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100">

                    {/* Date wise order history */}
                    <div className="px-4 py-3">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📦 Udhar History</p>

                      {dateGroups.length === 0 ? (
                        <p className="text-xs text-gray-400">Koi udhar record nahi</p>
                      ) : (
                        <div className="space-y-3">
                          {dateGroups.map(([date, txns]) => (
                            <div key={date} className="bg-gray-50 rounded-xl p-3">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-bold text-gray-500">📅 {date}</p>
                                <p className="text-xs font-black text-gray-900">
                                  ₹{txns.reduce((s, t) => s + t.amount, 0).toLocaleString('en-IN')}
                                </p>
                              </div>
                              {txns.map((txn, i) => (
                                <div key={i} className="space-y-1">
                                  {txn.orderDisplayId && (
                                    <p className="text-xs text-gray-400">#{txn.orderDisplayId}</p>
                                  )}
                                  {txn.items && txn.items.length > 0 ? (
                                    txn.items.map((item, j) => (
                                      <div key={j} className="flex justify-between text-xs">
                                        <span className="text-gray-600">{item.name} × {item.quantity}</span>
                                        <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-xs text-gray-500">{txn.note || 'Manual udhar'}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Payment history */}
                    {payments.length > 0 && (
                      <div className="px-4 py-3 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">✅ Payment History</p>
                        <div className="space-y-2">
                          {payments.map((p, i) => (
                            <div key={i} className="flex justify-between text-xs">
                              <span className="text-gray-500">
                                {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                {p.note ? ` • ${p.note}` : ''}
                              </span>
                              <span className="font-bold text-green-600">+₹{p.amount.toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    {udhar.remainingAmount > 0 && (
                      <div className="px-4 py-4 border-t border-gray-100 flex gap-3">
                        <button
                          onClick={() => handleRemind(udhar.customerId)}
                          disabled={reminding === udhar.customerId}
                          className="flex-1 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold rounded-xl text-sm transition-all active:scale-95 border border-amber-200 disabled:opacity-50">
                          {reminding === udhar.customerId ? '...' : '🔔 Remind'}
                        </button>
                        <button
                          onClick={() => openPayModal(udhar)}
                          className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-all active:scale-95">
                          💵 Record Payment
                        </button>
                      </div>
                    )}

                    {udhar.remainingAmount === 0 && (
                      <div className="px-4 py-4 border-t border-gray-100 text-center">
                        <span className="text-sm bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full">
                          ✅ Fully Cleared!
                        </span>
                      </div>
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