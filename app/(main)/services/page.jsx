import ServicesPage from "@/src/PageViews/Services/ServicesPage";
import { client } from "@/sanity/lib/client";
import { ALL_SERVICES_QUERY } from "@/lib/queries/services";
import { SITE_SETTINGS_QUERY } from "@/lib/queries/siteSettings";

export async function generateMetadata() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { tags: ["siteSettings"] } });
  const seo = settings?.servicesSeo;
  const ogImageUrl = seo?.ogImage?.asset?.url ?? null;
  return {
    title: seo?.metaTitle ?? "Our Services",
    description:
      seo?.metaDescription ??
      "Explore Perth removalist services from Awesome Mate Removals including residential, furniture, commercial, interstate, and specialty item moves.",
    alternates: { canonical: "/services" },
    openGraph: {
      title: seo?.metaTitle ?? "Our Services",
      description:
        seo?.metaDescription ??
        "Explore Perth removalist services from Awesome Mate Removals including residential, furniture, commercial, interstate, and specialty item moves.",
      url: "/services",
      type: "website",
      ...(ogImageUrl && { images: [{ url: ogImageUrl }] }),
    },
  };
}

export default async function Page() {
  const services = await client.fetch(ALL_SERVICES_QUERY, {}, { next: { tags: ["services"] } });
  return <ServicesPage services={services} />;
}
