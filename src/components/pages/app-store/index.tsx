import {
  AppsCategories,
  AppsList,
  AppStoreHero,
  HeaderSearchBox,
} from "./components";
import SpacesHeader from "@/components/layout/header/SpacesHeader";

import { getDictionary } from "@/lib/dictionary";

import type { Locale } from "../../../../i18n.config";

async function AppStorePage({ lang }: { lang: Locale }) {
  const {
    page: {
      store: { header_title },
    },
  } = await getDictionary(lang);

  return (
    <div className="w-full">
      {/*
          header with search box on right shown when hero section search box is not visible
      */}
      <SpacesHeader>
        <h1 className="ms-2 text-[15px] font-semibold">{header_title}</h1>
        <HeaderSearchBox />
      </SpacesHeader>
      <div
        id="app-store-main"
        className="col max-h-page bg-image h-[var(--main-height)] w-full gap-4 overflow-y-auto p-2 md:p-4 lg:gap-6 lg:p-6"
      >
        {/*
          hero section with search box on center
        */}
        <AppStoreHero />
        {/* apps categories tabs*/}
        <AppsCategories />
        {/* apps list*/}
        <AppsList />
      </div>
    </div>
  );
}

export default AppStorePage;
