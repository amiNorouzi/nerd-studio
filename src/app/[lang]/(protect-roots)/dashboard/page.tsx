"use client";
import type { LangParams } from "@/services/types";
import DashboardLoading from "@/app/[lang]/(protect-roots)/dashboard/loading";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/components/pages/dashboard"), {
  loading: () => <DashboardLoading />,
});

export default function DashboardPage({ params: { lang } }: LangParams) {
  return <Dashboard lang={lang} />;
}
