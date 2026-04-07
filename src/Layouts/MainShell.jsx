"use client";

import Footer from "@/src/Shared/Footer/Footer";
import Navbar from "@/src/Shared/Navbar/Navbar";
import ScrollToTop from "@/src/Shared/ScrollToTop/ScrollToTop";

export default function MainShell({ children }) {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main>{children}</main>
      <Footer />
    </>
  );
}
