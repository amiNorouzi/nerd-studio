import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

/**
 * hook to use the shad cn ui carousel api
 */
function useCarouselApi() {
  const [api, setApi] = useState<CarouselApi>();
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (api) {
      const getProgress = () => {
        setProgress(
          Math.floor(
            (100 / api.scrollSnapList().length) *
              (api.selectedScrollSnap() + 1),
          ),
        );
      };

      getProgress();
      api.on("scroll", () => {
        setHasNext(api.canScrollNext());
        setHasPrev(api.canScrollPrev());
        setActiveIndex(api.selectedScrollSnap());
        getProgress();
      });
    }
  }, [api]);

  return {
    api,
    activeIndex,
    progress,
    hasNext,
    hasPrev,
    registerApi: setApi,
  };
}

export default useCarouselApi;
