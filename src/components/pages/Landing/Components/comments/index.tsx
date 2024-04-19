"use client";
import Image from "next/image";
import { Star } from "@/components/svg-icons/Star";
import { useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const Comments = () => {
  Autoplay.globalOptions = { delay: 2000 };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
    },
    [Autoplay()],
  );
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div className="padding-y  padding-x embla" ref={emblaRef}>
      <div className="embla__container">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value, index, array) => (
          <div
            key={index}
            className="embla__slide__comment flex max-w-[400px] flex-col rounded-xl border-[2px] border-[#9373EE] bg-[#F2EEFD] p-6 shadow-xl"
          >
            <div className="mb-5 flex flex-row items-center justify-between">
              <div className="flex flex-row">
                {/*Avatar*/}
                <div className="me-1.5 rounded-full">
                  <Image
                    width={50}
                    height={50}
                    src={"/images/landing/Avatar.png"}
                    alt={"Avatar"}
                  />
                </div>
                {/*Name*/}
                <div className=" flex flex-col gap-y-[6px]">
                  <span className="text-base font-medium leading-6">
                    Viezh Robert
                  </span>
                  <span className="sub-title-color text-xs ">
                    Warsaw, Poland
                  </span>
                </div>
              </div>
              {/*Rating*/}
              <div className="flex flex-row">
                <span className="text-base">4.5</span>
                <Star className="size-6" />
              </div>
            </div>
            <div className="text-base font-normal leading-6">
              <span className=" flex md:hidden">
                “Wow... I am very happy to use this VPN, it turned out to be
                more than.
              </span>
              <span className="hidden md:flex">
                “Wow... I am very happy to use this VPN, it turned out to be
                more than my expectations and so far there have been no
                problems. LaslesVPN always the best”.
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="embla__prev" onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla__next" onClick={scrollNext}>
        Next
      </button>
    </div>
  );
};

export default Comments;
