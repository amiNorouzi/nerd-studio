"use client";
import { docs } from "@/constants/dashboard";

import { useGetDictionary } from "@/hooks";

/**
 * dashboard hero section
 * list of user generated items cards with icons and titles
 * @constructor
 */
export function DashboardHero() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();

  return (
    <section
      className="grid w-full grid-cols-3 px-1 py-2 max-xl:gap-2 max-lg:h-fit
        md:grid-cols-6 lg:col-span-3 lg:row-span-2 lg:grid-cols-3
     lg:rounded-xl lg:border lg:bg-background lg:shadow-dashboard-card xl:row-span-1 xl:grid-cols-6"
    >
      {docs.map(item => (
        <div
          key={item.id}
          className="flex h-full w-full flex-col items-center justify-center gap-2 p-2 max-lg:cursor-pointer max-lg:rounded-xl
          max-lg:border max-lg:bg-background max-lg:shadow-dashboard-card lg:flex-row xl:[&:not(:last-child)]:border-e lg:[&:not(:nth-child(3n))]:border-e"
        >
          <div
            className="centered-col aspect-square h-14 rounded-lg lg:h-full"
            style={{ backgroundColor: item.iconBackground }}
          >
            <item.icon />
          </div>
          <div className="col">
            <h3 className="text-xs font-normal ">
              {dashboardDictionary[item.titleKey]}
            </h3>
            <p className="text-[11px] font-normal text-muted-foreground max-lg:hidden">
              {dashboardDictionary[item.subtitleKey]}
            </p>
            <span className="text-sm font-bold max-lg:w-full max-lg:text-center">
              {item.generatedCount}{" "}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
