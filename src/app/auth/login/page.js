'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.phone, formData.password);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-950 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        <Link href="/" className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-lg">A</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Apna Market</span>
        </Link>

        <div className="relative">
          <div className="text-5xl mb-6">👋</div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Wapas aao!
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Apne account mein login karo aur wahan se shuru karo jahan chhoda tha.
          </p>
          <div className="space-y-4">
            {[
              { icon: '🚀', text: 'Fast aur secure login' },
              { icon: '🔒', text: 'Tumhara data safe hai' },
              { icon: '📱', text: 'Mobile aur desktop dono pe kaam karta hai' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-gray-600 text-sm">
          © 2026 Apna Market · Local se Door tak
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="font-bold text-gray-900">Apna Market</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-900 mb-1">Login karo</h1>
            <p className="text-gray-500 text-sm">Phone number aur password se login karo</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="flex">
                <div className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-500 font-medium flex items-center">
                  🇮🇳 +91
                </div>
                <input type="tel" name="phone" value={formData.phone}
                  onChange={handleChange} placeholder="10 digit number"
                  required maxLength={10}
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-r-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Password
                </label>
               
                <Link
      href="/auth/forgot-password"
      className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-all"
    >
      Forgot Password?
    </Link>

              </div>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} name="password"
                  value={formData.password} onChange={handleChange}
                  placeholder="Apna password" required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium">
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 shadow-lg text-sm mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Login ho raha hai...
                </>
              ) : 'Login Karo →'}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Naya account chahiye?{' '}
            <Link href="/auth/signup" className="text-gray-900 font-semibold hover:underline">
              Sign up karo
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}