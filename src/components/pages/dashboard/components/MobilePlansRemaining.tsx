"use client";
import { getHslColorByVar } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";
import useMediaQuery from "@/hooks/useMediaQuery";

/**
 * user plans remaining component
 * a circular progress bar with the remaining percentage
 * show when user has a plan
 * renders only on mobile
 * @param percentage - the remaining percentage
 * @constructor
 */
function MobilePlansRemaining({ percentage }: { percentage: number }) {
  const {
    page: { dashboard: dashboardDictionary },
  } = useGetDictionary();
  const isMobile = useMediaQuery("(max-width:1024px)");

  // if not mobile, return null
  if (!isMobile) return null;

  // circle radius
  const r = 35;
  // circumference
  const circ = 2 * Math.PI * r;
  // stroke percentage
  const strokePct = ((100 - percentage) / 100) * circ; // where stroke will start, e.g. from 15% to 100%.

  return (
    <div className="py-5 lg:hidden">
      <div className=" flex h-16 flex-wrap items-center rounded-xl bg-background px-10 shadow-dashboard-card">
        <div className="-m-6 flex items-center justify-center overflow-hidden rounded-full bg-white">
          <svg className="h-24 w-24 ">
            {/*gradiant for stroke*/}
            <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#52D5FF"></stop>
              <stop offset="100%" stopColor="#9D7AFF"></stop>
            </linearGradient>
            {/*gradiant for text*/}
            <linearGradient id="textGradiant" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9D7AFF"></stop>
              <stop offset="100%" stopColor="#52D5FF"></stop>
            </linearGradient>
            <g className="origin-center -rotate-90">
              <circle
                r={r}
                cx={48}
                cy={48}
                fill="transparent"
                stroke={getHslColorByVar("--muted-dark")}
                strokeWidth="0.4rem"
                strokeDasharray={circ}
                strokeDashoffset={0}
              />
              <circle
                r={r}
                cx={48}
                cy={48}
                fill="transparent"
                stroke="url(#linearColors)"
                strokeWidth="0.4rem"
                strokeDasharray={circ}
                strokeDashoffset={strokePct}
                strokeLinecap="round"
              />
            </g>
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="url(#textGradiant)"
              className="text-lg"
            >
              {percentage}%
            </text>
          </svg>
        </div>
        <p className="ml-10 text-sm font-normal text-muted-foreground ">
          {dashboardDictionary.remaining_subscription_mobile}
        </p>
      </div>
    </div>
  );
}

export default MobilePlansRemaining;
