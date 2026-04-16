import About from "../../Componant1/About/About";
import Banner from "../../Componant1/Banner/Banner";
import Blog from "../../Componant1/Blog/Blog";
import HomeFaq from "../../Componant1/Faq/HomeFaq";
import Feature from "../../Componant1/Feature/Feature";
import MovingCost from "../../Componant1/MovingCost/MovingCost";
import Portfolio from "../../Componant1/Portfolio/Portfolio";
import ProcessCard from "../../Componant1/Process/Process";
import ServiceAreas from "../../Componant1/ServiceAreas/ServiceAreas";
import Service from "../../Componant1/Service/Service";
import Support from "../../Componant1/Support/Support";
import Testimonial from "../../Componant1/Testimonial/Testimonial";
import WhyChoose from "../../Componant1/WhyChoose/WhyChoose";

const Home1 = () => {
  return (
    <>
      <Banner />
      <Feature />
      <About />
      <Service />
      <ProcessCard />
      <MovingCost />
      <WhyChoose />
      <ServiceAreas />
      <Blog />
      <Testimonial />
      <Portfolio />
      <HomeFaq />
      <Support />
    </>
  );
};

export default Home1;
