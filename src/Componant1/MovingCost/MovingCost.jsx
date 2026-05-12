const fallbackItems = [
  { title: "Our Hourly Rates", description: "Awesome Mate Removals charges from $110 to $160 per hour, plus a call-out fee based on travel distance." },
  { title: "Stairs and Heavy Items", description: "Stair access fees: 1 flight starts at $60 and 2 flights at $120. Heavy item handling starts from $150 up to $350." },
  { title: "Truck and Coverage", description: "We operate a 4.5 ton truck setup for residential and commercial moves, with fully insured service delivery." },
];

const MovingCost = ({ movingCost = null }) => {
  const items = movingCost?.items && movingCost.items.length > 0 ? movingCost.items : fallbackItems;

  return (
    <section className="performance-section bg-[#0D3270] py-28 relative z-10">
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
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg px-6 py-6">
              <h4 className="font-Inter font-semibold text-xl text-HeadingColor-0 mb-3">{item.title}</h4>
              <p className="font-Poppins text-TextColor-0 text-[15px]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovingCost;
