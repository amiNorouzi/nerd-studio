import { NavigationMenuDropDown } from "@/components/pages/Landing/common/navbarDropDown";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div
      className={`padding-x nav-bg fixed left-0 top-0  z-[999] flex w-full flex-row items-center justify-between py-3 `}
    >
      <div className="flex flex-row items-center gap-x-3">
        {/*<NerdStudioIcon className={"size-[36px] lg:size-[44px]"} />*/}
        <span className="max-md::text-2xl font-sans text-[18px] font-medium md:font-bold ">
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
