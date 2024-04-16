import Dashboard from "@/components/pages/dashboard";

import type { LangParams } from "@/services/types";

export default function DashboardPage({ params: { lang } }: LangParams) {
  return <Dashboard lang={lang} />;
}
