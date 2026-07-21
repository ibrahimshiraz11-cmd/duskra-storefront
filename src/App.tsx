import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { UIProvider } from './context/UIContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import CartDrawer from './components/CartDrawer'
import MobileMenu from './components/MobileMenu'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import About from './pages/About'
import AdminDashboard from './pages/admin/AdminDashboard'
import RequireAdmin from './pages/admin/RequireAdmin'

function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
      <CartDrawer />
      <MobileMenu />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <UIProvider>
        <AdminAuthProvider>
          <main className="min-h-screen bg-[#f0f0f0]">
            <Routes>
              <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
              <Route path="/shop" element={<StorefrontLayout><Shop /></StorefrontLayout>} />
              <Route path="/product/:id" element={<StorefrontLayout><Product /></StorefrontLayout>} />
              <Route path="/about" element={<StorefrontLayout><About /></StorefrontLayout>} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
            </Routes>
          </main>
        </AdminAuthProvider>
      </UIProvider>
    </CartProvider>
  )
}

export default App
