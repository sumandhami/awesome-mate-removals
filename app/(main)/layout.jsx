import MainShell from "@/src/Layouts/MainShell";
import { homeFaqs, homeReviews } from "@/src/data/homepageContent";

export const metadata = {
  title: "Home",
  description: "Homepage for Awesome Mate Removals, Perth moving and relocation services.",
};

export default function MainLayout({ children }) {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@graph": homeReviews.map((review) => ({
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
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
      <MainShell>{children}</MainShell>
    </>
  );
}
