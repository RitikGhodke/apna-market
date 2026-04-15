'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';
import toast from 'react-hot-toast';

export default function UdharPage() {
  const [udhars, setUdhars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showPayForm, setShowPayForm] = useState(false);
  const [formData, setFormData] = useState({ customerPhone: '', amount: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  const [totalDue, setTotalDue] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);

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

  const handleAddUdhar = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/udhar/add-udhar', {
        customerPhone: formData.customerPhone,
        amount: Number(formData.amount),
        note: formData.note
      });
      toast.success('Udhar add ho gaya!');
      setShowAddForm(false);
      setFormData({ customerPhone: '', amount: '', note: '' });
      loadUdhars();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error aaya!');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post('/udhar/add-payment', {
        customerPhone: formData.customerPhone,
        amount: Number(formData.amount),
        note: formData.note
      });
      toast.success('Payment record ho gaya!');
      setShowPayForm(false);
      setFormData({ customerPhone: '', amount: '', note: '' });
      loadUdhars();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error aaya!');
    } finally {
      setSubmitting(false);
    }
  };

  const UdharForm = ({ onSubmit, title }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-black text-gray-900">{title}</h2>
          <button onClick={() => { setShowAddForm(false); setShowPayForm(false); }}
            className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">×</button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Customer Phone *
            </label>
            <div className="flex">
              <div className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500 font-medium flex items-center">
                +91
              </div>
              <input type="tel" value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                placeholder="Customer ka number" required maxLength={10}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Amount (₹) *
            </label>
            <input type="number" value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0" required min="1"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Note
            </label>
            <input type="text" value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Kya liya, kab dega..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
          </div>
          <div className="flex gap-3">
            <button type="button"
              onClick={() => { setShowAddForm(false); setShowPayForm(false); }}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">
              Cancel
            </button>
            <button type="submit" disabled={submitting}
              className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {showAddForm && <UdharForm onSubmit={handleAddUdhar} title="💳 Udhar Add Karo" />}
      {showPayForm && <UdharForm onSubmit={handlePayment} title="✅ Payment Record Karo" />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Udhar Book 💳</h1>
          <p className="text-gray-400 text-sm mt-0.5">Digital credit management</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setShowPayForm(true); setFormData({ customerPhone: '', amount: '', note: '' }); }}
            className="px-3 py-2.5 bg-green-600 text-white font-bold rounded-xl text-sm active:scale-95 transition-all">
            ✅ Payment
          </button>
          <button onClick={() => { setShowAddForm(true); setFormData({ customerPhone: '', amount: '', note: '' }); }}
            className="px-3 py-2.5 bg-gray-900 text-white font-bold rounded-xl text-sm active:scale-95 transition-all">
            ➕ Udhar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
          <div className="text-2xl mb-1">😟</div>
          <div className="text-2xl font-black text-red-600">₹{totalDue}</div>
          <div className="text-xs text-red-400 font-medium">Total Due</div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
          <div className="text-2xl mb-1">🎉</div>
          <div className="text-2xl font-black text-green-600">₹{totalRecovered}</div>
          <div className="text-xs text-green-400 font-medium">Recovered</div>
        </div>
      </div>

      {/* Udhar List */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-24 skeleton rounded-2xl" />)}
        </div>
      ) : udhars.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="text-5xl mb-4">💳</div>
          <p className="font-bold text-gray-900">Koi udhar nahi!</p>
          <p className="text-gray-400 text-sm mt-1">Sab clear hai 🎉</p>
        </div>
      ) : (
        <div className="space-y-3">
          {udhars.map((udhar) => (
            <div key={udhar._id}
              className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-sm">
                    {udhar.customerName?.charAt(0) || 'C'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{udhar.customerName}</p>
                  <p className="text-xs text-gray-400">{udhar.customerPhone}</p>
                </div>
                <div className="text-right">
                  <p className={`font-black text-lg ${udhar.remainingAmount > 0 ? 'text-red-500' : 'text-green-600'}`}>
                    ₹{udhar.remainingAmount}
                  </p>
                  <p className="text-xs text-gray-400">remaining</p>
                </div>
              </div>

              <div className="flex gap-3 text-xs">
                <div className="flex-1 bg-gray-50 rounded-xl p-2 text-center">
                  <p className="font-black text-gray-900">₹{udhar.totalAmount}</p>
                  <p className="text-gray-400">Total Udhar</p>
                </div>
                <div className="flex-1 bg-green-50 rounded-xl p-2 text-center">
                  <p className="font-black text-green-600">₹{udhar.paidAmount}</p>
                  <p className="text-green-400">Paid</p>
                </div>
                <div className="flex-1 bg-red-50 rounded-xl p-2 text-center">
                  <p className="font-black text-red-500">₹{udhar.remainingAmount}</p>
                  <p className="text-red-400">Due</p>
                </div>
              </div>

              {udhar.remainingAmount === 0 && (
                <div className="mt-3 text-center">
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">
                    ✅ Cleared!
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}