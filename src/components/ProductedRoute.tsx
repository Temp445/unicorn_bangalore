'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface AdminProtectedRouteProps {
  children: ReactNode
}

const ProductedRoute = ({ children }: AdminProtectedRouteProps) => {

  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace('/')
    }
  }, [user, loading, isAdmin, router])

  if (loading) {
    return (
         <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-[#205057] border-t-transparent border-b-transparent rounded-full animate-spin"></div>
    </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }
  return <>{children}</>
}

export default ProductedRoute