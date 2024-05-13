"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import useMediaQuery from "@/hooks/useMediaQuery";

/**
 * upgrade section used in dashboard page
 * show shen user has free plan
 * only show in desktop
 * @constructor
 */
export function UpgradeSection() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const isMobile = useMediaQuery("(max-width:1024px)");

  //don't show in mobile
  if (isMobile) return null;

  return (
    <section className="relative w-full pt-[35px] max-lg:hidden max-lg:h-fit lg:row-span-3">
      <div
        className="centered-col absolute left-1/2 top-0 h-[70px] w-[70px] -translate-x-1/2 rounded-full border-[3px]
      border-main-background bg-gradient-to-b from-[#5729DA] to-[#341D75]"
      >
        {/*nerd logo*/}
        <Image
          src="/images/logo.png"
          alt="nerd studio logo"
          width={80}
          height={80}
          className="h-10 w-11"
        />
      </div>
      <div
        className="col h-full w-full items-center justify-between rounded-xl bg-gradient-to-b from-[#5729DA] to-[#341D75] p-4
      pt-10 text-center text-sm text-white shadow-dashboard-card xl:h-full"
      >
        {/*user plan*/}
        <p className=" text-sms">
          {dashboardDictionary.hero_current_plan_message}
        </p>
        <span className="text-lg font-bold">Free Plan</span>
        <p className="font-normal">
          {dashboardDictionary.hero_free_plan_message}
        </p>

        {/*upgrade button*/}
        <Button className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#9D7AFF] to-[#52D5FF] text-base">
          {dashboardDictionary.hero_upgrade_button_label}
        </Button>
      </div>
    </section>
  );
}
