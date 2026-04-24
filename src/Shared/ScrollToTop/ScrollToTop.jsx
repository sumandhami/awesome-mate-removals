import { useState, useEffect, useRef, useCallback } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);
  const rafIdRef = useRef(null);
  const showScrollRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const nextShowScroll = window.scrollY > 300;
    if (nextShowScroll === showScrollRef.current) {
      return;
    }

    showScrollRef.current = nextShowScroll;
    setShowScroll(nextShowScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        return;
      }

      rafIdRef.current = requestAnimationFrame(() => {
        updateScrollState();
        rafIdRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [updateScrollState]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {showScroll && (
        <button
          type="button"
          aria-label="Scroll to top"
          className="fixed bottom-10 text-white right-6 z-50 bg-PrimaryColor-0 border-2 border-white rounded-full h-12 w-12 cursor-pointer flex justify-center items-center hover:border-PrimaryColor-0 hover:bg-white hover:text-PrimaryColor-0"
          onClick={scrollToTop}
        >
          <FaArrowUpLong size={"24"} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
