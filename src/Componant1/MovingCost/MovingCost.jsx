import serviceShape from "/images/service-shape-1.png";

const MovingCost = () => {
  return (
    <section className="performance-section bg-[url('/images/gallery/servicebg.png')] bg-cover bg-center bg-no-repeat py-28 relative z-10">
      <div className="absolute inset-0 bg-black/35 z-0" />
      <img
        src={serviceShape?.src || serviceShape}
        className="absolute top-0 left-0 right-0 animate-zoomInOut z-[1]"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="Container relative z-10">
        <div className="text-center">
          <h5 className="font-Inter font-medium text-PrimaryColor-0">MOVING PRICING GUIDE</h5>
          <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-white mt-3 mb-3">
            How Much Does a Moving Company Cost in Perth?
          </h2>
          <p className="font-Poppins text-white/90 font-light lg:w-3/5 mx-auto">
            In most Perth suburbs, standard moving services usually average around $120 per hour depending on access, distance, and load size.
          </p>
        </div>
        <div className="mt-[60px] grid grid-cols-1 lg:grid-cols-3 gap-7">
          <div className="bg-white rounded-lg px-6 py-6">
            <h4 className="font-Inter font-semibold text-xl text-HeadingColor-0 mb-3">Our Hourly Rates</h4>
            <p className="font-Poppins text-TextColor-0 text-[15px]">
              Awesome Mate Removals charges from $110 to $160 per hour, plus a call-out fee based on travel distance.
            </p>
          </div>
          <div className="bg-white rounded-lg px-6 py-6">
            <h4 className="font-Inter font-semibold text-xl text-HeadingColor-0 mb-3">Stairs and Heavy Items</h4>
            <p className="font-Poppins text-TextColor-0 text-[15px]">
              Stair access fees: 1 flight starts at $60 and 2 flights at $120. Heavy item handling starts from $150 up to $350.
            </p>
          </div>
          <div className="bg-white rounded-lg px-6 py-6">
            <h4 className="font-Inter font-semibold text-xl text-HeadingColor-0 mb-3">Truck and Coverage</h4>
            <p className="font-Poppins text-TextColor-0 text-[15px]">
              We operate a 4.5 ton truck setup for residential and commercial moves, with fully insured service delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovingCost;
