
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AdminProtectedRoute from '@/components/ProductedRoute'

const admin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <AdminProtectedRoute>
        <Navbar />
        {children}
        <Footer />
      </AdminProtectedRoute>
    </div>
  )
}

export default admin