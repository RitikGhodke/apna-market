// 'use client';

// import { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { updateShop, updateDeliverySettings } from '@/services/shopService';
// import toast from 'react-hot-toast';
// import API from '@/services/api';

// export default function SettingsPage() {
//   const { shop, user } = useAuth();
//   const [activeTab, setActiveTab] = useState('shop');
//   const [loading, setLoading] = useState(false);

//   const [shopForm, setShopForm] = useState({
//     shopName: shop?.shopName || '',
//     description: shop?.description || '',
//     phone: shop?.phone || '',
//     themeColor: shop?.themeColor || '#16a34a',
//     isOpen: shop?.isOpen ?? true,
//     announcement: shop?.homePage?.announcement || '',
//   });

//   const [deliveryForm, setDeliveryForm] = useState({
//     deliveryEnabled: shop?.deliverySettings?.deliveryEnabled ?? true,
//     customDeliveryDiscount: shop?.deliverySettings?.customDeliveryDiscount || 0,
//     maxDeliveryDistance: shop?.deliverySettings?.maxDeliveryDistance || 5,
//   });

//   const handleShopUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateShop(shopForm);
//       toast.success('Shop update ho gayi!');
//     } catch (error) {
//       toast.error('Update failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeliveryUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateDeliverySettings(deliveryForm);
//       toast.success('Delivery settings update ho gayi!');
//     } catch (error) {
//       toast.error('Update failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const TABS = [
//     { id: 'shop', label: '🏪 Shop' },
//     { id: 'delivery', label: '🚚 Delivery' },
//     { id: 'domain', label: '🌐 Domain' },
//   ];

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-black text-gray-900">Settings ⚙️</h1>
//         <p className="text-gray-400 text-sm mt-0.5">Shop ki settings manage karo</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
//         {TABS.map((tab) => (
//           <button key={tab.id} onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
//               activeTab === tab.id
//                 ? 'bg-white text-gray-900 shadow-sm'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Shop Settings */}
//       {activeTab === 'shop' && (
//         <form onSubmit={handleShopUpdate} className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Shop Name
//               </label>
//               <input type="text" value={shopForm.shopName}
//                 onChange={(e) => setShopForm({ ...shopForm, shopName: e.target.value })}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Description
//               </label>
//               <textarea value={shopForm.description}
//                 onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Phone
//               </label>
//               <input type="tel" value={shopForm.phone}
//                 onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Announcement
//               </label>
//               <input type="text" value={shopForm.announcement}
//                 onChange={(e) => setShopForm({ ...shopForm, announcement: e.target.value })}
//                 placeholder="Customers ko koi special message..."
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Theme Color
//               </label>
//               <div className="flex items-center gap-3">
//                 <input type="color" value={shopForm.themeColor}
//                   onChange={(e) => setShopForm({ ...shopForm, themeColor: e.target.value })}
//                   className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer" />
//                 <span className="text-sm text-gray-500 font-medium">{shopForm.themeColor}</span>
//               </div>
//             </div>

//             {/* Shop Open Toggle */}
//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <p className="font-bold text-gray-900 text-sm">Shop Status</p>
//                 <p className="text-xs text-gray-400">Customers order kar sakenge?</p>
//               </div>
//               <button type="button"
//                 onClick={() => setShopForm({ ...shopForm, isOpen: !shopForm.isOpen })}
//                 className={`w-14 h-7 rounded-full transition-all relative ${
//                   shopForm.isOpen ? 'bg-green-500' : 'bg-gray-300'
//                 }`}>
//                 <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
//                   shopForm.isOpen ? 'left-8' : 'left-1'
//                 }`} />
//               </button>
//             </div>

//           </div>

//           {/* Shop Link */}
//           <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//             <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">🌐 Your Shop Link</p>
//             <div className="flex items-center gap-2">
//               <p className="text-sm text-green-800 font-medium flex-1 truncate">
//                 apnamarket.in/shop/{shop?.slug}
//               </p>
//               <button type="button"
//                 onClick={() => {
//                   navigator.clipboard.writeText(`apnamarket.in/shop/${shop?.slug}`);
//                   toast.success('Link copy ho gaya!');
//                 }}
//                 className="text-xs bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95">
//                 Copy
//               </button>
//             </div>
//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//             {loading ? (
//               <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//             ) : null}
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </form>
//       )}

//       {/* Delivery Settings */}
//       {activeTab === 'delivery' && (
//         <form onSubmit={handleDeliveryUpdate} className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-5">

//             {/* Delivery Toggle */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-bold text-gray-900">Delivery Enable</p>
//                 <p className="text-xs text-gray-400">Customers ko delivery milegi?</p>
//               </div>
//               <button type="button"
//                 onClick={() => setDeliveryForm({ ...deliveryForm, deliveryEnabled: !deliveryForm.deliveryEnabled })}
//                 className={`w-14 h-7 rounded-full transition-all relative ${
//                   deliveryForm.deliveryEnabled ? 'bg-green-500' : 'bg-gray-300'
//                 }`}>
//                 <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
//                   deliveryForm.deliveryEnabled ? 'left-8' : 'left-1'
//                 }`} />
//               </button>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Custom Delivery Discount (₹)
//               </label>
//               <input type="number" value={deliveryForm.customDeliveryDiscount}
//                 onChange={(e) => setDeliveryForm({ ...deliveryForm, customDeliveryDiscount: Number(e.target.value) })}
//                 min="0" max="30"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               <p className="text-xs text-gray-400 mt-1">Platform rate se kitna discount dena chahte ho</p>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Max Delivery Distance (km)
//               </label>
//               <input type="number" value={deliveryForm.maxDeliveryDistance}
//                 onChange={(e) => setDeliveryForm({ ...deliveryForm, maxDeliveryDistance: Number(e.target.value) })}
//                 min="1" max="5"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             {/* Delivery Rates Info */}
//             <div className="bg-gray-50 rounded-2xl p-4">
//               <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Platform Delivery Rates</p>
//               <div className="space-y-2">
//                 {[
//                   { range: '0–1 km', rates: '₹5 – ₹15' },
//                   { range: '1–2 km', rates: '₹10 – ₹20' },
//                   { range: '2–3 km', rates: '₹15 – ₹25' },
//                   { range: '3–5 km', rates: '₹20 – ₹30' },
//                 ].map((r) => (
//                   <div key={r.range} className="flex justify-between text-sm">
//                     <span className="text-gray-500">{r.range}</span>
//                     <span className="font-semibold text-gray-900">{r.rates}</span>
//                   </div>
//                 ))}
//                 <p className="text-xs text-green-600 font-medium mt-2">₹100+ orders pe FREE delivery!</p>
//               </div>
//             </div>

//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50">
//             {loading ? 'Saving...' : 'Save Delivery Settings'}
//           </button>
//         </form>
//       )}

//       {/* Domain Settings */}
//       {activeTab === 'domain' && (
//         <div className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

//             <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//               <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Current (Free)</p>
//               <p className="text-sm font-bold text-green-800">apnamarket.in/shop/{shop?.slug}</p>
//             </div>

//             <div className="space-y-3">
//               <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-bold text-gray-900 text-sm">Subdomain</p>
//                   <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">₹199/year</span>
//                 </div>
//                 <p className="text-xs text-gray-400 mb-3">yourshop.apnamarket.in</p>
//                 <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
//                   Coming Soon
//                 </button>
//               </div>

//               <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-bold text-gray-900 text-sm">Custom Domain</p>
//                   <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">₹999/year</span>
//                 </div>
//                 <p className="text-xs text-gray-400 mb-3">yourshop.com</p>
//                 <button className="w-full py-2 bg-purple-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
//                   Coming Soon
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }















// 'use client';

// import { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { updateShop, updateDeliverySettings } from '@/services/shopService';
// import toast from 'react-hot-toast';
// import API from '@/services/api';

// // ✅ Category wise default banners
// const DEFAULT_BANNERS = {
//   kirana: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
//   dairy:  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&h=400&fit=crop',
//   fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&h=400&fit=crop',
//   food:   'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop',
//   medical:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=400&fit=crop',
//   fashion:'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
//   electronics:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
// };

// const DEFAULT_LOGOS = {
//   kirana: '🛒', dairy: '🥛', fruits: '🍎',
//   food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
// };

// export default function SettingsPage() {
//   const { shop, user } = useAuth();
//   const [activeTab, setActiveTab] = useState('shop');
//   const [loading, setLoading] = useState(false);
//   const [logoUploading, setLogoUploading] = useState(false);
//   const [bannerUploading, setBannerUploading] = useState(false);

//   const [shopForm, setShopForm] = useState({
//     shopName: shop?.shopName || '',
//     description: shop?.description || '',
//     phone: shop?.phone || '',
//     themeColor: shop?.themeColor || '#16a34a',
//     isOpen: shop?.isOpen ?? true,
//     announcement: shop?.homePage?.announcement || '',
//   });

//   const [deliveryForm, setDeliveryForm] = useState({
//     deliveryEnabled: shop?.deliverySettings?.deliveryEnabled ?? true,
//     customDeliveryDiscount: shop?.deliverySettings?.customDeliveryDiscount || 0,
//     maxDeliveryDistance: shop?.deliverySettings?.maxDeliveryDistance || 5,
//   });

//   // ✅ Current logo & banner state
//   const [currentLogo, setCurrentLogo] = useState(shop?.logo || '');
//   const [currentBanner, setCurrentBanner] = useState(shop?.banner || '');

//   // ✅ Image to base64
//   const toBase64 = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//   });

//   // ✅ Logo upload handler
//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('Image 5MB se chhoti honi chahiye!');
//       return;
//     }
//     setLogoUploading(true);
//     try {
//       const base64 = await toBase64(file);
//       const res = await API.put('/shop/upload-logo', { image: base64 });
//       setCurrentLogo(res.data.logo);
//       toast.success('Logo upload ho gaya! 🎉');
//     } catch (error) {
//       toast.error('Logo upload failed!');
//     } finally {
//       setLogoUploading(false);
//     }
//   };

//   // ✅ Banner upload handler
//   const handleBannerUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('Banner 10MB se chhota hona chahiye!');
//       return;
//     }
//     setBannerUploading(true);
//     try {
//       const base64 = await toBase64(file);
//       const res = await API.put('/shop/upload-banner', { image: base64 });
//       setCurrentBanner(res.data.banner);
//       toast.success('Banner upload ho gaya! 🎉');
//     } catch (error) {
//       toast.error('Banner upload failed!');
//     } finally {
//       setBannerUploading(false);
//     }
//   };

//   const handleShopUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateShop(shopForm);
//       toast.success('Shop update ho gayi!');
//     } catch (error) {
//       toast.error('Update failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeliveryUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateDeliverySettings(deliveryForm);
//       toast.success('Delivery settings update ho gayi!');
//     } catch (error) {
//       toast.error('Update failed!');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const TABS = [
//     { id: 'shop', label: '🏪 Shop' },
//     { id: 'appearance', label: '🎨 Appearance' },
//     { id: 'delivery', label: '🚚 Delivery' },
//     { id: 'domain', label: '🌐 Domain' },
//   ];

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-black text-gray-900">Settings ⚙️</h1>
//         <p className="text-gray-400 text-sm mt-0.5">Shop ki settings manage karo</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl overflow-x-auto hide-scrollbar">
//         {TABS.map((tab) => (
//           <button key={tab.id} onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap px-2 ${
//               activeTab === tab.id
//                 ? 'bg-white text-gray-900 shadow-sm'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* ✅ Appearance Tab — Logo & Banner */}
//       {activeTab === 'appearance' && (
//         <div className="space-y-4">

//           {/* Banner Section */}
//           <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//             <div className="px-5 py-4 border-b border-gray-50">
//               <h2 className="font-black text-gray-900">🖼️ Shop Banner</h2>
//               <p className="text-xs text-gray-400 mt-0.5">1200×400 best size • Max 10MB</p>
//             </div>

//           {/* Banner Preview */}
// <div
//   style={{
//     width: '100%',
//     height: '200px',
//     backgroundImage: `url(${currentBanner || DEFAULT_BANNERS[shop?.category] || DEFAULT_BANNERS.kirana})`,
//     backgroundSize: '100% 100%',
//     backgroundRepeat: 'no-repeat',
//     position: 'relative',
//   }}
// >
//   {!currentBanner && (
//     <div style={{
//       position: 'absolute', inset: 0,
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       background: 'rgba(0,0,0,0.2)'
//     }}>
//       <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full">
//         Default Banner
//       </span>
//     </div>
//   )}
// </div>
//             <div className="p-4 space-y-3">
//               {/* Upload button */}
//               <label className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
//                 bannerUploading
//                   ? 'border-gray-200 bg-gray-50 opacity-50'
//                   : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
//               }`}>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleBannerUpload}
//                   disabled={bannerUploading}
//                   className="hidden"
//                 />
//                 {bannerUploading ? (
//                   <>
//                     <svg className="animate-spin w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                     </svg>
//                     <span className="text-sm font-bold text-gray-500">Uploading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span className="text-lg">📸</span>
//                     <span className="text-sm font-bold text-gray-700">
//                       {currentBanner ? 'Banner Change Karo' : 'Banner Upload Karo'}
//                     </span>
//                   </>
//                 )}
//               </label>

//               {/* Default banners */}
//               <div>
//                 <p className="text-xs font-semibold text-gray-400 mb-2">Ya default choose karo:</p>
//                 <div className="grid grid-cols-4 gap-2">
//                   {Object.entries(DEFAULT_BANNERS).map(([cat, url]) => (
//                     <button key={cat}
//                       onClick={() => setCurrentBanner(url)}
//                       className={`relative h-12 rounded-xl overflow-hidden border-2 transition-all ${
//                         currentBanner === url ? 'border-gray-900' : 'border-transparent'
//                       }`}>
//                       <img src={url} alt={cat} className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 flex items-end justify-center pb-0.5">
//                         <span className="text-xs">{DEFAULT_LOGOS[cat]}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Logo / DP Section */}
//           <div className="bg-white rounded-3xl border border-gray-100 p-5">
//             <h2 className="font-black text-gray-900 mb-1">🏪 Shop Logo (DP)</h2>
//             <p className="text-xs text-gray-400 mb-4">400×400 best size • Max 5MB</p>

//             <div className="flex items-center gap-4">
//               {/* Logo Preview */}
//               <div className="w-20 h-20 rounded-2xl border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
//                 {currentLogo ? (
//                   <img src={currentLogo} alt="Logo" className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl">{DEFAULT_LOGOS[shop?.category] || '🏪'}</span>
//                 )}
//               </div>

//               {/* Upload */}
//               <div className="flex-1 space-y-2">
//                 <label className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
//                   logoUploading
//                     ? 'border-gray-200 bg-gray-50 opacity-50'
//                     : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
//                 }`}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleLogoUpload}
//                     disabled={logoUploading}
//                     className="hidden"
//                   />
//                   {logoUploading ? (
//                     <>
//                       <svg className="animate-spin w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                       </svg>
//                       <span className="text-sm font-bold text-gray-500">Uploading...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span className="text-lg">📷</span>
//                       <span className="text-sm font-bold text-gray-700">
//                         {currentLogo ? 'Logo Change Karo' : 'Logo Upload Karo'}
//                       </span>
//                     </>
//                   )}
//                 </label>

//                 {currentLogo && (
//                   <button
//                     onClick={() => setCurrentLogo('')}
//                     className="w-full py-2 text-xs text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition-all">
//                     Logo Hatao
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//         </div>
//       )}

//       {/* Shop Settings Tab */}
//       {activeTab === 'shop' && (
//         <form onSubmit={handleShopUpdate} className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Shop Name
//               </label>
//               <input type="text" value={shopForm.shopName}
//                 onChange={(e) => setShopForm({ ...shopForm, shopName: e.target.value })}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Description
//               </label>
//               <textarea value={shopForm.description}
//                 onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Phone
//               </label>
//               <input type="tel" value={shopForm.phone}
//                 onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Announcement
//               </label>
//               <input type="text" value={shopForm.announcement}
//                 onChange={(e) => setShopForm({ ...shopForm, announcement: e.target.value })}
//                 placeholder="Customers ko koi special message..."
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Theme Color
//               </label>
//               <div className="flex items-center gap-3">
//                 <input type="color" value={shopForm.themeColor}
//                   onChange={(e) => setShopForm({ ...shopForm, themeColor: e.target.value })}
//                   className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer" />
//                 <span className="text-sm text-gray-500 font-medium">{shopForm.themeColor}</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <p className="font-bold text-gray-900 text-sm">Shop Status</p>
//                 <p className="text-xs text-gray-400">Customers order kar sakenge?</p>
//               </div>
//               <button type="button"
//                 onClick={() => setShopForm({ ...shopForm, isOpen: !shopForm.isOpen })}
//                 className={`w-14 h-7 rounded-full transition-all relative ${
//                   shopForm.isOpen ? 'bg-green-500' : 'bg-gray-300'
//                 }`}>
//                 <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
//                   shopForm.isOpen ? 'left-8' : 'left-1'
//                 }`} />
//               </button>
//             </div>
//           </div>

//           <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//             <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">🌐 Your Shop Link</p>
//             <div className="flex items-center gap-2">
//               <p className="text-sm text-green-800 font-medium flex-1 truncate">
//                 apnamarket.in/shop/{shop?.slug}
//               </p>
//               <button type="button"
//                 onClick={() => {
//                   navigator.clipboard.writeText(`apnamarket.in/shop/${shop?.slug}`);
//                   toast.success('Link copy ho gaya!');
//                 }}
//                 className="text-xs bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95">
//                 Copy
//               </button>
//             </div>
//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//             {loading && (
//               <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//             )}
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </form>
//       )}

//       {/* Delivery Settings Tab */}
//       {activeTab === 'delivery' && (
//         <form onSubmit={handleDeliveryUpdate} className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-5">

//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-bold text-gray-900">Delivery Enable</p>
//                 <p className="text-xs text-gray-400">Customers ko delivery milegi?</p>
//               </div>
//               <button type="button"
//                 onClick={() => setDeliveryForm({ ...deliveryForm, deliveryEnabled: !deliveryForm.deliveryEnabled })}
//                 className={`w-14 h-7 rounded-full transition-all relative ${
//                   deliveryForm.deliveryEnabled ? 'bg-green-500' : 'bg-gray-300'
//                 }`}>
//                 <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
//                   deliveryForm.deliveryEnabled ? 'left-8' : 'left-1'
//                 }`} />
//               </button>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Custom Delivery Discount (₹)
//               </label>
//               <input type="number" value={deliveryForm.customDeliveryDiscount}
//                 onChange={(e) => setDeliveryForm({ ...deliveryForm, customDeliveryDiscount: Number(e.target.value) })}
//                 min="0" max="30"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               <p className="text-xs text-gray-400 mt-1">Platform rate se kitna discount dena chahte ho</p>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Max Delivery Distance (km)
//               </label>
//               <input type="number" value={deliveryForm.maxDeliveryDistance}
//                 onChange={(e) => setDeliveryForm({ ...deliveryForm, maxDeliveryDistance: Number(e.target.value) })}
//                 min="1" max="5"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div className="bg-gray-50 rounded-2xl p-4">
//               <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Platform Delivery Rates</p>
//               <div className="space-y-2">
//                 {[
//                   { range: '0–1 km', rates: '₹5 – ₹15' },
//                   { range: '1–2 km', rates: '₹10 – ₹20' },
//                   { range: '2–3 km', rates: '₹15 – ₹25' },
//                   { range: '3–5 km', rates: '₹20 – ₹30' },
//                 ].map((r) => (
//                   <div key={r.range} className="flex justify-between text-sm">
//                     <span className="text-gray-500">{r.range}</span>
//                     <span className="font-semibold text-gray-900">{r.rates}</span>
//                   </div>
//                 ))}
//                 <p className="text-xs text-green-600 font-medium mt-2">₹100+ orders pe FREE delivery!</p>
//               </div>
//             </div>
//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50">
//             {loading ? 'Saving...' : 'Save Delivery Settings'}
//           </button>
//         </form>
//       )}

//       {/* Domain Tab */}
//       {activeTab === 'domain' && (
//         <div className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">
//             <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//               <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Current (Free)</p>
//               <p className="text-sm font-bold text-green-800">apnamarket.in/shop/{shop?.slug}</p>
//             </div>
//             <div className="space-y-3">
//               <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-bold text-gray-900 text-sm">Subdomain</p>
//                   <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">₹199/year</span>
//                 </div>
//                 <p className="text-xs text-gray-400 mb-3">yourshop.apnamarket.in</p>
//                 <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
//                   Coming Soon
//                 </button>
//               </div>
//               <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-bold text-gray-900 text-sm">Custom Domain</p>
//                   <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">₹999/year</span>
//                 </div>
//                 <p className="text-xs text-gray-400 mb-3">yourshop.com</p>
//                 <button className="w-full py-2 bg-purple-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
//                   Coming Soon
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }








// 'use client';

// import { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { updateShop, updateDeliverySettings } from '@/services/shopService';
// import toast from 'react-hot-toast';
// import API from '@/services/api';

// const DEFAULT_BANNERS = {
//   kirana: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
//   dairy:  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&h=400&fit=crop',
//   fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&h=400&fit=crop',
//   food:   'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop',
//   medical:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=400&fit=crop',
//   fashion:'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
//   electronics:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
// };

// const DEFAULT_LOGOS = {
//   kirana: '🛒', dairy: '🥛', fruits: '🍎',
//   food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
// };

// export default function SettingsPage() {
//   const { shop, user } = useAuth();
//   const [activeTab, setActiveTab] = useState('shop');
//   const [loading, setLoading] = useState(false);
//   const [logoUploading, setLogoUploading] = useState(false);
//   const [bannerUploading, setBannerUploading] = useState(false);

//   const [shopForm, setShopForm] = useState({
//     shopName: shop?.shopName || '',
//     description: shop?.description || '',
//     phone: shop?.phone || '',
//     themeColor: shop?.themeColor || '#16a34a',
//     isOpen: shop?.isOpen ?? true,
//     announcement: shop?.homePage?.announcement || '',
//   });

//   const [deliveryForm, setDeliveryForm] = useState({
//     deliveryEnabled: shop?.deliverySettings?.deliveryEnabled ?? true,
//     customDeliveryDiscount: shop?.deliverySettings?.customDeliveryDiscount || 0,
//     maxDeliveryDistance: shop?.deliverySettings?.maxDeliveryDistance || 5,
//   });

//   const [currentLogo, setCurrentLogo] = useState(shop?.logo || '');
//   const [currentBanner, setCurrentBanner] = useState(shop?.banner || '');

//   const toBase64 = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//   });

//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) { toast.error('Image 5MB se chhoti honi chahiye!'); return; }
//     setLogoUploading(true);
//     try {
//       const base64 = await toBase64(file);
//       const res = await API.put('/shop/upload-logo', { image: base64 });
//       setCurrentLogo(res.data.logo);
//       toast.success('Logo upload ho gaya! 🎉');
//     } catch { toast.error('Logo upload failed!'); }
//     finally { setLogoUploading(false); }
//   };

//   const handleBannerUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 10 * 1024 * 1024) { toast.error('Banner 10MB se chhota hona chahiye!'); return; }
//     setBannerUploading(true);
//     try {
//       const base64 = await toBase64(file);
//       const res = await API.put('/shop/upload-banner', { image: base64 });
//       setCurrentBanner(res.data.banner);
//       toast.success('Banner upload ho gaya! 🎉');
//     } catch { toast.error('Banner upload failed!'); }
//     finally { setBannerUploading(false); }
//   };

//   const handleShopUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateShop(shopForm);
//       toast.success('Shop update ho gayi!');
//     } catch { toast.error('Update failed!'); }
//     finally { setLoading(false); }
//   };

//   const handleDeliveryUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateDeliverySettings(deliveryForm);
//       toast.success('Delivery settings update ho gayi!');
//     } catch { toast.error('Update failed!'); }
//     finally { setLoading(false); }
//   };

// const handleDefaultBannerSelect = async (url) => {
//   setCurrentBanner(url);
//   setBannerUploading(true);
//   try {
//     const res = await API.put('/shop/upload-banner-url', { bannerUrl: url });
//     toast.success('Banner save ho gaya!');
//   } catch {
//     toast.error('Banner save nahi hua!');
//   } finally {
//     setBannerUploading(false);
//   }
// };
  

//   const TABS = [
//     { id: 'shop', label: '🏪 Shop' },
//     { id: 'appearance', label: '🎨 Appearance' },
//     { id: 'delivery', label: '🚚 Delivery' },
//     { id: 'domain', label: '🌐 Domain' },
//   ];

//   const Spinner = () => (
//     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//     </svg>
//   );

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-black text-gray-900">Settings ⚙️</h1>
//         <p className="text-gray-400 text-sm mt-0.5">Shop ki settings manage karo</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl overflow-x-auto hide-scrollbar">
//         {TABS.map((tab) => (
//           <button key={tab.id} onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap px-2 ${
//               activeTab === tab.id
//                 ? 'bg-white text-gray-900 shadow-sm'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* ── APPEARANCE TAB ── */}
//       {activeTab === 'appearance' && (
//         <div className="space-y-4">

//           {/* Banner Section */}
//           <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//             <div className="px-5 py-4 border-b border-gray-50">
//               <h2 className="font-black text-gray-900">🖼️ Shop Banner</h2>
//               <p className="text-xs text-gray-400 mt-0.5">1200×400 best size • Max 10MB</p>
//             </div>

//             {/* Banner Preview */}
// <div style={{ width: '100%' }}>
//   <img
//     src={currentBanner || DEFAULT_BANNERS[shop?.category] || DEFAULT_BANNERS.kirana}
//     alt="Banner"
//     style={{ width: '100%', height: 'auto', display: 'block' }}
//   />
// </div>
//             <div className="p-4 space-y-4">

//               {/* Upload Button */}
//               <label className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
//                 bannerUploading
//                   ? 'border-gray-200 bg-gray-50 opacity-50'
//                   : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
//               }`}>
//                 <input type="file" accept="image/*" onChange={handleBannerUpload} disabled={bannerUploading} className="hidden" />
//                 {bannerUploading ? (
//                   <><Spinner /><span className="text-sm font-bold text-gray-500">Uploading...</span></>
//                 ) : (
//                   <><span className="text-lg">📸</span>
//                   <span className="text-sm font-bold text-gray-700">
//                     {currentBanner ? 'Banner Change Karo' : 'Banner Upload Karo'}
//                   </span></>
//                 )}
//               </label>

//               {/* Default Banners Grid */}
//               <div>
//                 <p className="text-xs font-semibold text-gray-400 mb-3">Ya default choose karo:</p>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
//                   {Object.entries(DEFAULT_BANNERS).map(([cat, url]) => (
//                     <button
//                       key={cat}
//                      onClick={() => handleDefaultBannerSelect(url)}
//                       style={{
//                         position: 'relative',
//                         height: '52px',
//                         borderRadius: '12px',
//                         overflow: 'hidden',
//                         border: currentBanner === url ? '2.5px solid #111' : '2px solid #e5e7eb',
//                         padding: 0,
//                         cursor: 'pointer',
//                         background: 'none',
//                       }}
//                     >
//                       <div style={{
//                         width: '100%', height: '100%',
//                         backgroundImage: `url(${url})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                       }} />
//                       <div style={{
//                         position: 'absolute', inset: 0,
//                         display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
//                         paddingBottom: '3px',
//                         background: 'rgba(0,0,0,0.15)',
//                       }}>
//                         <span style={{ fontSize: '13px' }}>{DEFAULT_LOGOS[cat]}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Remove banner option */}
//               {currentBanner && (
//                 <button
//                   onClick={() => setCurrentBanner('')}
//                   className="w-full py-2 text-xs text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition-all">
//                   Banner Hatao
//                 </button>
//               )}

//             </div>
//           </div>

//           {/* Logo Section */}
//           <div className="bg-white rounded-3xl border border-gray-100 p-5">
//             <h2 className="font-black text-gray-900 mb-1">🏪 Shop Logo (DP)</h2>
//             <p className="text-xs text-gray-400 mb-4">400×400 best size • Max 5MB</p>

//             <div className="flex items-center gap-4">
//               <div className="w-20 h-20 rounded-2xl border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
//                 {currentLogo ? (
//                   <img src={currentLogo} alt="Logo" className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl">{DEFAULT_LOGOS[shop?.category] || '🏪'}</span>
//                 )}
//               </div>

//               <div className="flex-1 space-y-2">
//                 <label className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
//                   logoUploading
//                     ? 'border-gray-200 bg-gray-50 opacity-50'
//                     : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
//                 }`}>
//                   <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={logoUploading} className="hidden" />
//                   {logoUploading ? (
//                     <><Spinner /><span className="text-sm font-bold text-gray-500">Uploading...</span></>
//                   ) : (
//                     <><span className="text-lg">📷</span>
//                     <span className="text-sm font-bold text-gray-700">
//                       {currentLogo ? 'Logo Change Karo' : 'Logo Upload Karo'}
//                     </span></>
//                   )}
//                 </label>

//                 {currentLogo && (
//                   <button onClick={() => setCurrentLogo('')}
//                     className="w-full py-2 text-xs text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition-all">
//                     Logo Hatao
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//         </div>
//       )}

//       {/* ── SHOP TAB ── */}
//       {activeTab === 'shop' && (
//         <form onSubmit={handleShopUpdate} className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Shop Name</label>
//               <input type="text" value={shopForm.shopName}
//                 onChange={(e) => setShopForm({ ...shopForm, shopName: e.target.value })}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
//               <textarea value={shopForm.description}
//                 onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
//               <input type="tel" value={shopForm.phone}
//                 onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Announcement</label>
//               <input type="text" value={shopForm.announcement}
//                 onChange={(e) => setShopForm({ ...shopForm, announcement: e.target.value })}
//                 placeholder="Customers ko koi special message..."
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Theme Color</label>
//               <div className="flex items-center gap-3">
//                 <input type="color" value={shopForm.themeColor}
//                   onChange={(e) => setShopForm({ ...shopForm, themeColor: e.target.value })}
//                   className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer" />
//                 <span className="text-sm text-gray-500 font-medium">{shopForm.themeColor}</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <p className="font-bold text-gray-900 text-sm">Shop Status</p>
//                 <p className="text-xs text-gray-400">Customers order kar sakenge?</p>
//               </div>
//               <button type="button"
//                 onClick={() => setShopForm({ ...shopForm, isOpen: !shopForm.isOpen })}
//                 className={`w-14 h-7 rounded-full transition-all relative ${shopForm.isOpen ? 'bg-green-500' : 'bg-gray-300'}`}>
//                 <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${shopForm.isOpen ? 'left-8' : 'left-1'}`} />
//               </button>
//             </div>
//           </div>

//           <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//             <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">🌐 Your Shop Link</p>
//             <div className="flex items-center gap-2">
//               <p className="text-sm text-green-800 font-medium flex-1 truncate">
//                 apnamarket.in/shop/{shop?.slug}
//               </p>
//               <button type="button"
//                 onClick={() => { navigator.clipboard.writeText(`apnamarket.in/shop/${shop?.slug}`); toast.success('Link copy ho gaya!'); }}
//                 className="text-xs bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95">
//                 Copy
//               </button>
//             </div>
//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//             {loading && <Spinner />}
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </form>
//       )}

//       {/* ── DELIVERY TAB ── */}
//       {activeTab === 'delivery' && (
//         <form onSubmit={handleDeliveryUpdate} className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-5">

//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-bold text-gray-900">Delivery Enable</p>
//                 <p className="text-xs text-gray-400">Customers ko delivery milegi?</p>
//               </div>
//               <button type="button"
//                 onClick={() => setDeliveryForm({ ...deliveryForm, deliveryEnabled: !deliveryForm.deliveryEnabled })}
//                 className={`w-14 h-7 rounded-full transition-all relative ${deliveryForm.deliveryEnabled ? 'bg-green-500' : 'bg-gray-300'}`}>
//                 <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${deliveryForm.deliveryEnabled ? 'left-8' : 'left-1'}`} />
//               </button>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Custom Delivery Discount (₹)
//               </label>
//               <input type="number" value={deliveryForm.customDeliveryDiscount}
//                 onChange={(e) => setDeliveryForm({ ...deliveryForm, customDeliveryDiscount: Number(e.target.value) })}
//                 min="0" max="30"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               <p className="text-xs text-gray-400 mt-1">Platform rate se kitna discount dena chahte ho</p>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Max Delivery Distance (km)
//               </label>
//               <input type="number" value={deliveryForm.maxDeliveryDistance}
//                 onChange={(e) => setDeliveryForm({ ...deliveryForm, maxDeliveryDistance: Number(e.target.value) })}
//                 min="1" max="5"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div className="bg-gray-50 rounded-2xl p-4">
//               <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Platform Delivery Rates</p>
//               <div className="space-y-2">
//                 {[
//                   { range: '0–1 km', rates: '₹5 – ₹15' },
//                   { range: '1–2 km', rates: '₹10 – ₹20' },
//                   { range: '2–3 km', rates: '₹15 – ₹25' },
//                   { range: '3–5 km', rates: '₹20 – ₹30' },
//                 ].map((r) => (
//                   <div key={r.range} className="flex justify-between text-sm">
//                     <span className="text-gray-500">{r.range}</span>
//                     <span className="font-semibold text-gray-900">{r.rates}</span>
//                   </div>
//                 ))}
//                 <p className="text-xs text-green-600 font-medium mt-2">₹100+ orders pe FREE delivery!</p>
//               </div>
//             </div>
//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//             {loading && <Spinner />}
//             {loading ? 'Saving...' : 'Save Delivery Settings'}
//           </button>
//         </form>
//       )}

//       {/* ── DOMAIN TAB ── */}
//       {activeTab === 'domain' && (
//         <div className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">
//             <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//               <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Current (Free)</p>
//               <p className="text-sm font-bold text-green-800">apnamarket.in/shop/{shop?.slug}</p>
//             </div>
//             <div className="space-y-3">
//               <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-bold text-gray-900 text-sm">Subdomain</p>
//                   <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">₹199/year</span>
//                 </div>
//                 <p className="text-xs text-gray-400 mb-3">yourshop.apnamarket.in</p>
//                 <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
//                   Coming Soon
//                 </button>
//               </div>
//               <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-bold text-gray-900 text-sm">Custom Domain</p>
//                   <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">₹999/year</span>
//                 </div>
//                 <p className="text-xs text-gray-400 mb-3">yourshop.com</p>
//                 <button className="w-full py-2 bg-purple-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
//                   Coming Soon
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }





// 'use client';

// import { useState } from 'react';
// import { useAuth } from '@/hooks/useAuth';
// import { updateShop, updateDeliverySettings } from '@/services/shopService';
// import toast from 'react-hot-toast';
// import API from '@/services/api';

// const DEFAULT_BANNERS = {
//   kirana: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
//   dairy:  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&h=400&fit=crop',
//   fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&h=400&fit=crop',
//   food:   'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop',
//   medical:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=400&fit=crop',
//   fashion:'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
//   electronics:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
// };

// const DEFAULT_LOGOS = {
//   kirana: '🛒', dairy: '🥛', fruits: '🍎',
//   food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
// };

// export default function SettingsPage() {
//   const { shop, user } = useAuth();
//   const [activeTab, setActiveTab] = useState('shop');
//   const [loading, setLoading] = useState(false);
//   const [logoUploading, setLogoUploading] = useState(false);
//   const [bannerUploading, setBannerUploading] = useState(false);
//   const [detectingLocation, setDetectingLocation] = useState(false); // ✅ naya

//   const [shopForm, setShopForm] = useState({
//     shopName: shop?.shopName || '',
//     description: shop?.description || '',
//     phone: shop?.phone || '',
//     themeColor: shop?.themeColor || '#16a34a',
//     isOpen: shop?.isOpen ?? true,
//     announcement: shop?.homePage?.announcement || '',
//     // ✅ Address fields
//     fullAddress: shop?.address?.fullAddress || '',
//     city: shop?.address?.city || '',
//     pincode: shop?.address?.pincode || '',
//     lat: shop?.address?.location?.lat || '',
//     lng: shop?.address?.location?.lng || '',
//     upiId: shop?.upiId || '',
//   });

//   const [deliveryForm, setDeliveryForm] = useState({
//     deliveryEnabled: shop?.deliverySettings?.deliveryEnabled ?? true,
//     customDeliveryDiscount: shop?.deliverySettings?.customDeliveryDiscount || 0,
//     maxDeliveryDistance: shop?.deliverySettings?.maxDeliveryDistance || 5,
//   });

//   const [currentLogo, setCurrentLogo] = useState(shop?.logo || '');
//   const [currentBanner, setCurrentBanner] = useState(shop?.banner || '');

//   const toBase64 = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//   });

//   const handleLogoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) { toast.error('Image 5MB se chhoti honi chahiye!'); return; }
//     setLogoUploading(true);
//     try {
//       const base64 = await toBase64(file);
//       const res = await API.put('/shop/upload-logo', { image: base64 });
//       setCurrentLogo(res.data.logo);
//       toast.success('Logo upload ho gaya! 🎉');
//     } catch { toast.error('Logo upload failed!'); }
//     finally { setLogoUploading(false); }
//   };

//   const handleBannerUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 10 * 1024 * 1024) { toast.error('Banner 10MB se chhota hona chahiye!'); return; }
//     setBannerUploading(true);
//     try {
//       const base64 = await toBase64(file);
//       const res = await API.put('/shop/upload-banner', { image: base64 });
//       setCurrentBanner(res.data.banner);
//       toast.success('Banner upload ho gaya! 🎉');
//     } catch { toast.error('Banner upload failed!'); }
//     finally { setBannerUploading(false); }
//   };

//   // ✅ GPS Auto Detect
//   const handleAutoDetect = () => {
//     if (!navigator.geolocation) {
//       toast.error('GPS support nahi hai is device mein!');
//       return;
//     }
//     setDetectingLocation(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setShopForm(prev => ({
//           ...prev,
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//         }));
//         toast.success('Shop location detect ho gayi! ✅');
//         setDetectingLocation(false);
//       },
//       () => {
//         toast.error('Location access allow karo browser mein!');
//         setDetectingLocation(false);
//       }
//     );
//   };

//   // ✅ handleShopUpdate — address bhi bhejo
//   const handleShopUpdate = async (e) => {
//     e.preventDefault();

//     if (!shopForm.lat || !shopForm.lng) {
//       toast.error('📍 Shop location set karo — delivery charge iske bina sahi nahi hoga!');
//       // Error show karo but save rok nahi rahe — sirf warning
//     }

//     setLoading(true);
//     try {
//       await updateShop({
//         shopName: shopForm.shopName,
//         description: shopForm.description,
//         phone: shopForm.phone,
//         themeColor: shopForm.themeColor,
//         isOpen: shopForm.isOpen,
//         announcement: shopForm.announcement,
//         upiId: shopForm.upiId,
//         // ✅ Address object
//         address: {
//           fullAddress: shopForm.fullAddress,
//           city: shopForm.city,
//           pincode: shopForm.pincode,
//           location: {
//             lat: shopForm.lat ? parseFloat(shopForm.lat) : null,
//             lng: shopForm.lng ? parseFloat(shopForm.lng) : null,
//           }
//         }
        
//       });
      
//       toast.success('Shop update ho gayi!');
//     } catch { toast.error('Update failed!'); }
//     finally { setLoading(false); }
//   };

//   const handleDeliveryUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateDeliverySettings(deliveryForm);
//       toast.success('Delivery settings update ho gayi!');
//     } catch { toast.error('Update failed!'); }
//     finally { setLoading(false); }
//   };

//   const handleDefaultBannerSelect = async (url) => {
//     setCurrentBanner(url);
//     setBannerUploading(true);
//     try {
//       await API.put('/shop/upload-banner-url', { bannerUrl: url });
//       toast.success('Banner save ho gaya!');
//     } catch {
//       toast.error('Banner save nahi hua!');
//     } finally {
//       setBannerUploading(false);
//     }
//   };

//   const TABS = [
//     { id: 'shop', label: '🏪 Shop' },
//     { id: 'appearance', label: '🎨 Appearance' },
//     { id: 'delivery', label: '🚚 Delivery' },
//     { id: 'domain', label: '🌐 Domain' },
//   ];

//   const Spinner = () => (
//     <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//     </svg>
//   );

//   return (
//     <div className="p-4 lg:p-6 space-y-5">

//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-black text-gray-900">Settings ⚙️</h1>
//         <p className="text-gray-400 text-sm mt-0.5">Shop ki settings manage karo</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl overflow-x-auto hide-scrollbar">
//         {TABS.map((tab) => (
//           <button key={tab.id} onClick={() => setActiveTab(tab.id)}
//             className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap px-2 ${
//               activeTab === tab.id
//                 ? 'bg-white text-gray-900 shadow-sm'
//                 : 'text-gray-500 hover:text-gray-700'
//             }`}>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* ── APPEARANCE TAB ── */}
//       {activeTab === 'appearance' && (
//         <div className="space-y-4">

//           {/* Banner Section */}
//           <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//             <div className="px-5 py-4 border-b border-gray-50">
//               <h2 className="font-black text-gray-900">🖼️ Shop Banner</h2>
//               <p className="text-xs text-gray-400 mt-0.5">1200×400 best size • Max 10MB</p>
//             </div>

//             {/* Banner Preview */}
//             <div style={{ width: '100%' }}>
//               <img
//                 src={currentBanner || DEFAULT_BANNERS[shop?.category] || DEFAULT_BANNERS.kirana}
//                 alt="Banner"
//                 style={{ width: '100%', height: 'auto', display: 'block' }}
//               />
//             </div>

//             <div className="p-4 space-y-4">

//               {/* Upload Button */}
//               <label className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
//                 bannerUploading
//                   ? 'border-gray-200 bg-gray-50 opacity-50'
//                   : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
//               }`}>
//                 <input type="file" accept="image/*" onChange={handleBannerUpload} disabled={bannerUploading} className="hidden" />
//                 {bannerUploading ? (
//                   <><Spinner /><span className="text-sm font-bold text-gray-500">Uploading...</span></>
//                 ) : (
//                   <><span className="text-lg">📸</span>
//                   <span className="text-sm font-bold text-gray-700">
//                     {currentBanner ? 'Banner Change Karo' : 'Banner Upload Karo'}
//                   </span></>
//                 )}
//               </label>

//               {/* Default Banners Grid */}
//               <div>
//                 <p className="text-xs font-semibold text-gray-400 mb-3">Ya default choose karo:</p>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
//                   {Object.entries(DEFAULT_BANNERS).map(([cat, url]) => (
//                     <button
//                       key={cat}
//                       onClick={() => handleDefaultBannerSelect(url)}
//                       style={{
//                         position: 'relative',
//                         height: '52px',
//                         borderRadius: '12px',
//                         overflow: 'hidden',
//                         border: currentBanner === url ? '2.5px solid #111' : '2px solid #e5e7eb',
//                         padding: 0,
//                         cursor: 'pointer',
//                         background: 'none',
//                       }}
//                     >
//                       <div style={{
//                         width: '100%', height: '100%',
//                         backgroundImage: `url(${url})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                       }} />
//                       <div style={{
//                         position: 'absolute', inset: 0,
//                         display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
//                         paddingBottom: '3px',
//                         background: 'rgba(0,0,0,0.15)',
//                       }}>
//                         <span style={{ fontSize: '13px' }}>{DEFAULT_LOGOS[cat]}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Remove banner */}
//               {currentBanner && (
//                 <button
//                   onClick={() => setCurrentBanner('')}
//                   className="w-full py-2 text-xs text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition-all">
//                   Banner Hatao
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Logo Section */}
//           <div className="bg-white rounded-3xl border border-gray-100 p-5">
//             <h2 className="font-black text-gray-900 mb-1">🏪 Shop Logo (DP)</h2>
//             <p className="text-xs text-gray-400 mb-4">400×400 best size • Max 5MB</p>

//             <div className="flex items-center gap-4">
//               <div className="w-20 h-20 rounded-2xl border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
//                 {currentLogo ? (
//                   <img src={currentLogo} alt="Logo" className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-4xl">{DEFAULT_LOGOS[shop?.category] || '🏪'}</span>
//                 )}
//               </div>

//               <div className="flex-1 space-y-2">
//                 <label className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
//                   logoUploading
//                     ? 'border-gray-200 bg-gray-50 opacity-50'
//                     : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
//                 }`}>
//                   <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={logoUploading} className="hidden" />
//                   {logoUploading ? (
//                     <><Spinner /><span className="text-sm font-bold text-gray-500">Uploading...</span></>
//                   ) : (
//                     <><span className="text-lg">📷</span>
//                     <span className="text-sm font-bold text-gray-700">
//                       {currentLogo ? 'Logo Change Karo' : 'Logo Upload Karo'}
//                     </span></>
//                   )}
//                 </label>

//                 {currentLogo && (
//                   <button onClick={() => setCurrentLogo('')}
//                     className="w-full py-2 text-xs text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition-all">
//                     Logo Hatao
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//         </div>
//       )}

//       {/* ── SHOP TAB ── */}
//       {activeTab === 'shop' && (
//         <form onSubmit={handleShopUpdate} className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Shop Name</label>
//               <input type="text" value={shopForm.shopName}
//                 onChange={(e) => setShopForm({ ...shopForm, shopName: e.target.value })}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
//               <textarea value={shopForm.description}
//                 onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
//                 rows={3}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
//               <input type="tel" value={shopForm.phone}
//                 onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Announcement</label>
//               <input type="text" value={shopForm.announcement}
//                 onChange={(e) => setShopForm({ ...shopForm, announcement: e.target.value })}
//                 placeholder="Customers ko koi special message..."
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             {/* ✅ SHOP LOCATION SECTION */}
//             <div className="border-t border-gray-100 pt-4 space-y-3">

//               <div>
//                 <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider">📍 Shop Location</p>
//                 <p className="text-xs text-gray-400 mt-0.5">Delivery charge calculate karne ke liye zaroori hai</p>
//               </div>

//               {/* GPS Status + Detect Button */}
//               <div className={`rounded-2xl p-3 flex items-center justify-between gap-2 ${
//                 shopForm.lat && shopForm.lng
//                   ? 'bg-green-50 border border-green-100'
//                   : 'bg-orange-50 border border-orange-100'
//               }`}>
//                 <p className={`text-xs font-bold flex-1 ${
//                   shopForm.lat && shopForm.lng ? 'text-green-700' : 'text-orange-700'
//                 }`}>
//                   {shopForm.lat && shopForm.lng
//                     ? `✅ Set: ${Number(shopForm.lat).toFixed(4)}, ${Number(shopForm.lng).toFixed(4)}`
//                     : '⚠️ Location set nahi — delivery charge sahi nahi hoga'
//                   }
//                 </p>
//                 <button
//                   type="button"
//                   onClick={handleAutoDetect}
//                   disabled={detectingLocation}
//                   className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95 disabled:opacity-60 whitespace-nowrap flex-shrink-0"
//                 >
//                   {detectingLocation ? '📡 Detecting...' : '📡 Auto Detect'}
//                 </button>
//               </div>

//               {/* Full Address */}
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Address</label>
//                 <textarea
//                   value={shopForm.fullAddress}
//                   onChange={(e) => setShopForm({ ...shopForm, fullAddress: e.target.value })}
//                   rows={2}
//                   placeholder="Gali no. 5, Near xyz market..."
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
//                 />
//               </div>

//               {/* City + Pincode */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">City</label>
//                   <input
//                     type="text"
//                     value={shopForm.city}
//                     onChange={(e) => setShopForm({ ...shopForm, city: e.target.value })}
//                     placeholder="Bhopal"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Pincode</label>
//                   <input
//                     type="text"
//                     value={shopForm.pincode}
//                     onChange={(e) => setShopForm({ ...shopForm, pincode: e.target.value })}
//                     placeholder="462001"
//                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
//                   />
//                 </div>
//               </div>

//             </div>
//             {/* ── END LOCATION SECTION ── */}

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Theme Color</label>
//               <div className="flex items-center gap-3">
//                 <input type="color" value={shopForm.themeColor}
//                   onChange={(e) => setShopForm({ ...shopForm, themeColor: e.target.value })}
//                   className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer" />
//                 <span className="text-sm text-gray-500 font-medium">{shopForm.themeColor}</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between py-2">
//               <div>
//                 <p className="font-bold text-gray-900 text-sm">Shop Status</p>
//                 <p className="text-xs text-gray-400">Customers order kar sakenge?</p>
//               </div>
//               <button type="button"
//                 onClick={() => setShopForm({ ...shopForm, isOpen: !shopForm.isOpen })}
//                 className={`w-14 h-7 rounded-full transition-all relative ${shopForm.isOpen ? 'bg-green-500' : 'bg-gray-300'}`}>
//                 <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${shopForm.isOpen ? 'left-8' : 'left-1'}`} />
//               </button>
//             </div>
//           </div>

//           <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//             <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">🌐 Your Shop Link</p>
//             <div className="flex items-center gap-2">
//               <p className="text-sm text-green-800 font-medium flex-1 truncate">
//                 apnamarket.in/shop/{shop?.slug}
//               </p>
//               <button type="button"
//                 onClick={() => { navigator.clipboard.writeText(`apnamarket.in/shop/${shop?.slug}`); toast.success('Link copy ho gaya!'); }}
//                 className="text-xs bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95">
//                 Copy
//               </button>
//             </div>
//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//             {loading && <Spinner />}
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </form>
//       )}

//       {/* ── DELIVERY TAB ── */}
//       {activeTab === 'delivery' && (
//         <form onSubmit={handleDeliveryUpdate} className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-5">

//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="font-bold text-gray-900">Delivery Enable</p>
//                 <p className="text-xs text-gray-400">Customers ko delivery milegi?</p>
//               </div>
//               <button type="button"
//                 onClick={() => setDeliveryForm({ ...deliveryForm, deliveryEnabled: !deliveryForm.deliveryEnabled })}
//                 className={`w-14 h-7 rounded-full transition-all relative ${deliveryForm.deliveryEnabled ? 'bg-green-500' : 'bg-gray-300'}`}>
//                 <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${deliveryForm.deliveryEnabled ? 'left-8' : 'left-1'}`} />
//               </button>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Custom Delivery Discount (₹)
//               </label>
//               <input type="number" value={deliveryForm.customDeliveryDiscount}
//                 onChange={(e) => setDeliveryForm({ ...deliveryForm, customDeliveryDiscount: Number(e.target.value) })}
//                 min="0" max="30"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               <p className="text-xs text-gray-400 mt-1">Platform rate se kitna discount dena chahte ho</p>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                 Max Delivery Distance (km)
//               </label>
//               <input type="number" value={deliveryForm.maxDeliveryDistance}
//                 onChange={(e) => setDeliveryForm({ ...deliveryForm, maxDeliveryDistance: Number(e.target.value) })}
//                 min="1" max="5"
//                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//             </div>

//             <div className="bg-gray-50 rounded-2xl p-4">
//               <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Platform Delivery Rates</p>
//               <div className="space-y-2">
//                 {[
//                   { range: '0–1 km', rates: '₹5 – ₹15' },
//                   { range: '1–2 km', rates: '₹10 – ₹20' },
//                   { range: '2–3 km', rates: '₹15 – ₹25' },
//                   { range: '3–5 km', rates: '₹20 – ₹30' },
//                 ].map((r) => (
//                   <div key={r.range} className="flex justify-between text-sm">
//                     <span className="text-gray-500">{r.range}</span>
//                     <span className="font-semibold text-gray-900">{r.rates}</span>
//                   </div>
//                 ))}
//                 <p className="text-xs text-green-600 font-medium mt-2">₹100+ orders pe FREE delivery!</p>
//               </div>
//             </div>
//           </div>

//           <button type="submit" disabled={loading}
//             className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
//             {loading && <Spinner />}
//             {loading ? 'Saving...' : 'Save Delivery Settings'}
//           </button>
//         </form>
//       )}

//       {/* ── DOMAIN TAB ── */}
//       {activeTab === 'domain' && (
//         <div className="space-y-4">
//           <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">
//             <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
//               <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Current (Free)</p>
//               <p className="text-sm font-bold text-green-800">apnamarket.in/shop/{shop?.slug}</p>
//             </div>
//             <div className="space-y-3">
//               <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-bold text-gray-900 text-sm">Subdomain</p>
//                   <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">₹199/year</span>
//                 </div>
//                 <p className="text-xs text-gray-400 mb-3">yourshop.apnamarket.in</p>
//                 <button className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
//                   Coming Soon
//                 </button>
//               </div>
//               <div className="border-2 border-gray-200 rounded-2xl p-4 opacity-60">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-bold text-gray-900 text-sm">Custom Domain</p>
//                   <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">₹999/year</span>
//                 </div>
//                 <p className="text-xs text-gray-400 mb-3">yourshop.com</p>
//                 <button className="w-full py-2 bg-purple-600 text-white font-bold rounded-xl text-sm opacity-50 cursor-not-allowed">
//                   Coming Soon
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }









'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { updateShop, updateDeliverySettings } from '@/services/shopService';
import toast from 'react-hot-toast';
import API from '@/services/api';

const DEFAULT_BANNERS = {
  kirana: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
  dairy:  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&h=400&fit=crop',
  fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&h=400&fit=crop',
  food:   'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=400&fit=crop',
  medical:'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&h=400&fit=crop',
  fashion:'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
  electronics:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
};

const DEFAULT_LOGOS = {
  kirana: '🛒', dairy: '🥛', fruits: '🍎',
  food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
};

export default function SettingsPage() {
  const { shop, user } = useAuth();
  const [activeTab, setActiveTab] = useState('shop');
  const [loading, setLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  const [shopForm, setShopForm] = useState({
    shopName: shop?.shopName || '',
    description: shop?.description || '',
    phone: shop?.phone || '',
    themeColor: shop?.themeColor || '#16a34a',
    isOpen: shop?.isOpen ?? true,
    announcement: shop?.homePage?.announcement || '',
    fullAddress: shop?.address?.fullAddress || '',
    city: shop?.address?.city || '',
    pincode: shop?.address?.pincode || '',
    lat: shop?.address?.location?.lat || '',
    lng: shop?.address?.location?.lng || '',
    upiId: shop?.upiId || '', // ✅ UPI ID
     closedMessage: shop?.closedMessage || '',
  });

  const [deliveryForm, setDeliveryForm] = useState({
  deliveryEnabled: shop?.deliverySettings?.deliveryEnabled ?? true,
  customDeliveryDiscount: shop?.deliverySettings?.customDeliveryDiscount || 0,
  maxDeliveryDistance: shop?.deliverySettings?.maxDeliveryDistance || 5,
  freeDeliveryAbove: shop?.deliverySettings?.freeDeliveryAbove ?? 100,
   deliveryOffToday: shop?.deliverySettings?.deliveryOffToday ?? false,
  deliveryOffMessage: shop?.deliverySettings?.deliveryOffMessage || '',
  extendedDelivery: {
    enabled: shop?.deliverySettings?.extendedDelivery?.enabled ?? false,
    maxDistance: shop?.deliverySettings?.extendedDelivery?.maxDistance || 10,
    chargePerKm: shop?.deliverySettings?.extendedDelivery?.chargePerKm || 15,
  }
});

const [offerForm, setOfferForm] = useState({
  title: '',
  description: '',
  discount: '',
  bgColor: '#ef4444',
  validTill: ''
});

const [savingOffer, setSavingOffer] = useState(false);
const [currentOffers, setCurrentOffers] = useState(shop?.homePage?.offers || []);

  const [currentLogo, setCurrentLogo] = useState(shop?.logo || '');
  const [currentBanner, setCurrentBanner] = useState(shop?.banner || '');

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('Image 5MB se chhoti honi chahiye!'); return; }
    setLogoUploading(true);
    try {
      const base64 = await toBase64(file);
      const res = await API.put('/shop/upload-logo', { image: base64 });
      setCurrentLogo(res.data.logo);
      toast.success('Logo upload ho gaya! 🎉');
    } catch { toast.error('Logo upload failed!'); }
    finally { setLogoUploading(false); }
  };

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error('Banner 10MB se chhota hona chahiye!'); return; }
    setBannerUploading(true);
    try {
      const base64 = await toBase64(file);
      const res = await API.put('/shop/upload-banner', { image: base64 });
      setCurrentBanner(res.data.banner);
      toast.success('Banner upload ho gaya! 🎉');
    } catch { toast.error('Banner upload failed!'); }
    finally { setBannerUploading(false); }
  };

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      toast.error('GPS support nahi hai is device mein!');
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setShopForm(prev => ({
          ...prev,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }));
        toast.success('Shop location detect ho gayi! ✅');
        setDetectingLocation(false);
      },
      () => {
        toast.error('Location access allow karo browser mein!');
        setDetectingLocation(false);
      }
    );
  };

  const handleShopUpdate = async (e) => {
    e.preventDefault();
    if (!shopForm.lat || !shopForm.lng) {
      toast.error('📍 Shop location set karo — delivery charge iske bina sahi nahi hoga!');
    }
    setLoading(true);
    try {
      await updateShop({
        shopName: shopForm.shopName,
        description: shopForm.description,
        phone: shopForm.phone,
        themeColor: shopForm.themeColor,
        isOpen: shopForm.isOpen,
        announcement: shopForm.announcement,
        upiId: shopForm.upiId, // ✅
        address: {
          fullAddress: shopForm.fullAddress,
          city: shopForm.city,
          pincode: shopForm.pincode,
          location: {
            lat: shopForm.lat ? parseFloat(shopForm.lat) : null,
            lng: shopForm.lng ? parseFloat(shopForm.lng) : null,
          }
        },
        closedMessage: shopForm.closedMessage,
      });
      toast.success('Shop update ho gayi!');
    } catch { toast.error('Update failed!'); }
    finally { setLoading(false); }
  };

  const handleDeliveryUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDeliverySettings(deliveryForm);
      toast.success('Delivery settings update ho gayi!');
    } catch { toast.error('Update failed!'); }
    finally { setLoading(false); }
  };

  const handleDefaultBannerSelect = async (url) => {
    setCurrentBanner(url);
    setBannerUploading(true);
    try {
      await API.put('/shop/upload-banner-url', { bannerUrl: url });
      toast.success('Banner save ho gaya!');
    } catch {
      toast.error('Banner save nahi hua!');
    } finally {
      setBannerUploading(false);
    }
  };

  const handleAddOffer = async () => {
  if (!offerForm.title) { toast.error('Title zaroori hai!'); return; }
  setSavingOffer(true);
  try {
    const newOffer = {
      title: offerForm.title,
      description: offerForm.description,
      discount: Number(offerForm.discount) || 0,
      bgColor: offerForm.bgColor,
      validTill: offerForm.validTill || null,
      isActive: true
    };
    const updatedOffers = [...currentOffers, newOffer];
    await updateShop({ offers: updatedOffers });
    setCurrentOffers(updatedOffers);
    setOfferForm({ title: '', description: '', discount: '', bgColor: '#ef4444', validTill: '' });
    toast.success('Offer add ho gaya! 🎉');
  } catch { toast.error('Save nahi hua!'); }
  finally { setSavingOffer(false); }
};

const handleDeleteOffer = async (index) => {
  const updatedOffers = currentOffers.filter((_, i) => i !== index);
  await updateShop({ offers: updatedOffers });
  setCurrentOffers(updatedOffers);
  toast.success('Offer hata diya!');
};

const handleToggleOffer = async (index) => {
  const updatedOffers = currentOffers.map((o, i) =>
    i === index ? { ...o, isActive: !o.isActive } : o
  );
  await updateShop({ offers: updatedOffers });
  setCurrentOffers(updatedOffers);
};

  const TABS = [
    { id: 'shop', label: '🏪 Shop' },
    { id: 'appearance', label: '🎨 Appearance' },
     { id: 'offers', label: '🔥 Offers' },
    { id: 'delivery', label: '🚚 Delivery' },
    { id: 'domain', label: '🌐 Domain' },
  ];

  const Spinner = () => (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Settings ⚙️</h1>
        <p className="text-gray-400 text-sm mt-0.5">Shop ki settings manage karo</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl overflow-x-auto hide-scrollbar">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap px-2 ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── APPEARANCE TAB ── */}
      {activeTab === 'appearance' && (
        <div className="space-y-4">

          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="font-black text-gray-900">🖼️ Shop Banner</h2>
              <p className="text-xs text-gray-400 mt-0.5">1200×400 best size • Max 10MB</p>
            </div>
            <div style={{ width: '100%' }}>
              <img
                src={currentBanner || DEFAULT_BANNERS[shop?.category] || DEFAULT_BANNERS.kirana}
                alt="Banner"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="p-4 space-y-4">
              <label className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                bannerUploading ? 'border-gray-200 bg-gray-50 opacity-50' : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
              }`}>
                <input type="file" accept="image/*" onChange={handleBannerUpload} disabled={bannerUploading} className="hidden" />
                {bannerUploading ? (
                  <><Spinner /><span className="text-sm font-bold text-gray-500">Uploading...</span></>
                ) : (
                  <><span className="text-lg">📸</span>
                  <span className="text-sm font-bold text-gray-700">
                    {currentBanner ? 'Banner Change Karo' : 'Banner Upload Karo'}
                  </span></>
                )}
              </label>

              <div>
                <p className="text-xs font-semibold text-gray-400 mb-3">Ya default choose karo:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {Object.entries(DEFAULT_BANNERS).map(([cat, url]) => (
                    <button key={cat} onClick={() => handleDefaultBannerSelect(url)}
                      style={{
                        position: 'relative', height: '52px', borderRadius: '12px',
                        overflow: 'hidden',
                        border: currentBanner === url ? '2.5px solid #111' : '2px solid #e5e7eb',
                        padding: 0, cursor: 'pointer', background: 'none',
                      }}>
                      <div style={{
                        width: '100%', height: '100%',
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                      }} />
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                        paddingBottom: '3px', background: 'rgba(0,0,0,0.15)',
                      }}>
                        <span style={{ fontSize: '13px' }}>{DEFAULT_LOGOS[cat]}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {currentBanner && (
                <button onClick={() => setCurrentBanner('')}
                  className="w-full py-2 text-xs text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition-all">
                  Banner Hatao
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-5">
            <h2 className="font-black text-gray-900 mb-1">🏪 Shop Logo (DP)</h2>
            <p className="text-xs text-gray-400 mb-4">400×400 best size • Max 5MB</p>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
                {currentLogo
                  ? <img src={currentLogo} alt="Logo" className="w-full h-full object-cover" />
                  : <span className="text-4xl">{DEFAULT_LOGOS[shop?.category] || '🏪'}</span>
                }
              </div>
              <div className="flex-1 space-y-2">
                <label className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                  logoUploading ? 'border-gray-200 bg-gray-50 opacity-50' : 'border-gray-300 hover:border-gray-900 hover:bg-gray-50'
                }`}>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={logoUploading} className="hidden" />
                  {logoUploading ? (
                    <><Spinner /><span className="text-sm font-bold text-gray-500">Uploading...</span></>
                  ) : (
                    <><span className="text-lg">📷</span>
                    <span className="text-sm font-bold text-gray-700">
                      {currentLogo ? 'Logo Change Karo' : 'Logo Upload Karo'}
                    </span></>
                  )}
                </label>
                {currentLogo && (
                  <button onClick={() => setCurrentLogo('')}
                    className="w-full py-2 text-xs text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition-all">
                    Logo Hatao
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── SHOP TAB ── */}
      {activeTab === 'shop' && (
        <form onSubmit={handleShopUpdate} className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

            {/* Shop Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Shop Name</label>
              <input type="text" value={shopForm.shopName}
                onChange={(e) => setShopForm({ ...shopForm, shopName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
              <textarea value={shopForm.description}
                onChange={(e) => setShopForm({ ...shopForm, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
              <input type="tel" value={shopForm.phone}
                onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </div>

            {/* Announcement */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Announcement</label>
              <input type="text" value={shopForm.announcement}
                onChange={(e) => setShopForm({ ...shopForm, announcement: e.target.value })}
                placeholder="Customers ko koi special message..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
            </div>

            {/* ── SHOP LOCATION ── */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider">📍 Shop Location</p>
                <p className="text-xs text-gray-400 mt-0.5">Delivery charge calculate karne ke liye zaroori hai</p>
              </div>

              <div className={`rounded-2xl p-3 flex items-center justify-between gap-2 ${
                shopForm.lat && shopForm.lng ? 'bg-green-50 border border-green-100' : 'bg-orange-50 border border-orange-100'
              }`}>
                <p className={`text-xs font-bold flex-1 ${shopForm.lat && shopForm.lng ? 'text-green-700' : 'text-orange-700'}`}>
                  {shopForm.lat && shopForm.lng
                    ? `✅ Set: ${Number(shopForm.lat).toFixed(4)}, ${Number(shopForm.lng).toFixed(4)}`
                    : '⚠️ Location set nahi — delivery charge sahi nahi hoga'
                  }
                </p>
                <button type="button" onClick={handleAutoDetect} disabled={detectingLocation}
                  className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95 disabled:opacity-60 whitespace-nowrap flex-shrink-0">
                  {detectingLocation ? '📡 Detecting...' : '📡 Auto Detect'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Address</label>
                <textarea value={shopForm.fullAddress}
                  onChange={(e) => setShopForm({ ...shopForm, fullAddress: e.target.value })}
                  rows={2} placeholder="Gali no. 5, Near xyz market..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">City</label>
                  <input type="text" value={shopForm.city}
                    onChange={(e) => setShopForm({ ...shopForm, city: e.target.value })}
                    placeholder="Bhopal"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Pincode</label>
                  <input type="text" value={shopForm.pincode}
                    onChange={(e) => setShopForm({ ...shopForm, pincode: e.target.value })}
                    placeholder="462001"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
                </div>
              </div>
            </div>

            {/* ✅ UPI ID — Location ke baad, Theme Color se pehle */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                💳 UPI ID (Online Payment ke liye)
              </label>
              <input type="text" value={shopForm.upiId}
                onChange={(e) => setShopForm({ ...shopForm, upiId: e.target.value })}
                placeholder="yourname@ybl / 9876543210@paytm"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
              <p className="text-xs text-gray-400 mt-1">Customers is UPI pe scan karke pay karenge</p>
              {shopForm.upiId && (
                <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-xs text-green-700 font-bold">✅ UPI set: {shopForm.upiId}</p>
                </div>
              )}
            </div>

            {/* Theme Color */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Theme Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={shopForm.themeColor}
                  onChange={(e) => setShopForm({ ...shopForm, themeColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border border-gray-200 cursor-pointer" />
                <span className="text-sm text-gray-500 font-medium">{shopForm.themeColor}</span>
              </div>
            </div>

            {/* Shop Status */}
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-bold text-gray-900 text-sm">Shop Status</p>
                <p className="text-xs text-gray-400">Customers order kar sakenge?</p>
              </div>
              <button type="button"
                onClick={() => setShopForm({ ...shopForm, isOpen: !shopForm.isOpen })}
                className={`w-14 h-7 rounded-full transition-all relative ${shopForm.isOpen ? 'bg-green-500' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${shopForm.isOpen ? 'left-8' : 'left-1'}`} />
              </button>
            </div>

          </div>

          {/* Closed Message */}
{!shopForm.isOpen && (
  <div className="mt-3">
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
      Closed Message (optional)
    </label>
    <input type="text" value={shopForm.closedMessage}
      onChange={(e) => setShopForm({ ...shopForm, closedMessage: e.target.value })}
      placeholder="Jaise: Aaj Sunday hai, kal subah 9 baje khulega"
      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
  </div>
)}

          {/* Shop Link */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">🌐 Your Shop Link</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-green-800 font-medium flex-1 truncate">
                apnamarket.in/shop/{shop?.slug}
              </p>
              <button type="button"
                onClick={() => { navigator.clipboard.writeText(`apnamarket.in/shop/${shop?.slug}`); toast.success('Link copy ho gaya!'); }}
                className="text-xs bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95">
                Copy
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && <Spinner />}
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}

      {activeTab === 'delivery' && (
  <form onSubmit={handleDeliveryUpdate} className="space-y-4">

    {/* ── DELIVERY ON/OFF ── */}
    <div className="bg-white rounded-3xl border border-gray-100 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-black text-gray-900">Delivery Enable</p>
          <p className="text-xs text-gray-400 mt-0.5">Customers ko delivery milegi?</p>
        </div>
        <button type="button"
          onClick={() => setDeliveryForm({ ...deliveryForm, deliveryEnabled: !deliveryForm.deliveryEnabled })}
          className={`w-14 h-7 rounded-full transition-all relative ${deliveryForm.deliveryEnabled ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow ${deliveryForm.deliveryEnabled ? 'left-8' : 'left-1'}`} />
        </button>
      </div>
    </div>

    

    {deliveryForm.deliveryEnabled && (
      <>

      {/* ── DELIVERY OFF TODAY ── */}
<div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-3">
  <div className="flex items-center justify-between">
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">📅</span>
        <p className="font-black text-gray-900">Aaj Delivery Band</p>
      </div>
      <p className="text-xs text-gray-400">Delivery boy chhuti pe hai ya aaj deliver nahi kar sakte?</p>
    </div>
    <button type="button"
      onClick={() => setDeliveryForm({ ...deliveryForm, deliveryOffToday: !deliveryForm.deliveryOffToday })}
      className={`w-14 h-7 rounded-full transition-all relative flex-shrink-0 ${deliveryForm.deliveryOffToday ? 'bg-red-500' : 'bg-gray-300'}`}>
      <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow ${deliveryForm.deliveryOffToday ? 'left-8' : 'left-1'}`} />
    </button>
  </div>

  {deliveryForm.deliveryOffToday && (
    <div className="space-y-3 pt-2 border-t border-gray-100">
      <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
        <p className="text-xs font-black text-red-600">🚫 Aaj delivery nahi hogi — customers ko dikhega</p>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
          Message Customers Ko (optional)
        </label>
        <input type="text" value={deliveryForm.deliveryOffMessage}
          onChange={(e) => setDeliveryForm({ ...deliveryForm, deliveryOffMessage: e.target.value })}
          placeholder="Jaise: Delivery boy chhuti pe hai, kal se normal delivery"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all" />
      </div>
    </div>
  )}
</div>

        {/* ── PLATFORM RATES INFO ── */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5">
          <p className="text-xs font-black text-blue-700 uppercase tracking-wider mb-3">📋 Platform Delivery Rates (Fixed)</p>
          <div className="space-y-2.5">
            {[
  { range: '0–1 km', low: '₹15 (<₹50)', mid: '₹10 (₹50–₹199)', high: '₹5 (₹200+)' },
  { range: '1–2 km', low: '₹20 (<₹50)', mid: '₹15 (₹50–₹199)', high: '₹8 (₹200+)' },
  { range: '2–3 km', low: '₹25 (<₹50)', mid: '₹20 (₹50–₹199)', high: '₹10 (₹200+)' },
  { range: '3–5 km', low: '₹35 (<₹50)', mid: '₹25 (₹50–₹199)', high: '₹15 (₹200+)' },
].map((r) => (
  <div key={r.range} className="bg-white rounded-2xl px-4 py-3">
    <p className="text-xs font-black text-gray-700 mb-1">{r.range}</p>
    <div className="flex gap-2 flex-wrap">
      <span className="text-[11px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-lg">{r.low}</span>
      <span className="text-[11px] bg-amber-50 text-amber-600 font-bold px-2 py-0.5 rounded-lg">{r.mid}</span>
      <span className="text-[11px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-lg">{r.high}</span>
    </div>
  </div>
))}
          </div>
          <p className="text-[11px] text-blue-500 font-medium mt-3">* Ye rates platform set karta hai — aap inhe kam kar sakte ho, zyada nahi</p>
        </div>

        {/* ── FREE DELIVERY ABOVE ── */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🎁</span>
              <p className="font-black text-gray-900">Free Delivery Kitne Pe?</p>
            </div>
            <p className="text-xs text-gray-400">Is amount se zyada order pe delivery free hogi</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-gray-400">₹</span>
            <input
              type="number"
              value={deliveryForm.freeDeliveryAbove}
              onChange={(e) => setDeliveryForm({ ...deliveryForm, freeDeliveryAbove: Number(e.target.value) })}
              min="0"
              max="10000"
              placeholder="100"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
            <span className="text-sm text-gray-500 font-medium">se upar</span>
          </div>

          {/* Quick select buttons */}
          <div className="flex gap-2 flex-wrap">
            {[0, 50, 100, 200, 500].map((val) => (
              <button key={val} type="button"
                onClick={() => setDeliveryForm({ ...deliveryForm, freeDeliveryAbove: val })}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  deliveryForm.freeDeliveryAbove === val
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {val === 0 ? 'Kabhi Nahi' : `₹${val}+`}
              </button>
            ))}
          </div>

          {deliveryForm.freeDeliveryAbove > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3">
              <p className="text-xs font-black text-green-700">
                ✅ ₹{deliveryForm.freeDeliveryAbove} ya usse zyada ka order → FREE delivery
              </p>
              <p className="text-xs text-green-600 mt-0.5">
                ₹{deliveryForm.freeDeliveryAbove - 1} se kam → platform rates apply honge
              </p>
            </div>
          )}
          {deliveryForm.freeDeliveryAbove === 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
              <p className="text-xs font-bold text-gray-500">ℹ️ Kisi bhi order pe free delivery nahi hogi</p>
            </div>
          )}
        </div>

        {/* ── DELIVERY DISCOUNT ── */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">💸</span>
              <p className="font-black text-gray-900">Delivery Discount</p>
            </div>
            <p className="text-xs text-gray-400">Platform rate se kitna kam charge lena chahte ho</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-gray-400">₹</span>
            <input
              type="number"
              value={deliveryForm.customDeliveryDiscount}
              onChange={(e) => setDeliveryForm({ ...deliveryForm, customDeliveryDiscount: Number(e.target.value) })}
              min="0" max="30" placeholder="0"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
            <span className="text-sm text-gray-500 font-medium">rupee kam</span>
          </div>
          {deliveryForm.customDeliveryDiscount > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
              <p className="text-xs font-black text-amber-700">
                💰 Platform rate se ₹{deliveryForm.customDeliveryDiscount} kam charge hoga
              </p>
            </div>
          )}
        </div>

        {/* ── 5KM SE UPAR DELIVERY ── */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🗺️</span>
                <p className="font-black text-gray-900">5 KM Se Upar Delivery</p>
              </div>
              <p className="text-xs text-gray-400">5km ke baad bhi deliver karna chahte ho?</p>
            </div>
            <button type="button"
              onClick={() => setDeliveryForm({
                ...deliveryForm,
                extendedDelivery: {
                  ...deliveryForm.extendedDelivery,
                  enabled: !deliveryForm.extendedDelivery.enabled
                }
              })}
              className={`w-14 h-7 rounded-full transition-all relative flex-shrink-0 ${deliveryForm.extendedDelivery.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow ${deliveryForm.extendedDelivery.enabled ? 'left-8' : 'left-1'}`} />
            </button>
          </div>

          {deliveryForm.extendedDelivery.enabled && (
            <div className="space-y-4 pt-2 border-t border-gray-100">

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Maximum Distance (km)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={deliveryForm.extendedDelivery.maxDistance}
                    onChange={(e) => setDeliveryForm({
                      ...deliveryForm,
                      extendedDelivery: { ...deliveryForm.extendedDelivery, maxDistance: Number(e.target.value) }
                    })}
                    min="6" max="50" placeholder="10"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  />
                  <span className="text-sm text-gray-500 font-medium">km tak</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {[10, 15, 20, 30].map((val) => (
                    <button key={val} type="button"
                      onClick={() => setDeliveryForm({
                        ...deliveryForm,
                        extendedDelivery: { ...deliveryForm.extendedDelivery, maxDistance: val }
                      })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        deliveryForm.extendedDelivery.maxDistance === val
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                      {val} km
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Charge Per KM (₹)
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-gray-400">₹</span>
                  <input
                    type="number"
                    value={deliveryForm.extendedDelivery.chargePerKm}
                    onChange={(e) => setDeliveryForm({
                      ...deliveryForm,
                      extendedDelivery: { ...deliveryForm.extendedDelivery, chargePerKm: Number(e.target.value) }
                    })}
                    min="5" max="100" placeholder="15"
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                  />
                  <span className="text-sm text-gray-500 font-medium">/ km</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                <p className="text-xs font-black text-blue-700 mb-1">📍 Preview</p>
                <p className="text-xs text-blue-600">
                  5–{deliveryForm.extendedDelivery.maxDistance} km tak deliver karoge
                </p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Charge: ₹{deliveryForm.extendedDelivery.chargePerKm}/km
                  {' '}(8 km = ₹{(8 * deliveryForm.extendedDelivery.chargePerKm).toFixed(0)} example)
                </p>
              </div>
            </div>
          )}
        </div>

      </>
    )}

    <button type="submit" disabled={loading}
      className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
      {loading && <Spinner />}
      {loading ? 'Saving...' : '💾 Save Delivery Settings'}
    </button>
  </form>
)}


{activeTab === 'offers' && (
  <div className="space-y-4">

    {/* Current Offers */}
    {currentOffers.length > 0 && (
      <div className="space-y-3">
        <p className="text-xs font-black text-gray-500 uppercase tracking-wider px-1">Active Offers</p>
        {currentOffers.map((offer, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Preview */}
            <div className="p-4 text-white relative"
              style={{ background: offer.bgColor || shop?.themeColor || '#ef4444' }}>
              <div className="text-sm font-black">{offer.title}</div>
              {offer.description && <div className="text-xs opacity-80 mt-0.5">{offer.description}</div>}
              {offer.discount > 0 && <div className="text-3xl font-black mt-1">{offer.discount}% OFF</div>}
              {offer.validTill && (
                <div className="text-xs opacity-70 mt-1">
                  Valid till: {new Date(offer.validTill).toLocaleDateString('en-IN')}
                </div>
              )}
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-50">
              <button onClick={() => handleToggleOffer(i)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  offer.isActive
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                }`}>
                {offer.isActive ? '✅ Active' : '⏸ Inactive'}
              </button>
              <button onClick={() => handleDeleteOffer(i)}
                className="flex-1 py-2 bg-red-50 text-red-600 font-bold rounded-xl text-xs border border-red-100 transition-all active:scale-95">
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Add New Offer */}
    <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-1 h-5 bg-gray-900 rounded-full" />
        <p className="font-black text-gray-900">Naya Offer Add Karo</p>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Title *</label>
        <input type="text" value={offerForm.title}
          onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
          placeholder="Jaise: Weekend Special, Diwali Offer..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
        <input type="text" value={offerForm.description}
          onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
          placeholder="Jaise: Sab products pe discount..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Discount %</label>
          <input type="number" value={offerForm.discount}
            onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
            placeholder="10" min="0" max="99"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Valid Till</label>
          <input type="date" value={offerForm.validTill}
            onChange={(e) => setOfferForm({ ...offerForm, validTill: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
        </div>
      </div>

      {/* Color picker */}
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Banner Color</label>
        <div className="flex gap-2 flex-wrap">
          {['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6','#ec4899','#111827'].map(color => (
            <button key={color} type="button"
              onClick={() => setOfferForm({ ...offerForm, bgColor: color })}
              className={`w-8 h-8 rounded-xl transition-all ${offerForm.bgColor === color ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : ''}`}
              style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      {/* Live Preview */}
      {offerForm.title && (
        <div className="rounded-2xl p-4 text-white"
          style={{ background: offerForm.bgColor }}>
          <p className="text-xs font-black uppercase tracking-wider opacity-70 mb-1">Preview</p>
          <div className="text-sm font-black">{offerForm.title}</div>
          {offerForm.description && <div className="text-xs opacity-80 mt-0.5">{offerForm.description}</div>}
          {offerForm.discount > 0 && <div className="text-3xl font-black mt-1">{offerForm.discount}% OFF</div>}
        </div>
      )}

      <button onClick={handleAddOffer} disabled={savingOffer || !offerForm.title}
        className="w-full py-3.5 bg-gray-900 text-white font-black rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
        {savingOffer ? <><Spinner />Saving...</> : '🔥 Add Offer'}
      </button>
    </div>
  </div>
)}



      {/* ── DOMAIN TAB ── */}
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