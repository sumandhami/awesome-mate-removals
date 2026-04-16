import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import ContactForm from "@/components/ContactForm/ContactForm";

const Banner = () => {
  return (
    <section id="home" className="min-h-[720px] sm:min-h-[820px] lg:min-h-[814px] pt-6 sm:pt-10 lg:pt-0 flex items-center overflow-hidden relative">
      <Image
        src="/images/gallery/truck-6.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />
      
      <div className="Container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 sm:gap-16 lg:gap-0 lg:items-end">
          <div className="flex flex-col justify-end lg:min-h-[610px] lg:pb-28 xl:pb-32">
            <h5 className="font-Inter text-lg text-PrimaryColor-0 font-medium">
              LOCAL PERTH MOVING COMPANY
            </h5>
            <h1 className="font-Inter font-extrabold text-white text-[27px] leading-[38px] sm:text-[53px] sm:leading-[63px] lg:text-[51px] xl:text-[55px] 2xl:text-[58px] 2xl:leading-[65px] mt-6 mb-6">
              Trusted Movers in Perth - Residential, Commercial & Furniture Removals
            </h1>
            <p className="font-Poppins text-white opacity-80 mb-9 w-full sm:w-10/12">
              Fully insured, local Perth moving company. Get your free instant quote in 60 seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:041207264"
                className="primary-btn2"
                aria-label="Call Awesome Mate Removals on 041207264"
              >
                Call Us Now: 041207264
                <FaPhone size={"18"} />
              </a>
            </div>
          </div>
          <div id="contact-form" className="relative w-full max-w-[420px] mx-auto lg:max-w-[420px] lg:ml-auto lg:mr-0 lg:mt-0 lg:mb-28 xl:mb-32 self-end">
            {/* Contact Form Component */}
            <div className="bg-white bg-opacity-95 p-5 md:p-6 rounded-lg shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

