import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { useProducts } from './ProductsContext'

export const DELIVERY_FEE = 260

type CartLine = { id: string; qty: number }

type CartContextType = {
  lines: CartLine[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (id: string) => void
  changeQty: (id: string, delta: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  count: number
  subtotal: number
  deliveryFee: number
  grandTotal: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { products } = useProducts()
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = (id: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id)
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
      }
      return [...prev, { id, qty: 1 }]
    })
    setIsOpen(true)
  }

  const changeQty = (id: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    )
  }

  const removeFromCart = (id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id))
  }

  const clearCart = () => setLines([])

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines])
  const subtotal = useMemo(
    () =>
      lines.reduce((s, l) => {
        const p = products.find((p) => p.id === l.id)
        return s + (p ? p.price * l.qty : 0)
      }, 0),
    [lines, products],
  )
  const deliveryFee = lines.length > 0 ? DELIVERY_FEE : 0
  const grandTotal = subtotal + deliveryFee

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        changeQty,
        removeFromCart,
        clearCart,
        count,
        subtotal,
        deliveryFee,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
