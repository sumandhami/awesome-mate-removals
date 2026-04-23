/* eslint-disable react/prop-types */
import Link from "next/link";

const ACTIVE_ROUTE_HREFS = new Set([
  "/",
  "/services",
  "/blog/how-to-move-heavy-furniture-without-damage",
]);

const normalizeActiveRouteHref = (href, fallbackHref) => {
  if (typeof href !== "string" || !href.trim()) {
    return fallbackHref;
  }

  try {
    const parsedUrl = new URL(href.trim(), "https://local.internal");
    const normalizedPath = parsedUrl.pathname.replace(/\/+$/, "") || "/";
    return ACTIVE_ROUTE_HREFS.has(normalizedPath) ? normalizedPath : fallbackHref;
  } catch {
    return fallbackHref;
  }
};

const BlogCard = ({blogThumb,thumbDate,thumbMonth,blogUrl,blogTitle,blogDesc,btnContent,btnIcon}) => {
    const normalizedBlogHref = normalizeActiveRouteHref(
      blogUrl,
      "/blog/how-to-move-heavy-furniture-without-damage",
    );

    return (
      <div className="bg-[#f3f4f8] group transition-all duration-500 hover:bg-white hover:shadow-cases rounded-md">
        <div className="relative overflow-hidden rounded-md aspect-[41/30]">
          <img src={blogThumb?.src || blogThumb} className="transition-all duration-500 scale-100 group-hover:scale-110 w-full h-full object-cover" alt={blogTitle} loading="lazy" decoding="async" />
          <div className="absolute left-5 bottom-4">
            <h6 className="font-Inter font-semibold text-2xl text-center inline-block overflow-hidden rounded px-5 py-[10px] text-HeadingColor-0 transition-all duration-500 group-hover:text-white bg-PrimaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-SecondaryColor-0 before:transition-all before:duration-500 before:-z-10 before:scale-0 group-hover:before:scale-100">
              {thumbDate}
              <div className="font-normal text-sm">{thumbMonth}</div>
            </h6>
          </div>
        </div>
        <div className="px-5 sm:px-7 pb-7">
            <Link href={normalizedBlogHref} className="font-Inter text-left font-semibold text-xl sm:text-[22px] text-HeadingColor-0 transition-all duration-500 group-hover:text-SecondaryColor-0 mt-7 mb-3 block">
              {blogTitle}
          </Link>
          <p className="font-Poppins font-light text-TextColor-0">{blogDesc}</p>
            <Link href={normalizedBlogHref} className="flex gap-2 items-center font-Inter font-medium text-HeadingColor-0 transition-all duration-500 border-b border-transparent group-hover:text-SecondaryColor-0 group-hover:border-SecondaryColor-0 mt-5">
              {btnContent}
              {btnIcon}
          </Link>
        </div>
      </div>
    );
};

export default BlogCard;
