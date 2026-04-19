import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import Service from "@/src/Componant1/Service/Service";
import Support from "@/src/Componant1/Support/Support";

const ServicesPage = () => {
  return (
    <>
      <section className="min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] pt-24 sm:pt-28 lg:pt-0 flex items-center overflow-hidden relative">
        <Image
          src="/images/gallery/truck-6.jpeg"
          alt="Awesome Mate Removals truck ready for a Perth move"
          fill
          priority
          quality={72}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35 z-0" />

        <div className="Container relative z-10">
          <div className="max-w-[820px] pb-16 sm:pb-20 lg:pt-14 lg:pb-0">
            <h5 className="font-Inter text-lg text-PrimaryColor-0 font-medium">
              OUR SERVICES
            </h5>
            <h1 className="font-Inter font-extrabold text-white text-[27px] leading-[38px] sm:text-[53px] sm:leading-[63px] lg:text-[50px] lg:leading-[60px] 2xl:text-[58px] 2xl:leading-[66px] mt-6 mb-6">
              Perth Removalist Services for Homes, Offices, Furniture and More
            </h1>
            <p className="font-Poppins text-white/90 mb-9 w-full lg:w-10/12">
              Choose reliable moving support from a local Perth team. We plan every step with care so your move stays on schedule and your belongings arrive safely.
            </p>
            <a
              href="tel:041207264"
              className="primary-btn2 w-fit"
              aria-label="Call Awesome Mate Removals on 041207264"
            >
              Call Us Now: 041207264
              <FaPhone size={18} />
            </a>
          </div>
        </div>
      </section>

      <Service />
      <Support />
    </>
  );
};

export default ServicesPage;
