"use client";
import { useState } from "react";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import { useGetDictionary } from "@/hooks";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        className="text-[11px]"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export function PieChartSection() {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="col relative col-span-1 row-span-3 h-fit w-full rounded-xl border bg-background p-3 shadow-dashboard-card lg:h-full ">
      {/*title*/}
      <div className="h-80 lg:h-full">
        <h2>{dashboardDictionary.pie_chart_title}</h2>
        <p className=" text-xs font-normal text-muted-foreground">
          {dashboardDictionary.pie_chart_subtitle}
        </p>
        <div className="col absolute bottom-0 start-5 top-11 justify-center gap-2">
          {["Code", "Images", "Write", "Voice"].map((item, index) => (
            <div className="col" key={item}>
              <div className="row gap-2 font-normal">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                {item}
              </div>
              <span className="ms-4 text-xs font-normal">17%</span>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={45}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              activeIndex={activeIndex}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
