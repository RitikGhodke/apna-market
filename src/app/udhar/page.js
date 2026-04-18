'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import API from '@/services/api';
import BottomNav from '@/components/common/BottomNav';
import toast from 'react-hot-toast';

export default function CustomerUdharPage() {
  const router = useRouter();
  const { isAuthenticated, isRestoring } = useAuth();
  const [udhars, setUdhars] = useState([]);
  const [paidUdhars, setPaidUdhars] = useState([]);
  const [totalPending, setTotalPending] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Pay modal
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedUdhar, setSelectedUdhar] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (isRestoring) return;
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadMyUdhar();
  }, [isAuthenticated, isRestoring]);

  const loadMyUdhar = async () => {
    try {
      setLoading(true);
      const res = await API.get('/udhar/my-udhar');
      setUdhars(res.data.udhars || []);
      setPaidUdhars(res.data.paidUdhars || []);
      setTotalPending(res.data.totalPending || 0);
    } catch (error) {
      toast.error('Udhar load nahi hua!');
    } finally {
      setLoading(false);
    }
  };

  // Transactions ko date wise group karo
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
    return Object.entries(groups).sort((a, b) =>
      new Date(b[0]) - new Date(a[0])
    );
  };

  const getDaysPending = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const openPayModal = (udhar) => {
    setSelectedUdhar(udhar);
    setPayAmount(String(udhar.remainingAmount));
    setShowPayModal(true);
  };

  const handlePay = async () => {
    if (!payAmount || Number(payAmount) <= 0) {
      toast.error('Valid amount dalo!');
      return;
    }
    if (Number(payAmount) > selectedUdhar.remainingAmount) {
      toast.error(`Maximum ₹${selectedUdhar.remainingAmount} pay kar sakte ho!`);
      return;
    }
    setPaying(true);
    try {
      await API.post('/udhar/pay', {
        udharId: selectedUdhar._id,
        amount: Number(payAmount),
        paymentMethod: 'UPI'
      });
      toast.success(`₹${payAmount} payment successful! ✅`);
      setShowPayModal(false);
      loadMyUdhar();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Payment failed!');
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="px-4 pt-16 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 skeleton rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Pay Modal */}
      {showPayModal && selectedUdhar && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-black text-gray-900">💳 Pay Udhar</h2>
              <p className="text-xs text-gray-400 mt-0.5">{selectedUdhar.shopName}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-red-50 rounded-2xl p-4 text-center">
                <p className="text-xs text-red-400 font-medium">Total Remaining</p>
                <p className="text-3xl font-black text-red-500">₹{selectedUdhar.remainingAmount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Pay Amount (₹)
                </label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  max={selectedUdhar.remainingAmount}
                  min="1"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-bold focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">Partial payment bhi kar sakte ho</p>
              </div>

              {/* Quick amount buttons */}
              <div className="flex gap-2">
                {[selectedUdhar.remainingAmount, Math.floor(selectedUdhar.remainingAmount / 2), 100, 50]
                  .filter((v, i, a) => v > 0 && a.indexOf(v) === i && v <= selectedUdhar.remainingAmount)
                  .slice(0, 4)
                  .map(amt => (
                    <button key={amt}
                      onClick={() => setPayAmount(String(amt))}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        Number(payAmount) === amt
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                      ₹{amt}
                    </button>
                  ))
                }
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowPayModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">
                  Cancel
                </button>
                <button onClick={handlePay} disabled={paying}
                  className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                  {paying ? (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : '✅ Pay Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-xl font-black text-gray-900">Mera Udhar 💳</h1>
          <p className="text-xs text-gray-400 mt-0.5">Shops ka pending payment</p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* Total pending */}
        {totalPending > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-red-400 font-medium">Total Pending</p>
              <p className="text-3xl font-black text-red-500">₹{totalPending.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-4xl">😬</div>
          </div>
        )}

        {/* Pending Udhars */}
        {udhars.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
            <div className="text-5xl mb-4">🎉</div>
            <p className="font-bold text-gray-900">Koi udhar nahi!</p>
            <p className="text-gray-400 text-sm mt-1">Sab clear hai, great job! 👏</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Udhar</p>
            {udhars.map((udhar) => {
              const isExpanded = expandedId === udhar._id;
              const days = getDaysPending(udhar.lastUdharDate);
              const dateGroups = groupByDate(udhar.transactions);
              const payments = udhar.transactions.filter(t => t.type === 'payment');

              return (
                <div key={udhar._id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

                  {/* Collapsed */}
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : udhar._id)}>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-black text-sm">🏪</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{udhar.shopName}</p>
                        <p className="text-xs text-gray-400">
                          {days === 0 ? 'Aaj se' : `${days} din se`} pending
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-black text-lg text-red-500">
                          ₹{udhar.remainingAmount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-xs text-gray-400">due</p>
                      </div>
                      <div className={`ml-1 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="border-t border-gray-100">

                      {/* Order history date wise */}
                      <div className="px-4 py-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">📦 Kya kya liya</p>
                        <div className="space-y-3">
                          {dateGroups.map(([date, txns]) => (
                            <div key={date} className="bg-gray-50 rounded-xl p-3">
                              <div className="flex justify-between mb-2">
                                <p className="text-xs font-bold text-gray-500">📅 {date}</p>
                                <p className="text-xs font-black text-gray-900">
                                  ₹{txns.reduce((s, t) => s + t.amount, 0).toLocaleString('en-IN')}
                                </p>
                              </div>
                              {txns.map((txn, i) => (
                                <div key={i}>
                                  {txn.orderDisplayId && (
                                    <p className="text-xs text-gray-400 mb-1">#{txn.orderDisplayId}</p>
                                  )}
                                  {txn.items && txn.items.length > 0 ? (
                                    txn.items.map((item, j) => (
                                      <div key={j} className="flex justify-between text-xs">
                                        <span className="text-gray-600">{item.name} × {item.quantity}</span>
                                        <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-xs text-gray-500">{txn.note}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment history */}
                      {payments.length > 0 && (
                        <div className="px-4 py-3 border-t border-gray-100">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">✅ Paid History</p>
                          <div className="space-y-1.5">
                            {payments.map((p, i) => (
                              <div key={i} className="flex justify-between text-xs">
                                <span className="text-gray-500">
                                  {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                  {p.note ? ` • ${p.note}` : ''}
                                </span>
                                <span className="font-bold text-green-600">-₹{p.amount.toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pay button */}
                      <div className="px-4 py-4 border-t border-gray-100">
                        <button
                          onClick={() => openPayModal(udhar)}
                          className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl text-sm active:scale-95 transition-all">
                          💳 Pay Now — ₹{udhar.remainingAmount.toLocaleString('en-IN')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Paid History Section */}
        {paidUdhars.length > 0 && (
          <div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between py-3 text-sm font-bold text-gray-500">
              <span>✅ Cleared Udhars ({paidUdhars.length})</span>
              <svg className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showHistory && (
              <div className="space-y-2">
                {paidUdhars.map((udhar) => (
                  <div key={udhar._id}
                    className="bg-white rounded-2xl border border-green-100 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                        <span className="text-green-600 text-sm">🏪</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{udhar.shopName}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(udhar.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-green-600">₹{udhar.totalAmount.toLocaleString('en-IN')}</p>
                      <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Cleared ✅</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      <BottomNav />
    </div>
  );
}