import { useState } from "react";
import { FaArrowRightLong, FaCircleCheck } from "react-icons/fa6";
import aboutThumb from "/images/gallery/truck-1.png";
import aboutShape from "/images/about-shape2.png";
import icon from "/images/counter-icon.png";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { CiPlay1 } from "react-icons/ci";

const About = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <section id="about" className="performance-section py-[120px] scroll-mt-[120px]">
      <div className="Container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[92px] lg:gap-5 xl:gap-24 items-center">
          <div className="relative">
            <img src={aboutThumb?.src || aboutThumb} alt="Truck on a Perth moving job" loading="lazy" decoding="async" />
            <div className="absolute top-[4.5rem] right-[3rem]">
              <button
                type="button"
                aria-label="Play company introduction video"
                className="h-[90px] w-[90px] rounded-full bg-SecondaryColor-0 border-4 border-white text-white flex justify-center items-center relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-SecondaryColor-0 before:opacity-50 before:-z-10 before:rounded-full before:animate-ping"
                onClick={() => setIsVideoOpen(true)}
              >
                <CiPlay1 size={"30"} />
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src={aboutShape?.src || aboutShape}
              className="absolute -top-6 right-0 animate-rotational"
              alt=""
              loading="lazy"
              decoding="async"
            />
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
                <Link to={"/about"}>
                  <button className="primary-btn2 mt-9">
                    More About Us
                    <FaArrowRightLong size={"20"} />
                  </button>
                </Link>
              </div>
              <div className="bg-PrimaryColor-0 rounded-lg w-[192px] h-[192px] px-4 flex justify-center items-center flex-col">
                <img src={icon?.src || icon} alt="Moving service counter icon" loading="lazy" decoding="async" />
                <CountUp
                  start={-11}
                  end={12}
                  suffix="+"
                  className="text-[36px] font-Inter font-bold text-HeadingColor-0"
                />
                <p className="font-Poppins text-TextColor-0 font-light text-center">
                  Service Types Covered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isVideoOpen ? (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/80 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Company introduction video"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close video"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-HeadingColor-0"
              onClick={() => setIsVideoOpen(false)}
            >
              Close
            </button>
            <video className="w-full h-auto" controls autoPlay playsInline preload="none">
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default About;

