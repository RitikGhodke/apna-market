// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const navItems = [
//   { href: '/feed', icon: '🏠', label: 'Home' },
//   { href: '/search', icon: '🔍', label: 'Search' },
//   { href: '/cart', icon: '🛒', label: 'Cart' },
//   { href: '/orders', icon: '📦', label: 'Orders' },
//   { href: '/profile', icon: '👤', label: 'Profile' },
// ];

// export default function BottomNav() {
//   const pathname = usePathname();

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe">
//       <div className="flex items-center justify-around px-2 py-2">
//         {navItems.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link key={item.href} href={item.href}
//               className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
//                 isActive ? 'bg-green-50' : 'hover:bg-gray-50'
//               }`}>
//               <span className="text-xl">{item.icon}</span>
//               <span className={`text-xs font-semibold ${
//                 isActive ? 'text-green-600' : 'text-gray-400'
//               }`}>{item.label}</span>
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }






'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/feed',    icon: '🏠', label: 'Home'   },
  { href: '/search',  icon: '🔍', label: 'Search' },
  { href: '/cart',    icon: '🛒', label: 'Cart'   },
  { href: '/orders',  icon: '📦', label: 'Orders' },
  { href: '/profile', icon: '👤', label: 'Profile'},
  { href: '/udhar', icon: '💳', label: 'udhar'},
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe">
      <div className="flex items-center justify-around px-1 py-1.5">
        {navItems.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all ${
                active ? 'bg-green-50' : 'hover:bg-gray-50'
              }`}>
              <span className="text-lg leading-none">{icon}</span>
              <span className={`text-[10px] font-semibold ${active ? 'text-green-600' : 'text-gray-400'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}