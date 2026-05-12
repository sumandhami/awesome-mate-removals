import Home1 from "@/src/PageViews/Home1/Home1";
import { client } from "@/sanity/lib/client";
import { ALL_POSTS_QUERY } from "@/lib/queries/posts";
import { HOMEPAGE_QUERY, ALL_REVIEWS_QUERY, ALL_FAQS_QUERY } from "@/lib/queries/homepage";
import { ALL_SERVICES_QUERY } from "@/lib/queries/services";
import { SITE_SETTINGS_QUERY } from "@/lib/queries/siteSettings";

export async function generateMetadata() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { tags: ["siteSettings"] } });
  const seo = settings?.homeSeo;
  const ogImageUrl = seo?.ogImage?.asset?.url ?? null;
  return {
    title: seo?.metaTitle ?? "Home",
    description: seo?.metaDescription ?? "Homepage for Awesome Mate Removals, Perth moving and relocation services.",
    alternates: { canonical: "/" },
    openGraph: {
      title: seo?.metaTitle ?? "Awesome Mate Removals",
      description: seo?.metaDescription ?? "Homepage for Awesome Mate Removals, Perth moving and relocation services.",
      url: "/",
      type: "website",
      ...(ogImageUrl && { images: [{ url: ogImageUrl }] }),
    },
  };
}

export default async function Page() {
  const [posts, homepage, reviews, faqs, services] = await Promise.all([
    client.fetch(ALL_POSTS_QUERY, {}, { next: { tags: ["posts"] } }),
    client.fetch(HOMEPAGE_QUERY, {}, { next: { tags: ["homepage"] } }),
    client.fetch(ALL_REVIEWS_QUERY, {}, { next: { tags: ["reviews"] } }),
    client.fetch(ALL_FAQS_QUERY, {}, { next: { tags: ["faqs"] } }),
    client.fetch(ALL_SERVICES_QUERY, {}, { next: { tags: ["services"] } }),
  ]);
  return <Home1 posts={posts} homepage={homepage} reviews={reviews} faqs={faqs} services={services} />;
}
