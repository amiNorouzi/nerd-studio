import { useMediaQuery } from "usehooks-ts";

function useMobileSize() {
  return useMediaQuery("(max-width:768px)");
}

export default useMobileSize;
