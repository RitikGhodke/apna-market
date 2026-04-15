'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import DashboardNav from '@/components/common/DashboardNav';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (user && user.role !== 'shop') {
      router.push('/feed');
    }
  }, [isAuthenticated, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      {/* Desktop: margin left for sidebar */}
      <main className="lg:ml-64 pb-24 lg:pb-0">
        {children}
      </main>
    </div>
  );
}