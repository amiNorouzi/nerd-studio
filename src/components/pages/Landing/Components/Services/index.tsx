"use client";

import Image from "next/image";

const Services = () => {
  return (
    <div className=" ">
      <div className="bg-services padding-y padding-x mb-[60px] flex flex-col items-center bg-cover bg-center lg:flex-row lg:justify-between">
        <h3 className="mb-9 text-center text-lg leading-normal text-white lg:text-start xl:text-2xl">
          <span>
            The services and expertise
            <br className="hidden lg:flex" /> that we offer you
          </span>
        </h3>

        <div className="flex flex-col items-center  justify-end gap-7  lg:flex-row ">
          <div className="flex size-fit flex-col items-center justify-start gap-y-4 rounded-[10px] border px-8 py-4 text-center lg:px-12 lg:py-10">
            <div>
              <Image
                width={70}
                height={70}
                src={"/images/landing/service-3.svg"}
                alt={"service"}
                className="size-[48px] lg:size-[70px]"
              />
            </div>
            <div>
              <span className=" text-sm font-medium text-white">
                Website <br /> Apps
              </span>
            </div>
          </div>
          <div className="flex size-fit flex-col items-center justify-start gap-y-4 rounded-[10px] border px-8 py-4 text-center lg:px-12 lg:py-10">
            <div>
              <Image
                width={70}
                height={70}
                src={"/images/landing/service-2.svg"}
                alt={"service"}
                className="size-[48px] lg:size-[70px]"
              />
            </div>
            <div>
              <span className=" text-sm font-medium text-white">
                Apps <br /> Mobile
              </span>
            </div>
          </div>

          <div className="flex size-fit flex-col items-center justify-start gap-y-4 rounded-[10px] border px-8 py-4 text-center lg:px-12 lg:py-[46px]">
            <div>
              <Image
                width={70}
                height={70}
                src={"/images/landing/service-1.svg"}
                alt={"service"}
                className=" size-[48px] lg:size-[66px]"
              />
            </div>
            <div>
              <span className=" text-sm font-medium text-white lg:text-xl 2xl:text-2xl">
                Extension
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
