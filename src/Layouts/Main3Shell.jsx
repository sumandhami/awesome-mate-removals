"use client";

import Footer from "@/src/Shared/Footer/Footer";
import Navbar2 from "@/src/Shared/Navbar/Navbar2";
import ScrollToTop from "@/src/Shared/ScrollToTop/ScrollToTop";

export default function Main3Shell({ children }) {
  return (
    <>
      <Navbar2 />
      <ScrollToTop />
      <main>{children}</main>
      <Footer />
    </>
  );
}
