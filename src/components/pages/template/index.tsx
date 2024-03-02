import SpacesHeader from "@/components/layout/header/SpacesHeader";
import {
  BannerWithSearch,
  Categories,
  SetSearchParamProvider,
} from "@/components/shared";
import { TemplateList } from "./components";
import { getDictionary } from "@/lib/dictionary";

import { categories } from "./components/constant";
import type { LangParams } from "@/services/types";

export async function TemplatePage({ lang }: LangParams["params"]) {
  const language = await getDictionary(lang);

  /**
   * * Important: SetSearchParamProvider is used to set apps name to url search param
   *  value of it used in apps Header in  layout or form-section
   *  and everywhere that needs to know app name
   */
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
          {/*this section used for search in list*/}
          <BannerWithSearch name={"template-search"} />
          {/*this section show categories and set selected category in url search param*/}
          <Categories
            name={"select-template-category"}
            //TODO:this props must be replaced with data from api
            categories={categories}
          />
          {/*this section show list of template cards*/}
          <TemplateList />
        </div>
      </div>
    </SetSearchParamProvider>
  );
}
