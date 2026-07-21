import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// True once you've set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
// in .env.local (dev) and in Vercel's Environment Variables (prod).
export const isSupabaseConfigured = Boolean(url && key)

export const supabase = isSupabaseConfigured
  ? createClient(url as string, key as string)
  : null

export const MEDIA_BUCKET = 'product-media'
