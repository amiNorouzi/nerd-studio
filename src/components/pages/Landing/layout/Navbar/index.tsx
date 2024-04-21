"use client";
import { NavigationMenuDropDown } from "@/components/pages/Landing/common/navbarDropDown";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 60); // Change color after 60px scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`padding-x ${isScrolled ? "ScrollBavBg shadow " : "nav-bg"}  nav-bg fixed left-0 top-0  z-[999] flex w-full flex-row items-center justify-between py-3 `}
    >
      <div className="flex flex-row items-center gap-x-2 lg:gap-x-3">
        <Image
          src={"/images/landing/nerdStudio.svg"}
          alt={"nerdStudio"}
          height={46}
          width={48}
          className="h-[36px] w-[38px] lg:h-[46px] lg:w-[48px] "
        />
        <span className="font-sans  text-lg font-medium xl:text-2xl xl:font-bold ">
          Nerd Studio
        </span>
      </div>
      <div className="hidden lg:flex">
        <NavigationMenuDropDown />
      </div>
      <div>
        <Link href="dashboard">
          <Button className="hidden px-9 py-[19px]  lg:flex">
            Get Start For free
          </Button>
        </Link>
        {/*TODO:convert this image to svg tag
         */}
        <Image
          className="flex lg:hidden"
          src={"/images/landing/menu.svg"}
          alt={"menu"}
          width={18}
          height={12}
        />
      </div>
    </nav>
  );
};

export default Navbar;
