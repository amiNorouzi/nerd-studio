"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { openAiLogo } from "@/constants/Landing";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface T {
  children?: React.ReactNode;
  arrayForMap?: object[];
}
const Carousel = ({}: T) => {
  Autoplay.globalOptions = { delay: 2000 };

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
    },
    [Autoplay()],
  );

  return (
    <div>
      <div className="embla z-30 py-9 " ref={emblaRef}>
        <div className=" flex h-max bg-gradient-to-r from-transparent via-white to-white ">
          {openAiLogo.map(logo => (
            <div
              key={logo.id}
              className="embla__slide flex h-max  flex-col items-center justify-center bg-[#F8F8F8] text-center md:w-[10%]"
            >
              <Image
                src={`/images/landing/${logo.image}`}
                alt={logo.nameAI}
                width={120}
                height={120}
                className="mb-6 size-[36px] md:size-[50px] lg:size-[80px] 2xl:size-[60px]"
              />
              <span className="lg:text text-xs">{logo.nameAI}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
