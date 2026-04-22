'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';
import toast from 'react-hot-toast';

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [blocking, setBlocking] = useState(null);

  useEffect(() => { loadSubscriptions(); }, []);

  const loadSubscriptions = async () => {
    try {
      const res = await API.get('/admin/subscriptions');
      setSubscriptions(res.data.subscriptions || []);
    } catch { toast.error('Load failed!'); }
    finally { setLoading(false); }
  };

  const handleBlock = async (id) => {
    if (!confirm('Is shop ko block karna chahte ho?')) return;
    setBlocking(id);
    try {
      await API.put(`/admin/subscription/${id}/block`);
      toast.success('Shop blocked!');
      loadSubscriptions();
    } catch { toast.error('Block failed!'); }
    finally { setBlocking(null); }
  };

  const filtered = subscriptions.filter(s => {
    if (filter === 'paid') return s.isPaid;
    if (filter === 'unpaid') return s.isRequired && !s.isPaid;
    if (filter === 'free') return !s.isRequired;
    return true;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Subscriptions 💰</h1>
        <p className="text-gray-400 text-sm mt-0.5">Is mahine ki subscriptions</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All' },
          { id: 'paid', label: '✅ Paid' },
          { id: 'unpaid', label: '⚠️ Unpaid' },
          { id: 'free', label: '🆓 Free' },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filter === f.id ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-600'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-bold text-gray-900">Koi subscription nahi</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(sub => (
            <div key={sub._id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-gray-900">{sub.shopId?.shopName || 'Unknown Shop'}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      sub.isPaid ? 'bg-green-100 text-green-700' :
                      sub.isRequired ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {sub.isPaid ? '✅ Paid' : sub.isRequired ? '⚠️ Unpaid' : '🆓 Free'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{sub.shopId?.phone}</p>

                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Sale: <strong className="text-gray-900">₹{sub.monthSales?.toLocaleString('en-IN')}</strong></span>
                    {sub.isPaid && <span>Amount: <strong className="text-green-600">₹{sub.amount}</strong></span>}
                  </div>

                  {sub.utrNumber && sub.utrNumber !== 'BLOCKED' && (
                    <div className="mt-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                      <p className="text-xs text-blue-600 font-bold">UTR: {sub.utrNumber}</p>
                      {sub.paidAt && (
                        <p className="text-xs text-blue-400 mt-0.5">
                          Paid: {new Date(sub.paidAt).toLocaleDateString('en-IN')}
                        </p>
                      )}
                    </div>
                  )}

                  {sub.utrNumber === 'BLOCKED' && (
                    <div className="mt-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                      <p className="text-xs text-red-600 font-bold">🚫 Manually Blocked</p>
                    </div>
                  )}
                </div>

                {/* Block button — sirf paid pe dikhega */}
                {sub.isPaid && sub.utrNumber !== 'BLOCKED' && (
                  <button
                    onClick={() => handleBlock(sub._id)}
                    disabled={blocking === sub._id}
                    className="text-xs bg-red-50 text-red-600 font-bold px-3 py-2 rounded-xl border border-red-100 active:scale-95 transition-all flex-shrink-0">
                    {blocking === sub._id ? '...' : '🚫 Block'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}