import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/');
  };

  const handleForgotPassword = async () => {
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });
    if (error) setError(error.message);
    else setError('Password reset email sent. Check your inbox.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-2 rounded-full">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Hello</h1>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@email.com"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <a href="#" onClick={handleForgotPassword} className="text-sm text-pink-500 hover:underline block text-right">Forgot your Password?</a>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white p-2 rounded-full hover:opacity-90">
            SIGN IN
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account? <Link href="/signup" className="text-pink-500 hover:underline">Create</Link>
        </p>
      </div>
    </div>
  );
}
