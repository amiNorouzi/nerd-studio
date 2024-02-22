import AppStorePage from "@/components/pages/app-store";

import type { LangParams } from "@/services/types";

export default function AppStore({ params: { lang } }: LangParams) {
  return <AppStorePage lang={lang} />;
}
