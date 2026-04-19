import { MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

const Support = ({ matchServiceAreasStyle = false }) => {
  const sectionDecorationClass = matchServiceAreasStyle
    ? ""
    : "before:absolute before:top-0 before:left-0 before:bg-[#f3f4f8] before:w-full before:h-1/2 before:-z-10";

  const backgroundClass = matchServiceAreasStyle
    ? "bg-[url('/images/gallery/servicebg.png')] bg-cover bg-center bg-no-repeat"
    : "bg-[url('/images/address-bg.png')] bg-cover bg-center bg-no-repeat";

  return (
    <section className={`performance-section relative z-10 ${sectionDecorationClass}`}>
      <div className="Container ">
        <div
          className={`grid grid-cols-1 gap-7 lg:grid-cols-2 items-center py-10 px-4 sm:py-14 sm:px-8 md:py-16 md:px-14 rounded-md relative overflow-hidden ${backgroundClass}`}
        >
          {matchServiceAreasStyle ? (
            <div className="absolute inset-0 bg-black/35 z-0 rounded-md" />
          ) : null}
          <div className="relative z-10">
            <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[34px] sm:leading-[44px] md:text-[40px] md:leading-[50px] lg:text-[30px] lg:leading-[40px] xl:text-[35px] xl:leading-[45px] 2xl:text-[42px] 2xl:leading-[52px] text-white">
                Ready to Move? Get Your <br /> Free Perth Removalist Quote Today.
            </h2>
          </div>
          <div className="flex lg:justify-end relative z-10">
              <Link to="#" className="primary-btn w-full sm:w-auto justify-center">
                <MdPhone className="text-[18px] sm:text-[20px]" />
                  Get a Free Quote
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;

