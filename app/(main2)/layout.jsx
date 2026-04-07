import Main2Shell from "@/src/Layouts/Main2Shell";

export const metadata = {
  title: "Services and Inner Pages",
  description:
    "Explore Cleeny service pages, project details, testimonials, blog, and contact sections.",
};

export default function Main2Layout({ children }) {
  return <Main2Shell>{children}</Main2Shell>;
}
