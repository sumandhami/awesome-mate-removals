/* eslint-disable no-unused-vars */
import boxShape from "/images/work-shape.png";
import { FiClipboard, FiPackage, FiTruck } from "react-icons/fi";
import ProcessCard from "./ProcessCard";

const processData = [
  {
    id: 1,
    processIcon: <FiClipboard size={42} />,
    boxNumber: "1",
    boxShape: boxShape,
    processTitle: "Get a Free Quote",
    processDesc: "Share your moving details and receive a fast, transparent quote in under 60 seconds.",
  },
  {
    id: 2,
    processIcon: <FiPackage size={42} />,
    boxNumber: "2",
    boxShape: boxShape,
    processTitle: "We Pack and Load",
    processDesc: "Our local team carefully packs, protects, and loads your items with proven moving systems.",
  },
  {
    id: 3,
    processIcon: <FiTruck size={42} />,
    boxNumber: "3",
    processTitle: "Safe Delivery",
    processDesc: "We transport and unload your belongings securely, on-time, and exactly where you need them.",
  },
];

const Process = () => {
  return (
    <section className="performance-section pt-28 pb-10 relative">
      <div className="Container">
        <div className="text-center">
          <div>
            <h5 className="font-Inter font-medium text-SecondaryColor-0">
              WORKING PROCESS
            </h5>
            <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-HeadingColor-0 mt-3 mb-3">
              How It Works
            </h2>
            <p className="font-Poppins text-TextColor-0 font-light lg:w-3/5 2xl:w-3/4 mx-auto">
              A simple three-step process that keeps your move clear, efficient, and stress-free from quote to final delivery.
            </p>
          </div>
        </div>
        <div className="pb-16 mt-[60px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {processData.map(
              ({
                id,
                processIcon,
                processTitle,
                boxNumber,
                processDesc,
                boxShape,
              }) => {
                return (
                  <div key={id}>
                    <ProcessCard
                      processIcon={processIcon}
                      boxNumber={boxNumber}
                      boxShape={boxShape}
                      processTitle={processTitle}
                      processDesc={processDesc}
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

export default Process;

