// Sanity schema for Production documents
// Deploy this schema to your Sanity Studio

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'production',
  title: 'Production',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'id',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'English Title (optional)',
      type: 'string',
      description: 'If different from the main title',
    }),
    defineField({
      name: 'author',
      title: 'Author / Artist',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'On Sale', value: 'On Sale' },
          { title: 'Upcoming', value: 'Upcoming' },
          { title: 'Current', value: 'Current' },
          { title: 'Past', value: 'Past' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionTr',
      title: 'Description (Turkish)',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'dates',
      title: 'Display Dates',
      type: 'string',
      description: 'e.g., "1-4 April 2026, 19:30"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortDate',
      title: 'Sort Date',
      type: 'date',
      description: 'Used for sorting productions chronologically',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration / Type',
      type: 'string',
      description: 'e.g., "2h 30min" or "Theatre Play"',
    }),
    defineField({
      name: 'ticketPrice',
      title: 'Ticket Price',
      type: 'string',
      description: 'e.g., "£27" or "See Archive"',
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
      description: 'External URL to purchase tickets',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Theatre', value: 'theatre' },
          { title: 'Music', value: 'music' },
          { title: 'Art', value: 'art' },
          { title: 'Film', value: 'film' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'director',
      title: 'Director',
      type: 'string',
    }),
    defineField({
      name: 'cast',
      title: 'Cast',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'name', title: 'Name', type: 'string' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Sort Date, Newest',
      name: 'sortDateDesc',
      by: [{ field: 'sortDate', direction: 'desc' }],
    },
    {
      title: 'Sort Date, Oldest',
      name: 'sortDateAsc',
      by: [{ field: 'sortDate', direction: 'asc' }],
    },
  ],
})
