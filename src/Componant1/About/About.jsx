import Image from "next/image";
import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import aboutThumb from "/images/gallery/truck-1.png";
import icon from "/images/counter-icon.png";
import Link from "next/link";

const About = () => {
  return (
    <section id="about" className="performance-section py-[120px] scroll-mt-[120px]">
      <div className="Container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[92px] lg:gap-5 xl:gap-24 items-center">
          <div className="relative">
            <Image
              src={aboutThumb}
              alt="Truck on a Perth moving job"
              width={396}
              height={528}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 396px"
              className="h-auto w-full"
            />
            {/* Static image only, video removed as per requirements */}
          </div>
          <div className="relative">
            <h5 className="font-Inter font-medium text-SecondaryColor-0">
              ABOUT US
            </h5>
            <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-HeadingColor-0 mt-3 mb-3">
              Complete Moving Support for Homes, Offices, Villas, Units and Storage
            </h2>
            <p className="font-Poppins text-TextColor-0 font-light">
              Awesome Mate Removals provides house move, office move, furniture move, rubbish removals, piano move, pool table move, marble table move, white goods move and furniture delivery services across Perth.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-between mt-7">
              <div>
                <ul>
                  <li className="flex items-center gap-2 font-Inter text-HeadingColor-0 mb-[14px]">
                    <FaCircleCheck className="text-lg text-SecondaryColor-0" />
                    Property Types: house, office, villas, storage, units, disability and NDIS moves.
                  </li>
                  <li className="flex items-center gap-2 font-Inter text-HeadingColor-0 mb-[14px]">
                    <FaCircleCheck className="text-lg text-SecondaryColor-0" />
                    Special Items: marble/stone tables, statues, pianos, pool tables, scooters and e-bikes.
                  </li>
                  <li className="flex items-center gap-2 font-Inter text-HeadingColor-0 mb-[14px]">
                    <FaCircleCheck className="text-lg text-SecondaryColor-0" />
                    Business Address: Unit 5/207 Waterloo Street, Tuart Hill WA 6060.
                  </li>
                </ul>
                <Link href="/about">
                  <button className="primary-btn2 mt-9">
                    More About Us
                    <FaArrowRightLong size={"20"} />
                  </button>
                </Link>
              </div>
              <div className="bg-PrimaryColor-0 rounded-lg w-[192px] h-[192px] px-4 flex justify-center items-center flex-col">
                <Image
                  src={icon}
                  alt="Moving service counter icon"
                  width={44}
                  height={44}
                  loading="lazy"
                />
                <span className="text-[36px] font-Inter font-bold text-HeadingColor-0">
                  12+
                </span>
                <p className="font-Poppins text-TextColor-0 font-light text-center">
                  Service Types Covered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Video modal removed as per requirements. */}
    </section>
  );
};

export default About;

