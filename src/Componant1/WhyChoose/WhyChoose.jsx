import { FaMoneyCheckDollar, FaShieldHalved, FaTruckFast, FaUsers } from "react-icons/fa6";

const whyChooseData = [
  {
    id: 1,
    icon: <FaShieldHalved />,
    title: "Fully Insured",
    desc: "Comprehensive move protection for household, office, and furniture removals.",
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: "Experienced Local Team",
    desc: "Skilled Perth movers who know local streets, apartments, and loading access points.",
  },
  {
    id: 3,
    icon: <FaMoneyCheckDollar />,
    title: "Transparent Pricing",
    desc: "Clear quotes with no hidden surprises, so you can plan your move with confidence.",
  },
  {
    id: 4,
    icon: <FaTruckFast />,
    title: "GPS-Tracked Fleet",
    desc: "Modern trucks with route tracking for reliable scheduling and safe delivery windows.",
  },
];

const WhyChoose = () => {
  return (
    <section className="performance-section py-28">
      <div className="Container">
        <div className="text-center">
          <h5 className="font-Inter font-medium text-SecondaryColor-0">WHY CHOOSE US</h5>
          <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-HeadingColor-0 mt-3 mb-3">
            Trusted Perth Moving Experts
          </h2>
        </div>
        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {whyChooseData.map(({ id, icon, title, desc }) => (
            <div
              key={id}
              className="bg-BodyBg-0 px-7 py-8 rounded relative overflow-hidden before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-1 before:bg-SecondaryColor-0 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
            >
              <div className="w-16 h-16 rounded-full bg-white text-SecondaryColor-0 text-[26px] flex items-center justify-center">
                {icon}
              </div>
              <h4 className="font-Inter font-semibold text-[22px] text-HeadingColor-0 mt-6 mb-3">{title}</h4>
              <p className="font-Poppins text-TextColor-0 text-[15px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
