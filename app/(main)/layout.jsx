import MainShell from "@/src/Layouts/MainShell";
import { client } from "@/sanity/lib/client";
import { ALL_REVIEWS_QUERY, ALL_FAQS_QUERY } from "@/lib/queries/homepage";
import { SITE_SETTINGS_QUERY } from "@/lib/queries/siteSettings";

export default async function MainLayout({ children }) {
  const [reviews, faqs, settings] = await Promise.all([
    client.fetch(ALL_REVIEWS_QUERY, {}, { next: { tags: ["reviews"] } }),
    client.fetch(ALL_FAQS_QUERY, {}, { next: { tags: ["faqs"] } }),
    client.fetch(SITE_SETTINGS_QUERY, {}, { next: { tags: ["siteSettings"] } }),
  ]);

  const phone = settings?.phone ?? "0412007264";
  const email = settings?.email ?? "info@awesomemateremovals.com.au";
  const abn = settings?.abn ?? "42293475158";
  const addr = settings?.address;
  const streetAddress = addr?.street ?? "Unit 5/207 Waterloo Street";
  const addressLocality = addr?.suburb ?? "Tuart Hill";
  const postalCode = addr?.postcode ?? "6060";
  const addressRegion = addr?.state ?? "WA";

  const reviewSchema = {
    "@context": "https://schema.org",
    "@graph": (reviews ?? []).map((review) => ({
      "@type": "Review",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "Awesome Mate Removals",
        areaServed: "Perth",
      },
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.description,
      name: review.title,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs ?? []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Awesome Mate Removals",
    telephone: phone,
    email: email,
    identifier: `ABN ${abn}`,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      postalCode,
      addressRegion,
      addressCountry: "AU",
    },
    description:
      settings?.companyDescription ??
      "Professional Perth removalists for house, office, furniture, and special-item moving services.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <MainShell settings={settings}>{children}</MainShell>
    </>
  );
}
