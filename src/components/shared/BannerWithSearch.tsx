"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";

//hero component with search box init used in app store
interface IProps {
  name: string;
  onChangeText?: (text: string) => void;
  value?: string;
}
export function BannerWithSearch({ name, onChangeText, value }: IProps) {
  const {
    common: { search },
  } = useGetDictionary();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [inputWrapperRef, setInputWrapper] = useState<HTMLDivElement | null>(
    null,
  );
  return (
    //  * with gradiant background and image on :after and :before class
    //  * background classes are in global.css
    <div
      className="relative"
      style={{
        paddingBottom: (inputWrapperRef?.clientHeight ?? 0) / 2,
      }}
    >
      <section className="centered-col app-store-hero relative h-[131px] min-h-[131px] w-full px-6"></section>
      {/*
       * search box with search icon and input
       */}
      <div
        ref={setInputWrapper}
        className="row absolute bottom-0 left-1/2 h-fit w-full min-w-60 max-w-sm -translate-x-1/2 rounded-md bg-background p-0.5 shadow-2xl sm:max-w-md md:max-w-lg"
      >
        <Button variant="ghost">
          <FiSearch size="1rem" className="me-1" />
        </Button>
        <input
          className="h-full w-full border-none bg-transparent px-2 font-normal focus:outline-0 focus:ring-0"
          type="search"
          placeholder={search}
          value={value ? value : searchParams.get(name) ?? ""}
          onChange={e =>
            onChangeText
              ? onChangeText(e.target.value)
              : setSearchParams(name, e.target.value)
          }
        />
      </div>
    </div>
  );
}
