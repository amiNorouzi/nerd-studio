"use client";
import { FiInfo } from "react-icons/fi";

import { docs } from "@/constants/dashboard";
import { MinimalButton } from "@/components/shared";

import { useGetDictionary } from "@/hooks";

const activities = [
  {
    id: "1",
    title: "ReWrite",
    date: "48 Min ago",
    typeId: "2",
  },
  {
    id: "2",
    title: "Code",
    date: "8 Hr ago",
    typeId: "4",
  },
  {
    id: "3",
    title: "Image",
    date: "2 Day ago",
    typeId: "3",
  },
  {
    id: "4",
    title: "Audio",
    date: "2 Day ago",
    typeId: "6",
  },
  {
    id: "5",
    title: "ReWrite",
    date: "1 Week ago",
    typeId: "2",
  },
  {
    id: "6",
    title: "Image",
    date: "1 Week ago",
    typeId: "3",
  },
  {
    id: "7",
    title: "Image",
    date: "1 Week ago",
    typeId: "3",
  },
];

export function ActivitiesSection() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();

  return (
    <section className="col row-span-5 h-fit w-full overflow-y-auto rounded-xl border bg-background shadow-dashboard-card lg:h-full">
      <h3 className="border-b  px-5 py-3 text-lg">
        {dashboardDictionary.activities_title}
      </h3>

      {activities.map(activity => {
        const { icon: Icon, iconBackground } = docs.find(
          i => i.id === activity.typeId,
        )!;

        return (
          <div
            className="row gap-2 px-5 py-3 [&:not(:last-child)]:border-b"
            key={activity.id}
          >
            <div
              className="centered-col h-10 w-10 rounded-lg"
              style={{ backgroundColor: iconBackground }}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="col h-full justify-between">
              <p>{activity.title}</p>
              <p className="font-normal text-muted-foreground">
                {activity.date}
              </p>
            </div>

            <MinimalButton
              Icon={FiInfo}
              className="ms-auto"
              title={dashboardDictionary.info_button_label}
            />
          </div>
        );
      })}
    </section>
  );
}
