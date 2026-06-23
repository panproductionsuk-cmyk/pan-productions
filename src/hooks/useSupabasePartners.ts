import { useEffect, useState, useCallback } from 'react'
import { supabase, type Partner } from '@/lib/supabase'

interface UsePartnersReturn {
  partners: Partner[]
  loading: boolean
  error: Error | null
}

// For admin - shows ALL partners regardless of visibility, ordered by sort_order
export function useAllPartners(): UsePartnersReturn & { refetch: () => void } {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPartners = useCallback(async () => {
    try {
      if (!supabase) {
        setPartners([])
        setError(new Error('Supabase not configured'))
        setLoading(false)
        return
      }

      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('partners')
        .select('*')
        .order('sort_order', { ascending: true })

      if (fetchError) throw fetchError

      setPartners((data as Partner[]) || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch partners'))
      setPartners([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPartners()
  }, [fetchPartners])

  return { partners, loading, error, refetch: fetchPartners }
}

// For public pages - only shows partners with visible = true
export function usePartners(): UsePartnersReturn {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPartners() {
      try {
        if (!supabase) {
          setPartners([])
          setError(new Error('Supabase not configured'))
          setLoading(false)
          return
        }

        const { data, error: fetchError } = await supabase
          .from('partners')
          .select('*')
          .eq('visible', true)
          .order('sort_order', { ascending: true })

        if (fetchError) throw fetchError

        setPartners((data as Partner[]) || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch partners'))
        setPartners([])
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  return { partners, loading, error }
}
