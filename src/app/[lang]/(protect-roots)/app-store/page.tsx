import AppStorePage from "@/components/pages/app-store";

import type { LangParams } from "@/services/types";
import { Suspense } from "react";
import AppStoreLoading from "@/app/[lang]/(protect-roots)/app-store/loading";

export default function AppStore({ params: { lang } }: LangParams) {
  return (
    <Suspense fallback={<AppStoreLoading />}>
      <AppStorePage lang={lang} />
    </Suspense>
  );
}
