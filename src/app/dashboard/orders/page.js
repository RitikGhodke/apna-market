'use client';

import { useState, useEffect } from 'react';
import { getShopOrders, updateOrderStatus } from '@/services/orderService';
import toast from 'react-hot-toast';

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

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order ${newStatus} ho gaya!`);
      loadOrders();
    } catch (error) {
      toast.error('Status update failed!');
    } finally {
      setUpdatingId(null);
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

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Orders 📦</h1>
        <p className="text-gray-400 text-sm mt-0.5">Manage karo apne orders</p>
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
          <p className="font-bold text-gray-900">Koi order nahi!</p>
          <p className="text-gray-400 text-sm mt-1">Is category mein koi order nahi hai</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_CONFIG[order.status];
            const nextStatus = NEXT_STATUS[order.status];
            return (
              <div key={order._id}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden">

                {/* Order Header */}
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-gray-900 text-sm">#{order.orderId}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${status.color}`}>
                        {status.emoji} {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">₹{order.totalAmount}</p>
                    <p className="text-xs text-gray-400">{order.paymentMethod}</p>
                  </div>
                </div>

                {/* Customer */}
                <div className="px-5 py-3 border-b border-gray-50 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                    {order.userId?.name?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{order.userId?.name || 'Customer'}</p>
                    <p className="text-xs text-gray-400">{order.userId?.phone}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="px-5 py-3 border-b border-gray-50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Items</p>
                  <div className="space-y-1.5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ₹{item.price * item.quantity}
                        </span>
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
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Address</p>
                  <p className="text-sm text-gray-700">
                    {order.deliveryAddress?.fullAddress}, {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
                  </p>
                </div>

                {/* Actions */}
                {(order.status === 'pending' || nextStatus) && (
                  <div className="px-5 py-4 flex gap-3">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleReject(order._id)}
                        disabled={updatingId === order._id}
                        className="flex-1 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl text-sm transition-all active:scale-95 border border-red-200">
                        ❌ Reject
                      </button>
                    )}
                    {nextStatus && (
                      <button
                        onClick={() => handleStatusUpdate(order._id, nextStatus)}
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