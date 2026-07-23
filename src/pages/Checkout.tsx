import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductsContext'
import { createOrder } from '../lib/orders'

const fmt = (n: number) => 'Rs ' + n.toLocaleString('en-PK')

export default function Checkout() {
  const { lines, subtotal, deliveryFee, grandTotal, clearCart } = useCart()
  const { products } = useProducts()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [submitting, setSubmitting] = useState(false)
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null)
  const [placedTotal, setPlacedTotal] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const itemsWithDetails = lines
    .map((l) => {
      const p = products.find((p) => p.id === l.id)
      return p ? { id: p.id, name: p.name, price: p.price, qty: l.qty } : null
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const order = await createOrder({
        customerName: form.name,
        phone: form.phone,
        address: form.address,
        items: itemsWithDetails,
        subtotal,
        deliveryFee,
        total: grandTotal,
      })
      setPlacedOrderId(order.id)
      setPlacedTotal(grandTotal)
      clearCart()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong placing your order.')
    } finally {
      setSubmitting(false)
    }
  }

  if (placedOrderId) {
    return (
      <div className="px-3 md:px-5 pt-3 md:pt-5">
        <Navbar />
        <div className="max-w-[560px] mx-auto text-center py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 className="w-14 h-14 text-[#3f8f5c] mx-auto mb-6" />
            <h1 className="text-[clamp(26px,4vw,36px)] font-medium tracking-tight text-[rgba(30,50,90,0.95)] mb-3">
              Order placed.
            </h1>
            <p className="text-[15px] text-[rgba(30,50,90,0.6)] mb-2">
              Order <strong>#{placedOrderId.slice(-8)}</strong> — cash on delivery, {fmt(placedTotal)} due at
              your door.
            </p>
            <p className="text-[14px] text-[rgba(30,50,90,0.5)] mb-8">
              We'll reach out on {form.phone} to confirm dispatch.
            </p>
            <Link
              to="/shop"
              className="inline-flex bg-[rgba(30,50,90,0.9)] text-white rounded-full px-7 py-3.5 text-sm hover:bg-[rgba(30,50,90,1)] transition-colors"
            >
              Continue shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="px-3 md:px-5 pt-3 md:pt-5">
        <Navbar />
        <div className="text-center py-24">
          <h2 className="text-2xl text-[rgba(30,50,90,0.9)] mb-6">Your cart is empty.</h2>
          <Link
            to="/shop"
            className="inline-flex bg-[rgba(30,50,90,0.9)] text-white rounded-full px-6 py-3 text-sm"
          >
            Browse the shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-3 md:px-5 pt-3 md:pt-5">
      <Navbar />
      <div className="max-w-[900px] mx-auto py-10 md:py-16">
        <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-[rgba(30,50,90,0.95)] mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr,0.9fr] gap-10">
          <form onSubmit={handleSubmit} className="rounded-[1.6rem] bg-white/55 border border-white/70 backdrop-blur-sm p-6 md:p-8">
            <div className="text-[12px] uppercase tracking-wider text-[rgba(30,50,90,0.45)] mb-5">
              Delivery details
            </div>
            <div className="space-y-4 mb-6">
              <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field
                label="Phone number"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                required
                type="tel"
              />
              <div>
                <label className="block text-[11.5px] uppercase tracking-wider text-[rgba(30,50,90,0.45)] mb-1.5">
                  Delivery address
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-white/70 border border-white/80 text-[rgba(30,50,90,0.95)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[rgba(30,50,90,0.5)]"
                />
              </div>
            </div>
            <div className="text-[13px] text-[rgba(30,50,90,0.55)] bg-white/50 border border-white/60 rounded-xl px-4 py-3 mb-6">
              Cash on delivery — pay {fmt(grandTotal)} when your order arrives.
            </div>
            {error && <div className="text-[13px] text-[#b5544a] mb-4">{error}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[rgba(30,50,90,0.9)] disabled:opacity-50 text-white rounded-full py-3.5 text-sm font-medium hover:bg-[rgba(30,50,90,1)] transition-colors"
            >
              {submitting ? 'Placing order…' : `Place order — ${fmt(grandTotal)}`}
            </button>
          </form>

          <div className="rounded-[1.6rem] bg-white/55 border border-white/70 backdrop-blur-sm p-6 md:p-8 h-fit">
            <div className="text-[12px] uppercase tracking-wider text-[rgba(30,50,90,0.45)] mb-5">
              Order summary
            </div>
            <div className="space-y-4 mb-5">
              {itemsWithDetails.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-[rgba(30,50,90,0.85)]">
                  <span>
                    {item.name} <span className="text-[rgba(30,50,90,0.45)]">× {item.qty}</span>
                  </span>
                  <span>{fmt(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[rgba(30,50,90,0.1)] pt-4 space-y-2">
              <div className="flex justify-between text-sm text-[rgba(30,50,90,0.7)]">
                <span>Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[rgba(30,50,90,0.7)]">
                <span>Delivery</span>
                <span>{fmt(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base text-[rgba(30,50,90,0.95)] pt-2 border-t border-[rgba(30,50,90,0.1)]">
                <span>Total</span>
                <strong>{fmt(grandTotal)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[11.5px] uppercase tracking-wider text-[rgba(30,50,90,0.45)] mb-1.5">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/70 border border-white/80 text-[rgba(30,50,90,0.95)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[rgba(30,50,90,0.5)]"
      />
    </div>
  )
}
