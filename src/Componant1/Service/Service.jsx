import ServiceMain from "./ServiceMain";
import serviceShape from "/images/service-shape-1.png";

const Service = () => {
  return (
    <div id="services" className="performance-section bg-[url('/images/gallery/servicebg.png')] bg-cover bg-center bg-no-repeat py-28 relative z-10 scroll-mt-[120px]">
      <div className="absolute inset-0 bg-black/25 z-0" />
      <img
        src={serviceShape?.src || serviceShape}
        className="absolute top-0 left-0 right-0 animate-zoomInOut z-[1]"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="relative z-10">
        <ServiceMain />
      </div>
    </div>
  );
};

export default Service;

