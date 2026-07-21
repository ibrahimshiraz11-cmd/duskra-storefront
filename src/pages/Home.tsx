import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { PRODUCTS } from '../data/products'

const FADE = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.2, 0.8, 0.3, 1] as const },
}

export default function Home() {
  const featured = PRODUCTS.slice(0, 4)

  return (
    <div>
      <Hero />

      <div className="px-3 md:px-5 py-3">
        <div className="overflow-hidden border-y border-[rgba(30,50,90,0.08)] py-4">
          <div className="flex gap-14 whitespace-nowrap animate-[marquee_26s_linear_infinite] w-max">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="flex gap-14 text-sm text-[rgba(30,50,90,0.5)]">
                  <span>Free delivery over Rs 3,000</span>
                  <span>·</span>
                  <span>Cash on delivery, nationwide</span>
                  <span>·</span>
                  <span>Hand-checked before dispatch</span>
                  <span>·</span>
                </span>
              ))}
          </div>
        </div>
      </div>

      <section className="px-3 md:px-5 py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto">
          <motion.div
            {...FADE}
            className="flex justify-between items-end gap-6 flex-wrap mb-12"
          >
            <div>
              <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-[rgba(196,106,78,1)] mb-2.5">
                <span className="w-6 h-px bg-[rgba(196,106,78,1)]" /> Currently featured
              </div>
              <h2 className="text-[clamp(28px,3.6vw,42px)] font-medium tracking-tight text-[rgba(30,50,90,0.95)]">
                Four pieces, chosen slowly.
              </h2>
            </div>
            <p className="text-sm text-[rgba(30,50,90,0.55)] max-w-[380px]">
              We keep a small, rotating shelf rather than an endless catalogue.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 md:px-5 pb-20 md:pb-28">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <motion.div {...FADE}>
            <div className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-[rgba(196,106,78,1)] mb-2.5">
              <span className="w-6 h-px bg-[rgba(196,106,78,1)]" /> The studio
            </div>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-medium tracking-tight text-[rgba(30,50,90,0.95)] mb-4">
              Built around one hour of the day.
            </h2>
            <p className="text-[15px] leading-relaxed text-[rgba(30,50,90,0.6)] max-w-[440px] mb-6">
              Duskra started with a single object — a sand-art piece that redraws its own
              horizon. Everything since has followed the same brief: nothing loud, nothing
              disposable.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white/60 border border-white/70 backdrop-blur-md text-[rgba(30,50,90,0.9)] rounded-full px-6 py-3 text-sm hover:bg-white/80 transition-colors"
            >
              Read the full story
            </Link>
          </motion.div>
          <motion.img
            {...FADE}
            src="https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=900&auto=format&fit=crop"
            alt="Styled desk"
            className="rounded-[1.6rem] w-full aspect-square object-cover"
          />
        </div>
      </section>
    </div>
  )
}
