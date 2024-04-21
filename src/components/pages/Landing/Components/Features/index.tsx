"use client";
import TitleSection from "@/components/pages/Landing/common/TitleSection";
import { Button } from "@/components/ui/button";
import { btnFeature } from "@/constants/Landing";
import Image from "next/image";
import { TbWriting } from "react-icons/tb";

const Features = () => {
  return (
    <section className="padding-y padding-x flex flex-col justify-center">
      {/*Title section*/}
      <TitleSection
        title={"What can you do with"}
        titlePrimary={"Nerd Studio?"}
        subTitle={
          "These are the stories of our customers who have joined us with great pleasure when using."
        }
      />

      <div>
        {/*buttons */}
        <div className="mb-6 flex snap-start justify-between gap-x-4  overflow-x-scroll xl:flex-row">
          {btnFeature.map(name => (
            <Button
              variant="secondary"
              className=" h-[80px] w-full  gap-x-2 bg-[#F8F8F8] px-3 py-[34px] text-sm  font-medium leading-[18px] text-[#747474] xl:text-base"
              key={name.id}
            >
              <name.icon width={36} height={36} />
              {name.name}
            </Button>
          ))}
        </div>
        <div className="flex grid-cols-2 flex-col gap-x-6 rounded-3xl bg-[#F9F6FF] px-3 py-6 md:flex-row md:p-9 lg:grid min-[1920px]:gap-[85px] ">
          {/*Title And Sub*/}
          <div className="order-2 flex flex-col items-center justify-center md:order-1 md:items-start ">
            <div className="mb-3 flex justify-center lg:mb-6">
              <h3 className="flex items-center gap-x-3 text-center text-lg text-[#181818] lg:text-2xl lg:font-bold min-[1920px]:text-4xl">
                <div className="w-fit rounded-s bg-[#F3F0FF] p-2 text-primary xl:p-3.5 xl:text-4xl xl:text-[#551FFF]">
                  <TbWriting />
                </div>
                <span>Rewrite</span>
              </h3>
            </div>
            <div className="mb-3 lg:mb-6">
              <span className="sub-title-color text-xs leading-[18px] lg:text-sm lg:leading-[18px] 2xl:text-lg">
                <span className="inline-block lg:hidden">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockupsLorem ipsum is placeholder .
                </span>
                <span className=" hidden lg:inline-block">
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockupsLorem ipsum is placeholder text commonly used in
                  the graphic, print, and publishing industries for previewing
                  layouts and visual mockupsLorem ipsum is placeholder text
                  commonly used in the graphic, print, and publishing industries
                  for previewing layouts and visual mockups
                </span>
              </span>
            </div>
            <Button className=" px-[120px] py-3 max-[320px]:px-[100px] lg:px-[60px] lg:py-4.5">
              Do it now
            </Button>
          </div>
          {/*Image*/}
          <div className="order-1 mb-6 w-full rounded-lg  md:order-2">
            <Image
              src={"/images/landing/Desktop-8.png"}
              alt="Desktop"
              width={300}
              height={400}
              className="inline-block h-[194px] w-full lg:hidden"
            />
            <Image
              src={"/images/landing/Desktop-xl.png"}
              alt="Desktop"
              width={500}
              height={400}
              className="hidden h-[194px] w-full lg:inline-block lg:h-max"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
