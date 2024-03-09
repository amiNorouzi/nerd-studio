"use client";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useGetDictionary } from "@/hooks";
import { getHslColorByVar } from "@/lib/utils";
import { DashboardHeroIcons } from "@/components/svg-icons";
import * as React from "react";

//chart data
//TODO: replace with real data from api
const data = [
  {
    day: "1",
    value: 0,
  },
  {
    day: "2",
    value: 30,
  },
  {
    day: "3",
    value: 0,
  },
  {
    day: "4",
    value: 0,
  },
  {
    day: "5",
    value: 10,
  },
  {
    day: "6",
    value: 15,
  },
  {
    day: "7",
    value: 10,
  },
  {
    day: "8",
    value: 0,
  },
  {
    day: "9",
    value: 0,
  },
  {
    day: "10",
    value: 0,
  },
  {
    day: "11",
    value: 0,
  },
  {
    day: "12",
    value: 2,
  },
  {
    day: "13",
    value: 0,
  },
  {
    day: "14",
    value: 0,
  },
  {
    day: "15",
    value: 0,
  },
  {
    day: "16",
    value: 0,
  },
  {
    day: "17",
    value: 0,
  },
  {
    day: "18",
    value: 0,
  },
  {
    day: "19",
    value: 0,
  },
  {
    day: "20",
    value: 0,
  },
  {
    day: "21",
    value: 0,
  },
  {
    day: "22",
    value: 0,
  },
  {
    day: "23",
    value: 0,
  },
  {
    day: "24",
    value: 0,
  },
  {
    day: "25",
    value: 0,
  },
  {
    day: "26",
    value: 0,
  },
  {
    day: "27",
    value: 0,
  },
  {
    day: "28",
    value: 0,
  },
  {
    day: "29",
    value: 0,
  },
  {
    day: "30",
    value: 0,
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
    <section className="col-span-2 row-span-3 flex flex-col gap-4 lg:flex-row">
      <div className="col w-full rounded-xl bg-background p-4 shadow-dashboard-card ">
        {/*title*/}
        <div className="row mb-5 gap-2">
          <div className="centered-col h-8 w-8 bg-primary-light">
            <DashboardHeroIcons.Words className="h-4 w-4" />
          </div>
          <div>
            <h2>{dashboardDictionary.words_chart_title}</h2>
            <p className="text-xs font-normal text-muted-foreground">
              {dashboardDictionary.words_chart_description}
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              right: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "0.5rem",
              }}
              label="day"
              formatter={value => [`${value} ${words}`, generated]}
            />
            <Legend />
            <Bar
              dataKey="value"
              barSize={25}
              fill={getHslColorByVar("--primary")}
              activeBar={<Rectangle fill={getHslColorByVar("--primary")} />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
