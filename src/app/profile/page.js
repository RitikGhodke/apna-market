// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import API from '@/services/api';
// import BottomNav from '@/components/common/BottomNav';
// import toast from 'react-hot-toast';

// export default function ProfilePage() {
//   const router = useRouter();
//   const { user, isAuthenticated, logoutUser } = useAuth();
//   const [favourites, setFavourites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     setFormData({ name: user?.name || '', email: user?.email || '' });
//     loadFavourites();
//   }, [isAuthenticated, user]);

//   const loadFavourites = async () => {
//     try {
//       const res = await API.get('/user/favourites');
//       setFavourites(res.data.favourites || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put('/user/profile', formData);
//       toast.success('Profile update ho gaya!');
//       setEditing(false);
//     } catch (error) {
//       toast.error('Update failed!');
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   const categoryEmoji = {
//     kirana: '🛒', dairy: '🥛', fruits: '🍎',
//     food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">

//       {/* Header */}
//       <div className="bg-white border-b border-gray-100">
//         <div className="px-4 py-4 flex items-center justify-between">
//           <h1 className="text-xl font-black text-gray-900">Profile</h1>
//           <button onClick={() => setEditing(!editing)}
//             className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl">
//             {editing ? 'Cancel' : 'Edit ✏️'}
//           </button>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-4">

//         {/* Profile Card */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-6">
//           <div className="flex items-center gap-4 mb-5">
//             <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0">
//               <span className="text-white font-black text-xl">{getInitials(user?.name)}</span>
//             </div>
//             <div>
//               <h2 className="text-xl font-black text-gray-900">{user?.name}</h2>
//               <p className="text-sm text-gray-400">{user?.phone}</p>
//               <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full ${
//                 user?.role === 'shop'
//                   ? 'bg-orange-100 text-orange-700'
//                   : 'bg-green-100 text-green-700'
//               }`}>
//                 {user?.role === 'shop' ? '🏪 Dukandaar' : '🛍️ Khareedar'}
//               </span>
//             </div>
//           </div>

//           {editing ? (
//             <form onSubmit={handleUpdate} className="space-y-3">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Name
//                 </label>
//                 <input type="text" value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Email
//                 </label>
//                 <input type="email" value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               </div>
//               <button type="submit"
//                 className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl transition-all active:scale-95">
//                 Save Changes
//               </button>
//             </form>
//           ) : (
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-400">Email</span>
//                 <span className="font-medium text-gray-700">{user?.email || 'Not set'}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-400">Member since</span>
//                 <span className="font-medium text-gray-700">
//                   {new Date(user?.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Quick Links */}
//         <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//           {[
//             { href: '/orders', emoji: '📦', label: 'My Orders', desc: 'Order history dekho' },
//             { href: '/feed', emoji: '🏪', label: 'Browse Shops', desc: 'Shops explore karo' },
//           ].map((item, i) => (
//             <Link key={i} href={item.href}
//               className="flex items-center gap-3 px-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-all">
//               <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
//                 {item.emoji}
//               </div>
//               <div className="flex-1">
//                 <p className="font-bold text-gray-900 text-sm">{item.label}</p>
//                 <p className="text-xs text-gray-400">{item.desc}</p>
//               </div>
//               <span className="text-gray-300">→</span>
//             </Link>
//           ))}
//         </div>

//         {/* Favourite Shops */}
//         {favourites.length > 0 && (
//           <div className="bg-white rounded-3xl border border-gray-100 p-4">
//             <h2 className="font-black text-gray-900 text-sm mb-3">❤️ Favourite Shops</h2>
//             <div className="space-y-2">
//               {favourites.map((fav) => (
//                 <Link key={fav._id} href={`/shop/${fav.shopId?.slug}`}
//                   className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
//                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl border border-gray-100 flex-shrink-0">
//                     {fav.shopId?.logo ? (
//                       <img src={fav.shopId.logo} className="w-full h-full object-cover rounded-xl" />
//                     ) : (
//                       categoryEmoji[fav.shopId?.category] || '🏪'
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-bold text-gray-900 text-sm truncate">{fav.shopId?.shopName}</p>
//                     <p className="text-xs text-gray-400">{fav.shopId?.category}</p>
//                   </div>
//                   <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
//                     fav.shopId?.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
//                   }`}>
//                     {fav.shopId?.isOpen ? 'Open' : 'Closed'}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Logout */}
//         <button onClick={logoutUser}
//           className="w-full py-4 bg-white border border-red-200 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all active:scale-95">
//           🚪 Logout
//         </button>

//       </div>

//       <BottomNav />
//     </div>
//   );
// }











// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import API from '@/services/api';
// import BottomNav from '@/components/common/BottomNav';
// import toast from 'react-hot-toast';

// export default function ProfilePage() {
//   const router = useRouter();
//   // const { user, isAuthenticated, logoutUser, setUser } = useAuth();
//   const { user, isAuthenticated, logoutUser, updateUser } = useAuth();
//   const [favourites, setFavourites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [dpUploading, setDpUploading] = useState(false);  // ✅ naya
//   const [dpPreview, setDpPreview] = useState(null);        // ✅ naya
//   const fileInputRef = useRef(null);                       // ✅ naya
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push('/auth/login');
//       return;
//     }
//     setFormData({ name: user?.name || '', email: user?.email || '' });
//     setDpPreview(user?.profilePic || null);  // ✅ naya
//     loadFavourites();
//   }, [isAuthenticated, user]);

//   const loadFavourites = async () => {
//     try {
//       const res = await API.get('/user/favourites');
//       setFavourites(res.data.favourites || []);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put('/user/profile', formData);
//       toast.success('Profile update ho gaya!');
//       setEditing(false);
//     } catch (error) {
//       toast.error('Update failed!');
//     }
//   };

//   // ✅ DP change handler
//   const handleDpChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Local preview
//     const reader = new FileReader();
//     reader.onload = (ev) => setDpPreview(ev.target.result);
//     reader.readAsDataURL(file);

//     // Upload to backend
//     setDpUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append('profilePic', file);

//       const res = await API.put('/user/update-dp', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//      if (res.data.user) {
//   setDpPreview(res.data.user.profilePic);
// }
//       toast.success('DP update ho gayi! 🎉');
//     } catch (error) {
//       toast.error('DP upload failed!');
//       setDpPreview(user?.profilePic || null); // revert preview
//     } finally {
//       setDpUploading(false);
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
//   };

//   const categoryEmoji = {
//     kirana: '🛒', dairy: '🥛', fruits: '🍎',
//     food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-24">

//       {/* Header */}
//       <div className="bg-white border-b border-gray-100">
//         <div className="px-4 py-4 flex items-center justify-between">
//           <h1 className="text-xl font-black text-gray-900">Profile</h1>
//           <button onClick={() => setEditing(!editing)}
//             className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl">
//             {editing ? 'Cancel' : 'Edit ✏️'}
//           </button>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-4">

//         {/* Profile Card */}
//         <div className="bg-white rounded-3xl border border-gray-100 p-6">
//           <div className="flex items-center gap-4 mb-5">

//             {/* ✅ DP with edit button */}
//             <div className="relative flex-shrink-0">
//               <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden">
//                 {dpPreview ? (
//                   <img src={dpPreview} alt="DP"
//                     className="w-full h-full object-cover" />
//                 ) : (
//                   <span className="text-white font-black text-xl">
//                     {getInitials(user?.name)}
//                   </span>
//                 )}
//               </div>

//               {/* Edit icon */}
//               <button
//                 onClick={() => fileInputRef.current.click()}
//                 disabled={dpUploading}
//                 className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center border-2 border-white"
//               >
//                 {dpUploading ? (
//                   <span className="text-white text-xs animate-spin">⏳</span>
//                 ) : (
//                   <span className="text-white text-xs">✏️</span>
//                 )}
//               </button>

//               {/* Hidden file input */}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleDpChange}
//               />
//             </div>

//             <div>
//               <h2 className="text-xl font-black text-gray-900">{user?.name}</h2>
//               <p className="text-sm text-gray-400">{user?.phone}</p>
//               <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full ${
//                 user?.role === 'shop'
//                   ? 'bg-orange-100 text-orange-700'
//                   : 'bg-green-100 text-green-700'
//               }`}>
//                 {user?.role === 'shop' ? '🏪 Dukandaar' : '🛍️ Khareedar'}
//               </span>
//             </div>
//           </div>

//           {editing ? (
//             <form onSubmit={handleUpdate} className="space-y-3">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Name
//                 </label>
//                 <input type="text" value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
//                   Email
//                 </label>
//                 <input type="email" value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
//               </div>
//               <button type="submit"
//                 className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl transition-all active:scale-95">
//                 Save Changes
//               </button>
//             </form>
//           ) : (
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-400">Email</span>
//                 <span className="font-medium text-gray-700">{user?.email || 'Not set'}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-400">Member since</span>
//                 <span className="font-medium text-gray-700">
//                   {new Date(user?.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Quick Links */}
//         <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//           {[
//             { href: '/orders', emoji: '📦', label: 'My Orders', desc: 'Order history dekho' },
//             { href: '/feed', emoji: '🏪', label: 'Browse Shops', desc: 'Shops explore karo' },
//           ].map((item, i) => (
//             <Link key={i} href={item.href}
//               className="flex items-center gap-3 px-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-all">
//               <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
//                 {item.emoji}
//               </div>
//               <div className="flex-1">
//                 <p className="font-bold text-gray-900 text-sm">{item.label}</p>
//                 <p className="text-xs text-gray-400">{item.desc}</p>
//               </div>
//               <span className="text-gray-300">→</span>
//             </Link>
//           ))}
//         </div>

//         {/* Favourite Shops */}
//         {favourites.length > 0 && (
//           <div className="bg-white rounded-3xl border border-gray-100 p-4">
//             <h2 className="font-black text-gray-900 text-sm mb-3">❤️ Favourite Shops</h2>
//             <div className="space-y-2">
//               {favourites.map((fav) => (
//                 <Link key={fav._id} href={`/shop/${fav.shopId?.slug}`}
//                   className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
//                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl border border-gray-100 flex-shrink-0">
//                     {fav.shopId?.logo ? (
//                       <img src={fav.shopId.logo} className="w-full h-full object-cover rounded-xl" />
//                     ) : (
//                       categoryEmoji[fav.shopId?.category] || '🏪'
//                     )}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-bold text-gray-900 text-sm truncate">{fav.shopId?.shopName}</p>
//                     <p className="text-xs text-gray-400">{fav.shopId?.category}</p>
//                   </div>
//                   <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
//                     fav.shopId?.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
//                   }`}>
//                     {fav.shopId?.isOpen ? 'Open' : 'Closed'}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Logout */}
//         <button onClick={logoutUser}
//           className="w-full py-4 bg-white border border-red-200 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all active:scale-95">
//           🚪 Logout
//         </button>

//       </div>

//       <BottomNav />
//     </div>
//   );
// }







'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import API from '@/services/api';
import BottomNav from '@/components/common/BottomNav';
import toast from 'react-hot-toast';
import { setUser } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';


export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logoutUser, updateUser, isRestoring } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [dpUploading, setDpUploading] = useState(false);
  // const [dpPreview, setDpPreview] = useState(null);
  const [dpPreview, setDpPreview] = useState(() => {
  if (typeof window === 'undefined') return null;
  const saved = JSON.parse(localStorage.getItem('user') || '{}');
  return saved.profilePic || localStorage.getItem('dpPreview') || null;
});
  const [addressSaving, setAddressSaving] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  
 const [addressForm, setAddressForm] = useState(() => {
  if (typeof window === 'undefined') return { fullAddress: '', city: '', pincode: '', lat: '', lng: '' };
  const saved = JSON.parse(localStorage.getItem('user') || '{}');
  const addr = saved.address || {};
  return {
    fullAddress: addr.fullAddress || '',
    city: addr.city || '',
    pincode: addr.pincode || '',
    lat: addr.location?.lat || '',
    lng: addr.location?.lng || '',
  };
});

  useEffect(() => {
    if (isRestoring) return;
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setFormData({ name: user?.name || '', email: user?.email || '' });
   setDpPreview(user?.profilePic || localStorage.getItem('dpPreview') || 
  JSON.parse(localStorage.getItem('user') || '{}')?.profilePic || null);

   const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
const addr = user?.address || savedUser.address || {};
setAddressForm({
  fullAddress: addr.fullAddress || '',
  city: addr.city || '',
  pincode: addr.pincode || '',
  lat: addr.location?.lat || '',
  lng: addr.location?.lng || '',
});

    loadFavourites();
  }, [isAuthenticated, user, isRestoring]);

  const loadFavourites = async () => {
    try {
      const res = await API.get('/user/favourites');
      setFavourites(res.data.favourites || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put('/user/profile', formData);
      toast.success('Profile update ho gaya!');
      setEditing(false);
    } catch (error) {
      toast.error('Update failed!');
    }
  };

  // ✅ DP change handler
  const handleDpChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setDpPreview(ev.target.result);
    reader.readAsDataURL(file);

    setDpUploading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('profilePic', file);

      const res = await API.put('/user/update-dp', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.user) {
        setDpPreview(res.data.user.profilePic);
        localStorage.setItem('dpPreview', res.data.user.profilePic);
      }
      toast.success('DP update ho gayi! 🎉');
    } catch (error) {
      toast.error('DP upload failed!');
      setDpPreview(user?.profilePic || null);
    } finally {
      setDpUploading(false);
    }
  };

  // ✅ GPS Auto Detect
  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      toast.error('GPS support nahi hai is device mein!');
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAddressForm(prev => ({
          ...prev,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }));
        toast.success('Location detect ho gayi! ✅');
        setDetectingLocation(false);
      },
      () => {
        toast.error('Location access allow karo browser mein!');
        setDetectingLocation(false);
      }
    );
  };

  // ✅ Address Save
  const handleSaveAddress = async () => {
    if (!addressForm.lat || !addressForm.lng) {
      toast.error('Pehle 📡 Auto Detect se location set karo!');
      return;
    }
    setAddressSaving(true);
    try {
      await API.put('/user/update-address', {
        fullAddress: addressForm.fullAddress,
        city: addressForm.city,
        pincode: addressForm.pincode,
        location: {
          lat: parseFloat(addressForm.lat),
          lng: parseFloat(addressForm.lng),
        }
      });
      toast.success('Address save ho gaya! 🎉');
      const updatedUser = { ...user, address: res.data.address };
    dispatch(setUser({ user: updatedUser, shop })); 
    localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      toast.error('Address save failed!');
    } finally {
      setAddressSaving(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const categoryEmoji = {
    kirana: '🛒', dairy: '🥛', fruits: '🍎',
    food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
  };

  const locationSet = addressForm.lat && addressForm.lng;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900">Profile</h1>
          <button
            onClick={() => setEditing(!editing)}
            className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl"
          >
            {editing ? 'Cancel' : 'Edit ✏️'}
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* ── Profile Card ── */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-5">

            {/* DP */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden">
                {dpPreview ? (
                  <img src={dpPreview} alt="DP" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-black text-xl">
                    {getInitials(user?.name)}
                  </span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                disabled={dpUploading}
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center border-2 border-white"
              >
                {dpUploading ? (
                  <span className="text-white text-xs animate-spin">⏳</span>
                ) : (
                  <span className="text-white text-xs">✏️</span>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleDpChange}
              />
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900">{user?.name}</h2>
              <p className="text-sm text-gray-400">{user?.phone}</p>
              <span className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                user?.role === 'shop'
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {user?.role === 'shop' ? '🏪 Dukandaar' : '🛍️ Khareedar'}
              </span>
            </div>
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Email</span>
                <span className="font-medium text-gray-700">{user?.email || 'Not set'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Member since</span>
                <span className="font-medium text-gray-700">
                  {new Date(user?.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Delivery Address Card ── */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4">

          <div>
            <h2 className="font-black text-gray-900">📍 Delivery Address</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Sahi delivery charge ke liye location zaroori hai
            </p>
          </div>

          {/* GPS Status Banner */}
          <div className={`rounded-2xl p-3 flex items-center justify-between gap-2 ${
            locationSet
              ? 'bg-green-50 border border-green-100'
              : 'bg-orange-50 border border-orange-100'
          }`}>
            <p className={`text-xs font-bold flex-1 ${
              locationSet ? 'text-green-700' : 'text-orange-700'
            }`}>
              {locationSet
                ? `✅ ${Number(addressForm.lat).toFixed(4)}, ${Number(addressForm.lng).toFixed(4)}`
                : '⚠️ Location set nahi — delivery charge sahi nahi hoga'
              }
            </p>
            <button
              onClick={handleAutoDetect}
              disabled={detectingLocation}
              className="text-xs bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg active:scale-95 disabled:opacity-60 whitespace-nowrap flex-shrink-0"
            >
              {detectingLocation ? '📡 Detecting...' : '📡 Auto Detect'}
            </button>
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Full Address
            </label>
            <textarea
              value={addressForm.fullAddress}
              onChange={(e) => setAddressForm(p => ({ ...p, fullAddress: e.target.value }))}
              rows={2}
              placeholder="Gali no. 5, Near xyz market..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
            />
          </div>

          {/* City + Pincode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                City
              </label>
              <input
                type="text"
                value={addressForm.city}
                onChange={(e) => setAddressForm(p => ({ ...p, city: e.target.value }))}
                placeholder="Bhopal"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Pincode
              </label>
              <input
                type="text"
                value={addressForm.pincode}
                onChange={(e) => setAddressForm(p => ({ ...p, pincode: e.target.value }))}
                placeholder="462001"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveAddress}
            disabled={addressSaving}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {addressSaving && (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {addressSaving ? 'Saving...' : 'Save Address'}
          </button>
        </div>

        {/* ── Quick Links ── */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          {[
            { href: '/orders', emoji: '📦', label: 'My Orders', desc: 'Order history dekho' },
            { href: '/feed', emoji: '🏪', label: 'Browse Shops', desc: 'Shops explore karo' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-3 px-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-all"
            >
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <span className="text-gray-300">→</span>
            </Link>
          ))}
        </div>

        {/* ── Favourite Shops ── */}
        {favourites.length > 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 p-4">
            <h2 className="font-black text-gray-900 text-sm mb-3">❤️ Favourite Shops</h2>
            <div className="space-y-2">
              {favourites.map((fav) => (
                <Link
                  key={fav._id}
                  href={`/shop/${fav.shopId?.slug}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl border border-gray-100 flex-shrink-0">
                    {fav.shopId?.logo ? (
                      <img src={fav.shopId.logo} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      categoryEmoji[fav.shopId?.category] || '🏪'
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{fav.shopId?.shopName}</p>
                    <p className="text-xs text-gray-400">{fav.shopId?.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    fav.shopId?.isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {fav.shopId?.isOpen ? 'Open' : 'Closed'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Logout ── */}
        <button
          onClick={logoutUser}
          className="w-full py-4 bg-white border border-red-200 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all active:scale-95"
        >
          🚪 Logout
        </button>

      </div>

      <BottomNav />
    </div>
  );
}