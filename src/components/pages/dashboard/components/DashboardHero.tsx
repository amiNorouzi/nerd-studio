"use client";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import { heroGeneratesList, heroLeftCountsList } from "@/constants/dashboard";

import { useGetDictionary } from "@/hooks";

/**
 * dashboard hero section
 * @constructor
 */
export function DashboardHero() {
  const {
    common,
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  // user data
  // TODO: replace with real user data from api
  const user = {
    fullName: "amir hossein abbas gholizadeh",
    isFreePlan: true,
    activePlanName: "Free Trial",
  };

  return (
    <section className="col rounded-lg border bg-background p-4 shadow-sm">
      <div className="dashboard-hero flex w-full flex-col items-start gap-4 rounded-md border bg-primary/5 p-4 lg:flex-row">
        <div className="col max-w-md gap-2">
          {/* user full name*/}
          <h1 className="mb-1 text-xl font-semibold capitalize">
            <span className="text-2xl font-bold">Welcome,</span> {user.fullName}
          </h1>
          {/*user plan*/}
          <p className="row gap-2">
            {dashboardDictionary.hero_current_plan_message}
            <span className="rounded-md border border-primary bg-active px-2 py-1 text-foreground shadow-sm">
              {user.activePlanName}
            </span>
          </p>

          {/*
           * if user is free plan show this message
           */}
          <RenderIf isTrue={user.isFreePlan}>
            <p className="font-normal text-muted-foreground">
              {dashboardDictionary.hero_free_plan_message}
            </p>
          </RenderIf>
          {/* upgrade button */}
          <Button className="mt-2 w-fit shadow-lg">
            {dashboardDictionary.hero_upgrade_button_label}
          </Button>
        </div>

        {/* list of user allowed items to generate */}
        <div className="mx-auto flex-grow">
          <div className="grid w-full grid-cols-2 content-center gap-4 xl:grid-cols-4">
            {heroLeftCountsList.map(item => (
              <div key={item.id} className="col gap-0.5">
                <h3 className="whitespace-nowrap text-center text-[15px] font-semibold">
                  {dashboardDictionary[item.titleKey]}
                </h3>
                <p className="text-center text-xl font-bold text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* list of user generated items */}
      <div className="grid grid-cols-2 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {heroGeneratesList.map(item => (
          <div key={item.id} className="col w-full items-center gap-1 p-2">
            <item.icon className="text-2xl text-foreground" />
            <h3 className="tex-xs font-semibold sm:text-[15px]">
              {dashboardDictionary[item.titleKey]}
            </h3>
            <p className="text-center text-foreground/80 max-sm:text-[11px]">
              <span className="text-sm font-bold text-primary md:text-base">
                {item.value}{" "}
              </span>
              {common[item.unitKey]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
