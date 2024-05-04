import type { LangParams } from "@/services/types";
import AppStoreLoading from "@/app/[lang]/(protect-roots)/app-store/loading";
import dynamic from "next/dynamic";

const AppStorePage = dynamic(() => import("@/components/pages/app-store"), {
  loading: () => <AppStoreLoading />,
});

export default function AppStore({ params: { lang } }: LangParams) {
  return <AppStorePage lang={lang} />;
}
