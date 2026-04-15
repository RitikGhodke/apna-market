'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getMyOrders, cancelOrder } from '@/services/orderService';
import BottomNav from '@/components/common/BottomNav';
import toast from 'react-hot-toast';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', emoji: '⏳' },
  accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-700', emoji: '✅' },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-purple-100 text-purple-700', emoji: '🚚' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', emoji: '🎉' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600', emoji: '❌' },
};

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadOrders();
  }, [isAuthenticated]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data.orders || []);
    } catch (error) {
      toast.error('Orders load nahi hue!');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (!confirm('Order cancel karna chahte ho?')) return;
    try {
      await cancelOrder(orderId);
      toast.success('Order cancel ho gaya!');
      loadOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Cancel nahi hua!');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const filteredOrders = activeFilter === 'all'
    ? orders
    : orders.filter(o => o.status === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="px-4 pt-16 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 skeleton rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 py-4">
          <h1 className="text-xl font-black text-gray-900">My Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">{orders.length} total orders</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto hide-scrollbar">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                activeFilter === filter.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">

        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">Koi order nahi!</h2>
            <p className="text-gray-500 text-sm mb-8">Abhi tak koi order nahi kiya</p>
            <Link href="/feed"
              className="bg-gray-900 text-white font-bold px-8 py-3 rounded-2xl inline-block">
              Shopping Karo →
            </Link>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            return (
              <div key={order._id}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden">

                {/* Order Header */}
                <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400">#{order.orderId}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${status.color}`}>
                    {status.emoji} {status.label}
                  </span>
                </div>

                {/* Shop Info */}
                <div className="px-4 py-3 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏪</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {order.shopId?.shopName || 'Shop'}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="px-4 py-3 border-b border-gray-50">
                  <div className="space-y-1.5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bill */}
                <div className="px-4 py-3 border-b border-gray-50">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Items</span>
                    <span>₹{order.productTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Delivery</span>
                    <span>{order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span>
                  </div>
                  <div className="flex justify-between font-black text-gray-900">
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Payment & Actions */}
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">
                      {order.paymentMethod === 'COD' ? '💵 COD' : '💳 Online'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                      order.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.paymentStatus === 'paid' ? '✓ Paid' : 'Pending'}
                    </span>
                  </div>

                  {order.status === 'pending' && (
                    <button onClick={() => handleCancel(order._id)}
                      className="text-xs text-red-500 font-bold border border-red-200 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-all active:scale-95">
                      Cancel
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
}