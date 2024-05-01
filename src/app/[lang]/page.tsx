import type { LangParams } from "@/services/types";
import Landing from "@/components/pages/Landing";
import { Suspense } from "react";
import HomeLoading from "@/app/[lang]/loading";

export default function Home({ params: { lang } }: LangParams) {
  return (
    <Suspense fallback={<HomeLoading />}>
      <Landing lang={lang} />
    </Suspense>
  );
}
