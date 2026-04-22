'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadOverview(); }, []);

  const loadOverview = async () => {
    try {
      const res = await API.get('/admin/overview');
      setOverview(res.data.overview);
    } catch { console.log('Overview load failed'); }
    finally { setLoading(false); }
  };

  if (loading) return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-2xl" />)}
      </div>
    </div>
  );

  const STATS = [
    { label: 'Total Shops', value: overview?.totalShops || 0, emoji: '🏪', color: 'bg-blue-50 border-blue-100' },
    { label: 'Total Users', value: overview?.totalUsers || 0, emoji: '👥', color: 'bg-green-50 border-green-100' },
    { label: 'Total Orders', value: overview?.totalOrders || 0, emoji: '📦', color: 'bg-purple-50 border-purple-100' },
    { label: 'Aaj ke Orders', value: overview?.todayOrders || 0, emoji: '🚀', color: 'bg-amber-50 border-amber-100' },
    { label: 'This Month Revenue', value: `₹${overview?.totalRevenue || 0}`, emoji: '💰', color: 'bg-emerald-50 border-emerald-100' },
    { label: 'Paid Subscriptions', value: overview?.paidSubscriptions || 0, emoji: '✅', color: 'bg-green-50 border-green-100' },
    { label: 'Unpaid Subscriptions', value: overview?.unpaidSubscriptions || 0, emoji: '⚠️', color: 'bg-red-50 border-red-100' },
    { label: 'New Users This Month', value: overview?.newUsersThisMonth || 0, emoji: '🆕', color: 'bg-indigo-50 border-indigo-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Overview 📊</h1>
        <p className="text-gray-400 text-sm mt-0.5">Platform ka pura data</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(stat => (
          <div key={stat.label} className={`${stat.color} border rounded-2xl p-4`}>
            <div className="text-2xl mb-2">{stat.emoji}</div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}