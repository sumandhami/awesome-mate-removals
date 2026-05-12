"use client";

import Footer from "@/src/Shared/Footer/Footer";
import Navbar from "@/src/Shared/Navbar/Navbar";
import ScrollToTop from "@/src/Shared/ScrollToTop/ScrollToTop";

export default function MainShell({ children, settings }) {
  return (
    <>
      <Navbar settings={settings} />
      <ScrollToTop />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
