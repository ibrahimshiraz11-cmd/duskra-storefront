import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { Product } from '../data/products'
import {
  fetchProducts,
  createProduct as createProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
} from '../lib/products'
import { isSupabaseConfigured } from '../lib/supabase'

type ProductsContextType = {
  products: Product[]
  loading: boolean
  persisted: boolean
  addProduct: (p: Omit<Product, 'id'>) => Promise<void>
  editProduct: (id: string, p: Omit<Product, 'id'>) => Promise<void>
  removeProduct: (id: string) => Promise<void>
}

const ProductsContext = createContext<ProductsContextType | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  const addProduct = useCallback(async (p: Omit<Product, 'id'>) => {
    const created = await createProductApi(p)
    setProducts((prev) => [...prev, created])
  }, [])

  const editProduct = useCallback(async (id: string, p: Omit<Product, 'id'>) => {
    const updated = await updateProductApi(id, p)
    setProducts((prev) => prev.map((x) => (x.id === id ? updated : x)))
  }, [])

  const removeProduct = useCallback(async (id: string) => {
    await deleteProductApi(id)
    setProducts((prev) => prev.filter((x) => x.id !== id))
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        persisted: isSupabaseConfigured,
        addProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
