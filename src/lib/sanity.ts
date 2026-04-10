import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity client configuration
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// TypeScript interfaces matching the Sanity schema
export interface SanityProduction {
  _id: string
  id: { current: string }
  title: string
  titleEn?: string
  author?: string
  status: 'On Sale' | 'Upcoming' | 'Current' | 'Past'
  descriptionEn: string
  descriptionTr: string
  image: SanityImageSource
  gallery?: SanityImageSource[]
  dates: string
  sortDate: string
  venue: string
  duration?: string
  ticketPrice?: string
  ticketLink?: string
  category: 'theatre' | 'music' | 'art' | 'film'
  director?: string
  cast?: string[]
  credits?: { role: string; name: string }[]
}

// Transformed production type for use in React components
export interface Production {
  id: string
  title: string
  titleEn?: string
  author: string
  status: string
  description: { EN: string; TR: string }
  image: string
  gallery?: string[]
  dates: string
  sortDate?: string
  venue: string
  duration: string
  ticketPrice: string
  ticketLink?: string
  category?: string
  director?: string
  cast?: string[]
  credits?: { role: string; name: string }[]
}

// GROQ query to fetch all productions
export const productionsQuery = `
  *[_type == "production"] | order(sortDate desc) {
    _id,
    "id": id.current,
    title,
    titleEn,
    author,
    status,
    descriptionEn,
    descriptionTr,
    image,
    gallery,
    dates,
    sortDate,
    venue,
    duration,
    ticketPrice,
    ticketLink,
    category,
    director,
    cast,
    credits
  }
`

// GROQ query to fetch a single production by slug
export const productionByIdQuery = `
  *[_type == "production" && id.current == $id][0] {
    _id,
    "id": id.current,
    title,
    titleEn,
    author,
    status,
    descriptionEn,
    descriptionTr,
    image,
    gallery,
    dates,
    sortDate,
    venue,
    duration,
    ticketPrice,
    ticketLink,
    category,
    director,
    cast,
    credits
  }
`

// Transform Sanity production data to the format expected by React components
export function transformProduction(sanityProd: SanityProduction): Production {
  return {
    id: sanityProd.id.current,
    title: sanityProd.title,
    titleEn: sanityProd.titleEn,
    author: sanityProd.author || '',
    status: sanityProd.status,
    description: {
      EN: sanityProd.descriptionEn,
      TR: sanityProd.descriptionTr,
    },
    image: sanityProd.image ? urlFor(sanityProd.image).url() : '/images/placeholder.jpg',
    gallery: sanityProd.gallery?.map((img) => urlFor(img).url()),
    dates: sanityProd.dates,
    sortDate: sanityProd.sortDate,
    venue: sanityProd.venue,
    duration: sanityProd.duration || '',
    ticketPrice: sanityProd.ticketPrice || '',
    ticketLink: sanityProd.ticketLink,
    category: sanityProd.category,
    director: sanityProd.director,
    cast: sanityProd.cast,
    credits: sanityProd.credits,
  }
}
