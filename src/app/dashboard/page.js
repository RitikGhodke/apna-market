'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getAnalytics } from '@/services/shopService';
import { getShopOrders } from '@/services/orderService';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user, shop } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, ordersRes] = await Promise.all([
        getAnalytics(),
        getShopOrders({ status: 'pending' })
      ]);
      setAnalytics(analyticsRes.analytics);
      setRecentOrders(ordersRes.orders?.slice(0, 5) || []);
    } catch (error) {
      toast.error('Data load nahi hua!');
    } finally {
      setLoading(false);
    }
  };

  const STATUS_CONFIG = {
    pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
    accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-700' },
    out_for_delivery: { label: 'On Way', color: 'bg-purple-100 text-purple-700' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600' },
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 skeleton rounded-xl w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-28 skeleton rounded-2xl" />)}
        </div>
        <div className="h-64 skeleton rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Namaste, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {shop?.shopName} — {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <Link href={`/shop/${shop?.slug}`} target="_blank"
          className="hidden sm:flex items-center gap-2 bg-gray-900 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-all active:scale-95">
          🌐 View Shop
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Sales", value: `₹${analytics?.todaySales || 0}`, emoji: '💰', color: 'bg-green-50 border-green-100' },
          { label: "Today's Orders", value: analytics?.todayOrders || 0, emoji: '📦', color: 'bg-blue-50 border-blue-100' },
          { label: 'Total Orders', value: analytics?.totalOrders || 0, emoji: '🛒', color: 'bg-purple-50 border-purple-100' },
          { label: 'Customers', value: analytics?.totalCustomers || 0, emoji: '👥', color: 'bg-amber-50 border-amber-100' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} border rounded-2xl p-4`}>
            <div className="text-2xl mb-2">{stat.emoji}</div>
            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Monthly Sales */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-gray-900">This Month</h2>
          <span className="text-xs text-gray-400 font-medium">Monthly Sales</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-gray-900">₹{analytics?.monthlySales || 0}</span>
          <span className="text-gray-400 text-sm">this month</span>
        </div>

        {/* Weekly chart */}
        {analytics?.dailySales && Object.keys(analytics.dailySales).length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-400 font-medium mb-3">Weekly Sales</p>
            <div className="flex items-end gap-2 h-20">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                const value = analytics.dailySales[day] || 0;
                const max = Math.max(...Object.values(analytics.dailySales), 1);
                const height = Math.max((value / max) * 100, 5);
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-green-500 rounded-t-lg transition-all"
                      style={{ height: `${height}%` }} />
                    <span className="text-xs text-gray-400">{day.slice(0, 1)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Two Column */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Pending Orders */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-900">⏳ Pending Orders</h2>
            <Link href="/dashboard/orders"
              className="text-xs text-green-600 font-bold hover:underline">
              See All →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">🎉</div>
              <p className="text-gray-500 text-sm font-medium">Koi pending order nahi!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link key={order._id} href="/dashboard/orders"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">⏳</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {order.userId?.name || 'Customer'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.items.length} items · ₹{order.totalAmount}
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">
                    New
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-gray-900">🏆 Top Products</h2>
            <Link href="/dashboard/products"
              className="text-xs text-green-600 font-bold hover:underline">
              See All →
            </Link>
          </div>
          {!analytics?.topProducts?.length ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">📦</div>
              <p className="text-gray-500 text-sm font-medium">Koi product nahi abhi</p>
              <Link href="/dashboard/products"
                className="text-xs text-green-600 font-bold mt-2 inline-block">
                + Add Product
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {analytics.topProducts.map((product, i) => (
                <div key={product._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                    i === 0 ? 'bg-amber-400 text-white' :
                    i === 1 ? 'bg-gray-300 text-gray-700' :
                    i === 2 ? 'bg-orange-300 text-white' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.totalSold} sold</p>
                  </div>
                  <span className="font-black text-gray-900 text-sm">₹{product.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/dashboard/products', emoji: '➕', label: 'Add Product', color: 'bg-green-50 border-green-100 hover:bg-green-100' },
          { href: '/dashboard/orders', emoji: '📦', label: 'View Orders', color: 'bg-blue-50 border-blue-100 hover:bg-blue-100' },
          { href: '/dashboard/udhar', emoji: '💳', label: 'Udhar Book', color: 'bg-purple-50 border-purple-100 hover:bg-purple-100' },
          { href: '/dashboard/settings', emoji: '⚙️', label: 'Settings', color: 'bg-gray-50 border-gray-200 hover:bg-gray-100' },
        ].map((action) => (
          <Link key={action.href} href={action.href}
            className={`${action.color} border rounded-2xl p-4 flex flex-col items-center gap-2 transition-all active:scale-95`}>
            <span className="text-2xl">{action.emoji}</span>
            <span className="text-xs font-bold text-gray-700 text-center">{action.label}</span>
          </Link>
        ))}
      </div>

    </div>
  );
}