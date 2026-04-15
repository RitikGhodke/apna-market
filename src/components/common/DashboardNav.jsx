'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { href: '/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/dashboard/orders', icon: '📦', label: 'Orders' },
  { href: '/dashboard/products', icon: '🏷️', label: 'Products' },
  { href: '/dashboard/customers', icon: '👥', label: 'Customers' },
  { href: '/dashboard/udhar', icon: '💳', label: 'Udhar' },
  { href: '/dashboard/settings', icon: '⚙️', label: 'Settings' },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const { user, shop, logoutUser } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gray-950 min-h-screen fixed left-0 top-0 z-50">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="text-white font-bold text-base">Apna Market</span>
          </Link>
        </div>

        {/* Shop Info */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              🏪
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">{shop?.shopName || 'My Shop'}</p>
              <p className="text-gray-400 text-xs truncate">{shop?.category}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${shop?.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-xs text-gray-400">{shop?.isOpen ? 'Shop Open' : 'Shop Closed'}</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}>
                <span className="text-lg">{item.icon}</span>
                <span className="font-semibold text-sm">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="px-3 py-4 border-t border-gray-800 space-y-2">
          <Link href={`/shop/${shop?.slug}`} target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
            <span className="text-lg">🌐</span>
            <span className="font-semibold text-sm">View Shop</span>
          </Link>
          <button onClick={logoutUser}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
            <span className="text-lg">🚪</span>
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800 z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                  isActive ? 'text-green-400' : 'text-gray-500'
                }`}>
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}