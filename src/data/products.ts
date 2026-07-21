export type Product = {
  id: string
  name: string
  vendor: string
  category: string
  price: number
  compareAt: number | null
  stock: number
  badge: string | null
  image: string
  gallery: string[]
  video: string | null
  description: string
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Moving Sand Horizon',
    vendor: 'Desk Objects',
    category: 'Desk',
    price: 2450,
    compareAt: 2900,
    stock: 14,
    badge: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1596727147705-61a532a659bd?q=80&w=800&auto=format&fit=crop',
    gallery: [],
    video: null,
    description:
      'A slow, glass-bound dune that redraws itself with every turn — kinetic sand art in a hand-finished frame. No two settle the same way twice.',
  },
  {
    id: 'p2',
    name: 'Star Master Projector',
    vendor: 'Ambient',
    category: 'Ambient',
    price: 839,
    compareAt: null,
    stock: 26,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop',
    gallery: [],
    video: null,
    description:
      'A rotating field of stars cast across the ceiling — built for the last hour of the day, when the room goes quiet.',
  },
  {
    id: 'p3',
    name: 'Alphabet Marquee Letters',
    vendor: 'Desk Objects',
    category: 'Desk',
    price: 693,
    compareAt: null,
    stock: 40,
    badge: null,
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    gallery: [],
    video: null,
    description:
      'Warm-lit marquee letters, battery-run, for spelling out whatever the room needs to say tonight.',
  },
  {
    id: 'p4',
    name: 'Galaxy Laser Field',
    vendor: 'Ambient',
    category: 'Ambient',
    price: 347,
    compareAt: 420,
    stock: 31,
    badge: 'Gift Pick',
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop',
    gallery: [],
    video: null,
    description:
      'A pocket-sized nebula. Plug it in, and the nearest wall becomes a slow-drifting field of violet light.',
  },
]
