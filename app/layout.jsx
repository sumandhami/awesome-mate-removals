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
    default: "Cleeny - Cleaning Service",
    template: "%s | Cleeny",
  },
  description:
    "Cleeny is a modern cleaning service website template built for home and business cleaning brands.",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Cleeny - Cleaning Service",
    description:
      "Cleeny is a modern cleaning service website template built for home and business cleaning brands.",
    siteName: "Cleeny",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleeny - Cleaning Service",
    description:
      "Cleeny is a modern cleaning service website template built for home and business cleaning brands.",
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Cleeny",
    url: siteUrl,
    telephone: "+980765546900",
    email: "example@yahoo.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "102/B Philosophy Market Road",
      addressLocality: "California",
      addressCountry: "US",
    },
    description:
      "Professional residential and commercial cleaning services with modern, reliable workflows.",
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
