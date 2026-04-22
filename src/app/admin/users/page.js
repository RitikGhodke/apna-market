'use client';

import { useState, useEffect } from 'react';
import API from '@/services/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data.users || []);
    } catch { console.log('Load failed'); }
    finally { setLoading(false); }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.includes(search)
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Users 👥</h1>
        <p className="text-gray-400 text-sm mt-0.5">{users.length} total customers</p>
      </div>

      <input type="text" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Name ya phone se search..."
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(user => (
            <div key={user._id} className="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                <p className="text-xs text-gray-400">{user.phone}</p>
              </div>
              <p className="text-xs text-gray-400 flex-shrink-0">
                {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}