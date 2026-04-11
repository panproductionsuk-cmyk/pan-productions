import { useEffect, useState } from 'react'
import { supabase, type Production } from '@/lib/supabase'

interface UseProductionsReturn {
  productions: Production[]
  loading: boolean
  error: Error | null
}

export function useProductions(): UseProductionsReturn {
  const [productions, setProductions] = useState<Production[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProductions() {
      try {
        if (!supabase) {
          setProductions([])
          setError(new Error('Supabase not configured'))
          setLoading(false)
          return
        }

        const { data, error: fetchError } = await supabase
          .from('productions')
          .select('*')
          .eq('show_in_productions', true)
          .order('sort_date', { ascending: false, nullsFirst: false })

        if (fetchError) throw fetchError

        setProductions(data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch productions'))
        setProductions([])
      } finally {
        setLoading(false)
      }
    }

    fetchProductions()
  }, [])

  return { productions, loading, error }
}

export function useProductionById(id: string): Omit<UseProductionsReturn, 'productions'> & { production: Production | null } {
  const [production, setProduction] = useState<Production | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) {
      setProduction(null)
      setLoading(false)
      return
    }

    async function fetchProduction() {
      try {
        if (!supabase) {
          setProduction(null)
          setError(new Error('Supabase not configured'))
          setLoading(false)
          return
        }

        const { data, error: fetchError } = await supabase
          .from('productions')
          .select('*')
          .eq('id', id)
          .single()

        if (fetchError) throw fetchError

        setProduction(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch production'))
        setProduction(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduction()
  }, [id])

  return { production, loading, error }
}

export function useMarketingProductions(): UseProductionsReturn {
  const [productions, setProductions] = useState<Production[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProductions() {
      try {
        if (!supabase) {
          setProductions([])
          setError(new Error('Supabase not configured'))
          setLoading(false)
          return
        }

        const { data, error: fetchError } = await supabase
          .from('productions')
          .select('*')
          .eq('show_in_marketing', true)
          .order('sort_date', { ascending: false, nullsFirst: false })

        if (fetchError) throw fetchError

        setProductions(data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch marketing productions'))
        setProductions([])
      } finally {
        setLoading(false)
      }
    }

    fetchProductions()
  }, [])

  return { productions, loading, error }
}
