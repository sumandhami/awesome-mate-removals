"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import About from "../../Componant1/About/About";
import Banner from "../../Componant1/Banner/Banner";
import Feature from "../../Componant1/Feature/Feature";
import Service from "../../Componant1/Service/Service";

const ProcessCard = dynamic(() => import("../../Componant1/Process/Process"));
const MovingCost = dynamic(() => import("../../Componant1/MovingCost/MovingCost"));
const WhyChoose = dynamic(() => import("../../Componant1/WhyChoose/WhyChoose"));
const ServiceAreas = dynamic(() => import("../../Componant1/ServiceAreas/ServiceAreas"));
const Blog = dynamic(() => import("../../Componant1/Blog/Blog"));
const Testimonial = dynamic(() => import("../../Componant1/Testimonial/Testimonial"));
const Portfolio = dynamic(() => import("../../Componant1/Portfolio/Portfolio"));
const HomeFaq = dynamic(() => import("../../Componant1/Faq/HomeFaq"));
const Support = dynamic(() => import("../../Componant1/Support/Support"));

const Home1 = () => {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        return;
      }

      const element = document.getElementById(hash);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

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
