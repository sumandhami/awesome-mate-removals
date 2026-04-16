import { MdPhone } from "react-icons/md";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <section className="performance-section relative z-10 before:absolute before:top-0 before:left-0 before:bg-[#f3f4f8] before:w-full before:h-1/2 before:-z-10">
      <div className="Container ">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 items-center bg-[url('/images/address-bg.png')] bg-cover bg-center bg-no-repeat py-[60px] px-4 md:px-16 rounded-md relative">
          <div>
            <h2 className="font-Inter font-bold text-xl leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[30px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-white">
                Ready to Move? Get Your <br /> Free Perth Removalist Quote Today.
            </h2>
          </div>
          <div className="flex lg:justify-end">
              <Link to="#" className="primary-btn">
                <MdPhone size={"20"} />
                  Get a Free Quote
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;

