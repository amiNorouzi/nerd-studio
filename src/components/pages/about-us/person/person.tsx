"use client";
import { useGetEmploye } from "@/services/static-pages/contact-us";
import { IoLogoInstagram } from "react-icons/io5";
import { LuFacebook } from "react-icons/lu";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { TfiTwitter } from "react-icons/tfi";
import HeroSectionPerson from "./components/hero-section-person";
import Footer from "../../Landing/layout/Footer";
import Information from "./components/informations";

function PersonPage({ personId }: { personId: string }) {
  const { data, isLoading } = useGetEmploye(personId);
  
  return (
    <>
      {!isLoading && (
        <>
          <div className="w-full pb-10">
            <HeroSectionPerson data={data} />
            <div className="w-full md:flex items-start justify-center md:px-16 md:gap-10">
              <div className="flex  flex-col items-center justify-start space-y-2 pt-10 ">
                <img
                  className="h-44 w-44 rounded-full"
                  src={data?.avatar}
                  alt=""
                />{" "}
                <h1 className=" mt-3 py-4 text-4xl font-normal text-black">
                  {data?.name} {data?.family}
                </h1>
                <p className=" text-base font-medium text-[#9373EE]">
                  {data?.role.title}
                </p>
                <p className="text-[14px] font-normal text-[#747474]">
                  {data?.about}
                </p>
                <div className="flex items-center justify-center gap-5 pt-4">
                  <TfiTwitter className="h-4 w-4 text-[#747474]" />
                  <IoLogoInstagram className="h-4 w-4 text-[#747474]" />
                  <PiLinkedinLogoBold className="h-4 w-4 text-[#747474]" />
                  <LuFacebook className="h-4 w-4 text-[#747474]" />
                </div>
              </div>
              <Information data={data}/>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default PersonPage;
