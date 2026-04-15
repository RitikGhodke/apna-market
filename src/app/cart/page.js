'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { placeOrder } from '@/services/orderService';
import BottomNav from '@/components/common/BottomNav';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { items, shopId, totalProductPrice, deliveryCharge, totalAmount, fetchCart, updateCartItem, removeFromCart, emptyCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [address, setAddress] = useState({
    fullAddress: user?.address?.fullAddress || '',
    city: user?.address?.city || '',
    pincode: user?.address?.pincode || '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    loadCart();
  }, [isAuthenticated]);

  const loadCart = async () => {
    setLoading(true);
    await fetchCart();
    setLoading(false);
  };

  const handleQuantityChange = async (productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty <= 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQty);
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.fullAddress || !address.city) {
      toast.error('Delivery address fill karo!');
      return;
    }
    setOrderLoading(true);
    try {
      const data = await placeOrder({
        paymentMethod,
        deliveryAddress: address
      });
      toast.success('Order place ho gaya! 🎉');
      await emptyCart();
      router.push(`/orders`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order failed!');
    } finally {
      setOrderLoading(false);
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

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-24 px-4">
        <div className="text-center">
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Cart khaali hai!</h2>
          <p className="text-gray-500 mb-8">Koi product add nahi kiya abhi tak</p>
          <Link href="/feed"
            className="bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl inline-block active:scale-95 transition-all">
            Shops Browse Karo →
          </Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button onClick={() => router.back()}
            className="w-9 h-9 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
            ←
          </button>
          <div>
            <h1 className="text-lg font-black text-gray-900">Cart</h1>
            <p className="text-xs text-gray-400">{items.length} items</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* Cart Items */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50">
            <h2 className="font-bold text-gray-900 text-sm">Your Items</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3 px-4 py-3">

                {/* Image */}
                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">📦</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">₹{item.price} each</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity, -1)}
                    className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-700 font-bold text-sm transition-all active:scale-95">
                    −
                  </button>
                  <span className="w-6 text-center font-bold text-gray-900 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.productId, item.quantity, 1)}
                    className="w-7 h-7 bg-gray-900 hover:bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all active:scale-95">
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0 min-w-12">
                  <p className="font-black text-gray-900 text-sm">₹{item.price * item.quantity}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-3xl border border-gray-100 p-4">
          <h2 className="font-bold text-gray-900 text-sm mb-3">📍 Delivery Address</h2>
          <div className="space-y-3">
            <textarea
              value={address.fullAddress}
              onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
              placeholder="Ghar ka address, gali, mohalla..."
              rows={2}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                placeholder="City"
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
              <input
                type="text"
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                placeholder="Pincode"
                maxLength={6}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-3xl border border-gray-100 p-4">
          <h2 className="font-bold text-gray-900 text-sm mb-3">💳 Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'COD', label: 'Cash on Delivery', emoji: '💵' },
              { id: 'ONLINE', label: 'Online Payment', emoji: '💳' },
            ].map((method) => (
              <button key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === method.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                <span className="text-2xl">{method.emoji}</span>
                <span className="text-xs font-bold text-gray-900 text-center">{method.label}</span>
                {paymentMethod === method.id && (
                  <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-3xl border border-gray-100 p-4">
          <h2 className="font-bold text-gray-900 text-sm mb-3">🧾 Bill Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Items total</span>
              <span className="font-semibold text-gray-900">₹{totalProductPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery charge</span>
              <span className={`font-semibold ${deliveryCharge === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                {deliveryCharge === 0 ? 'FREE 🎉' : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between">
              <span className="font-black text-gray-900">Total</span>
              <span className="font-black text-gray-900 text-lg">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={orderLoading}
          className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95 disabled:opacity-50 text-lg flex items-center justify-center gap-2">
          {orderLoading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Order place ho raha hai...
            </>
          ) : (
            <>🚀 Order Place Karo — ₹{totalAmount}</>
          )}
        </button>

      </div>

      <BottomNav />
    </div>
  );
}