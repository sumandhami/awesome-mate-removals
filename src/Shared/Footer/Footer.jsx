import Link from "next/link";
import footerLogo from "/images/footer-logo.jpg";
import {
  FaChevronRight,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Our Services", href: "/services" },
    { label: "Contact", href: "/#contact-form" },
  ];

  const serviceLinks = [
    "Residential Moving",
    "Furniture Removals",
    "Commercial Relocation",
    "Interstate Removals",
    "Specialty Item Moves",
    "Packing and Kitchen Moves",
  ];

  return (
    <footer className="bg-HeadingColor-0 relative z-10">
      <div className="Container px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div className="pt-16 pb-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
            <div className="min-w-0">
            <img src={footerLogo?.src || footerLogo} alt="Awesome Mate Removals" loading="lazy" decoding="async" />
            <p className="font-Poppins text-white mt-6 mb-6 max-w-sm leading-7">
              Awesome Mate Removals is a local Perth moving company for residential,
              furniture, commercial, and interstate removals.
            </p>
            <ul className="flex gap-3">
              <li>
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border-2 border-[#334899] flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:border-SecondaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-SecondaryColor-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a href="#" aria-label="X" className="w-10 h-10 rounded-full border-2 border-[#334899] flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:border-SecondaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-SecondaryColor-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100">
                  <FaXTwitter />
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border-2 border-[#334899] flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:border-SecondaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-SecondaryColor-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100">
                  <FaLinkedinIn />
                </a>
              </li>
              <li>
                <a href="#" aria-label="Pinterest" className="w-10 h-10 rounded-full border-2 border-[#334899] flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:border-SecondaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-SecondaryColor-0 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100">
                  <FaPinterestP />
                </a>
              </li>
            </ul>
            </div>
            <div className="min-w-0">
            <h4 className="font-Inter text-2xl text-white font-semibold mb-[30px]">
              Quick Links
            </h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                  <FaChevronRight className="text-sm opacity-50" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1">
                  <FaChevronRight className="text-sm opacity-50" />
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            </div>
            <div className="min-w-0">
            <h4 className="font-Inter text-2xl text-white font-semibold mb-9">
              Services
            </h4>
            <ul>
              <li>
                <Link href="/services" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    All Services
                </Link>
              </li>
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link href="/services" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
            </div>
            <div className="min-w-0">
            <h4 className="font-Inter text-2xl text-white font-semibold mb-10">
              Contact & Map
            </h4>
            <div className="flex gap-5 mb-5">
              <div className="h-[44px] w-[44px] min-w-[44px] rounded-full border border-dashed border-[#43559F] flex items-center justify-center text-white text-xl bg-[#183088]">
                <IoLocationOutline />
              </div>
              <div className="flex-1 -mt-1">
                <h6 className="font-Inter font-medium text-[17px] text-white">Name</h6>
                <p className="font-Poppins text-[15px] text-[#B9BBD2] mt-[6px]">
                  Awesome Mate Removals
                </p>
              </div>
            </div>
            <div className="flex gap-5 mb-5">
              <div className="h-[44px] w-[44px] min-w-[44px] rounded-full border border-dashed border-[#43559F] flex items-center justify-center text-white text-xl bg-[#183088]">
                <FiPhoneCall />
              </div>
              <div className="flex-1 -mt-1">
                <h6 className="font-Inter font-medium text-[17px] text-white">Phone</h6>
                <p className="font-Poppins text-[15px] text-[#B9BBD2] mt-[6px]">
                  0412007264
                </p>
              </div>
            </div>
            <div className="flex gap-5 mb-5">
              <div className="h-[44px] w-[44px] min-w-[44px] rounded-full border border-dashed border-[#43559F] flex items-center justify-center text-white bg-[#183088]">
                <HiOutlineMail className="text-[24px] md:text-[28px] lg:text-[32px]" />
              </div>
              <div className="flex-1 -mt-1">
                <h6 className="font-Inter font-medium text-[17px] text-white">Email</h6>
                <p className="font-Poppins text-[15px] text-[#B9BBD2] mt-[6px]">
                  info@awesomemateremovals.com.au
                </p>
              </div>
            </div>
            <div className="flex gap-5 mb-5">
              <div className="h-[44px] w-[44px] min-w-[44px] rounded-full border border-dashed border-[#43559F] flex items-center justify-center text-white text-xl bg-[#183088]">
                <IoLocationOutline />
              </div>
              <div className="flex-1 -mt-1">
                <h6 className="font-Inter font-medium text-[17px] text-white">Address</h6>
                <p className="font-Poppins text-[15px] text-[#B9BBD2] mt-[6px]">
                  Unit 5/207 Waterloo Street, Tuart Hill WA 6060
                </p>
              </div>
            </div>
            <div className="flex gap-5 mb-5">
              <div className="h-[44px] w-[44px] min-w-[44px] rounded-full border border-dashed border-[#43559F] flex items-center justify-center text-white text-xl bg-[#183088]">
                <FiPhoneCall />
              </div>
              <div className="flex-1 -mt-1">
                <h6 className="font-Inter font-medium text-[17px] text-white">ABN</h6>
                <p className="font-Poppins text-[15px] text-[#B9BBD2] mt-[6px]">
                  42293475158
                </p>
              </div>
            </div>
            <div className="rounded-md overflow-hidden border border-[#334899] mt-2">
              <iframe
                title="Awesome Mate Perth Service Area"
                src="https://www.google.com/maps?q=Unit%205%2F207%20Waterloo%20Street%2C%20Tuart%20Hill%20WA%206060&output=embed"
                className="w-full h-[170px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-[#334899]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-Poppins text-white text-sm md:text-base">
              © 2026 Awesome Mate Removals. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="font-Poppins text-[#B9BBD2] hover:text-PrimaryColor-0 transition-all duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="font-Poppins text-[#B9BBD2] hover:text-PrimaryColor-0 transition-all duration-300">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

