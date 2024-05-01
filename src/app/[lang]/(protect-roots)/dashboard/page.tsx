import Dashboard from "@/components/pages/dashboard";

import type { LangParams } from "@/services/types";
import { Suspense } from "react";
import DashboardLoading from "@/app/[lang]/(protect-roots)/dashboard/loading";

export default function DashboardPage({ params: { lang } }: LangParams) {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <Dashboard lang={lang} />
    </Suspense>
  );
}
