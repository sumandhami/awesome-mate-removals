import Link from "next/link";

const fallbackSuburbs = [
  { suburb: "Perth CBD", slug: "perth-cbd" },
  { suburb: "Fremantle", slug: "fremantle" },
  { suburb: "Joondalup", slug: "joondalup" },
  { suburb: "Canning Vale", slug: "canning-vale" },
  { suburb: "Subiaco", slug: "subiaco" },
  { suburb: "Morley", slug: "morley" },
  { suburb: "Armadale", slug: "armadale" },
  { suburb: "Midland", slug: "midland" },
  { suburb: "Osborne Park", slug: "osborne-park" },
  { suburb: "Rockingham", slug: "rockingham" },
  { suburb: "Scarborough", slug: "scarborough" },
  { suburb: "Victoria Park", slug: "victoria-park" },
  { suburb: "Leederville", slug: "leederville" },
  { suburb: "Bayswater", slug: "bayswater" },
  { suburb: "Belmont", slug: "belmont" },
];

const ServiceAreas = ({ serviceAreas = null }) => {
  const areas = serviceAreas && serviceAreas.length > 0 ? serviceAreas : fallbackSuburbs;

  return (
    <section className="performance-section bg-[#0D3270] py-28 relative z-10">
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
          {areas.map(({ suburb, slug }) => (
            <Link
              key={suburb}
              href={`/services?suburb=${slug}`}
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
