import Image from "next/image";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { LandingApp } from "@/services/landing";
interface Props {
  selectedPrompt:LandingApp
}

export const  Cards = ({selectedPrompt}:Props)=>{

  return (
    <div
      className="flex h-[450px] overflow-y-hidden grid-cols-3 flex-col gap-6  rounded-3xl bg-transparent p-0 md:grid lg:grid-cols-4 lg:justify-around lg:gap-y-6  lg:bg-secondary lg:p-6 2xl:grid-cols-4 min-[1920px]:p-[50px]">
      {/*Cards*/}
      {selectedPrompt && selectedPrompt.templates.map((template,index) => (
        <>
          {index<4 &&

        <div
          key={index}
          className="mx-0 flex w-full flex-col rounded-xl  border-[2px] border-muted-dark bg-primary-foreground p-4 md:w-fit lg:max-w-[260px] 2xl:mx-auto"
        >
          {/*image & title & Icons*/}
          <div className="mb-0 flex flex-row items-start gap-y-0 md:mb-2 md:flex-col md:justify-center md:gap-y-6">
            {/*image Card*/}
            <div
              className="flex w-[60px] items-center justify-center rounded-lg bg-secondary p-1 md:w-fit md:px-16 md:py-6 lg:w-full ">
              <Image
                src={"/images/landing/Music.svg"}
                alt={"Music"}
                height={40}
                width={40}
                className="inline-block size-10 md:size-[100px]  min-[1920px]:hidden "
              />
              <Image
                src={"/images/landing/Music.svg"}
                alt={"Music"}
                height={40}
                width={40}
                className="ml-10 mr-[60px] hidden size-10 md:size-[100px] min-[1920px]:inline-block min-[1920px]:h-[150px] min-[1920px]:w-[190px] "
              />
            </div>
            <div className=" flex w-full md:flex-row md:justify-between">
              {/*title & subTitle Card*/}
              <div className="ml-3 mr-1 flex w-full  flex-col items-start">
                  <span className="mb-1 text-sm font-normal leading-[18px] md:text-base md:font-bold">
                    {template.topic}
                  </span>
                <span className="text-xs font-medium leading-normal text-primary md:text-sm md:font-bold">
                    Design
                  </span>
              </div>
              {/*star & info icon*/}
              <div className="flex  h-full items-start gap-2.5 p-1">
                <Icons.info className="flex size-4.5 sub-title-color md:hidden md:size-6" />
                <Icons.star className="size-4.5 text-yellow-500" />
              </div>
            </div>
          </div>

          {/*paragraph & btn */}
          <div className="flex flex-col px-2 mt-auto">
            <div className="mb-1 w-full md:mb-2 lg:mb-4.5">
              <p className="sub-title-color text-[10px] lg:text-xs truncate">
                {template.prompt}
              </p>
            </div>
            <div className="flex flex-row items-center justify-end md:justify-between">
              <Button className="w-fit self-end px-[39px] py-2">
                Use App
              </Button>
              <Icons.info className="hidden size-6 sub-title-color md:flex" />
            </div>
          </div>
        </div>
          }
        </>
      ))}
    </div>

)

}