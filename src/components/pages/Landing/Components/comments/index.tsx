"use client";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Icons } from "@/components/icons";
import { Star } from "@/components/svg-icons/Star";
import Image from "next/image";
import useMobileSize from "@/hooks/useMobileSize";

const Comments: React.FC = () => {
  const isMobile = useMobileSize();
  const [active, setActive] = useState(
    "bg-[#F2EEFD] border-[2px] border-[#9373EE] shadow-xl",
  );
  Autoplay.globalOptions = { delay: 3000 };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
    },
    [Autoplay()],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    setActive("bg-[#F2EEFD] border-[2px] border-[#9373EE] shadow-xl");
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    setActive("bg-[#F2EEFD] border-[2px] border-[#9373EE] shadow-xl");
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        setActive("bg-[#F2EEFD] border-[2px] border-[#9373EE] shadow-xl");
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );
  // @ts-ignore
  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      emblaApi.on("select", onSelect);
      // Return a cleanup function
      return () => emblaApi.off("select", onSelect);
    }
  }, [emblaApi]);

  function f(index: number) {
    if (!isMobile) {
      if (selectedIndex === index + 1) {
        return active;
      } else {
        return "border-[2px] border-[#EFEFEF]";
      }
    } else if (isMobile) {
      if (selectedIndex === index) {
        return active;
      } else {
        return "border-[2px] border-[#EFEFEF]";
      }
    }
  }

  return (
    <section className="padding-y padding-x embla flex flex-col" ref={emblaRef}>
      <div className="mb-12 flex bg-gradient-to-r from-transparent via-white to-white">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={` ${f(index)}   mr-4 flex w-full min-w-0 max-w-[400px] flex-none flex-col rounded-3xl   p-6 `}
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
      <div className=" hidden flex-row items-center justify-between gap-x-5 lg:flex">
        <div>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={` ${index === selectedIndex ? "is-selected w-7.5 h-2.5 rounded-md bg-purple-600" : ""} mx-1 h-2.5 w-2.5 cursor-pointer rounded-full bg-gray-200`}
              onClick={() => scrollTo(index)}
            >
              {/* Dot */}
            </button>
          ))}
        </div>

        <div className="flex flex-row  gap-x-5">
          <button
            className="embla__prev rounded-full border-[2px] border-[#9373EE] p-[15px]"
            onClick={scrollPrev}
          >
            <Icons.arrowLeft color={"#9373EE"} />
          </button>
          <button
            className="embla__next rounded-full bg-[#9373EE] p-[15px]"
            onClick={scrollNext}
          >
            <Icons.arrowRight color={"#fff"} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comments;
