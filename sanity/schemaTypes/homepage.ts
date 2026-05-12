import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero / Banner',
      type: 'object',
      fields: [
        defineField({name: 'headline', title: 'Headline', type: 'string'}),
        defineField({name: 'subheadline', title: 'Subheadline', type: 'string'}),
        defineField({name: 'ctaText', title: 'CTA Button Text', type: 'string'}),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
        defineField({
          name: 'checklistItems',
          title: 'Checklist Items',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({name: 'counterNumber', title: 'Counter Number', type: 'string'}),
        defineField({name: 'counterLabel', title: 'Counter Label', type: 'string'}),
        defineField({
          name: 'image',
          title: 'About Image',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features / Trust Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Image',
              type: 'image',
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title'}},
        },
      ],
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'stepNumber', title: 'Step Number', type: 'number'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title'}},
        },
      ],
    }),
    defineField({
      name: 'whyChooseItems',
      title: 'Why Choose Us Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Image',
              type: 'image',
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
            }),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'title'}},
        },
      ],
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'suburb', title: 'Suburb Name', type: 'string'}),
            defineField({name: 'slug', title: 'URL Slug', type: 'string'}),
          ],
          preview: {select: {title: 'suburb'}},
        },
      ],
    }),
    defineField({
      name: 'movingCost',
      title: 'Moving Cost Guide',
      type: 'object',
      fields: [
        defineField({
          name: 'items',
          title: 'Info Boxes',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({name: 'title', title: 'Title', type: 'string'}),
                defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
              ],
              preview: {select: {title: 'title'}},
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'portfolio',
      title: 'Portfolio Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'location', title: 'Location', type: 'string'}),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
            }),
            defineField({name: 'url', title: 'Link URL', type: 'string'}),
          ],
          preview: {select: {title: 'title', media: 'image'}},
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
