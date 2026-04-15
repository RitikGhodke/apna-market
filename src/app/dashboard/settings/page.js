'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { updateShop, updateDeliverySettings } from '@/services/shopService';
import toast from 'react-hot-toast';
import API from '@/services/api';

export default function SettingsPage() {
  const { shop, user } = useAuth();
  const [activeTab, setActiveTab] = useState('shop');
  const [loading, setLoading] = useState(false);

  const [shopForm, setShopForm] = useState({
    shopName: shop?.shopName || '',
    description: shop?.description || '',
    phone: shop?.phone || '',
    themeColor: shop?.themeColor || '#16a34a',
    isOpen: shop?.isOpen ?? true,
    announcement: shop?.homePage?.announcement || '',
  });

  const [deliveryForm, setDeliveryForm] = useState({
    deliveryEnabled: shop?.deliverySettings?.deliveryEnabled ?? true,
    customDeliveryDiscount: shop?.deliverySettings?.customDeliveryDiscount || 0,
    maxDeliveryDistance: shop?.deliverySettings?.maxDeliveryDistance || 5,
  });

  const handleShopUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateShop(shopForm);
      toast.success('Shop update ho gayi!');
    } catch (error) {
      toast.error('Update failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeliveryUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDeliverySettings(deliveryForm);
      toast.success('Delivery settings update ho gayi!');
    } catch (error) {
      toast.error('Update failed!');
    } finally {
      setLoading(false);
    }
  };

  const TABS = [
    { id: 'shop', label: '🏪 Shop' },
    { id: 'delivery', label: '🚚 Delivery' },
    { id: 'domain', label: '🌐 Domain' },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Settings ⚙️</h1>
        <p className="text-gray-400 text-sm mt-0.5">Shop ki settings manage karo</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Shop Settings */}
      {activeTab === 'shop' && (
        <form onSubmit={handleShopUpdate} className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Shop Name
              </label>
              <input type="text" value={shopForm.shopName}
                onChange={(e) => setShopForm({ ...shopForm, shopName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea value={shopForm.description}
                onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Phone
              </label>
              <input type="tel" value={shopForm.phone}
                onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Announcement
              </label>
              <input type="text" value={shopForm.announcement}
                onChange={(e) => setShopForm({ ...shopForm, announcement: e.target.value })}
                placeholder="Customers ko koi special message..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Theme Color
              </label>
              <div className="flex items-center gap-3">
                <input type="color" value={shopForm.themeColor}
                  onChange={(e) => setShopForm({ ...shopForm, themeColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer" />
                <span className="text-sm text-gray-500 font-medium">{shopForm.themeColor}</span>
              </div>
            </div>

            {/* Shop Open Toggle */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-bold text-gray-900 text-sm">Shop Status</p>
                <p className="text-xs text-gray-400">Customers order kar sakenge?</p>
              </div>
              <button type="button"
                onClick={() => setShopForm({ ...shopForm, isOpen: !shopForm.isOpen })}
                className={`w-14 h-7 rounded-full transition-all relative ${
                  shopForm.isOpen ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                  shopForm.isOpen ? 'left-8' : 'left-1'
                }`} />
              </button>
            </div>

          </div>

          {/* Shop Link */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">🌐 Your Shop Link</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-green-800 font-medium flex-1 truncate">
                apnamarket.in/shop/{shop?.slug}
              </p>
              <button type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`apnamarket.in/shop/${shop?.slug}`);
                  toast.success('Link copy ho gaya!');
                }}
                className="text-xs bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95">
                Copy
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : null}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}

      {/* Delivery Settings */}
      {activeTab === 'delivery' && (
        <form onSubmit={handleDeliveryUpdate} className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-5">

            {/* Delivery Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Delivery Enable</p>
                <p className="text-xs text-gray-400">Customers ko delivery milegi?</p>
              </div>
              <button type="button"
                onClick={() => setDeliveryForm({ ...deliveryForm, deliveryEnabled: !deliveryForm.deliveryEnabled })}
                className={`w-14 h-7 rounded-full transition-all relative ${
                  deliveryForm.deliveryEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
                  deliveryForm.deliveryEnabled ? 'left-8' : 'left-1'
                }`} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Custom Delivery Discount (₹)
              </label>
              <input type="number" value={deliveryForm.customDeliveryDiscount}
                onChange={(e) => setDeliveryForm({ ...deliveryForm, customDeliveryDiscount: Number(e.target.value) })}
                min="0" max="30"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
              <p className="text-xs text-gray-400 mt-1">Platform rate se kitna discount dena chahte ho</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Max Delivery Distance (km)
              </label>
              <input type="number" value={deliveryForm.maxDeliveryDistance}
                onChange={(e) => setDeliveryForm({ ...deliveryForm, maxDeliveryDistance: Number(e.target.value) })}
                min="1" max="5"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </div>

            {/* Delivery Rates Info */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Platform Delivery Rates</p>
              <div className="space-y-2">
                {[
                  { range: '0–1 km', rates: '₹5 – ₹15' },
                  { range: '1–2 km', rates: '₹10 – ₹20' },
                  { range: '2–3 km', rates: '₹15 – ₹25' },
                  { range: '3–5 km', rates: '₹20 – ₹30' },
                ].map((r) => (
                  <div key={r.range} className="flex justify-between text-sm">
                    <span className="text-gray-500">{r.range}</span>
                    <span className="font-semibold text-gray-900">{r.rates}</span>
                  </div>
                ))}
                <p className="text-xs text-green-600 font-medium mt-2">₹100+ orders pe FREE delivery!</p>
              </div>
            </div>

          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Delivery Settings'}
          </button>
        </form>
      )}

      {/* Domain Settings */}
      {activeTab === 'domain' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

            <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Current (Free)</p>
              <p className="text-sm font-bold text-green-800">apnamarket.in/shop/{shop?.slug}</p>
            </div>

            <div className="space-y-3">
              <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900 text-sm">Subdomain</p>
                  <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">₹199/year</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">yourshop.apnamarket.in</p>
                <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>

              <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-gray-900 text-sm">Custom Domain</p>
                  <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">₹999/year</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">yourshop.com</p>
                <button className="w-full py-2 bg-purple-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}