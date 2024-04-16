import Dashboard from "@/components/pages/dashboard";

import type { LangParams } from "@/services/types";
import Landing from "@/components/pages/Landing";

export default function Home({ params: { lang } }: LangParams) {
  return <Landing lang={lang} />;
}
