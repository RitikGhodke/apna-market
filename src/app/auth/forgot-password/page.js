'use client';
import { useState } from 'react';
import Link from 'next/link';
import { forgotPasswordService } from '@/services/authService';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPasswordService(email);
      setSent(true);
      toast.success('Reset link bhej diya!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error aaya!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">A</span>
          </div>
          <span className="font-bold text-gray-900">Apna Market</span>
        </div>

        {sent ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">Email bhej diya!</h2>
            <p className="text-sm text-gray-500 mb-6">
              <span className="font-bold text-gray-900">{email}</span> pe reset link bheja hai. 15 minutes mein expire hoga.
            </p>
            <Link href="/auth/login"
              className="text-sm text-gray-900 font-bold hover:underline">
              ← Login pe wapas jao
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-black text-gray-900 mb-1">Password bhool gaye?</h1>
              <p className="text-gray-500 text-sm">Email dalo — reset link bhejenge</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="apka@email.com" required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
                {loading ? (
                  <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>Bhej raha hai...</>
                ) : '📧 Reset Link Bhejo'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-5">
              <Link href="/auth/login" className="text-gray-900 font-semibold hover:underline">← Login pe wapas jao</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}