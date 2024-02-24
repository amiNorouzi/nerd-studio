import SpacesHeader from "@/components/layout/header/SpacesHeader";
import {
  BannerWithSearch,
  Categories,
  SetSearchParamProvider,
} from "@/components/shared";
import { TemplateList } from "./components";
import { getDictionary } from "@/lib/dictionary";

import type { LangParams } from "@/services/types";
import { categories } from "./components/constant";

export async function TemplatePage({ lang }: LangParams["params"]) {
  const language = await getDictionary(lang);
  return (
    <SetSearchParamProvider appName={"app"} appSearchParamValue={"template"}>
      <div className="h-full w-full">
        {/*<SpacesHeader>*/}
        {/*  <h1 className="ms-2 text-[15px] font-semibold">Template</h1>*/}
        {/*</SpacesHeader>*/}

        <div
          id="app-store-main"
          className="col max-h-page bg-image h-[var(--main-height)] w-full gap-4 overflow-y-auto p-2 md:p-4 lg:gap-6 lg:p-6"
        >
          <BannerWithSearch name={"template-search"} />
          <Categories
            name={"select-template-category"}
            categories={categories}
          />
          <TemplateList />
        </div>
      </div>
    </SetSearchParamProvider>
  );
}
