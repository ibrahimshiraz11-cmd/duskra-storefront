import { useState } from 'react'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../context/ProductsContext'

export default function Shop() {
  const { products, loading } = useProducts()
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))]
  const [active, setActive] = useState('All')

  const list = active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <div className="px-3 md:px-5 pt-3 md:pt-5">
      <div className="rounded-[1.5rem] md:rounded-[3rem] bg-gradient-to-br from-[#dfe3ea] via-[#eceef1] to-[#e3ddd3] overflow-hidden">
        <Navbar />
        <div className="px-6 md:px-14 pt-6 pb-16 md:pt-10 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-[rgba(196,106,78,1)] mb-3"
          >
            <span className="w-6 h-px bg-[rgba(196,106,78,1)]" /> Full collection
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(32px,5vw,54px)] font-medium tracking-tight text-[#2b3040] mb-3"
          >
            The Shelf
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#5b6070] max-w-[440px]"
          >
            Every object currently in stock, hand-checked before it ships from Karachi.
          </motion.p>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto py-12 md:py-16">
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4.5 py-2 rounded-full text-[12.5px] border transition-colors ${
                active === c
                  ? 'bg-[rgba(30,50,90,0.9)] text-white border-[rgba(30,50,90,0.9)]'
                  : 'bg-white/50 border-white/70 text-[rgba(30,50,90,0.6)] hover:bg-white/80'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            <div className="col-span-full text-center py-16 text-[#8b90a0] text-sm">
              Loading the shelf…
            </div>
          ) : (
            list.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </div>
    </div>
  )
}
