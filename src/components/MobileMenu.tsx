import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useUI } from '../context/UIContext'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
]

export default function MobileMenu() {
  const { isMenuOpen, closeMenu } = useUI()
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.45, ease: [0.6, 0, 0.2, 1] }}
          className="fixed inset-3 z-50 rounded-3xl bg-white/95 backdrop-blur-xl flex flex-col items-start justify-center gap-8 px-10"
        >
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[rgba(30,50,90,0.06)] flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[rgba(30,50,90,0.9)]" />
          </button>
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={closeMenu}
              className="text-4xl font-normal text-[rgba(30,50,90,0.95)] tracking-tight"
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
