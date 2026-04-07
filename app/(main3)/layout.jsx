import Main3Shell from "@/src/Layouts/Main3Shell";

export const metadata = {
  title: "Home Three",
  description: "Alternative homepage variant with appointment and brand-focused sections.",
};

export default function Main3Layout({ children }) {
  return <Main3Shell>{children}</Main3Shell>;
}
