import testiImg from "/images/gallery/happy.png";
import testiIcon from "/images/testi-icon.png";
import { MdOutlineStarPurple500 } from "react-icons/md";
import TestimonialCard from "./TestimonialCard";

const fallbackReviews = [
  { _id: "1", name: "Liam Parker", suburb: "Perth CBD", title: "Smooth Residential Move", description: "The team arrived on time, packed everything carefully, and delivered without a single scratch. Excellent communication from start to finish." },
  { _id: "2", name: "Sophie Nguyen", suburb: "Joondalup", title: "Fast Furniture Removal", description: "We needed a same-week furniture move and they handled it perfectly. Friendly movers, clean truck, and very professional service." },
  { _id: "3", name: "James Fletcher", suburb: "Fremantle", title: "Reliable Office Relocation", description: "Our office relocation was completed safely and on schedule. The crew coordinated everything well and minimized downtime for our business." },
];

const Testimonial = ({ reviews = null }) => {
  const data = (reviews && reviews.length > 0 ? reviews : fallbackReviews).slice(0, 3);

  return (
    <section className="performance-section bg-[#0D3270] py-28 relative z-10">
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
          {data.map((review) => (
            <div key={review._id}>
              <TestimonialCard
                testiImg={testiImg}
                testiRatingIcon={<MdOutlineStarPurple500 />}
                testiName={review.name}
                testiDesignation={review.suburb}
                testiTilte={review.title}
                testiDesc={`"${review.description}"`}
                testiIcon={testiIcon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
