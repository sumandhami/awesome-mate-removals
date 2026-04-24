/* eslint-disable react/prop-types */
import Link from "next/link";
import Image from "next/image";

const PortfolioCard = ({
  portfolioThumb,
  thumbTitle,
  portfolioLocateIcon,
  portfolioLocation,
  portfolioTitle,
  portfolioUrl,
  portfolioIcon,
}) => {
  const portfolioThumbSrc = typeof portfolioThumb === "string" ? portfolioThumb : portfolioThumb?.src;

  return (
    <div>
      <div className="relative z-10 overflow-hidden aspect-[7/5]">
        <Image
          src={portfolioThumbSrc}
          alt={portfolioTitle}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover"
        />
        <h6 className="font-Inter font-medium text-[15px] text-HeadingColor-0 px-[22px] py-2 rounded-full bg-PrimaryColor-0 inline-block absolute top-6 -left-full transition-all duration-500 opacity-0 portfolio-thumb-title">
          {thumbTitle}
        </h6>
        <div className="portfolio-content bg-SecondaryColor-0 rounded-s-md rounded-e-md border-b-4 border-PrimaryColor-0 absolute -bottom-full transition-all duration-500 left-0 flex justify-between items-center w-11/12 pt-7 px-4 lg:px-6 2xl:px-[30px] pb-8">
          <div>
            <p className="flex items-center gap-2 text-white font-Inter text-sm">
              <span className="text-base">{portfolioLocateIcon}</span>
              {portfolioLocation}
            </p>
            <Link href={portfolioUrl} className="font-Inter font-semibold text-xl lg:text-lg xl:text-[22px] 2xl:text-2xl text-white mt-4 text-left block">
                {portfolioTitle}
            </Link>
          </div>
          <Link href={portfolioUrl} aria-label={`View ${portfolioTitle}`} className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-HeadingColor-0 bg-PrimaryColor-0 -rotate-45">
              {portfolioIcon}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;

