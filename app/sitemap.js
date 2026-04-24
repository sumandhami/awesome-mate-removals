const routes = [
  "",
  "/services",
  "/blog/how-to-move-heavy-furniture-without-damage",
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
