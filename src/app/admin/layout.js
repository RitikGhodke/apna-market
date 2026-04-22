'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isRestoring } = useAuth();

  useEffect(() => {
    if (isRestoring) return;
    if (!isAuthenticated) { router.push('/auth/login'); return; }
    if (user && user.role !== 'admin') { router.push('/feed'); return; }
  }, [isAuthenticated, user, isRestoring]);

  if (isRestoring) return null;
  if (!user || user.role !== 'admin') return null;

  const NAV = [
    { href: '/admin', label: '📊 Overview', exact: true },
    { href: '/admin/subscriptions', label: '💰 Subscriptions' },
    { href: '/admin/shops', label: '🏪 Shops' },
    { href: '/admin/users', label: '👥 Users' },
  ];

  const isActive = (href, exact) => exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-gray-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">A</span>
          </div>
          <span className="text-white font-black text-sm">Admin Panel</span>
        </div>
        <span className="text-gray-400 text-xs">{user?.name}</span>
      </div>

      {/* Nav Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 overflow-x-auto">
        <div className="flex gap-1 py-2">
          {NAV.map(item => (
            <Link key={item.href} href={item.href}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive(item.href, item.exact)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="p-4 lg:p-6">
        {children}
      </main>
    </div>
  );
}