import ServiceAccordion from "@/src/PageViews/InnerPage/ServiceDetails/Accordion/ServiceAccordion";

const fallbackFaqs = [
  { question: "How much does a move in Perth usually cost?", answer: "Pricing depends on distance, property size, access, and packing needs. Request a free quote and we will provide transparent pricing before your move date." },
  { question: "Are your movers fully insured?", answer: "Yes. We are fully insured for residential and commercial moves, including transit coverage for your furniture and household items." },
  { question: "Do you offer packing and unpacking services?", answer: "Yes. We provide full or partial packing, secure wrapping for fragile items, and optional unpacking support at your destination." },
  { question: "Can you handle last-minute or weekend moves?", answer: "We do our best to accommodate urgent and weekend bookings based on availability. Contact us early for the best schedule options." },
  { question: "Do you provide interstate removals from Perth?", answer: "Yes. We offer interstate moving options with planned pickup windows, secure loading, and tracked transport for long-distance moves." },
];

const HomeFaq = ({ faqs = null }) => {
  const data = faqs && faqs.length > 0 ? faqs : fallbackFaqs;

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
          {data.map((faq, index) => (
            <ServiceAccordion
              key={faq._id ?? faq.question}
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
