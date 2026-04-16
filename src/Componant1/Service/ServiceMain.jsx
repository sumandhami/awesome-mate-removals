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
import serviceThumb from "/images/gallery/residential.png";
import serviceThumb2 from "/images/gallery/furniture packing (1).png";
import serviceThumb3 from "/images/gallery/commercial.png";
import serviceThumb4 from "/images/gallery/truck-1 (1).png";
import serviceThumb5 from "/images/gallery/junk.png";
import serviceThumb6 from "/images/gallery/special (1).png";
import serviceShape from "/images/service-shape.png";
import ServiceCard from "./ServiceCard";

const serviceData = [
  {
    id: 1,
    serviceThumb: serviceThumb,
    serviceIcon: <FiHome size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
    serviceShape: serviceShape,
    serviceTitle: `Residential Moving`,
    serviceListIcon: <FaCheck />,
    serviceListContent: `Safe packing, loading, and transport for homes and apartments.`,
    serviceListContent2: null,
    serviceUrl: "#",
    buttonContent: `Learn More`,
    buttonIcon: <FaArrowRightLong />,
  },
  {
    id: 2,
    serviceThumb: serviceThumb2,
    serviceIcon: <FiTruck size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
    serviceShape: serviceShape,
    serviceTitle: `Furniture Removals`,
    serviceListIcon: <FaCheck />,
    serviceListContent: `Specialist handling for heavy, fragile, and high-value furniture items.`,
    serviceListContent2: null,
    serviceUrl: "#",
    buttonContent: `Learn More`,
    buttonIcon: <FaArrowRightLong />,
  },
  {
    id: 3,
    serviceThumb: serviceThumb3,
    serviceIcon: <FiBriefcase size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
    serviceShape: serviceShape,
    serviceTitle: `Commercial Relocation`,
    serviceListIcon: <FaCheck />,
    serviceListContent: `Planned office and retail moves with minimal business disruption.`,
    serviceListContent2: null,
    serviceUrl: "#",
    buttonContent: `Learn More`,
    buttonIcon: <FaArrowRightLong />,
  },
  {
    id: 4,
    serviceThumb: serviceThumb4,
    serviceIcon: <FiMap size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
    serviceShape: serviceShape,
    serviceTitle: `Interstate Removals`,
    serviceListIcon: <FaCheck />,
    serviceListContent: `End-to-end long-distance moving from Perth with secure transit.`,
    serviceListContent2: null,
    serviceUrl: "#",
    buttonContent: `Learn More`,
    buttonIcon: <FaArrowRightLong />,
  },
  {
    id: 5,
    serviceThumb: serviceThumb5,
    serviceIcon: <FiTrash2 size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
    serviceShape: serviceShape,
    serviceTitle: `Junk Removals`,
    serviceListIcon: <FaCheck />,
    serviceListContent: `Fast and responsible removal of unwanted furniture, boxes, and general clutter.`,
    serviceListContent2: null,
    serviceUrl: "#",
    buttonContent: `Learn More`,
    buttonIcon: <FaArrowRightLong />,
  },
  {
    id: 6,
    serviceThumb: serviceThumb6,
    serviceIcon: <FiPackage size={34} className="text-HoverColor-0 group-hover:text-white transition-all duration-500" />,
    serviceShape: serviceShape,
    serviceTitle: `Special Items Moves`,
    serviceListIcon: <FaCheck />,
    serviceListContent: `Expert handling for pianos, statues, marble tables, pool tables, and fragile valuables.`,
    serviceListContent2: null,
    serviceUrl: "#",
    buttonContent: `Learn More`,
    buttonIcon: <FaArrowRightLong />,
  },
];

const ServiceMain = () => {
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
            {serviceData.map(
              ({
                id,
                serviceThumb,
                serviceIcon,
                serviceShape,
                serviceTitle,
                serviceListIcon,
                serviceListContent,
                serviceListContent2,
                serviceUrl,
                buttonContent,
                buttonIcon,
              }) => {
                return (
                  <div key={id}>
                    <ServiceCard
                      serviceThumb={serviceThumb}
                      serviceIcon={serviceIcon}
                      serviceShape={serviceShape}
                      serviceTitle={serviceTitle}
                      serviceListIcon={serviceListIcon}
                      serviceListContent={serviceListContent}
                      serviceListContent2={serviceListContent2}
                      serviceUrl={serviceUrl}
                      buttonContent={buttonContent}
                      buttonIcon={buttonIcon}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMain;
