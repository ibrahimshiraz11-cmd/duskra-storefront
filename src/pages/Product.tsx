import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ChevronRight, Play } from 'lucide-react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { PRODUCTS, type Product as ProductType } from '../data/products'
import { useCart } from '../context/CartContext'

const fmt = (n: number) => 'Rs ' + n.toLocaleString('en-PK')

const ACCORDION = [
  {
    title: 'Shipping & delivery',
    body: 'Cash on delivery nationwide, dispatched from Karachi within 48 hours.',
  },
  {
    title: 'Materials & care',
    body: 'Hand-checked before dispatch. Keep away from direct heat.',
  },
  {
    title: 'Returns',
    body: '7-day return window on unopened items.',
  },
]

export default function Product() {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => p.id === id)
  const { addToCart, openCart } = useCart()
  const [openAcc, setOpenAcc] = useState<number | null>(null)

  if (!product) {
    return (
      <div className="px-3 md:px-5 pt-3 md:pt-5">
        <Navbar />
        <div className="text-center py-32">
          <h2 className="text-2xl text-[rgba(30,50,90,0.9)] mb-6">Object not found.</h2>
          <Link
            to="/shop"
            className="inline-flex bg-[rgba(30,50,90,0.9)] text-white rounded-full px-6 py-3 text-sm"
          >
            Back to shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-3 md:px-5 pt-3 md:pt-5">
      <Navbar />
      <div className="max-w-[1320px] mx-auto py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <ProductGallery product={product} />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-[12px] uppercase tracking-[0.1em] text-[rgba(196,106,78,1)] mb-2.5">
              {product.vendor}
            </div>
            <h1 className="text-[clamp(30px,4vw,44px)] font-medium tracking-tight text-[rgba(30,50,90,0.95)] mb-3">
              {product.name}
            </h1>
            <div className="text-xl font-semibold text-[rgba(30,50,90,0.9)] mb-6">
              {fmt(product.price)}
              {product.compareAt && (
                <span className="ml-2 text-[15px] font-normal opacity-50 line-through">
                  {fmt(product.compareAt)}
                </span>
              )}
            </div>
            <p className="text-[15px] leading-relaxed text-[rgba(30,50,90,0.6)] mb-7">
              {product.description}
            </p>
            <div className="flex items-center gap-2 text-[13px] text-[#3f8f5c] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3f8f5c]" />
              {product.stock} in stock — ships within 2 days
            </div>
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => addToCart(product.id)}
                className="bg-[rgba(30,50,90,0.9)] text-white rounded-full px-7 py-3.5 text-sm hover:bg-[rgba(30,50,90,1)] transition-colors"
              >
                Add to cart
              </button>
              <button
                onClick={() => {
                  addToCart(product.id)
                  openCart()
                }}
                className="bg-white/60 border border-white/70 text-[rgba(30,50,90,0.9)] rounded-full px-7 py-3.5 text-sm backdrop-blur-md hover:bg-white/80 transition-colors"
              >
                Buy now
              </button>
            </div>
            <div className="border-t border-[rgba(30,50,90,0.08)]">
              {ACCORDION.map((a, i) => (
                <div key={a.title} className="border-b border-[rgba(30,50,90,0.08)]">
                  <button
                    onClick={() => setOpenAcc(openAcc === i ? null : i)}
                    className="w-full flex justify-between items-center py-4 text-sm text-[rgba(30,50,90,0.9)]"
                  >
                    {a.title}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${openAcc === i ? 'rotate-90' : ''}`}
                    />
                  </button>
                  {openAcc === i && (
                    <p className="text-[13.5px] text-[rgba(30,50,90,0.55)] leading-relaxed pb-4">
                      {a.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-[rgba(196,106,78,1)] mb-2.5">
            <span className="w-6 h-px bg-[rgba(196,106,78,1)]" /> Pairs well with
          </div>
          <h2 className="text-[clamp(24px,3vw,34px)] font-medium tracking-tight text-[rgba(30,50,90,0.95)] mb-8">
            Complete the shelf.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.filter((p) => p.id !== product.id).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductGallery({ product }: { product: ProductType }) {
  const media = [
    { type: 'image' as const, src: product.image },
    ...product.gallery.map((src) => ({ type: 'image' as const, src })),
    ...(product.video ? [{ type: 'video' as const, src: product.video }] : []),
  ]
  const [active, setActive] = useState(0)
  const current = media[active] ?? media[0]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full rounded-[1.6rem] aspect-[4/5] overflow-hidden bg-[#e3ddd3] relative">
        {current.type === 'video' ? (
          <video
            key={current.src}
            src={current.src}
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img key={current.src} src={current.src} alt={product.name} className="w-full h-full object-cover" />
        )}
      </div>

      {media.length > 1 && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
          {media.map((m, i) => (
            <button
              key={m.src + i}
              onClick={() => setActive(i)}
              className={`relative flex-none w-16 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                active === i ? 'border-[rgba(196,106,78,1)]' : 'border-transparent'
              }`}
            >
              {m.type === 'video' ? (
                <>
                  <video src={m.src} className="w-full h-full object-cover" muted />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <Play className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                </>
              ) : (
                <img src={m.src} className="w-full h-full object-cover" />
              )}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
