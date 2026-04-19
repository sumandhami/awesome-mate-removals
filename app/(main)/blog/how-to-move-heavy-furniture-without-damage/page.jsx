import Image from "next/image";

const slug = "how-to-move-heavy-furniture-without-damage";
const articleTitle = "How to Move Heavy Furniture Without Damage";
const articleDescription =
  "Learn practical steps to move heavy furniture with confidence, protect your floors, and keep your belongings safe from marks or cracks.";

export const metadata = {
  title: articleTitle,
  description: articleDescription,
  alternates: {
    canonical: `/blog/${slug}`,
  },
  openGraph: {
    title: articleTitle,
    description: articleDescription,
    type: "article",
    url: `/blog/${slug}`,
  },
};

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const articleUrl = `${siteUrl}/blog/${slug}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articleTitle,
    description: articleDescription,
    datePublished: "2026-05-12",
    dateModified: "2026-05-12",
    mainEntityOfPage: articleUrl,
    image: [`${siteUrl}/images/gallery/truck-1.png`],
    author: {
      "@type": "Organization",
      name: "Awesome Mate Removals",
    },
    publisher: {
      "@type": "Organization",
      name: "Awesome Mate Removals",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <article className="py-16 sm:py-20 lg:py-24 bg-[#f3f4f8]">
        <div className="Container">
          <div className="max-w-[920px] mx-auto">
            <p className="font-Poppins text-sm sm:text-base text-SecondaryColor-0">
              12 May 2026
            </p>
            <h1 className="font-Inter font-bold text-[28px] leading-[38px] sm:text-[44px] sm:leading-[54px] text-HeadingColor-0 mt-4">
              {articleTitle}
            </h1>
            <p className="font-Poppins font-light text-TextColor-0 mt-6">
              Moving heavy furniture can feel stressful, especially when you want every item to arrive in perfect condition. A clear plan can remove most of that pressure. With the right preparation, safe lifting habits, and steady movement through each doorway, you can protect your furniture and your home at the same time.
            </p>

            <div className="relative mt-8 sm:mt-10 rounded-md overflow-hidden aspect-[16/9]">
              <Image
                src="/images/gallery/truck-1.png"
                alt="Furniture loaded safely inside a moving truck in Perth"
                fill
                priority
                quality={72}
                sizes="(max-width: 992px) 100vw, 920px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </article>

      <section className="py-14 sm:py-16 lg:py-20 bg-white">
        <div className="Container">
          <div className="max-w-[920px] mx-auto rounded-md bg-white shadow-cases p-6 sm:p-8 lg:p-10">
            <h2 className="font-Inter font-semibold text-2xl sm:text-[30px] text-HeadingColor-0">
              Start With a Clear Plan Inside Every Room
            </h2>
            <p className="font-Poppins font-light text-TextColor-0 mt-4">
              Before lifting anything, walk through the room and map the full path from the current position to the truck. Measure doorways, hallway corners, stair landings, and lift entrances. Remove rugs, small tables, and anything that could cause a slip. This simple step saves time and prevents sudden turns that often lead to dents.
            </p>
            <p className="font-Poppins font-light text-TextColor-0 mt-4">
              For larger items such as wardrobes or bed frames, take apart removable parts first. Keep screws and fittings in labeled zip bags and tape the bags to the matching furniture piece. That approach keeps reassembly smooth at your destination.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 sm:mt-10">
              <div className="relative rounded-md overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/gallery/furniture.png"
                  alt="Furniture wrapped and prepared before loading"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-md overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/gallery/commercial.png"
                  alt="Organized loading area for a professional move"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="font-Inter font-semibold text-2xl sm:text-[30px] text-HeadingColor-0 mt-10">
              Protect Surfaces Before You Lift
            </h2>
            <p className="font-Poppins font-light text-TextColor-0 mt-4">
              Wrap corners and edges with thick moving blankets, then secure them with stretch wrap. Use floor runners or cardboard sheets in high traffic areas to protect timber and tile. If an item has delicate legs, use extra padding and avoid dragging at all times.
            </p>
            <p className="font-Poppins font-light text-TextColor-0 mt-4">
              When lifting, keep your back straight and hold the weight close to your body. Move in small controlled steps and communicate clearly with your lifting partner before each turn. Calm, steady movement is far safer than speed.
            </p>

            <h2 className="font-Inter font-semibold text-2xl sm:text-[30px] text-HeadingColor-0 mt-10">
              Load the Truck With Balance and Stability
            </h2>
            <p className="font-Poppins font-light text-TextColor-0 mt-4">
              Place the heaviest pieces first so they form a strong base near the front wall of the truck. Keep weight balanced from left to right and fill gaps with soft items to reduce shifting during travel. Use tie points to hold tall pieces in place so they remain upright when the road surface changes.
            </p>
            <p className="font-Poppins font-light text-TextColor-0 mt-4">
              If a single item feels risky or awkward, stop and ask for professional help. Protecting your furniture is important, but protecting yourself is even more important.
            </p>

            <div className="mt-10 rounded-md bg-BodyBg-0 p-6 sm:p-7">
              <h3 className="font-Inter font-semibold text-[24px] text-HeadingColor-0">
                Need a Hand With a Heavy Move in Perth?
              </h3>
              <p className="font-Poppins font-light text-TextColor-0 mt-3">
                Awesome Mate Removals can handle heavy furniture with the right equipment, careful wrapping, and proven loading methods. Call our team for a fast quote and practical advice for your move.
              </p>
              <a href="tel:041207264" className="primary-btn2 w-fit mt-6">
                Call Us Now: 041207264
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
