'use client';

import { useState, useEffect } from 'react';
import { getCustomers } from '@/services/shopService';
import toast from 'react-hot-toast';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomers();
      setCustomers(res.customers || []);
    } catch (error) {
      toast.error('Customers load nahi hue!');
    } finally {
      setLoading(false);
    }
  };

  const filtered = customers.filter(c =>
    c.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.customer?.phone?.includes(search)
  );

  const getInitials = (name) => {
    if (!name) return 'C';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Customers 👥</h1>
        <p className="text-gray-400 text-sm mt-0.5">{customers.length} total customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total', value: customers.length, emoji: '👥' },
          { label: 'Repeat', value: customers.filter(c => c.totalOrders > 1).length, emoji: '🔄' },
          { label: 'Total Revenue', value: `₹${customers.reduce((s, c) => s + c.totalSpent, 0)}`, emoji: '💰' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="text-xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3">
        <span className="text-gray-400">🔍</span>
        <input type="text" value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Name ya phone se search karo..."
          className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none" />
      </div>

      {/* Customers List */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-20 skeleton rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <div className="text-5xl mb-4">👥</div>
          <p className="font-bold text-gray-900">Koi customer nahi!</p>
          <p className="text-gray-400 text-sm mt-1">Jab orders aayenge tab customers dikhenge</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item, i) => (
            <div key={i}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition-all">
              
<div className="w-12 h-12 rounded-2xl flex-shrink-0 overflow-hidden bg-gray-900 flex items-center justify-center">
  {item.customer?.profilePic ? (
    <img
      src={item.customer.profilePic}
      alt={item.customer?.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-white font-black text-sm">
      {getInitials(item.customer?.name)}
    </span>
  )}
</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate">{item.customer?.name}</p>
                <p className="text-xs text-gray-400">{item.customer?.phone}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-black text-gray-900">₹{item.totalSpent}</p>
                <p className="text-xs text-gray-400">{item.totalOrders} orders</p>
                {item.totalOrders > 1 && (
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                    Repeat 🔄
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}