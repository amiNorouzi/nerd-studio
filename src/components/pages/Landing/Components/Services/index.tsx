import Image from "next/image";
import { ServiceSection } from "@/constants/Landing";
import { LandingService } from "@/services/landing";
// import { LandingService } from "@/services/landing";

interface Props{
  services: LandingService[];
}

export default function Services({services}:Props) {
  return (
    <section className="bg-services padding-y padding-x relative  mb-[60px] flex flex-col items-center bg-cover bg-center lg:flex-row lg:justify-between min-[1920px]:py-16">
      <h3 className="mb-9  text-center text-lg leading-normal text-white lg:text-start xl:text-2xl 2xl:text-[32px] min-[1920px]:text-3xl">
        <span>
          The services and expertise{" "}
          <span className="hidden xl:inline-block">that</span>
          <br className="hidden lg:flex" />{" "}
          <span className="inline-block xl:hidden">that</span> we offer you
        </span>
      </h3>

      <div className="z-30 flex flex-col items-center justify-end gap-7 place-self-stretch  lg:flex-row  ">
        {services && services.map(service => (
          <div
            key={service.description}
            className={`flex flex-col   items-center justify-start gap-y-4 rounded-[10px] border lg:h-full  ${"px-8 pb-5 pt-4  xl:px-12 xl:pb-[44px] xl:pt-10"} text-center  `}
          >
            <div>
              <Image
                width={70}
                height={70}
                src={service.image}
                alt={service.app}
                className={` ${"h-[48px] w-[40px] xl:lg:size-[70px] bg-transparent"} `}
              />
            </div>
            <div>
              <span className=" text-sm font-medium text-white">
                {service.description}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/*<Absolute className={"absolute -bottom-[40px] right-[150px] z-20"}>*/}
      {/*  <Image*/}
      {/*    src={"/images/landing/dash-1.svg"}*/}
      {/*    alt={"dash"}*/}
      {/*    width={200}*/}
      {/*    height={237}*/}
      {/*  />*/}
      {/*</Absolute>*/}
    </section>
  );
};
