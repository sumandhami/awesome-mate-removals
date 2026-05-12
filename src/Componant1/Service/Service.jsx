import ServiceMain from "./ServiceMain";

const Service = ({ services }) => {
  return (
    <div id="services" className="performance-section bg-[#0D3270] py-28 relative z-10 scroll-mt-[120px]">
      <div className="relative z-10">
        <ServiceMain services={services} />
      </div>
    </div>
  );
};

export default Service;

