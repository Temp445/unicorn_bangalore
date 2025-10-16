'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result.success && result.user) {
        setError('');
        if (result.user.role === 'ADMIN') {
          router.push('/admin');
        } 
        else {
          router.push('/');
        }
      } else {
        setError(result.error ?? 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        {error && (
          <p className="text-center text-sm mb-4 text-green-500">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#071520] text-white py-2 rounded-lg hover:bg-[#0c2c2c]"
          >
            {isLoading ? 'Login...' : 'Login'}
          </button>

        </form>
         <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#0c2c2c] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;