import { homeFaqs } from "@/src/data/homepageContent";
import ServiceAccordion from "@/src/PageViews/InnerPage/ServiceDetails/Accordion/ServiceAccordion";

const HomeFaq = () => {
  return (
    <section className="performance-section py-28">
      <div className="Container">
        <div className="text-center mb-11">
          <h5 className="font-Inter font-medium text-SecondaryColor-0">FAQ</h5>
          <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-HeadingColor-0 mt-3">
            Perth Movers Frequently Asked Questions
          </h2>
        </div>
        <div>
          {homeFaqs.map((faq, index) => (
            <ServiceAccordion
              key={faq.question}
              title={faq.question}
              id={`home-faq-${index}`}
              active={index === 0}
            >
              {faq.answer}
            </ServiceAccordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;
