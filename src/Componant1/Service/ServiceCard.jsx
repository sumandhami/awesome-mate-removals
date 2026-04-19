/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ServiceCard = ({
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
    <div className="group">
      <div>
        <img src={serviceThumb?.src || serviceThumb} className="w-full aspect-[41/28] object-cover" alt={serviceTitle} loading="lazy" decoding="async" />
      </div>
      <div className="w-11/12 bg-HoverColor-0 rounded-ee-md rounded-r-md rounded-b-md px-8 pb-6 -mt-8 relative z-10 before:absolute before:right-0 before:w-0 before:h-full before:rounded-ee-md before:rounded-r-md before:rounded-b-md before:bg-SecondaryColor-0 before:-z-10 before:transition-all before:duration-500 group-hover:before:w-full group-hover:before:left-0">
        <img
          src={serviceShape?.src || serviceShape}
          className="absolute bottom-10 right-10 animate-dance2 -z-10 opacity-0 transition-all
           duration-500 group-hover:opacity-100" alt="" loading="lazy" decoding="async" />
        <div className="w-[80px] h-[80px] rounded-full bg-white transition-all duration-500 flex justify-center items-center group-hover:bg-PrimaryColor-0 group-hover:rotate-[360deg] relative -top-10">
          {typeof serviceIcon === "string" || serviceIcon?.src ? (
            <img src={serviceIcon?.src || serviceIcon} alt={`${serviceTitle} icon`} loading="lazy" decoding="async" />
          ) : (
            serviceIcon
          )}
        </div>
        <h3 className="font-Inter font-semibold text-white xl:text-xl 2xl:text-2xl transition-all duration-500 group-hover:text-PrimaryColor-0 -mt-3 mb-5">
          {serviceTitle}
        </h3>
        <ul className="border-b border-BorderColor2-0 mb-6 transition-all duration-500 group-hover:border-white">
          <li className="flex items-center gap-2 text-[#B8B9D5] font-Poppins mb-3 transition-all duration-500 group-hover:text-white">
            <div className="text-PrimaryColor-0">{serviceListIcon}</div>
            {serviceListContent}
          </li>
          {serviceListContent2 ? (
            <li className="flex items-center gap-2 text-[#B8B9D5] font-Poppins mb-6 transition-all duration-500 group-hover:text-white">
              <div className="text-PrimaryColor-0">{serviceListIcon}</div>
              {serviceListContent2}
            </li>
          ) : null}
        </ul>
        <Link to={serviceUrl} className="text-white font-medium font-Inter flex items-center gap-2">
            {buttonContent}
            {buttonIcon}
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;

