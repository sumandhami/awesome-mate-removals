import MainShell from "@/src/Layouts/MainShell";

export const metadata = {
  title: "Home",
  description: "Homepage for Cleeny cleaning services and featured sections.",
};

export default function MainLayout({ children }) {
  return <MainShell>{children}</MainShell>;
}
