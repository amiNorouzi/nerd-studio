"use client";
import { FiSearch } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { useGetDictionary } from "@/hooks";
import useShowElementOnScroll from "@/components/pages/app-store/hooks/useShowElementOnScroll";

// used in app store header
//default is hidden and when search box main not in view it will be visible
export function HeaderSearchBox() {
  const {
    common: { search },
  } = useGetDictionary();

  const searchRef = useShowElementOnScroll("app-store-main");

  return (
    <div
      className="fit relative ms-auto opacity-0 transition-all duration-300"
      ref={searchRef}
    >
      <Input
        type="search"
        className="w-60 bg-muted ps-7 font-light"
        placeholder={search}
      />
      <FiSearch
        size="1rem"
        className="absolute start-2 top-1/2 -translate-y-1/2"
      />
    </div>
  );
}
