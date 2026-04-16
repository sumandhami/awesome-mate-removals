import { FiClock, FiShield, FiTruck } from "react-icons/fi";

const trustItems = [
  {
    id: 1,
    img: <FiTruck size={34} className="text-SecondaryColor-0" />,
    title: "★ Licensed Perth Business",
    desc: "Registered and operating locally across Perth suburbs.",
  },
  {
    id: 2,
    img: <FiClock size={34} className="text-SecondaryColor-0" />,
    title: "4+ Years in Business",
    desc: "Experienced local Perth moving crew.",
  },
  {
    id: 3,
    img: <FiShield size={34} className="text-SecondaryColor-0" />,
    title: "Fully Insured",
    desc: "Transit and handling coverage for home and commercial moves.",
  },
];

const Feature = () => {
  return (
    <section className="relative z-10 mt-10 lg:-mt-[42px]">
      <div className="Container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-stretch gap-7">
          {trustItems.map(({ id, img, title, desc }) => (
            <div
              key={id}
              className="flex flex-col lg:flex-col xl:flex-row lg:items-start xl:items-center gap-6 bg-BodyBg-0 px-6 sm:px-7 py-6 sm:py-7 rounded relative overflow-hidden before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-1 before:bg-SecondaryColor-0 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full"
            >
              <div>
                {typeof img === "string" || img?.src ? (
                  <img src={img?.src || img} alt="" loading="lazy" decoding="async" />
                ) : (
                  img
                )}
              </div>
              <div className="flex-1">
                <h5 className="font-Inter font-semibold text-[20px] text-HeadingColor-0">{title}</h5>
                <p className="font-Poppins text-TextColor-0 text-[15px]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;

