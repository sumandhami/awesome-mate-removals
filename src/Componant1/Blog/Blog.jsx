import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import BlogCard from "./BlogCard";

const Blog = ({ posts = [] }) => {
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="performance-section py-28 scroll-mt-[120px]">
      <div className="Container">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center">
          <div>
            <h5 className="font-Inter font-medium text-SecondaryColor-0">LATEST BLOG</h5>
            <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-HeadingColor-0 mt-3 mb-3">
              Recent Blog Posts for <br /> Perth Movers
            </h2>
          </div>
          <div className="flex lg:justify-end">
            <Link href="/blog" className="primary-btn">
              View All Blog
              <FaArrowRightLong size={"20"} />
            </Link>
          </div>
        </div>
        <div className="mt-[60px]">
          <div className="max-w-[430px] mx-auto">
            {posts.slice(0, 1).map((post) => (
              <BlogCard
                key={post._id}
                blogThumb={post.coverImage ?? null}
                thumbDate={post.publishedAt ? String(new Date(post.publishedAt).getDate()).padStart(2, "0") : ""}
                thumbMonth={post.publishedAt ? new Date(post.publishedAt).toLocaleString("en-AU", { month: "short" }).toUpperCase() : ""}
                blogUrl={`/blog/${post.slug}`}
                blogTitle={post.title}
                blogDesc={post.excerpt || ""}
                btnContent="Read More"
                btnIcon={<FaArrowRightLong />}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
