import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { openAiLogo } from "@/constants/Landing";
import Image from "next/image";

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
  });

  return (
    <div className="padding-y padding-x flex flex-col">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {openAiLogo.map(logo => (
            <div
              key={logo.id}
              className="embla__slide  flex flex-col justify-center"
            >
              <Image
                src={`/images/landing/${logo.image}`}
                alt={logo.nameAI}
                width={120}
                height={120}
                className="mb-6 size-fit"
              />
              <span>{logo.nameAI}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
