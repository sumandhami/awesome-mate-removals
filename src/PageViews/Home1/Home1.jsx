"use client";

import { useEffect, useRef, useState } from "react";
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

const DeferredSection = ({ children, minHeight = 420 }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const sectionElement = sectionRef.current;
    if (!sectionElement || typeof IntersectionObserver === "undefined") {
      const rafId = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={sectionRef} style={isVisible ? undefined : { minHeight }}>
      {isVisible ? children : null}
    </div>
  );
};

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
      <DeferredSection minHeight={520}>
        <ProcessCard />
      </DeferredSection>
      <DeferredSection minHeight={520}>
        <MovingCost />
      </DeferredSection>
      <DeferredSection minHeight={520}>
        <WhyChoose />
      </DeferredSection>
      <DeferredSection minHeight={520}>
        <ServiceAreas />
      </DeferredSection>
      <Blog />
      <DeferredSection minHeight={520}>
        <Testimonial />
      </DeferredSection>
      <DeferredSection minHeight={620}>
        <Portfolio />
      </DeferredSection>
      <DeferredSection minHeight={420}>
        <HomeFaq />
      </DeferredSection>
      <DeferredSection minHeight={360}>
        <Support />
      </DeferredSection>
    </>
  );
};

export default Home1;
