import { createClient } from '@supabase/supabase-js'

// Vite uses VITE_ prefix, but Vercel/Supabase integration uses standard names
// Try both patterns to support local dev and production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY

let supabase: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('⚠️ Supabase environment variables not configured. App will use local data fallback.')
}

export { supabase }

export interface Production {
  id: string
  title: string
  title_en?: string
  author?: string
  status: 'On Sale' | 'Upcoming' | 'Current' | 'Past'
  description_en: string
  description_tr: string
  image: string
  gallery?: string[]
  dates: string
  sort_date?: string
  venue: string
  duration: string
  ticket_price: string
  ticket_link?: string
  category: 'theatre' | 'music' | 'art' | 'film'
  show_in_marketing: boolean
  created_at?: string
  updated_at?: string
}
