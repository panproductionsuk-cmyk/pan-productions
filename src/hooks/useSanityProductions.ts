import useSWR from 'swr'
import {
  sanityClient,
  productionsQuery,
  productionByIdQuery,
  transformProduction,
  type SanityProduction,
  type Production,
} from '@/lib/sanity'

// Fetcher function for SWR
async function fetchProductions(): Promise<Production[]> {
  const data = await sanityClient.fetch<SanityProduction[]>(productionsQuery)
  return data.map(transformProduction)
}

async function fetchProductionById(id: string): Promise<Production | null> {
  const data = await sanityClient.fetch<SanityProduction | null>(productionByIdQuery, { id })
  if (!data) return null
  return transformProduction(data)
}

/**
 * Hook to fetch all productions from Sanity CMS
 */
export function useSanityProductions() {
  const { data, error, isLoading, mutate } = useSWR<Production[]>(
    'productions',
    fetchProductions,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  )

  return {
    productions: data || [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}

/**
 * Hook to fetch a single production by ID/slug from Sanity CMS
 */
export function useSanityProductionById(id: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Production | null>(
    id ? ['production', id] : null,
    () => (id ? fetchProductionById(id) : null),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  )

  return {
    production: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}

/**
 * Group productions by category
 */
export function groupProductionsByCategory(productions: Production[]) {
  return {
    theatre: productions.filter((p) => p.category === 'theatre'),
    music: productions.filter((p) => p.category === 'music'),
    art: productions.filter((p) => p.category === 'art'),
    film: productions.filter((p) => p.category === 'film'),
  }
}

/**
 * Sort productions: upcoming first (by date asc), then past (by date desc)
 */
export function sortProductions(productions: Production[]) {
  const now = new Date().toISOString().split('T')[0]
  return [...productions].sort((a, b) => {
    const dateA = a.sortDate || '1900-01-01'
    const dateB = b.sortDate || '1900-01-01'
    const aUpcoming = dateA >= now
    const bUpcoming = dateB >= now
    if (aUpcoming && !bUpcoming) return -1
    if (!aUpcoming && bUpcoming) return 1
    if (aUpcoming && bUpcoming) return dateA.localeCompare(dateB)
    return dateB.localeCompare(dateA)
  })
}
