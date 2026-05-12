import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_POSTS_QUERY } from "@/lib/queries/posts";

export const metadata = {
  title: "Blog",
  description: "Moving tips, guides, and advice from the team at Awesome Mate Removals in Perth.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Awesome Mate Removals",
    description: "Moving tips, guides, and advice from the team at Awesome Mate Removals in Perth.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await client.fetch(ALL_POSTS_QUERY, {}, { next: { tags: ["posts"] } });

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-[#f3f4f8]">
      <div className="Container">
        <div className="text-center mb-12">
          <h5 className="font-Inter font-medium text-SecondaryColor-0">LATEST BLOG</h5>
          <h2 className="font-Inter font-bold text-[28px] leading-[38px] sm:text-[44px] sm:leading-[54px] text-HeadingColor-0 mt-3">
            Moving Tips &amp; Guides
          </h2>
        </div>

        {posts.length === 0 ? (
          <p className="text-center font-Poppins text-TextColor-0">No posts yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const thumbUrl = post.coverImage
                ? urlFor(post.coverImage).width(820).height(600).auto("format").url()
                : "/images/gallery/truck-1.png";

              const date = post.publishedAt ? new Date(post.publishedAt) : null;
              const day = date ? String(date.getDate()).padStart(2, "0") : "";
              const month = date ? date.toLocaleString("en-AU", { month: "short" }).toUpperCase() : "";

              return (
                <div key={post._id} className="bg-[#f3f4f8] group transition-all duration-500 hover:bg-white hover:shadow-cases rounded-md">
                  <div className="relative overflow-hidden rounded-md aspect-[41/30]">
                    <Image
                      src={thumbUrl}
                      alt={post.title}
                      width={820}
                      height={600}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="transition-all duration-500 scale-100 group-hover:scale-110 w-full h-full object-cover"
                    />
                    {day && (
                      <div className="absolute left-5 bottom-4">
                        <h6 className="font-Inter font-semibold text-2xl text-center inline-block overflow-hidden rounded px-5 py-[10px] text-HeadingColor-0 transition-all duration-500 group-hover:text-white bg-PrimaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-SecondaryColor-0 before:transition-all before:duration-500 before:-z-10 before:scale-0 group-hover:before:scale-100">
                          {day}
                          <div className="font-normal text-sm">{month}</div>
                        </h6>
                      </div>
                    )}
                  </div>
                  <div className="px-5 sm:px-7 pb-7">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-Inter text-left font-semibold text-xl sm:text-[22px] text-HeadingColor-0 transition-all duration-500 group-hover:text-SecondaryColor-0 mt-7 mb-3 block"
                    >
                      {post.title}
                    </Link>
                    <p className="font-Poppins font-light text-TextColor-0">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex gap-2 items-center font-Inter font-medium text-HeadingColor-0 transition-all duration-500 border-b border-transparent group-hover:text-SecondaryColor-0 group-hover:border-SecondaryColor-0 mt-5"
                    >
                      Read More
                      <FaArrowRightLong />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
