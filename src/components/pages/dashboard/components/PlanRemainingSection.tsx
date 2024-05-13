"use client";
import { Button } from "@/components/ui/button";
import { SemicircleProgressBar } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import { TbClockDollar } from "react-icons/tb";

/**
 * user plan remaining section
 * used in dashboard page to show user current plan remaining
 * show when user has a plan
 * only visible in desktop view
 * @constructor
 */
export function PlanRemainingSection() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const isMobile = useMediaQuery("(max-width:1024px)");

  // don't show in mobile view
  if (isMobile) return null;

  return (
    <section className="col w-ful relative rounded-xl bg-background shadow-dashboard-card max-lg:hidden max-lg:h-fit lg:row-span-3">
      <div className="row gap-2 border-b p-3">
        {/*remaining plan icon*/}
        <TbClockDollar className="h-7 w-7 rounded-lg bg-primary-light p-1.5 text-primary" />
        {/*title*/}
        <h2 className="col">
          {dashboardDictionary.remaining_title}
          <span className=" text-xs font-normal text-muted-foreground">
            {dashboardDictionary.remaining_subtitle}
          </span>
        </h2>
      </div>

      <div className="col h-full w-full items-center gap-2 p-3 text-center">
        {/*progress bar*/}
        <SemicircleProgressBar value={50} />
        <p className="font-normal text-muted-foreground">
          3 {dashboardDictionary.remaining_message_part_1} 60{" "}
          {dashboardDictionary.remaining_message_part_2}
        </p>

        {/*subscription button*/}
        <Button className="mt-auto w-full rounded-xl bg-gradient-to-r from-[#9D7AFF] to-[#52D5FF] text-base">
          {dashboardDictionary.subscription_button_label}
        </Button>
      </div>
    </section>
  );
}
