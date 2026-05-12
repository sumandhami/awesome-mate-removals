export const ALL_SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  shortDescription,
  thumbnail { asset, hotspot, crop, alt },
  order
}`
