/* eslint-disable no-unused-vars */
import { FaArrowRightLong } from "react-icons/fa6";
import blogThumb from "/images/gallery/truck-1.jpeg";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";

const blogData = [
  {
    id: 1,
    blogThumb: blogThumb,
    thumbDate: "12",
    thumbMonth: "MAY",
    blogUrl: "/blog/how-to-move-heavy-furniture-without-damage",
    blogTitle: "How to Move Heavy Furniture Without Damage",
    blogDesc:
      "Learn practical packing and lifting methods used by professional movers.",
    btnContent: "Read More",
    btnIcon: <FaArrowRightLong />,
  },
];

const Blog = () => {
  return (
    <section id="blog" className="performance-section py-28 scroll-mt-[120px]">
      <div className="Container">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center">
          <div>
            <div>
              <h5 className="font-Inter font-medium text-SecondaryColor-0">
                LATEST BLOG
              </h5>
              <h2 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[35px] xl:leading-[45px] 2xl:text-[44px] 2xl:leading-[54px] text-HeadingColor-0 mt-3 mb-3">
                Recent Blog Posts for <br /> Perth Movers
              </h2>
            </div>
          </div>
          <div className="flex lg:justify-end">
            <Link to="#" className="primary-btn">
                Veiw All Blog
                <FaArrowRightLong size={"20"} />
            </Link>
          </div>
        </div>
        <div className="mt-[60px]">
          <div className="max-w-[430px] mx-auto">
            {blogData.map(
              ({
                id,
                blogThumb,
                thumbDate,
                thumbMonth,
                blogUrl,
                blogTitle,
                blogDesc,
                btnContent,
                btnIcon,
              }) => {
                return (
                  <div key={id}>
                    <BlogCard
                      blogThumb={blogThumb}
                      thumbDate={thumbDate}
                      thumbMonth={thumbMonth}
                      blogUrl={blogUrl}
                      blogTitle={blogTitle}
                      blogDesc={blogDesc}
                      btnContent={btnContent}
                      btnIcon={btnIcon}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
