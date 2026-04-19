import ServicesPage from "@/src/PageViews/Services/ServicesPage";

export const metadata = {
  title: "Our Services",
  description:
    "Explore Perth removalist services from Awesome Mate Removals including residential, furniture, commercial, interstate, and specialty item moves.",
  alternates: {
    canonical: "/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
