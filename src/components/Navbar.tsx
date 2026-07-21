import { motion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, ShoppingBag, Menu } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const { count, openCart } = useCart()
  const { openMenu } = useUI()
  const location = useLocation()

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-20">
      <div className="flex-1 hidden md:block" />

      <ul className="hidden md:flex items-center gap-8 text-[rgb(45,45,45)] font-normal text-sm">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className={`cursor-pointer transition-opacity flex items-center gap-1 ${
                location.pathname === item.to ? 'opacity-100 font-medium' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/" className="md:hidden">
        <span className="font-regular tracking-tighter text-xl text-[rgba(30,50,90,0.9)]">
          Duskra
        </span>
      </Link>

      <div className="flex-1 flex justify-end items-center gap-3">
        <Link to="/shop" className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center bg-[rgba(30,50,90,0.8)] text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-[rgba(30,50,90,1)] transition-colors group"
          >
            <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-xs md:text-sm font-normal">Shop the Collection</span>
          </motion.button>
        </Link>

        <button
          onClick={openCart}
          aria-label="Open cart"
          className="relative w-10 h-10 rounded-full bg-white/50 border border-white/60 backdrop-blur-md flex items-center justify-center hover:bg-white/70 transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-[rgba(30,50,90,0.9)]" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-[rgba(196,106,78,1)] text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>

        <button
          onClick={openMenu}
          aria-label="Open menu"
          className="md:hidden w-10 h-10 rounded-full bg-white/50 border border-white/60 backdrop-blur-md flex items-center justify-center"
        >
          <Menu className="w-4 h-4 text-[rgba(30,50,90,0.9)]" />
        </button>
      </div>
    </nav>
  )
}
