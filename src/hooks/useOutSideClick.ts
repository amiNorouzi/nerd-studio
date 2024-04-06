import { useEffect, RefObject } from "react";

/**
 * This is a custom hook for handle outside click
 *
 * */
function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | undefined>,
  isMobile: boolean = false,
  callback: (val: boolean) => void,
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isMobile) {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, isMobile]);
}
export default useOutsideClick;
