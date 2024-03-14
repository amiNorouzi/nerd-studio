"use client";
import { docs } from "@/constants/dashboard";

import { useGetDictionary } from "@/hooks";
import type { Locale } from "../../../../../i18n.config";
import { getDictionary } from "@/lib/dictionary";

/**
 * chat hero section
 * @constructor
 */
export function ChatHero({ lang }: { lang: Locale }) {
  //TODO: write chat dictionary
  const {
    page: { dashboard: dashboardDictionary, chat },
  } = useGetDictionary();

  return (
    <div className="hidden w-full  flex-col items-start gap-6 rounded-3xl border px-9 py-6 lg:flex">
      <h4 className="text-base">{chat.chatHero_title}</h4>
      <section className="grid w-full grid-cols-3   max-lg:gap-2  md:grid-cols-6">
        {docs.map(item => (
          <div
            key={item.id}
            className="flex h-full w-full flex-col items-center justify-start gap-2  max-lg:cursor-pointer
           max-lg:rounded-xl max-lg:border max-lg:bg-background max-lg:shadow-dashboard-card lg:flex-row "
          >
            <div
              className="centered-col aspect-square h-14 rounded-lg lg:h-full"
              style={{ backgroundColor: item.iconBackground }}
            >
              <item.icon />
            </div>
            <div className="col p-3 text-sm  font-medium text-muted-foreground">
              <span>{dashboardDictionary[item.titleKey]}</span>
              <span>{dashboardDictionary[item.subtitleKey]}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
