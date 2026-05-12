import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import review from './review'
import faq from './faq'
import homepage from './homepage'
import service from './service'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, review, faq, homepage, service, siteSettings],
}
