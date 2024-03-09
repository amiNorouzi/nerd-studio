"use client";
import { RemainingPlan } from "@/components/svg-icons";
import { Button } from "@/components/ui/button";
import { SemicircleProgressBar } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import useMobileSize from "@/hooks/useMobileSize";

export function PlanRemainingSection() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const isMobile = useMobileSize();

  if (isMobile) return null;

  return (
    <section className="col relative row-span-3 h-full w-full rounded-xl bg-background shadow-dashboard-card max-lg:hidden">
      <div className="row gap-2 border-b p-3">
        <RemainingPlan className="h-7 w-7 rounded-lg bg-primary-light p-1.5 text-red-600" />
        {/*title*/}
        <h2 className="col">
          {dashboardDictionary.remaining_title}
          <span className=" text-xs font-normal text-muted-foreground">
            {dashboardDictionary.remaining_subtitle}
          </span>
        </h2>
      </div>

      <div className="col h-full w-full items-center gap-2 p-3 text-center">
        <SemicircleProgressBar value={50} />
        <p className="font-normal text-muted-foreground">
          3 {dashboardDictionary.remaining_message_part_1} 60{" "}
          {dashboardDictionary.remaining_message_part_2}
        </p>

        <Button className="mt-auto w-full rounded-xl bg-gradient-to-r from-[#9D7AFF] to-[#52D5FF] text-base">
          {dashboardDictionary.subscription_button_label}
        </Button>
      </div>
    </section>
  );
}
