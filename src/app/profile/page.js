'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import API from '@/services/api';
import BottomNav from '@/components/common/BottomNav';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setFormData({ name: user?.name || '', email: user?.email || '' });
    loadFavourites();
  }, [isAuthenticated, user]);

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

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const categoryEmoji = {
    kirana: '🛒', dairy: '🥛', fruits: '🍎',
    food: '🍱', medical: '💊', fashion: '👗', electronics: '📱',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900">Profile</h1>
          <button onClick={() => setEditing(!editing)}
            className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl">
            {editing ? 'Cancel' : 'Edit ✏️'}
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xl">{getInitials(user?.name)}</span>
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
                <input type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input type="email" value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
              </div>
              <button type="submit"
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl transition-all active:scale-95">
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

        {/* Quick Links */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          {[
            { href: '/orders', emoji: '📦', label: 'My Orders', desc: 'Order history dekho' },
            { href: '/feed', emoji: '🏪', label: 'Browse Shops', desc: 'Shops explore karo' },
          ].map((item, i) => (
            <Link key={i} href={item.href}
              className="flex items-center gap-3 px-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-all">
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

        {/* Favourite Shops */}
        {favourites.length > 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 p-4">
            <h2 className="font-black text-gray-900 text-sm mb-3">❤️ Favourite Shops</h2>
            <div className="space-y-2">
              {favourites.map((fav) => (
                <Link key={fav._id} href={`/shop/${fav.shopId?.slug}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
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

        {/* Logout */}
        <button onClick={logoutUser}
          className="w-full py-4 bg-white border border-red-200 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all active:scale-95">
          🚪 Logout
        </button>

      </div>

      <BottomNav />
    </div>
  );
}