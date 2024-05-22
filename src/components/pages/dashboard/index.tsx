import {
  ActivitiesSection,
  AllDocsSection,
  ChartsSection,
  DashboardHero,
  ImagesSection,
  MobileUpgradeSection,
  PieChartSection,
  PlanRemainingSection,
  UpgradeSection,
} from "./components";
import SpacesHeader from "@/components/layout/header/SpacesHeader";

import { getDictionary } from "@/lib/dictionary";

import type { Locale } from "../../../../i18n.config";
import { Show } from "@/components/shared";
import MobilePlansRemaining from "@/components/pages/dashboard/components/MobilePlansRemaining";
import Main from "@/components/layout/Main";

/**
 * Dashboard page is the main page for the user to see their data
 * @param lang lang get from the server side params
 * @constructor
 */
export default async function DashboardPage({ lang }: { lang: Locale }) {
  const {
    page: {
      dashboard: { header_title },
    },
  } = await getDictionary(lang);

  const activePlan = false;

  return (
    <>
      <SpacesHeader>
        <h1 className="ms-2 text-[15px] font-semibold">{header_title}</h1>
      </SpacesHeader>
      <Main className="grid gap-4 bg-main-background p-4 xl:gap-5 xl:p-6">
        <div className="grid w-full grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-6">
          <Show>
            <Show.When isTrue={activePlan}>
              <MobilePlansRemaining percentage={50} />
            </Show.When>
            <Show.Else>
              <MobileUpgradeSection />
            </Show.Else>
          </Show>
          <DashboardHero />
          <div className="col w-full gap-4 col-span-3 lg:col-span-1 xl:gap-6 row-span-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:flex-row xl:gap-6">
          <PieChartSection />
          <ChartsSection />
        </div>
      </Main>
    </>
  );
}
