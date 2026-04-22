'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { resetPasswordService } from '@/services/authService';
import toast from 'react-hot-toast';

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) { toast.error('Passwords match nahi kar rahe!'); return; }
    if (password.length < 6) { toast.error('Password 6+ characters ka hona chahiye!'); return; }
    setLoading(true);
    try {
      await resetPasswordService(token, password);
      toast.success('Password reset ho gaya!');
      router.push('/auth/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Token expire ho gaya!');
    } finally {
      setLoading(false);
    }
  };

  if (!token) return (
    <div className="text-center py-4">
      <div className="text-5xl mb-4">❌</div>
      <p className="font-bold text-gray-900">Invalid link</p>
      <Link href="/auth/forgot-password" className="text-sm text-gray-500 mt-2 inline-block hover:underline">
        Dobara try karo
      </Link>
    </div>
  );

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">Naya Password Set Karo</h1>
        <p className="text-gray-500 text-sm">6+ characters ka strong password rakho</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Naya Password</label>
          <div className="relative">
            <input type={showPass ? 'text' : 'password'} value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6+ characters" required minLength={6}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all pr-12" />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm Password</label>
          <input type="password" value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Dobara likhao" required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 text-sm">
          {loading ? (
            <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>Reset ho raha hai...</>
          ) : '🔐 Password Reset Karo'}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">A</span>
          </div>
          <span className="font-bold text-gray-900">Apna Market</span>
        </div>
        <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}