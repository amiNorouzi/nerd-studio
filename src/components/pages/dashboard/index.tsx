import {
  AllDocsSection,
  ChartsSection,
  DashboardHero,
  FavoritesSection,
  ImagesSection,
} from "./components";
import SpacesHeader from "@/components/layout/header/SpacesHeader";

import { getDictionary } from "@/lib/dictionary";

import type { Locale } from "../../../../i18n.config";

async function DashboardPage({ lang }: { lang: Locale }) {
  const {
    page: {
      dashboard: { header_title },
    },
  } = await getDictionary(lang);

  return (
    <div>
      <SpacesHeader>
        <h1 className="ms-2 text-[15px] font-semibold">{header_title}</h1>
      </SpacesHeader>
      <div className="col max-h-page bg-image h-full w-full gap-4 overflow-y-auto p-2 md:p-4 lg:gap-6 lg:p-6">
        <DashboardHero />
        <AllDocsSection />
        <ImagesSection />
        <FavoritesSection />
        <ChartsSection />
      </div>
    </div>
  );
}

export default DashboardPage;
