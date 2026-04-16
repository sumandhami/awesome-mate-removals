import { Link } from "react-router-dom";
import serviceShape from "/images/service-shape-1.png";

const suburbs = [
  "Perth CBD",
  "Fremantle",
  "Joondalup",
  "Canning Vale",
  "Subiaco",
  "Morley",
  "Armadale",
  "Midland",
  "Osborne Park",
  "Rockingham",
  "Scarborough",
  "Victoria Park",
  "Leederville",
  "Bayswater",
  "Belmont",
];

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

const ServiceAreas = () => {
  return (
    <section className="performance-section bg-[url('/images/gallery/servicebg.png')] bg-cover bg-center bg-no-repeat py-28 relative z-10">
      <div className="absolute inset-0 bg-black/35 z-0" />
      <img
        src={serviceShape?.src || serviceShape}
        className="absolute top-0 left-0 right-0 animate-zoomInOut z-[1]"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="Container relative z-10">
        <div className="text-center">
          <h5 className="font-Inter font-medium text-PrimaryColor-0">AREAS WE SERVE</h5>
          <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-white mt-3 mb-3">
            Perth Suburbs We Move Every Week
          </h2>
          <p className="font-Poppins text-white/90 font-light lg:w-3/5 mx-auto">
            We currently service key Perth suburbs with dedicated moving crews. Suburb-specific landing pages are being rolled out in upcoming updates.
          </p>
        </div>
        <div className="mt-[45px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {suburbs.map((suburb) => (
            <Link
              key={suburb}
              to={`/services?suburb=${toSlug(suburb)}`}
              className="font-Inter text-[15px] text-HeadingColor-0 text-center bg-BodyBg-0 rounded px-4 py-3 transition-all duration-300 hover:bg-SecondaryColor-0 hover:text-white"
            >
              {suburb}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
