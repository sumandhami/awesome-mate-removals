import "../src/index.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Awesome Mate Removals",
    template: "%s | Awesome Mate Removals",
  },
  description:
    "Awesome Mate Removals provides residential, office, furniture, and special-item moving services across Perth.",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Awesome Mate Removals",
    description:
      "Fully insured Perth movers for house, office, furniture, and specialty-item relocations.",
    siteName: "Awesome Mate Removals",
  },
  twitter: {
    card: "summary_large_image",
    title: "Awesome Mate Removals",
    description:
      "Perth moving company for house, office, furniture, and heavy-item removals.",
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Awesome Mate Removals",
    url: siteUrl,
    telephone: "041207264",
    email: "awesomemateremovals@gmail.com",
    identifier: "ABN 42293475158",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 5/207 Waterloo Street",
      addressLocality: "Tuart Hill",
      postalCode: "6060",
      addressRegion: "WA",
      addressCountry: "AU",
    },
    description:
      "Professional Perth removalists for house, office, furniture, and special-item moving services.",
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
