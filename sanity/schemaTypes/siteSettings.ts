import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'abn',
      title: 'ABN',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({name: 'street', title: 'Street', type: 'string'}),
        defineField({name: 'suburb', title: 'Suburb', type: 'string'}),
        defineField({name: 'state', title: 'State', type: 'string'}),
        defineField({name: 'postcode', title: 'Postcode', type: 'string'}),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({name: 'facebook', title: 'Facebook URL', type: 'url'}),
        defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
        defineField({name: 'tiktok', title: 'TikTok URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'The src URL for the Google Maps iframe (from maps.google.com embed)',
    }),
    defineField({
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown in the footer',
    }),
    defineField({
      name: 'copyrightYear',
      title: 'Copyright Year',
      type: 'number',
    }),
    defineField({
      name: 'homeSeo',
      title: 'Home Page SEO',
      type: 'object',
      fields: [
        defineField({name: 'metaTitle', title: 'Meta Title', type: 'string'}),
        defineField({name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2}),
        defineField({name: 'ogImage', title: 'OG Image', type: 'image'}),
      ],
    }),
    defineField({
      name: 'servicesSeo',
      title: 'Services Page SEO',
      type: 'object',
      fields: [
        defineField({name: 'metaTitle', title: 'Meta Title', type: 'string'}),
        defineField({name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2}),
        defineField({name: 'ogImage', title: 'OG Image', type: 'image'}),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
