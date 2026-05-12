import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POST_BY_SLUG_QUERY, ALL_POST_SLUGS_QUERY } from "@/lib/queries/posts";

export async function generateStaticParams() {
  const slugs = await client.fetch(ALL_POST_SLUGS_QUERY, {}, { next: { tags: ["posts"] } });
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { tags: ["posts"] } });
  if (!post) return {};

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const ogImageUrl = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${slug}`,
      siteName: "Awesome Mate Removals",
      ...(ogImageUrl && { images: [{ url: ogImageUrl }] }),
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative my-8 rounded-md overflow-hidden aspect-[16/9]">
          <Image
            src={urlFor(value).width(920).height(518).auto("format").url()}
            alt={value.alt || ""}
            fill
            loading="lazy"
            sizes="(max-width: 992px) 100vw, 920px"
            className="object-cover"
          />
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-Inter font-semibold text-2xl sm:text-[30px] text-HeadingColor-0 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-Inter font-semibold text-xl sm:text-[24px] text-HeadingColor-0 mt-8">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="font-Poppins font-light text-TextColor-0 mt-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside font-Poppins font-light text-TextColor-0 mt-4 space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside font-Poppins font-light text-TextColor-0 mt-4 space-y-1">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} className="text-SecondaryColor-0 underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug }, { next: { tags: ["posts"] } });

  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://awesomemateremovals.com.au";
  const publishedDate = post.publishedAt ? new Date(post.publishedAt) : null;
  const displayDate = publishedDate
    ? publishedDate.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })
    : "";

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(920).height(518).auto("format").url()
    : null;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    ...(coverImageUrl && { image: [coverImageUrl] }),
    author: { "@type": "Organization", name: "Awesome Mate Removals" },
    publisher: { "@type": "Organization", name: "Awesome Mate Removals" },
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
            {displayDate && (
              <p className="font-Poppins text-sm sm:text-base text-SecondaryColor-0">
                {displayDate}
              </p>
            )}
            <h1 className="font-Inter font-bold text-[28px] leading-[38px] sm:text-[44px] sm:leading-[54px] text-HeadingColor-0 mt-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-Poppins font-light text-TextColor-0 mt-6">{post.excerpt}</p>
            )}
            {coverImageUrl && (
              <div className="relative mt-8 sm:mt-10 rounded-md overflow-hidden aspect-[16/9]">
                <Image
                  src={coverImageUrl}
                  alt={post.coverImage?.alt || post.title}
                  fill
                  priority
                  quality={72}
                  sizes="(max-width: 992px) 100vw, 920px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </article>

      <section className="py-14 sm:py-16 lg:py-20 bg-white">
        <div className="Container">
          <div className="max-w-[920px] mx-auto rounded-md bg-white shadow-cases p-6 sm:p-8 lg:p-10">
            {post.body && (
              <PortableText value={post.body} components={portableTextComponents} />
            )}

            <div className="mt-10 rounded-md bg-BodyBg-0 p-6 sm:p-7">
              <h3 className="font-Inter font-semibold text-[24px] text-HeadingColor-0">
                Need a Hand With a Heavy Move in Perth?
              </h3>
              <p className="font-Poppins font-light text-TextColor-0 mt-3">
                Awesome Mate Removals can handle heavy furniture with the right equipment, careful wrapping, and proven loading methods. Call our team for a fast quote.
              </p>
              <a href="tel:0412007264" className="primary-btn2 w-fit mt-6">
                Call Us Now: 0412007264
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
