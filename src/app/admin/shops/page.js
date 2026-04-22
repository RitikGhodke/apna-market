'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '@/services/api';
import toast from 'react-hot-toast';

export default function AdminShopsPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toggling, setToggling] = useState(null);

  useEffect(() => { loadShops(); }, []);

  const loadShops = async () => {
    try {
      const res = await API.get('/admin/shops');
      setShops(res.data.shops || []);
    } catch { toast.error('Load failed!'); }
    finally { setLoading(false); }
  };

  const handleToggle = async (id) => {
    setToggling(id);
    try {
      const res = await API.put(`/admin/shop/${id}/toggle`);
      toast.success(res.data.message);
      loadShops();
    } catch { toast.error('Toggle failed!'); }
    finally { setToggling(null); }
  };

  const filtered = shops.filter(s =>
    s.shopName?.toLowerCase().includes(search.toLowerCase()) ||
    s.ownerId?.phone?.includes(search)
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Shops 🏪</h1>
        <p className="text-gray-400 text-sm mt-0.5">{shops.length} total shops</p>
      </div>

      <input type="text" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Shop name ya phone se search..."
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-200 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(shop => (
            <div key={shop._id} className={`bg-white rounded-2xl border p-4 ${!shop.isActive ? 'border-red-100 opacity-70' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {shop.logo
                    ? <img src={shop.logo} className="w-full h-full object-cover" />
                    : <span className="text-2xl">🏪</span>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-gray-900 truncate">{shop.shopName}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      shop.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>
                      {shop.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{shop.ownerId?.phone} • {shop.category}</p>
                  <p className="text-xs text-gray-400">{shop.address?.city}</p>
                </div>
                <button
                  onClick={() => handleToggle(shop._id)}
                  disabled={toggling === shop._id}
                  className={`text-xs font-bold px-3 py-2 rounded-xl flex-shrink-0 transition-all active:scale-95 ${
                    shop.isActive
                      ? 'bg-red-50 text-red-600 border border-red-100'
                      : 'bg-green-50 text-green-600 border border-green-100'
                  }`}>
                  {toggling === shop._id ? '...' : shop.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}