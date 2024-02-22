"use client";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { FiSearch } from "react-icons/fi";
import * as React from "react";

//hero component with search box init used in app store
export function AppStoreHero() {
  const {
    page: {
      store: { search_label },
    },
  } = useGetDictionary();
  return (
    <section className="centered-col app-store-hero relative h-48 min-h-48 w-full rounded-lg px-6">
      <div className="row h-10 w-full min-w-60 max-w-lg rounded-md bg-background p-1">
        <input
          className="h-full w-full border-none bg-transparent px-2 font-normal focus:outline-0 focus:ring-0"
          type="search"
        />
        <Button>
          <FiSearch size="1rem" className="me-1" />
          {search_label}
        </Button>
      </div>
    </section>
  );
}
