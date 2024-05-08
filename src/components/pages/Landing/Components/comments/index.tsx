"use client";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Icons } from "@/components/icons";
import useMobileSize from "@/hooks/useMobileSize";
import { CommentSection } from "@/components/pages/Landing/common/Comment";
import { Button } from "@/components/ui/button";

const Comments: React.FC = () => {
  const isMobile = useMobileSize();
  const [active, setActive] = useState(
    "bg-primary-light border-[2px] border-primary shadow-xl",
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
    setActive("bg-primary-light border-[2px] border-primary shadow-xl");
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    setActive("bg-primary-light border-[2px] border-primary shadow-xl");
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        setActive("bg-primary-light border-[2px] border-primary shadow-xl");
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
        return "border-[2px] border-muted-dark";
      }
    } else if (isMobile) {
      if (selectedIndex === index) {
        return active;
      } else {
        return "border-[2px] border-muted-dark";
      }
    }
  }

  return (
    <section className="padding-y padding-x embla flex flex-col" ref={emblaRef}>
      <div className="mb-12 flex bg-gradient-to-r from-transparent via-white to-white">
        {[...Array(10)].map((_, index) => (
         <CommentSection key={index} f={f} index={index} />
        ))}
      </div>
      <div className=" hidden flex-row items-center justify-between gap-x-5 lg:flex">
        <div className='flex gap-[5px]'>
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              className={` ${index === selectedIndex ? " w-[45px] h-[15px] rounded-md bg-primary " : "h-[15px] w-[15px] p-2 bg-muted-dark rounded-full"}   cursor-pointer   transition-all`}
              onClick={() => scrollTo(index)}
            >
              {/* Dot */}
            </Button>
          ))}
        </div>

        <div className="flex flex-row  gap-x-5">
          <Button
            className="w-[60px] h-[60px] rounded-full bg-white border-2 border-primary"
            onClick={scrollPrev}
          >
            <Icons.arrowLeft color={"#9373EE"} />
          </Button>
          <Button
            className="w-[60px] h-[60px] rounded-full bg-primary"
            onClick={scrollNext}
          >
            <Icons.arrowRight color={"#fff"} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Comments;
