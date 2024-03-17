import {
  ActivitiesSection,
  AllDocsSection,
  DashboardHero,
  ImagesSection,
  PieChartSection,
  PlanRemainingSection,
  UpgradeSection,
  MobileUpgradeSection,
  ChartsSection,
} from "./components";
import SpacesHeader from "@/components/layout/header/SpacesHeader";

import { getDictionary } from "@/lib/dictionary";

import type { Locale } from "../../../../i18n.config";
import { Show } from "@/components/shared";
import MobilePlansRemaining from "@/components/pages/dashboard/components/MobilePlansRemaining";

/**
 * Dashboard page is the main page for the user to see their data
 * @param lang lang get from the server side params
 * @constructor
 */
async function DashboardPage({ lang }: { lang: Locale }) {
  const {
    page: {
      dashboard: { header_title },
    },
  } = await getDictionary(lang);

  const activePlan = false;

  return (
    <div className="h-full overflow-y-hidden">
      <SpacesHeader>
        <h1 className="ms-2 text-[15px] font-semibold">{header_title}</h1>
      </SpacesHeader>
      <div className=" col max-h-page h-fit w-full gap-4 overflow-y-auto bg-main-background p-4 xl:gap-5 xl:p-6">
        <div
          className="flex h-fit w-full grid-cols-4 flex-col gap-4 lg:grid
         lg:h-[calc(100vh+200px)] lg:grid-rows-8 xl:h-screen xl:grid-rows-7 xl:gap-6"
        >
          <Show>
            <Show.When isTrue={activePlan}>
              <MobilePlansRemaining percentage={50} />
            </Show.When>
            <Show.Else>
              <MobileUpgradeSection />
            </Show.Else>
          </Show>
          <DashboardHero />
          <div className="col w-full gap-4 max-lg:h-fit lg:col-span-1 lg:row-span-8 lg:grid lg:grid-rows-8 xl:row-span-7 xl:gap-6">
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
          <ImagesSection />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row xl:gap-6">
          <PieChartSection />
          <ChartsSection />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
