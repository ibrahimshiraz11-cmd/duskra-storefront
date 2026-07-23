import { supabase, isSupabaseConfigured } from './supabase'
import { SEED_PRODUCTS, type Product } from '../data/products'

// Maps between the DB's snake_case row shape and the app's Product type.
type ProductRow = {
  id: string
  name: string
  vendor: string
  category: string
  price: number
  compare_at: number | null
  stock: number
  badge: string | null
  image_url: string
  gallery: string[] | null
  video_url: string | null
  description: string
}

function fromRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    vendor: row.vendor,
    category: row.category,
    price: row.price,
    compareAt: row.compare_at,
    stock: row.stock,
    badge: row.badge,
    image: row.image_url,
    gallery: row.gallery ?? [],
    video: row.video_url,
    description: row.description,
  }
}

function toRow(p: Omit<Product, 'id'>) {
  return {
    name: p.name,
    vendor: p.vendor,
    category: p.category,
    price: p.price,
    compare_at: p.compareAt,
    stock: p.stock,
    badge: p.badge,
    image_url: p.image,
    gallery: p.gallery,
    video_url: p.video,
    description: p.description,
  }
}

export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) return SEED_PRODUCTS

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Failed to fetch products from Supabase, using local seed:', error.message)
    return SEED_PRODUCTS
  }
  return (data as ProductRow[]).map(fromRow)
}

export async function createProduct(p: Omit<Product, 'id'>): Promise<Product> {
  if (!isSupabaseConfigured || !supabase) {
    return { ...p, id: 'local-' + Date.now() }
  }
  const { data, error } = await supabase.from('products').insert(toRow(p)).select().single()
  if (error) throw new Error(error.message)
  return fromRow(data as ProductRow)
}

export async function updateProduct(id: string, p: Omit<Product, 'id'>): Promise<Product> {
  if (!isSupabaseConfigured || !supabase) {
    return { ...p, id }
  }
  const { data, error } = await supabase
    .from('products')
    .update(toRow(p))
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return fromRow(data as ProductRow)
}

export async function deleteProduct(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
