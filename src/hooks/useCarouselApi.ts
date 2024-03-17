import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

/**
 * This is a custom React Hook that manages the state and interactions of a carousel component.
 * It uses the useState hook to store the carousel API, the current progress, the active index, and the ability to navigate to the next or previous item.
 * It uses the useEffect hook to add an event listener to the scroll event of the carousel when the API is available.
 * The event listener updates the progress, the active index, and the ability to navigate to the next or previous item.
 * The progress is calculated as the percentage of the total length of the scroll snap list that has been scrolled.
 * The active index is the index of the currently selected scroll snap.
 * The ability to navigate to the next or previous item is determined by the canScrollNext and canScrollPrev methods of the API.
 * The hook returns an object with the carousel API, the current progress, the active index, the ability to navigate to the next or previous item, and a function to register the carousel API.
 *
 * @returns {Object} An object containing the carousel API, the current progress, the active index, the ability to navigate to the next or previous item, and a function to register the carousel API.
 * @hook
 * @example
 * const { api, activeIndex, progress, hasNext, hasPrev, registerApi } = useCarouselApi();
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
