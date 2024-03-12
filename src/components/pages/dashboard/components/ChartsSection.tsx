"use client";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TbWriting } from "react-icons/tb";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetDictionary } from "@/hooks";

import { getHslColorByVar } from "@/lib/utils";
import { docs } from "@/constants/dashboard";

//chart data
//TODO: replace with real data from api

const data = [
  {
    name: "1",
    value: 300,
  },
  {
    name: "5",
    value: 400,
  },
  {
    name: "10",
    value: 10,
  },
  {
    name: "15",
    value: 200,
  },
  {
    name: "20",
    value: 200,
  },
  {
    name: "25",
    value: 400,
  },
  {
    name: "30",
    value: 600,
  },
];

/**
 * ChartsSection component
 * used in dashboard page
 * @constructor
 */
export function ChartsSection() {
  const {
    common: { words, generated },
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();

  return (
    <section className="col flex w-full rounded-xl bg-background p-3 shadow-dashboard-card lg:w-[68%]">
      <div className="flex h-80 w-full flex-col gap-3">
        {/*title*/}
        <div className="row mb-3 gap-2 border-b">
          <TbWriting className="mb-2 h-9 w-9 rounded-lg bg-primary-light p-1.5 text-primary" />

          <div className="pb-2 max-sm:hidden">
            <h2 className="whitespace-nowrap">
              {dashboardDictionary.words_chart_title}
            </h2>
            <p className="whitespace-nowrap text-xs font-normal text-muted-foreground">
              {dashboardDictionary.words_chart_description}
            </p>
          </div>

          {/*tabs to filter*/}
          <Tabs defaultValue="1" className=" w-full ">
            <TabsList className="flex w-full justify-end overflow-hidden bg-transparent pb-0">
              {docs.map(item => (
                <TabsTrigger
                  value={item.id}
                  className="border-b-tab h-full px-1.5 text-[11px] sm:text-xs"
                  key={item.id}
                >
                  {dashboardDictionary[item.titleKey]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              right: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "0.5rem",
              }}
              label="day"
              formatter={value => [`${value} ${words}`, generated]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={getHslColorByVar("--primary")}
              fill={getHslColorByVar("--primary-light")}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
