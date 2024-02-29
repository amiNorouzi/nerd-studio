import { useMediaQuery } from "usehooks-ts";

function useMobileSize() {
  return useMediaQuery("(max-width:1024px)");
}

export default useMobileSize;
