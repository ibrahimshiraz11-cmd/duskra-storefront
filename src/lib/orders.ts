import { supabase, isSupabaseConfigured } from './supabase'

export type OrderItem = { id: string; name: string; price: number; qty: number }

export type Order = {
  id: string
  customerName: string
  phone: string
  address: string
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: 'pending' | 'fulfilled'
  createdAt: string
}

const LOCAL_KEY = 'duskra_orders_local'

function readLocal(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
  } catch {
    return []
  }
}
function writeLocal(orders: Order[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(orders))
}

type OrderRow = {
  id: string
  customer_name: string
  phone: string
  address: string
  items: OrderItem[]
  subtotal: number
  delivery_fee: number
  total: number
  status: 'pending' | 'fulfilled'
  created_at: string
}

function fromRow(row: OrderRow): Order {
  return {
    id: row.id,
    customerName: row.customer_name,
    phone: row.phone,
    address: row.address,
    items: row.items,
    subtotal: row.subtotal,
    deliveryFee: row.delivery_fee,
    total: row.total,
    status: row.status,
    createdAt: row.created_at,
  }
}

export async function createOrder(
  input: Omit<Order, 'id' | 'status' | 'createdAt'>,
): Promise<Order> {
  if (!isSupabaseConfigured || !supabase) {
    const order: Order = {
      ...input,
      id: 'local-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    writeLocal([order, ...readLocal()])
    return order
  }

  const { data, error } = await supabase
    .from('orders')
    .insert({
      customer_name: input.customerName,
      phone: input.phone,
      address: input.address,
      items: input.items,
      subtotal: input.subtotal,
      delivery_fee: input.deliveryFee,
      total: input.total,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return fromRow(data as OrderRow)
}

export async function fetchOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured || !supabase) return readLocal()

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch orders, falling back to local:', error.message)
    return readLocal()
  }
  return (data as OrderRow[]).map(fromRow)
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    writeLocal(readLocal().map((o) => (o.id === id ? { ...o, status } : o)))
    return
  }
  const { error } = await supabase.from('orders').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
}
