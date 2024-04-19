import React from "react";
import Carousel from "@/components/pages/Landing/common/carousel";

const Gpts = () => {
  return (
    <div className=" col  relative bg-[#F8F8F8]   py-6 lg:py-[10px] 2xl:py-[40px]">
      <div className="gradient-gpts absolute right-0 z-40  h-full w-3/12  bg-amber-400 "></div>
      <div className="gradient-gpts absolute left-0 z-40 h-full  w-3/12 rotate-180  bg-amber-400 "></div>
      <div className=" mb-12 flex w-full justify-center  border-t-[1.5px] border-black">
        <span className="-mt-3 whitespace-nowrap bg-[#F8F8F8] px-2 text-base font-medium leading-normal">
          One app to use them all
        </span>
      </div>
      <Carousel />
    </div>
  );
};

export default Gpts;
