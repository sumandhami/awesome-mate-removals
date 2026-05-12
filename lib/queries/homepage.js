export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  hero {
    headline,
    subheadline,
    ctaText,
    backgroundImage { ..., asset->{ url } }
  },
  about {
    heading,
    description,
    checklistItems,
    counterNumber,
    counterLabel,
    image { ..., asset->{ url } }
  },
  features[] {
    icon { ..., asset->{ url } },
    title,
    description
  },
  processSteps[] {
    stepNumber,
    title,
    description
  },
  whyChooseItems[] {
    icon { ..., asset->{ url } },
    title,
    description
  },
  serviceAreas[] {
    suburb,
    slug
  },
  movingCost {
    items[] { title, description }
  },
  portfolio[] {
    title,
    location,
    image { ..., asset->{ url } },
    url
  }
}`

export const ALL_REVIEWS_QUERY = `*[_type == "review"] | order(publishedAt desc) {
  _id,
  name,
  suburb,
  rating,
  title,
  description,
  publishedAt
}`

export const ALL_FAQS_QUERY = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`
