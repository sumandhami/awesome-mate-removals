"use client";

import Footer from "@/src/Shared/Footer/Footer";
import Navbar3 from "@/src/Shared/Navbar/Navbar3";
import ScrollToTop from "@/src/Shared/ScrollToTop/ScrollToTop";

export default function Main2Shell({ children }) {
  return (
    <>
      <Navbar3 />
      <ScrollToTop />
      <main>{children}</main>
      <Footer />
    </>
  );
}
