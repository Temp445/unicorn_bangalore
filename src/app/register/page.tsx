'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('/api/register', form);
      setMessage(res.data.message || 'Registration successful!');
      setForm({ name: '', email: '', password: '' });
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>
        {message && (
          <p className="text-center text-sm mb-4 text-green-500">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#071520] text-white py-2 rounded-lg hover:bg-[#0c2c2c]"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
           <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-[#0c2c2c] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
