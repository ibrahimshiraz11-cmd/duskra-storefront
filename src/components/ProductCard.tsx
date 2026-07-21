import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'

const fmt = (n: number) => 'Rs ' + n.toLocaleString('en-PK')

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-3xl bg-white/55 border border-white/70 backdrop-blur-sm overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgba(30,50,90,0.28)] transition-all duration-300"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#dfe3ea] to-[#e3ddd3]">
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white text-[rgba(30,50,90,0.95)] text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-4.5">
        <div className="text-[11px] uppercase tracking-wider text-[rgba(30,50,90,0.4)] mb-1">
          {product.vendor}
        </div>
        <div className="text-[16.5px] font-medium text-[rgba(30,50,90,0.95)] mb-2.5">
          {product.name}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-[rgba(30,50,90,0.9)]">
            {fmt(product.price)}
            {product.compareAt && (
              <span className="ml-1.5 text-xs font-normal opacity-50 line-through">
                {fmt(product.compareAt)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              addToCart(product.id)
            }}
            aria-label="Add to cart"
            className="w-8 h-8 rounded-full bg-[rgba(30,50,90,0.08)] flex items-center justify-center hover:bg-[rgba(30,50,90,0.9)] hover:text-white text-[rgba(30,50,90,0.9)] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}
