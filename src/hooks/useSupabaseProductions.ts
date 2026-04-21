import { useEffect, useState, useCallback } from 'react'
import { supabase, type Production } from '@/lib/supabase'

// Status priority: On Sale (0) > Current (1) > Upcoming (2) > Past (3)
const getStatusPriority = (status: string): number => {
  switch (status) {
    case 'On Sale': return 0
    case 'Current': return 1
    case 'Upcoming': return 2
    case 'Past': return 3
    default: return 4
  }
}

// Sort productions by status priority, then by event_date descending
const sortProductionsWithOnSaleFirst = (productions: Production[]): Production[] => {
  return [...productions].sort((a, b) => {
    // First sort by status priority
    const priorityA = getStatusPriority(a.status)
    const priorityB = getStatusPriority(b.status)
    if (priorityA !== priorityB) return priorityA - priorityB
    
    // Then sort by event_date descending (newest first)
    const dateA = a.event_date ? new Date(a.event_date).getTime() : 0
    const dateB = b.event_date ? new Date(b.event_date).getTime() : 0
    return dateB - dateA
  })
}

interface UseProductionsReturn {
  productions: Production[]
  loading: boolean
  error: Error | null
  refetch?: () => void
}

// For admin - shows ALL productions regardless of visibility
export function useAllProductions(): UseProductionsReturn & { refetch: () => void } {
  const [productions, setProductions] = useState<Production[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProductions = useCallback(async () => {
    try {
      if (!supabase) {
        setProductions([])
        setError(new Error('Supabase not configured'))
        setLoading(false)
        return
      }

      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('productions')
        .select('*')
        .order('event_date', { ascending: false, nullsFirst: false })

      if (fetchError) throw fetchError

      // Sort with "On Sale" first, then by event_date
      setProductions(sortProductionsWithOnSaleFirst(data || []))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch productions'))
      setProductions([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProductions()
  }, [fetchProductions])

  return { productions, loading, error, refetch: fetchProductions }
}

// For public pages - only shows productions with show_in_productions = true
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
          .order('event_date', { ascending: false, nullsFirst: false })

        if (fetchError) throw fetchError

        // Sort with "On Sale" first, then by event_date
        setProductions(sortProductionsWithOnSaleFirst(data || []))
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
          .order('event_date', { ascending: false, nullsFirst: false })

        if (fetchError) {
          console.error('[v0] useMarketingProductions Supabase error:', fetchError)
          throw fetchError
        }

        // Sort with "On Sale" first, then by event_date
        setProductions(sortProductionsWithOnSaleFirst(data || []))
        setError(null)
      } catch (err) {
        console.error('[v0] useMarketingProductions catch error:', err)
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
