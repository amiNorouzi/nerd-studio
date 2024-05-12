"use client";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import useMobileSize from "@/hooks/useMediaQuery";

/**
 * upgrade section used in dashboard when user has free plan
 * only visible on mobile
 * contains upgrade button
 * @constructor
 */
export function MobileUpgradeSection() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const isMobile = useMobileSize();

  // only show on mobile
  if (!isMobile) return null;

  return (
    <div className="spacing-row h-fit rounded-xl bg-gradient-to-r from-[#5729DA] to-[#341D75] px-4 py-3 text-white shadow-dashboard-card lg:hidden">
      <p className="text-sm font-bold">Free Plan</p>

      <Button className="h-8 w-fit bg-gradient-to-r from-[#9D7AFF] to-[#52D5FF] text-xs">
        {dashboardDictionary.hero_upgrade_button_label}
      </Button>
    </div>
  );
}
