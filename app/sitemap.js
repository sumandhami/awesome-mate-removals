const routes = [
  "",
  "/about-us",
  "/services",
  "/services/floor-cleaning",
  "/services/house-cleaning",
  "/services/office-cleaning",
  "/services/cleaning-specialist",
  "/services/window-cleaning",
  "/services/kitchen-cleaning",
  "/pricing",
  "/projects",
  "/projects/house-floor-cleaning",
  "/team",
  "/testimonials",
  "/appointment",
  "/blog/grid",
  "/blog/list",
  "/blog/details",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
