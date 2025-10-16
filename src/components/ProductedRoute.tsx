'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { TriangleAlert } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    setIsChecking(false);

    if (!user) {
      return;
    }

  }, [user, loading, isAdmin, router]);

  if (isChecking || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
    </div>
    );
  }

  if (user && isAdmin) {
    return <>{children}</>;
  }

  return (
  <div className="min-h-screen flex flex-col items-center justify-center  text-gray-700 px-4 relative overflow-hidden">

  <div className="max-w-md w-full text-center relative">
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-12 border border-black/40 ">
      <div className="mb-6 relative">
        <div className="relative inline-flex items-center justify-center w-20 h-20 transform hover:scale-110 transition-transform duration-300">
          <TriangleAlert className='w-16 h-16 text-red-500 anima' />
        </div>
      </div>

      <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-red-500 bg-clip-text text-transparent">
        Access Denied
      </h1>
      
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        You don't have permission to view this page. Only site administrators can access this area.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8">
        <p className="text-sm text-black">
          <strong>Need access?</strong> Contact your system administrator.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => router.push('/')}
          className="group relative px-8 py-3 text-black border hover:border-0  hover:bg-emerald-700 hover:text-white rounded font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Return Home</span>
        </button>
        
      </div>
    </div>

  </div>
</div>
  );
};

export default AdminProtectedRoute;