/* eslint-disable no-unused-vars */
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";
import {
  FiHome,
  FiTruck,
  FiBriefcase,
  FiMap,
  FiTrash2,
  FiPackage,
} from "react-icons/fi";
import { urlFor } from "@/sanity/lib/image";
import serviceThumb from "/images/gallery/services/residential.png";
import serviceThumb2 from "/images/gallery/services/furniture.png";
import serviceThumb3 from "/images/gallery/commercial.png";
import serviceThumb4 from "/images/gallery/truck-1 (1).png";
import serviceThumb5 from "/images/gallery/junk.png";
import serviceThumb6 from "/images/gallery/services/special.png";
import ServiceCard from "./ServiceCard";

// Icons are permanently hardcoded and matched by array index position.
// The CMS has no icon fields for services — same approach as Feature/Process/WhyChoose.
const serviceIcons = [
  <FiHome key="home" size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
  <FiTruck key="truck" size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
  <FiBriefcase key="briefcase" size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
  <FiMap key="map" size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
  <FiTrash2 key="trash" size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
  <FiPackage key="package" size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
];

const fallbackData = [
  {
    id: 1,
    serviceThumb: serviceThumb,
    serviceTitle: `Residential Moving`,
    serviceListContent: `Safe packing, loading, and transport for homes and apartments.`,
    serviceUrl: "#",
  },
  {
    id: 2,
    serviceThumb: serviceThumb2,
    serviceTitle: `Furniture Removals`,
    serviceListContent: `Specialist handling for heavy, fragile, and high-value furniture items.`,
    serviceUrl: "#",
  },
  {
    id: 3,
    serviceThumb: serviceThumb3,
    serviceTitle: `Commercial Relocation`,
    serviceListContent: `Planned office and retail moves with minimal business disruption.`,
    serviceUrl: "#",
  },
  {
    id: 4,
    serviceThumb: serviceThumb4,
    serviceTitle: `Interstate Removals`,
    serviceListContent: `End-to-end long-distance moving from Perth with secure transit.`,
    serviceUrl: "#",
  },
  {
    id: 5,
    serviceThumb: serviceThumb5,
    serviceTitle: `Junk Removals`,
    serviceListContent: `Fast and responsible removal of unwanted furniture, boxes, and general clutter.`,
    serviceUrl: "#",
  },
  {
    id: 6,
    serviceThumb: serviceThumb6,
    serviceTitle: `Special Items Moves`,
    serviceListContent: `Expert handling for pianos, statues, marble tables, pool tables, and fragile valuables.`,
    serviceUrl: "#",
  },
];

const ServiceMain = ({ services }) => {
  const isCms = services && services.length > 0;
  const data = isCms ? services : fallbackData;

  return (
    <section>
      <div className="Container">
        <div className="text-center">
          <h5 className="font-Inter font-medium text-PrimaryColor-0">
            OUR SERVICES
          </h5>
          <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-white mt-3">
            Perth Removalist Services
          </h2>
        </div>
        <div className="mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {data.map((item, index) => {
              const thumb = isCms && item.thumbnail?.asset
                ? urlFor(item.thumbnail).width(820).auto("format").url()
                : item.serviceThumb;

              return (
                <div key={item._id || item.id}>
                  <ServiceCard
                    serviceThumb={thumb}
                    serviceIcon={serviceIcons[index] ?? serviceIcons[0]}
                    serviceTitle={isCms ? item.title : item.serviceTitle}
                    serviceListIcon={<FaCheck />}
                    serviceListContent={isCms ? item.shortDescription : item.serviceListContent}
                    serviceListContent2={null}
                    serviceUrl={item.serviceUrl ?? "#"}
                    buttonContent="Learn More"
                    buttonIcon={<FaArrowRightLong />}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMain;
