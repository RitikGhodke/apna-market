// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import DashboardNav from '@/components/common/DashboardNav';

// export default function DashboardLayout({ children }) {
//   const router = useRouter();
//   const { isAuthenticated, user, isRestoring  } = useAuth();

//   useEffect(() => {
//     if (isRestoring) return;
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     if (user && user.role !== 'shop') {
//       router.push('/feed');
//     }
//   }, [isAuthenticated, user, isRestoring ]);

//   if (isRestoring) return null;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <DashboardNav />
//       {/* Desktop: margin left for sidebar */}
//       <main className="lg:ml-64 pb-24 lg:pb-0">
//         {children}
//       </main>
//     </div>
//   );
// }








// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import DashboardNav from '@/components/common/DashboardNav';
// import API from '@/services/api';

// export default function DashboardLayout({ children }) {
//   const router = useRouter();
//   const { isAuthenticated, user, isRestoring } = useAuth();
//   const [subStatus, setSubStatus] = useState(null);
//   const [subLoading, setSubLoading] = useState(true);
//   const [utrInput, setUtrInput] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (isRestoring) return;
//     if (!isAuthenticated) { router.push('/auth/login'); return; }
//     if (user && user.role !== 'shop') { router.push('/feed'); return; }
//     loadSubStatus();
//   }, [isAuthenticated, user, isRestoring]);

//   const loadSubStatus = async () => {
//     try {
//       const res = await API.get('/subscription/status');
//       setSubStatus(res.data);
//     } catch {
//       setSubStatus(null);
//     } finally {
//       setSubLoading(false);
//     }
//   };

//   const handleSubmitPayment = async () => {
//     if (!utrInput.trim() || utrInput.trim().length < 6) {
//       alert('Valid UTR number dalo!');
//       return;
//     }
//     setSubmitting(true);
//     try {
//       await API.post('/subscription/submit-payment', { utrNumber: utrInput.trim() });
//       await loadSubStatus();
//     } catch {
//       alert('Submit failed!');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (isRestoring || subLoading) return null;

//   // ── DASHBOARD LOCKED ──
//   if (subStatus?.isLocked) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

//           <div className="bg-gray-900 px-6 py-5 text-center">
//             <div className="text-4xl mb-2">🔒</div>
//             <h1 className="text-white font-black text-lg">Dashboard Locked</h1>
//             <p className="text-gray-400 text-xs mt-1">Monthly subscription renew karo</p>
//           </div>

//           <div className="p-6 space-y-4">

//             <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
//               <p className="text-xs text-red-500 font-medium mb-1">Is mahine ki sale</p>
//               <p className="text-2xl font-black text-red-600">₹{subStatus.monthSales?.toLocaleString('en-IN')}</p>
//               <p className="text-xs text-red-400 mt-1">₹1,000 se zyada — ₹99 subscription required</p>
//             </div>

//             <div className="space-y-3">
//               <p className="text-xs font-black text-gray-500 uppercase tracking-wider text-center">UPI se pay karo</p>

//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
//                 <p className="text-xs text-gray-400 text-center mb-2">UPI ID</p>
//                 <div className="flex items-center gap-2">
//                   <p className="flex-1 text-sm font-black text-gray-900 text-center">9009896441-2@ibl</p>
//                   <button
//                     onClick={() => { navigator.clipboard.writeText('9009896441-2@ibl'); alert('Copied!'); }}
//                     className="text-xs bg-gray-900 text-white font-bold px-3 py-1.5 rounded-xl flex-shrink-0">
//                     Copy
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-green-50 border border-green-100 rounded-2xl p-3 text-center">
//                 <p className="text-xs text-green-600 font-medium">Pay karo</p>
//                 <p className="text-3xl font-black text-green-700">₹99</p>
//                 <p className="text-xs text-green-500 mt-0.5">30 din ke liye valid</p>
//               </div>

              
//                 href="upi://pay?pa=9009896441-2@ibl&pn=Apna%20Market&am=99&tn=Subscription&cu=INR"
//                 className="w-full py-3.5 bg-blue-600 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
//                 📲 UPI App Se Pay Karo
//               </a>

//               <div>
//                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
//                   UTR / Transaction ID
//                 </label>
//                 <input
//                   type="text"
//                   value={utrInput}
//                   onChange={(e) => setUtrInput(e.target.value)}
//                   placeholder="12 digit UTR number"
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//                 />
//               </div>

//               <button
//                 onClick={handleSubmitPayment}
//                 disabled={submitting || !utrInput.trim()}
//                 className="w-full py-3.5 bg-gray-900 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 text-sm">
//                 {submitting ? '⏳ Submitting...' : '✅ Payment Done — Submit Karo'}
//               </button>

//               {subStatus?.subscription?.utrNumber && !subStatus?.subscription?.isPaid && (
//                 <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-center">
//                   <p className="text-xs font-black text-amber-700">⏳ Payment verification pending</p>
//                   <p className="text-xs text-amber-500 mt-0.5">UTR: {subStatus.subscription.utrNumber}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <DashboardNav />
//       <main className="lg:ml-64 pb-24 lg:pb-0">
//         {children}
//       </main>
//     </div>
//   );
// }










'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import DashboardNav from '@/components/common/DashboardNav';
import API from '@/services/api';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, user, isRestoring } = useAuth();

  const [subStatus, setSubStatus] = useState(null);
  const [subLoading, setSubLoading] = useState(true);
  const [utrInput, setUtrInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isRestoring) return;

    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user && user.role !== 'shop') {
      router.push('/feed');
      return;
    }

    loadSubStatus();
  }, [isAuthenticated, user, isRestoring]);

  const loadSubStatus = async () => {
    try {
      const res = await API.get('/subscription/status');
      setSubStatus(res.data);
    } catch {
      setSubStatus(null);
    } finally {
      setSubLoading(false);
    }
  };

  const handleSubmitPayment = async () => {
    if (!utrInput.trim() || utrInput.trim().length < 6) {
      alert('Valid UTR number dalo!');
      return;
    }

    setSubmitting(true);

    try {
      await API.post('/subscription/submit-payment', {
        utrNumber: utrInput.trim(),
      });

      alert('Payment submitted successfully!');
      setUtrInput('');
      await loadSubStatus();
    } catch (err) {
      alert(err.response?.data?.message || 'Submit failed!');
    } finally {
      setSubmitting(false);
    }
  };

  // 🔄 Loading state
  if (isRestoring || subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-sm font-semibold">Loading...</p>
      </div>
    );
  }

  // 🔒 Dashboard Locked UI
  if (subStatus?.isLocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="bg-gray-900 px-6 py-5 text-center">
            <div className="text-4xl mb-2">🔒</div>
            <h1 className="text-white font-black text-lg">Dashboard Locked</h1>
            <p className="text-gray-400 text-xs mt-1">
              Monthly subscription renew karo
            </p>
          </div>

          <div className="p-6 space-y-4">

            {/* Sales Info */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
              <p className="text-xs text-red-500 font-medium mb-1">
                Is mahine ki sale
              </p>
              <p className="text-2xl font-black text-red-600">
                ₹{subStatus.monthSales?.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-red-400 mt-1">
                ₹1,000 se zyada — ₹99 subscription required
              </p>
            </div>

            <div className="space-y-3">

              {/* UPI Section */}
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider text-center">
                UPI se pay karo
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="text-xs text-gray-400 text-center mb-2">
                  UPI ID
                </p>
                <div className="flex items-center gap-2">
                  <p className="flex-1 text-sm font-black text-gray-900 text-center">
                    9009896441-2@ibl
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('9009896441-2@ibl');
                      alert('Copied!');
                    }}
                    className="text-xs bg-gray-900 text-white font-bold px-3 py-1.5 rounded-xl"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-3 text-center">
                <p className="text-xs text-green-600 font-medium">Pay karo</p>
                <p className="text-3xl font-black text-green-700">₹99</p>
                <p className="text-xs text-green-500 mt-0.5">
                  30 din ke liye valid
                </p>
              </div>

              {/* UPI Button FIXED */}
              <a
                href="upi://pay?pa=9009896441-2@ibl&pn=Apna%20Market&am=99&tn=Subscription&cu=INR"
                className="w-full py-3.5 bg-blue-600 text-white font-black rounded-2xl text-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                📲 UPI App Se Pay Karo
              </a>

              {/* UTR Input */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  UTR / Transaction ID
                </label>
                <input
                  type="text"
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  placeholder="12 digit UTR number"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitPayment}
                disabled={submitting || !utrInput.trim()}
                className="w-full py-3.5 bg-gray-900 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 text-sm"
              >
                {submitting ? '⏳ Submitting...' : '✅ Payment Done — Submit Karo'}
              </button>

              {/* Pending UI */}
              {subStatus?.subscription?.utrNumber &&
                !subStatus?.subscription?.isPaid && (
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-center">
                    <p className="text-xs font-black text-amber-700">
                      ⏳ Payment verification pending
                    </p>
                    <p className="text-xs text-amber-500 mt-0.5">
                      UTR: {subStatus.subscription.utrNumber}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Normal Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="lg:ml-64 pb-24 lg:pb-0">{children}</main>
    </div>
  );
}

