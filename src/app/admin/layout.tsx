
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AdminProtectedRoute from '@/components/ProductedRoute'
import Sidebar from '@/components/Sidebar';

const admin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <AdminProtectedRoute>
        <div className="flex flex-col lg:flex-row min-h-screen container mx-auto">
        <Sidebar/>
        <main className="flex-1 overflow-auto mt-5 md:mt-0 ">
          {children}
        </main>
      </div>
      </AdminProtectedRoute>
    </div>
  )
}

export default admin