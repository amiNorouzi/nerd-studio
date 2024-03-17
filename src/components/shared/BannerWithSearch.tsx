"use client";

import { FiSearch } from "react-icons/fi";

import { Button } from "@/components/ui/button";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

//hero component with search box init used in app store
interface IProps {
  name: string;
}
export function BannerWithSearch({ name }: IProps) {
  const {
    common: { search },
  } = useGetDictionary();
  const [searchParams, setSearchParams] = useCustomSearchParams();
  return (
    //  * with gradiant background and image on :after and :before class
    //  * background classes are in global.css
    <section className="centered-col app-store-hero relative h-48 min-h-48 w-full rounded-lg px-6">
      {/*
       * search box with search icon and input
       */}
      <div className="row h-fit w-full min-w-60 max-w-lg rounded-md bg-background p-0.5">
        <input
          className="h-full w-full border-none bg-transparent px-2 font-normal focus:outline-0 focus:ring-0"
          type="search"
          value={searchParams.get(name) ?? ""}
          onChange={e => setSearchParams(name, e.target.value)}
        />
        <Button>
          <FiSearch size="1rem" className="me-1" />
          {search}
        </Button>
      </div>
    </section>
  );
}
