import { FaArrowRight, FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import portfolioThumb from "/images/gallery/services/residential.png";
import portfolioThumb2 from "/images/gallery/services/furniture.png";
import portfolioThumb3 from "/images/gallery/commercial.png";
import portfolioThumb5 from "/images/gallery/junk.png";
import portfolioThumb6 from "/images/gallery/truck-1 (1).png";
import portfolioThumb7 from "/images/gallery/services/special.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import PortfolioCard from "./PortfolioCard";

const fallbackPortfolio = [
  { id: 1, portfolioThumb, title: "Family Home Relocation", location: "Perth, WA", url: "#" },
  { id: 2, portfolioThumb: portfolioThumb2, title: "Heavy Furniture Transfer", location: "Joondalup, WA", url: "#" },
  { id: 3, portfolioThumb: portfolioThumb3, title: "Commercial Office Relocation", location: "Subiaco, WA", url: "#" },
  { id: 4, portfolioThumb, title: "Apartment Transition Move", location: "Fremantle, WA", url: "#" },
  { id: 5, portfolioThumb: portfolioThumb5, title: "Short-Term Storage Transfer", location: "Midland, WA", url: "#" },
  { id: 6, portfolioThumb: portfolioThumb6, title: "Long-Distance House Move", location: "Perth to Adelaide", url: "#" },
  { id: 7, portfolioThumb: portfolioThumb7, title: "Full Packing and Loading", location: "Canning Vale, WA", url: "#" },
];

const Portfolio = ({ portfolio = null }) => {
  const items = portfolio && portfolio.length > 0
    ? portfolio.map((p, i) => ({ id: i, portfolioThumb: p.image?.asset?.url ?? portfolioThumb, title: p.title, location: p.location, url: p.url ?? "#" }))
    : fallbackPortfolio;

  const settings = {
    loop: true,
    spaceBetween: 30,
    speed: 1000,
    centeredSlides: true,
    initialSlide: 1,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1400: { slidesPerView: 3 },
    },
  };
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + ' pagination-bullet"></span>';
    },
  };

  return (
    <section className="performance-section portfolio2 bg-[url('/images/portfolio-bg.png')] bg-cover bg-center bg-no-repeat py-28 portfolio">
      <div className="Container">
        <div className="flex flex-col md:flex-row gap-7 md:items-center justify-between">
          <div>
            <h5 className="font-Inter font-medium text-SecondaryColor-0">
              AWESOME MATE PORTFOLIO
            </h5>
            <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-HeadingColor-0 mt-3">
              Latest Awesome Mate Portfolio <br /> from Work Galary
            </h2>
          </div>
          <div>
            <a href="#" className="primary-btn">
              Veiw All Work
              <FaArrowRightLong size={"20"} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-[60px]">
        <Swiper {...settings} pagination={pagination} modules={[Pagination]}>
          <div>
            {items.map(({ id, portfolioThumb: thumb, title, location, url }) => (
              <SwiperSlide key={id}>
                <div className="pb-[80px]">
                  <PortfolioCard
                    portfolioThumb={thumb}
                    thumbTitle={title}
                    portfolioLocateIcon={<FaLocationDot />}
                    portfolioLocation={location}
                    portfolioUrl={url}
                    portfolioTitle={title}
                    portfolioIcon={<FaArrowRight />}
                  />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Portfolio;
