import {
  ActivitiesSection,
  AllDocsSection,
  DashboardHero,
  ImagesSection,
  PieChartSection,
  PlanRemainingSection,
  UpgradeSection,
  MobileUpgradeSection,
} from "./components";
import SpacesHeader from "@/components/layout/header/SpacesHeader";

import { getDictionary } from "@/lib/dictionary";

import type { Locale } from "../../../../i18n.config";
import { Show } from "@/components/shared";
import MobilePlansRemaining from "@/components/pages/dashboard/components/MobilePlansRemaining";

async function DashboardPage({ lang }: { lang: Locale }) {
  const {
    page: {
      dashboard: { header_title },
    },
  } = await getDictionary(lang);

  const activePlan = false;

  return (
    <div className="h-full">
      <SpacesHeader>
        <h1 className="ms-2 text-[15px] font-semibold">{header_title}</h1>
      </SpacesHeader>
      <div className="bg-image max-h-page flex h-full w-full flex-col gap-4 overflow-y-auto p-2 md:p-4 lg:grid lg:grid-cols-4 lg:grid-rows-7">
        <Show>
          <Show.When isTrue={activePlan}>
            <MobilePlansRemaining percentage={50} />
          </Show.When>
          <Show.Else>
            <MobileUpgradeSection />
          </Show.Else>
        </Show>
        <DashboardHero />
        <div className="col-span-1 row-span-7 flex grid-rows-8 gap-4 max-lg:h-fit lg:grid">
          <Show>
            <Show.When isTrue={activePlan}>
              <PlanRemainingSection />
            </Show.When>
            <Show.Else>
              <UpgradeSection />
            </Show.Else>
          </Show>
          <ActivitiesSection />
        </div>
        <AllDocsSection />
        <PieChartSection />
        <ImagesSection />
      </div>
    </div>
  );
}

export default DashboardPage;
