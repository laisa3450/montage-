import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    if (!termsChecked) {
      setError('Please accept the terms and conditions');
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { first_name: firstName, last_name: lastName, mobile } } });
    if (error) setError(error.message);
    else router.push('/');
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
        <div className="flex items-center justify-center mb-4">
          <img src="/placeholder-profile.png" alt="Profile" className="w-16 h-16 rounded-full border-2 border-gray-300" />
          <button className="ml-2 text-pink-500">✚</button>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name*"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name*"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
              className="mr-2"
            />
            <span>I accept all terms and conditions</span>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white p-2 rounded-full hover:opacity-90">
            SIGN IN
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Or create account using social media
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-red-500"><i className="fab fa-google"></i></a>
          <a href="#" className="text-blue-500"><i className="fab fa-facebook"></i></a>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <Link href="/login" className="text-pink-500 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
