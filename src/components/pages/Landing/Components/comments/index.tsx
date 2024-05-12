"use client";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Icons } from "@/components/icons";
import useMobileSize from "@/hooks/useMediaQuery";
import { CommentSection } from "@/components/pages/Landing/common/Comment";
import { Button } from "@/components/ui/button";
import { LandingComment } from "@/services/landing";

interface Props {
  comments:LandingComment[]
}
const Comments = ({comments}:Props) => {
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
    if(selectedIndex <=0){
      setSelectedIndex(comments? comments.length-1:0)
    }else{
      setSelectedIndex(prev=>prev-1)
    }
    setActive("bg-primary-light border-[2px] border-primary shadow-xl");
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi,selectedIndex]);

  const scrollNext = useCallback(() => {
    if(selectedIndex >=comments.length-1){
      setSelectedIndex(0)
    }else{
      setSelectedIndex(prev=>prev+1)
    }
    setActive("bg-primary-light border-[2px] border-primary shadow-xl");
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi,selectedIndex]);

  const scrollTo = useCallback(
    (index: number) => {
      setSelectedIndex(index)
      if (emblaApi) {
        setActive("bg-primary-light border-[2px] border-primary shadow-xl");
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi],
  );
  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      emblaApi.on("select", onSelect);
      // Return a cleanup function
      return () => {
        emblaApi.off("select", onSelect);
      }
    }
  }, [emblaApi]);

  function f(index: number) {
    if (!isMobile) {
      if (selectedIndex === index ) {
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
const onSelectHandler = (index: number) => {
    setSelectedIndex(index);
}
  return (
    <section className="padding-y padding-x embla flex flex-col" ref={emblaRef}>
      <div className="mb-12 flex bg-gradient-to-r from-transparent via-white to-white">
        {/*{comments && comments.map((comment, index) => (*/}
        {/* <CommentSection key={index} f={f} index={index} comment={comment} onSelect={onSelectHandler} />*/}
        {/*))}*/}
        {[...Array(10)].map((comment, index) => (
          <CommentSection key={index} f={f} index={index} comment={comment} onSelect={onSelectHandler} />
        ))}
      </div>
      <div className=" mx-auto lg:mx-0 flex-row items-center justify-between gap-x-5 lg:flex">
        <div className='hidden lg:flex gap-[5px]'>
          {[...Array(10)].map((_, index) => (
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
