import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
