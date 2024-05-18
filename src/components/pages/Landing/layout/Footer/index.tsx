import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
//TODO:Fixed This component
const Footer = () => {
  return (
    <footer className="padding-x bg-black py-9   lg:bg-primary lg:py-[60px]">
      <div className="flex  flex-col justify-between   text-white md:flex-row ">
        <div>
          <div className=" mb-6 flex flex-row items-center justify-start gap-x-3 lg:mb-4.5">
            <Image
              width={36}
              height={36}
              src={"/images/landing/brand-openai.png"}
              alt="brand-openai"
            />
            <span className="text-2xl font-bold ">Brand</span>
          </div>
          <div className="flex flex-col justify-start ">
            <div className="mb-3 flex flex-row items-center gap-x-6">
              <span>Download Now</span>
              <span>License</span>
            </div>
            <div className="flex flex-row items-center justify-between gap-x-0 text-base md:justify-start lg:gap-x-6">
              <Link href="/about">
                <span>About</span>

              </Link>
              <span>Features</span>
              <span>Pricing</span>
              <span>News</span>
              <span>Help</span>
              <Link href="contact">

              <span className="hidden lg:flex">Contact</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-6">
          <span className="text-lg font-medium">Get the App</span>
          {/*map this here*/}
          <Image
            width={135}
            height={40}
            src={"/images/landing/appleStore.png"}
            alt={"appleStore"}
          />
          <Image
            width={135}
            height={40}
            src={"/images/landing/playStore.png"}
            alt={"appleStore"}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
