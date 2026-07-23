import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'

const fmt = (n: number) => 'Rs ' + n.toLocaleString('en-PK')

export default function CartDrawer() {
  const { lines, isOpen, closeCart, changeQty, removeFromCart, subtotal, deliveryFee, grandTotal } = useCart()
  const { products } = useProducts()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.6, 0, 0.2, 1] }}
            className="fixed top-3 right-3 bottom-3 w-[min(400px,92vw)] rounded-3xl bg-white/95 backdrop-blur-xl z-50 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(30,50,90,0.08)]">
              <h3 className="text-xl font-normal text-[rgba(30,50,90,0.95)]">Your Cart</h3>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-[rgba(30,50,90,0.06)] flex items-center justify-center"
              >
                <X className="w-4 h-4 text-[rgba(30,50,90,0.8)]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="text-center py-16 text-sm text-[rgba(30,50,90,0.5)]">
                  Your cart is empty.
                </div>
              ) : (
                lines.map((line) => {
                  const p = products.find((p) => p.id === line.id)
                  if (!p) return null
                  return (
                    <div
                      key={p.id}
                      className="flex gap-3 py-4 border-b border-[rgba(30,50,90,0.06)]"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-20 object-cover rounded-xl bg-[#e3ddd3]"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[rgba(30,50,90,0.95)]">
                          {p.name}
                        </div>
                        <div className="text-xs text-[rgba(30,50,90,0.5)] mt-0.5">
                          {fmt(p.price)}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => changeQty(p.id, -1)}
                            className="w-6 h-6 rounded-full bg-[rgba(30,50,90,0.08)] flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm">{line.qty}</span>
                          <button
                            onClick={() => changeQty(p.id, 1)}
                            className="w-6 h-6 rounded-full bg-[rgba(30,50,90,0.08)] flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(p.id)}
                          className="text-[11px] underline text-[rgba(30,50,90,0.4)] mt-1.5"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="px-6 py-5 border-t border-[rgba(30,50,90,0.08)]">
              <div className="flex justify-between text-sm mb-1.5 text-[rgba(30,50,90,0.8)]">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3 text-[rgba(30,50,90,0.8)]">
                <span>Delivery</span>
                <span>{lines.length === 0 ? '—' : fmt(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base mb-4 text-[rgba(30,50,90,0.95)] pt-3 border-t border-[rgba(30,50,90,0.08)]">
                <span>Total</span>
                <strong>{fmt(grandTotal)}</strong>
              </div>
              {lines.length === 0 ? (
                <button
                  disabled
                  className="w-full bg-[rgba(30,50,90,0.9)] opacity-40 text-white rounded-full py-3.5 text-sm font-medium"
                >
                  Checkout
                </button>
              ) : (
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center bg-[rgba(30,50,90,0.9)] text-white rounded-full py-3.5 text-sm font-medium hover:bg-[rgba(30,50,90,1)] transition-colors"
                >
                  Checkout
                </Link>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
