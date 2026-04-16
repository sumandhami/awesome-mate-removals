/* eslint-disable no-unused-vars */
import testiImg from "/images/gallery/happy.png";
import testiImg2 from "/images/gallery/happy.png";
import testiIcon from "/images/testi-icon.png";
import { MdOutlineStarPurple500 } from "react-icons/md";
import TestimonialCard from "./TestimonialCard";
import { homeReviews } from "@/src/data/homepageContent";

const testiData = [
  {
    id: 1,
    testiImg: testiImg,
    testiRatingIcon: <MdOutlineStarPurple500 />,
    testiName: homeReviews[0].name,
    testiDesignation: homeReviews[0].suburb,
    testiTitle: homeReviews[0].title,
    testiDesc: `"${homeReviews[0].description}"`,
    testiIcon: testiIcon,
  },
  {
    id: 2,
    testiImg: testiImg2,
    testiRatingIcon: <MdOutlineStarPurple500 />,
    testiName: homeReviews[1].name,
    testiDesignation: homeReviews[1].suburb,
    testiTitle: homeReviews[1].title,
    testiDesc: `"${homeReviews[1].description}"`,
    testiIcon: testiIcon,
  },
  {
    id: 3,
    testiImg: testiImg,
    testiRatingIcon: <MdOutlineStarPurple500 />,
    testiName: homeReviews[2].name,
    testiDesignation: homeReviews[2].suburb,
    testiTitle: homeReviews[2].title,
    testiDesc: `"${homeReviews[2].description}"`,
    testiIcon: testiIcon,
  },
];

const Testimonial = () => {
  return (
    <section className="performance-section bg-[url('/images/gallery/servicebg.png')] bg-cover bg-center bg-no-repeat py-28 relative z-10">
      <div className="absolute inset-0 bg-black/35 z-0" />
      <div className="Container relative z-10">
        <div className="text-center">
          <h5 className="font-Inter font-medium text-PrimaryColor-0">
            TESTIMONIALS
          </h5>
          <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-white mt-3">
            Rated 5 Stars by Perth Customers
          </h2>
        </div>
        <div className="mt-[40px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {testiData.map(
            ({
              id,
              testiImg,
              testiRatingIcon,
              testiName,
              testiDesignation,
              testiTitle,
              testiDesc,
              testiIcon,
            }) => {
              return (
                <div key={id}>
                  <TestimonialCard
                    testiImg={testiImg}
                    testiRatingIcon={testiRatingIcon}
                    testiName={testiName}
                    testiDesignation={testiDesignation}
                    testiTilte={testiTitle}
                    testiDesc={testiDesc}
                    testiIcon={testiIcon}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
