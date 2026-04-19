import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; script-src-elem 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.google.com https://www.gstatic.com https:; frame-src https://www.google.com; media-src 'self' data: https://commondatastorage.googleapis.com; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/service", destination: "/services", permanent: true },
      {
        source: "/service_details",
        destination: "/services/floor-cleaning",
        permanent: true,
      },
      {
        source: "/service_details2",
        destination: "/services/house-cleaning",
        permanent: true,
      },
      {
        source: "/service_details3",
        destination: "/services/office-cleaning",
        permanent: true,
      },
      {
        source: "/service_details4",
        destination: "/services/cleaning-specialist",
        permanent: true,
      },
      {
        source: "/service_details5",
        destination: "/services/window-cleaning",
        permanent: true,
      },
      {
        source: "/service_details6",
        destination: "/services/kitchen-cleaning",
        permanent: true,
      },
      {
        source: "/pricing_inner",
        destination: "/pricing",
        permanent: true,
      },
      { source: "/project", destination: "/projects", permanent: true },
      {
        source: "/project_details",
        destination: "/projects/house-floor-cleaning",
        permanent: true,
      },
      { source: "/team_inner", destination: "/team", permanent: true },
      {
        source: "/testimonial",
        destination: "/testimonials",
        permanent: true,
      },
      {
        source: "/blog_grid",
        destination: "/blog/grid",
        permanent: true,
      },
      {
        source: "/blog_list",
        destination: "/blog/list",
        permanent: true,
      },
      {
        source: "/blog_details",
        destination: "/blog/how-to-move-heavy-furniture-without-damage",
        permanent: true,
      },
      {
        source: "/blog/details",
        destination: "/blog/how-to-move-heavy-furniture-without-damage",
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-router-dom$": path.resolve(
        __dirname,
        "src/lib/react-router-dom-compat.js"
      ),
      "/images": path.resolve(__dirname, "public/images"),
    };

    return config;
  },
};

export default nextConfig;
