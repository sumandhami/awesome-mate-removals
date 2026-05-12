export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  phone,
  email,
  abn,
  address { street, suburb, state, postcode },
  social { facebook, instagram, tiktok },
  googleMapsEmbedUrl,
  companyDescription,
  copyrightYear,
  homeSeo { metaTitle, metaDescription, ogImage { asset->{ url } } },
  servicesSeo { metaTitle, metaDescription, ogImage { asset->{ url } } }
}`
