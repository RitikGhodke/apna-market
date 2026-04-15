// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';
// import { CATEGORIES } from '@/utils/constants';

// export default function Home() {
//   const router = useRouter();
//   const { isAuthenticated, user } = useAuth();

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       if (user.role === 'shop') {
//         router.push('/dashboard');
//       } else {
//         router.push('/feed');
//       }
//     }
//   }, [isAuthenticated, user]);

//   return (
//     <main className="min-h-screen bg-white">

//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
//         <div className="page-container flex items-center justify-between h-16">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
//               <span className="text-white text-sm font-bold">A</span>
//             </div>
//             <span className="font-heading font-bold text-xl text-gray-900">
//               Apna Market
//             </span>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link href="/auth/login"
//               className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
//               Login
//             </Link>
//             <Link href="/auth/signup"
//               className="btn-primary btn-sm text-sm">
//               Get Started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="pt-28 pb-16 px-4">
//         <div className="page-container">
//           <div className="max-w-3xl mx-auto text-center animate-fadeIn">

//             <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
//               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//               Local shops, doorstep delivery
//             </div>

//             <h1 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6 leading-tight">
//               Apni{' '}
//               <span className="gradient-text">Local Dukaan</span>
//               {' '}Ab Online
//             </h1>

//             <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
//               Neighbourhood ki shops se order karo — kirana, dairy, medical, food aur bahut kuch.
//               Dukandaar? Apni shop 2 minute mein online karo.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link href="/auth/signup?role=customer"
//                 className="btn-primary btn-lg w-full sm:w-auto flex items-center justify-center gap-2">
//                 🛍️ Shop karo
//               </Link>
//               <Link href="/auth/signup?role=shop"
//                 className="btn-secondary btn-lg w-full sm:w-auto flex items-center justify-center gap-2">
//                 🏪 Apni Shop Kholein
//               </Link>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-12 bg-gray-50">
//         <div className="page-container">
//           <h2 className="text-2xl font-heading font-bold text-center text-gray-900 mb-8">
//             Kya chahiye aapko?
//           </h2>
//           <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
//             {CATEGORIES.map((cat) => (
//               <Link
//                 key={cat.id}
//                 href={`/auth/signup?role=customer`}
//                 className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer">
//                 <span className="text-3xl">{cat.emoji}</span>
//                 <span className="text-xs font-medium text-gray-600">{cat.label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How it works */}
//       <section className="py-16">
//         <div className="page-container">
//           <h2 className="text-3xl font-heading font-bold text-center text-gray-900 mb-4">
//             Kaise kaam karta hai?
//           </h2>
//           <p className="text-center text-gray-500 mb-12">3 simple steps mein shuru karo</p>

//           <div className="grid md:grid-cols-2 gap-12">

//             {/* Customer side */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <span className="text-2xl">🛍️</span>
//                 <h3 className="text-xl font-heading font-bold text-gray-900">Khareedar ke liye</h3>
//               </div>
//               {[
//                 { step: '01', title: 'Signup karo', desc: 'Phone number se 30 second mein account banao', emoji: '📱' },
//                 { step: '02', title: 'Shop dhundo', desc: 'Nearby shops browse karo ya product search karo', emoji: '🔍' },
//                 { step: '03', title: 'Order karo', desc: 'Cart mein add karo aur doorstep delivery pao', emoji: '📦' },
//               ].map((item) => (
//                 <div key={item.step} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all">
//                   <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <span className="text-lg">{item.emoji}</span>
//                   </div>
//                   <div>
//                     <div className="text-xs font-bold text-green-600 mb-1">STEP {item.step}</div>
//                     <div className="font-semibold text-gray-900">{item.title}</div>
//                     <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Shop owner side */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <span className="text-2xl">🏪</span>
//                 <h3 className="text-xl font-heading font-bold text-gray-900">Dukandaar ke liye</h3>
//               </div>
//               {[
//                 { step: '01', title: 'Shop register karo', desc: 'Category select karo aur shop auto-create ho jaegi', emoji: '✍️' },
//                 { step: '02', title: 'Products add karo', desc: 'Photos, price aur stock set karo', emoji: '📦' },
//                 { step: '03', title: 'Orders receive karo', desc: 'Real-time notifications aur easy order management', emoji: '🔔' },
//               ].map((item) => (
//                 <div key={item.step} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all">
//                   <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <span className="text-lg">{item.emoji}</span>
//                   </div>
//                   <div>
//                     <div className="text-xs font-bold text-orange-500 mb-1">STEP {item.step}</div>
//                     <div className="font-semibold text-gray-900">{item.title}</div>
//                     <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-16 bg-gray-50">
//         <div className="page-container">
//           <h2 className="text-3xl font-heading font-bold text-center text-gray-900 mb-12">
//             Kyun Apna Market?
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { emoji: '🌐', title: 'Apni Website', desc: 'Har dukaan ko milti hai apni professional website — bilkul Amazon jaisi', color: 'green' },
//               { emoji: '🔍', title: 'Smart Search', desc: 'Same product multiple shops mein — price + delivery ke saath compare karo', color: 'blue' },
//               { emoji: '💳', title: 'Udhar System', desc: 'Digital udhar book — customer wise track karo, kabhi kuch bhulo mat', color: 'purple' },
//               { emoji: '📊', title: 'Analytics', desc: 'Daily sales, top products, customers — sab ek jagah', color: 'amber' },
//               { emoji: '🚚', title: 'Smart Delivery', desc: 'Distance based delivery charges — ₹100+ orders pe free delivery', color: 'red' },
//               { emoji: '🔔', title: 'Real-time Alerts', desc: 'Naya order aaye to turant notification — kabhi order miss mat karo', color: 'teal' },
//             ].map((feature) => (
//               <div key={feature.title} className="card p-6 hover:shadow-md transition-all">
//                 <div className="text-3xl mb-4">{feature.emoji}</div>
//                 <h3 className="font-heading font-bold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 bg-green-600">
//         <div className="page-container text-center">
//           <h2 className="text-4xl font-heading font-bold text-white mb-4">
//             Shuru karo aaj se!
//           </h2>
//           <p className="text-green-100 text-lg mb-10">
//             Hazar se zyada local shops already Apna Market pe hain
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link href="/auth/signup?role=customer"
//               className="bg-white text-green-600 font-bold py-4 px-8 rounded-2xl hover:bg-green-50 transition-all active:scale-95 w-full sm:w-auto">
//               🛍️ Abhi Order Karo
//             </Link>
//             <Link href="/auth/signup?role=shop"
//               className="border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/10 transition-all active:scale-95 w-full sm:w-auto">
//               🏪 Free mein Shop Kholein
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 border-t border-gray-100">
//         <div className="page-container text-center">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
//               <span className="text-white text-xs font-bold">A</span>
//             </div>
//             <span className="font-heading font-bold text-gray-900">Apna Market</span>
//           </div>
//           <p className="text-sm text-gray-400">© 2026 Apna Market. Local se Door tak.</p>
//         </div>
//       </footer>

//     </main>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const CATEGORIES = [
  { id: 'kirana', label: 'Kirana', emoji: '🛒', bg: 'from-green-400 to-emerald-600', light: 'bg-green-50' },
  { id: 'dairy', label: 'Dairy', emoji: '🥛', bg: 'from-blue-400 to-sky-600', light: 'bg-blue-50' },
  { id: 'fruits', label: 'Fruits', emoji: '🍎', bg: 'from-red-400 to-rose-600', light: 'bg-red-50' },
  { id: 'food', label: 'Food', emoji: '🍱', bg: 'from-orange-400 to-amber-600', light: 'bg-orange-50' },
  { id: 'medical', label: 'Medical', emoji: '💊', bg: 'from-purple-400 to-violet-600', light: 'bg-purple-50' },
  { id: 'fashion', label: 'Fashion', emoji: '👗', bg: 'from-pink-400 to-fuchsia-600', light: 'bg-pink-50' },
  { id: 'electronics', label: 'Electronics', emoji: '📱', bg: 'from-cyan-400 to-teal-600', light: 'bg-cyan-50' },
];

const FEATURES = [
  { emoji: '🌐', title: 'Apni Website', desc: 'Har dukaan ko milti hai professional website — bilkul Amazon jaisi feel', color: 'green' },
  { emoji: '🔍', title: 'Smart Search', desc: 'Same product multiple shops mein compare karo — price + delivery ke saath', color: 'blue' },
  { emoji: '💳', title: 'Udhar Book', desc: 'Digital udhar track karo — customer wise, kabhi kuch mat bhulo', color: 'purple' },
  { emoji: '📊', title: 'Analytics', desc: 'Daily sales, top products, customers — sab ek dashboard pe', color: 'amber' },
  { emoji: '🚚', title: 'Smart Delivery', desc: 'Distance based charges — ₹100+ orders pe free delivery automatic', color: 'rose' },
  { emoji: '🔔', title: 'Live Alerts', desc: 'Naya order aate hi turant notification — ek bhi order miss mat karo', color: 'teal' },
];

const STATS = [
  { value: '10,000+', label: 'Local Shops' },
  { value: '5 Min', label: 'Setup Time' },
  { value: '0%', label: 'Commission' },
  { value: '24/7', label: 'Support' },
];

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'shop') router.push('/dashboard');
      else router.push('/feed');
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
              <span className="text-white font-bold text-base">A</span>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Apna Market</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2 rounded-xl hover:bg-gray-100 transition-all">
              Login
            </Link>
            <Link href="/auth/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-green-200 hover:shadow-green-300 active:scale-95">
              Get Started →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100 rounded-full opacity-40 blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100 rounded-full opacity-30 blur-3xl translate-y-1/2 -translate-x-1/4"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">

          <div className="inline-flex items-center gap-2 bg-white border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm animate-fadeIn">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Local shops, doorstep delivery
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight animate-slideUp">
            Apni Local Dukaan<br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                Ab Online! 🚀
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-green-100 rounded-full -z-0"></div>
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeIn">
            Neighbourhood ki shops se order karo — kirana, dairy, medical, food aur bahut kuch.
            <strong className="text-gray-700"> Dukandaar ho? Apni shop 2 minute mein online karo — free mein!</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slideUp">
            <Link href="/auth/signup?role=customer"
              className="group relative bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-2xl shadow-green-300 hover:shadow-green-400 active:scale-95 w-full sm:w-auto text-lg flex items-center justify-center gap-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">🛍️</span>
              Shop Karo — Free
            </Link>
            <Link href="/auth/signup?role=shop"
              className="group bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all active:scale-95 w-full sm:w-auto text-lg flex items-center justify-center gap-3 shadow-lg">
              <span className="text-2xl group-hover:scale-110 transition-transform">🏪</span>
              Apni Shop Kholein
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fadeIn">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-xs text-gray-400 font-medium">Scroll karo</div>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        </div>

      </section>

      {/* Categories */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-3">Kya chahiye aapko?</h2>
            <p className="text-gray-400">7 categories, hazaron products</p>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} href="/auth/signup?role=customer"
                className="group flex flex-col items-center gap-3 cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${cat.bg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}>
                  <span className="text-3xl">{cat.emoji}</span>
                </div>
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-50 text-green-700 text-sm font-bold px-4 py-2 rounded-full mb-4">HOW IT WORKS</div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">3 Steps mein shuru karo</h2>
            <p className="text-gray-500">Khareedar ho ya Dukandaar — sab ke liye easy hai</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* Customer */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
                  <span className="text-2xl">🛍️</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-green-600 uppercase tracking-wider">For Buyers</div>
                  <h3 className="text-xl font-black text-gray-900">Khareedar ke liye</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Signup karo', desc: 'Phone number se 30 second mein account banao', emoji: '📱' },
                  { step: '02', title: 'Shop ya Product dhundo', desc: 'Nearby shops browse karo ya direct product search karo', emoji: '🔍' },
                  { step: '03', title: 'Order karo', desc: 'Cart mein add karo aur ghar pe delivery pao', emoji: '📦' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-green-100 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-green-500 mb-0.5">STEP {item.step}</div>
                      <div className="font-bold text-gray-900 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                    <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{item.step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shop Owner */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 border border-orange-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                  <span className="text-2xl">🏪</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-wider">For Sellers</div>
                  <h3 className="text-xl font-black text-gray-900">Dukandaar ke liye</h3>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Shop register karo', desc: 'Category select karo — apni website turant ready', emoji: '✍️' },
                  { step: '02', title: 'Products add karo', desc: 'Photos, price aur stock set karo — 2 minute mein', emoji: '📦' },
                  { step: '03', title: 'Orders receive karo', desc: 'Live notifications — kabhi ek bhi order miss mat karo', emoji: '🔔' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-orange-100 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">{item.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-orange-500 mb-0.5">STEP {item.step}</div>
                      <div className="font-bold text-gray-900 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                    <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{item.step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-full mb-4">FEATURES</div>
            <h2 className="text-4xl font-black text-gray-900 mb-3">Kyun Apna Market?</h2>
            <p className="text-gray-500">Jo cheezein hamare competitors nahi dete</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className="group bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform text-3xl">
                  {f.emoji}
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Split CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-3">Aap kaunse ho?</h2>
            <p className="text-gray-500">Dono ke liye alag alag experience</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            <Link href="/auth/signup?role=customer"
              className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-green-200 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative">
                <div className="text-5xl mb-4">🛍️</div>
                <h3 className="text-2xl font-black mb-2">Khareedar</h3>
                <p className="text-green-100 text-sm mb-6">Local shops se order karo, ghar pe pao</p>
                <div className="space-y-2 mb-6">
                  {['Nearby shops browse karo', 'Best price compare karo', 'Track orders live'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-green-100">
                      <span className="text-white">✓</span> {item}
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-6 py-3 rounded-xl group-hover:gap-3 transition-all">
                  Abhi Sign Up Karo <span>→</span>
                </div>
              </div>
            </Link>

            <Link href="/auth/signup?role=shop"
              className="group relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white hover:shadow-2xl hover:shadow-gray-300 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative">
                <div className="text-5xl mb-4">🏪</div>
                <h3 className="text-2xl font-black mb-2">Dukandaar</h3>
                <p className="text-gray-400 text-sm mb-6">Apni shop online karo, zyada customers pao</p>
                <div className="space-y-2 mb-6">
                  {['Apni website milegi', 'Real-time orders aayenge', 'Udhar book digital hogi'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-green-400">✓</span> {item}
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-xl group-hover:gap-3 transition-all group-hover:bg-green-400">
                  Free mein Kholein <span>→</span>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #16a34a 0%, transparent 70%)' }}>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-5xl font-black text-white mb-4 leading-tight">
            Shuru karo aaj se —<br />
            <span className="text-green-400">bilkul free!</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Hazar se zyada local shops already Apna Market pe hain. Tumhari baari hai.
          </p>
          <Link href="/auth/signup"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-black text-xl py-5 px-10 rounded-2xl transition-all shadow-2xl shadow-green-900 hover:shadow-green-800 active:scale-95">
            Abhi Shuru Karo
            <span className="text-2xl">→</span>
          </Link>
          <p className="text-gray-600 text-sm mt-6">No credit card required • Free forever for small shops</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="font-bold text-white">Apna Market</span>
            <span className="text-gray-600 text-sm">— Local se Door tak</span>
          </div>
          <p className="text-sm text-gray-600">© 2026 Apna Market. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}