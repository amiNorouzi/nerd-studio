import { NavigationMenuDropDown } from "@/components/pages/Landing/common/navbarDropDown";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div
      className={`padding-x nav-bg fixed left-0 top-0  z-[999] flex w-full flex-row items-center justify-between py-3 `}
    >
      <div className="flex flex-row items-center gap-x-2 lg:gap-x-3">
        <Image
          src={"/images/landing/nerdStudio.svg"}
          alt={"nerdStudio"}
          height={46}
          width={48}
          className="h-[36px] w-[38px] lg:h-[46px] lg:w-[48px] "
        />
        <span className="font-sans  text-lg font-medium md:text-2xl md:font-bold ">
          Nerd Studio
        </span>
      </div>
      <div className="hidden lg:flex">
        <NavigationMenuDropDown />
      </div>
      <div>
        <Button className="hidden lg:flex">Get Started</Button>
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
    </div>
  );
};

export default Navbar;
