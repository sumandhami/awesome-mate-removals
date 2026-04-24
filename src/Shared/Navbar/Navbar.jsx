/* eslint-disable no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "/images/logo final.png";
import { useState, useEffect, useRef, useCallback } from "react";
import { IoMdCall, IoMdClose } from "react-icons/io";
import { VscHeart } from "react-icons/vsc";
import { BsEnvelope } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

const Navbar = () => {
  const rafIdRef = useRef(null);
  const stickyStateRef = useRef(false);
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  const isSticky = useCallback(() => {
    const header = document.querySelector(".header-section");
    if (!header) {
      return;
    }

    const nextStickyState = window.scrollY >= 250;
    if (nextStickyState === stickyStateRef.current) {
      return;
    }

    stickyStateRef.current = nextStickyState;
    header.classList.toggle("is-sticky", nextStickyState);
  }, []);

  // Ensure only one scroll computation runs per animation frame.
  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) {
      return;
    }

    rafIdRef.current = requestAnimationFrame(() => {
      isSticky();
      rafIdRef.current = null;
    });
  }, [isSticky]);

  //sticky

  useEffect(() => {
    isSticky();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [handleScroll, isSticky]);

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash || "");
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  // modal openar

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav
      aria-label="Primary"
      className={`w-full transition-all duration-300 bg-transparent relativee text-[#7d7f8c] z-[99999]`}
    >
      {/* top Navbar */}
      <header className="bg-SecondaryColor-0 overflow-hidden md:block">
        <div className="Container flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <p className="font-Poppins text-[15px] text-white md:flex items-center gap-1 relative before:absolute before:top-1/2 before:right-0 before:w-[1px] before:h-5 before:bg-BorderColor-0 before-:translate-1/2 hidden">
              <IoLocationOutline className="text-xl relative bottom-[2px]" />
              Unit 5/207 Waterloo Street, Tuart Hill WA 6060
            </p>
            <Link
              href="/"
              className="font-Poppins text-[15px] text-white sm:flex items-center gap-2 hidden"
            >
              <BsEnvelope size={"18"} />
              info@awesomemateremovals.com.au
            </Link>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <ul className="flex items-center">
              <li>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-sm flex justify-center items-center h-[50px] w-[35px] bg-[#1773ea] transition-all duration-500 text-white hover:text-PrimaryColor-0"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="X"
                  className="text-sm flex justify-center items-center h-[50px] w-[35px] bg-[#2ca5da] transition-all duration-500 text-white hover:text-PrimaryColor-0"
                >
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-sm flex justify-center items-center h-[50px] w-[35px] bg-[#0073b1] transition-all duration-500 text-white hover:text-PrimaryColor-0"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Pinterest"
                  className="text-sm flex justify-center items-center h-[50px] w-[35px] bg-[#e11a21] transition-all duration-500 text-white hover:text-PrimaryColor-0"
                >
                  <FaPinterestP />
                </a>
              </li>
            </ul>
            <div className="lg:flex items-center gap-2 hidden">
              <h6 className="flex items-center gap-2 text-sm text-white font-Poppins font-light">
                <IoMdCall className="w-[14px] h-[14px] rounded-sm bg-white text-xs text-SecondaryColor-0" />
                Call :
              </h6>
              <a
                href="tel:0412007264"
                className="font-Poppins font-medium text-sm text-white"
                aria-label="Call 0412007264"
              >
                0412007264
              </a>
            </div>
          </div>
        </div>
      </header>
      {/* top Navbar */}
      <header
        className="header-section bg-white"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <div className="Container">
          {/* main Navbar */}
          <div className="flex flex-col lg:flex-row items-center justify-between lg:h-[100px]">
            {/* website Logo */}
            <div className=" w-48 lg:w-52">
              <Link href="/">
                <Image
                  src={Logo}
                  className="hidden lg:block w-full h-auto"
                  alt="Awesome Mate Removals"
                  width={208}
                  height={54}
                  priority
                />
              </Link>
            </div>
            {/* small screen size */}
            <div className="px-3 w-full lg:hidden flex justify-between bg-khaki h-[70px] items-center p-3">
              <div className="w-28">
                <Link href="/">
                  <Image
                    src={Logo}
                    className="block lg:hidden "
                    alt="Awesome Mate Removals"
                    width={112}
                    height={29}
                    priority
                  />
                </Link>
              </div>
              {/* toggle bar mode. */}
              <button
                className="lg:hidden block focus:outline-none "
                onClick={toggleNavbar}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                {/* modal open and close */}
                {isOpen ? (
                  <IoMdClose className="w-6 h-6 text-HeadingColor-0" />
                ) : (
                  <FaBars className="w-5 h-5 text-HeadingColor-0" />
                )}
              </button>
            </div>
            {/* All navLink are hear with active */}
            <div className="flex gap-3 md:gap-6 items-center">
              <ul
                className={`${
                  isOpen ? "block" : "hidden"
                } text-right lg:w-fit ease-in-out flex-1 lg:flex space-y-2 lg:space-y-0 space-x-0 flex flex-col lg:flex-row capitalize text-base lg:bg-transparent py-3 lg:py-0 font-Poppins font-medium text-white transition-all duration-500`}
              >
                <li>
                  <Link
                    href="/#home"
                    className={`${pathname === "/" && (currentHash === "" || currentHash === "#home") ? "active" : ""} text-HeadingColor-0 text-left hover:text-PrimaryColor-0 lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${pathname === "/" && currentHash === "#about" ? "active" : ""} text-HeadingColor-0 text-left hover:text-PrimaryColor-0 lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300`}
                    href="/#about"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${pathname === "/services" ? "active" : ""} text-HeadingColor-0 text-left hover:text-PrimaryColor-0 lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300`}
                    href="/services"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${pathname === "/" && currentHash === "#blog" ? "active" : ""} text-HeadingColor-0 text-left hover:text-PrimaryColor-0 lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300`}
                    href="/#blog"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${pathname === "/" && currentHash === "#contact-form" ? "active" : ""} text-HeadingColor-0 text-left lg:border-b-0 px-3 lg:px-1 2xl:px-3 py-2 w-full block transition-all duration-300`}
                    href="/#contact-form"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="hidden lg:flex items-center">
                <Link href="/#contact-form" className="header-btn">
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
