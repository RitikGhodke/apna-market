'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createShopService } from '@/services/authService';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { id: 'kirana', label: 'Kirana', emoji: '🛒', desc: 'Grocery, daily needs', color: 'bg-green-50 border-green-200 text-green-700' },
  { id: 'dairy', label: 'Dairy', emoji: '🥛', desc: 'Milk, curd, paneer', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'fruits', label: 'Fruits & Vegetables', emoji: '🍎', desc: 'Fresh produce', color: 'bg-red-50 border-red-200 text-red-700' },
  { id: 'food', label: 'Food', emoji: '🍱', desc: 'Cooked food, tiffin', color: 'bg-orange-50 border-orange-200 text-orange-700' },
  { id: 'medical', label: 'Medical', emoji: '💊', desc: 'Medicine, health', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { id: 'fashion', label: 'Fashion', emoji: '👗', desc: 'Clothes, accessories', color: 'bg-pink-50 border-pink-200 text-pink-700' },
  { id: 'electronics', label: 'Electronics', emoji: '📱', desc: 'Gadgets, repairs', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
];

export default function CreateShopPage() {
  const router = useRouter();
  const { user, updateShop } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '',
    category: '',
    description: '',
    phone: '',
    address: {
      fullAddress: '',
      city: '',
      pincode: '',
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value }
    });
  };

  const handleCategorySelect = (categoryId) => {
    setFormData({ ...formData, category: categoryId });
  };

  const handleNext = () => {
    if (step === 1 && !formData.category) {
      toast.error('Category select karo!');
      return;
    }
    if (step === 2 && !formData.shopName) {
      toast.error('Shop name likho!');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.address.fullAddress || !formData.address.city) {
      toast.error('Address fill karo!');
      return;
    }
    setLoading(true);
    try {
      const data = await createShopService(formData);
      toast.success('Shop ban gayi! 🎉');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Shop create failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="font-bold text-gray-900">Apna Market</span>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Step {step} of 3
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Step 1 — Category */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🏪</div>
              <h1 className="text-2xl font-black text-gray-900 mb-2">
                Apni shop ki category chunno
              </h1>
              <p className="text-gray-500 text-sm">
                Category ke hisaab se tumhari shop ka UI theme set hoga
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    formData.category === cat.id
                      ? `${cat.color} border-2 shadow-md scale-[1.02]`
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}>
                  <div className="text-3xl flex-shrink-0">{cat.emoji}</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{cat.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{cat.desc}</div>
                  </div>
                  {formData.category === cat.id && (
                    <div className="ml-auto w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button onClick={handleNext}
              disabled={!formData.category}
              className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg">
              Aage Badho →
            </button>
          </div>
        )}

        {/* Step 2 — Shop Details */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">✍️</div>
              <h1 className="text-2xl font-black text-gray-900 mb-2">
                Shop ki details bharो
              </h1>
              <p className="text-gray-500 text-sm">
                Ye details tumhari shop website pe dikhenge
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5">

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Shop Ka Naam *
                </label>
                <input type="text" name="shopName" value={formData.shopName}
                  onChange={handleChange}
                  placeholder="Jaise: Sharma Kirana Store"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all font-medium" />
                {formData.shopName && (
                  <p className="text-xs text-gray-400 mt-1.5">
                    URL: apnamarket.in/shop/<span className="text-green-600 font-medium">{formData.shopName.toLowerCase().replace(/\s+/g, '-')}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Description <span className="normal-case font-normal text-gray-400">(optional)</span>
                </label>
                <textarea name="description" value={formData.description}
                  onChange={handleChange}
                  placeholder="Apni shop ke baare mein kuch likho..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Shop Phone Number *
                </label>
                <div className="flex">
                  <div className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500 font-medium flex items-center">
                    🇮🇳 +91
                  </div>
                  <input type="tel" name="phone" value={formData.phone}
                    onChange={handleChange}
                    placeholder="Shop ka number"
                    maxLength={10}
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-r-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" />
                </div>
              </div>

            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)}
                className="flex-1 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl border border-gray-200 transition-all active:scale-95">
                ← Wapas
              </button>
              <button onClick={handleNext}
                disabled={!formData.shopName}
                className="flex-1 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-40 shadow-lg">
                Aage Badho →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Address */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">📍</div>
              <h1 className="text-2xl font-black text-gray-900 mb-2">
                Shop ka address
              </h1>
              <p className="text-gray-500 text-sm">
                Customers yahan se tumhari shop dhundhenge
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-5">

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Full Address *
                  </label>
                  <textarea name="fullAddress"
                    value={formData.address.fullAddress}
                    onChange={handleAddressChange}
                    placeholder="Gali, mohalla, area..."
                    rows={2}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input type="text" name="city"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      placeholder="Bhopal"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      Pincode
                    </label>
                    <input type="text" name="pincode"
                      value={formData.address.pincode}
                      onChange={handleAddressChange}
                      placeholder="462001"
                      maxLength={6}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" />
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Summary</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span>{CATEGORIES.find(c => c.id === formData.category)?.emoji}</span>
                      <span className="text-gray-600">{CATEGORIES.find(c => c.id === formData.category)?.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>🏪</span>
                      <span className="font-semibold text-gray-900">{formData.shopName}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-2xl border border-gray-200 transition-all active:scale-95">
                  ← Wapas
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-green-200 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Shop ban rahi hai...
                    </>
                  ) : '🚀 Shop Launch Karo!'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}