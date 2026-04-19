import { Link } from "react-router-dom";
import callImg from "/images/subscribe-icon.png";
import footerLogo from "/images/footer-logo.jpg";
import footerShape from "/images/footer-shape.png";
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
  return (
    <footer className="bg-HeadingColor-0 relative z-10">
      <div className="absolute top-1/4 left-0 right-0 animate-wiggle -z-10">
        <img src={footerShape?.src || footerShape} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="Container px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:items-center bg-[url('/images/subscribe-bg.png')] bg-bottom sm:bg-right lg:bg-center bg-cover bg-no-repeat py-[28px] px-4 sm:px-8 md:px-10 lg:px-12 rounded-b-3xl mb-[100px] sm:mb-[120px]">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] md:w-[70px] md:h-[70px] rounded-full flex items-center justify-center bg-white shrink-0">
                <img
                  src={callImg?.src || callImg}
                  alt="Call us"
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 sm:w-9 sm:h-9 object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-HeadingColor-0 font-Poppins font-light text-[15px]">
                  Need Moving Help?
                </p>
                <a
                  href="tel:041207264"
                  className="font-Inter text-left font-semibold text-HeadingColor-0 text-[19px] leading-7 sm:text-[22px] mt-1 inline-block"
                >
                  Call Us Now: 041207264
                </a>
              </div>
            </div>
          </div>
          <div className="text-left flex flex-col lg:flex-row gap-6 lg:gap-4 xl:gap-12 justify-start lg:justify-between lg:items-center lg:pl-10 xl:pl-16">
            <h4 className="font-Inter font-semibold text-white text-[24px] sm:text-[28px]">
              Get a Quote Update
            </h4>
            <form action="/api/forms" method="post" className="relative w-full lg:max-w-[500px]">
              <input type="hidden" name="formType" value="newsletter" />
              <input
                type="text"
                name="hp"
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                className="w-full h-[54px] sm:h-[56px] rounded-md bg-white text-TextColor-0 placeholder:text-TextColor-0 px-5 py-2 pr-[130px]"
              />
              <div className="absolute right-0 top-0">
                <button
                  type="submit"
                  className="w-[112px] sm:w-[122px] h-[54px] sm:h-[56px] bg-HeadingColor-0 font-medium font-Inter text-white border-none outline-0 rounded-r-md flex items-center justify-center gap-2 relative z-10 overflow-hidden before:absolute before:top-0 before:right-0 before:w-0 before:h-full before:bg-PrimaryColor-0 before:-z-10 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-12">
          <div className="2xl:col-span-3 min-w-0">
            <img src={footerLogo?.src || footerLogo} alt="Awesome Mate Removals" loading="lazy" decoding="async" />
            <p className="font-Poppins text-white mt-7 mb-9">
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
          <div className="2xl:col-span-2 min-w-0">
            <h4 className="font-Inter text-2xl text-white font-semibold mb-[30px]">
              Quick Links
            </h4>
            <ul>
              <li>
                <Link to="/" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    Home
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    Our Services
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    Projects
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1">
                    <FaChevronRight className="text-sm opacity-50" />
                    Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="2xl:col-span-4 min-w-0">
            <h4 className="font-Inter text-2xl text-white font-semibold mb-9">
              Services
            </h4>
            <ul>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    All Services
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    Residential Moving
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    Furniture Removals
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    Commercial Relocation
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    Interstate Removals
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-4">
                    <FaChevronRight className="text-sm opacity-50" />
                    Specialty Item Moves
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center gap-2 font-Inter text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1">
                    <FaChevronRight className="text-sm opacity-50" />
                    Packing and Kitchen Moves
                </Link>
              </li>
            </ul>
          </div>
          <div className="2xl:col-span-3 min-w-0">
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
                  041207264
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
                  awesomemateremovals@gmail.com
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
        <div className="text-left sm:text-center py-6 border-t border-[#334899] mt-20 overflow-x-auto">
          <p className="font-Poppins text-white">
            © Copyrights 2026 Awesome Mate Removals. All rights reserved.
          </p>
          <p className="font-Poppins text-[#B9BBD2] mt-2">
            Website designed and developed by{" "}
            <a
              href="https://rootalpine.com"
              target="_blank"
              rel="noreferrer"
              className="text-PrimaryColor-0 hover:underline"
            >
              AlpineRoot Technologies
            </a>
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <Link to="#" className="font-Poppins text-[#B9BBD2] hover:text-PrimaryColor-0 transition-all duration-300">
              Privacy Policy
            </Link>
            <Link to="#" className="font-Poppins text-[#B9BBD2] hover:text-PrimaryColor-0 transition-all duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

