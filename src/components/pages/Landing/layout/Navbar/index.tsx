"use client";
import { NavigationMenuDropDown } from "@/components/pages/Landing/common/navbarDropDown";
import { RxHamburgerMenu } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUiStore } from "@/stores/zustand/ui-store";
import { MenuDrawer } from "@/components/pages/Landing/common/MenuDrawer";
import { IoCloseSharp } from "react-icons/io5";
import { DrawerOption } from "@/components/pages/Landing/common/DrawerOption";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 60); // Change color after 60px scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const setDrawer = useUiStore.use.setIsLandingDrawerOpen()
  const isDrawerOpen = useUiStore.use.isLandingDrawerOpen()
  return (
    <nav
      className={`padding-x ${isScrolled ? "ScrollBavBg shadow " : "nav-bg"}  nav-bg absolute left-0 top-0 z-[999]  flex w-full flex-row items-center justify-between py-3 backdrop-blur-3xl `}
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
        {!isDrawerOpen && (
          <RxHamburgerMenu
            className="text-[20px] lg:hidden"
            onClick={() => setDrawer(true)}
          />
        )}
        {isDrawerOpen && (
          <IoCloseSharp
            className="text-[20px]   lg:hidden "
            onClick={() => setDrawer(false)}
          />
        )}
        <MenuDrawer>
          <div className=" flex h-auto w-screen flex-col bg-muted ">
            <DrawerOption />
            <DrawerOption />
            <DrawerOption />
            <DrawerOption />
          </div>
        </MenuDrawer>
      </div>
    </nav>
  );
};

export default Navbar;
