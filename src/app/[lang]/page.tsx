import type { LangParams } from "@/services/types";
import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";
import Head from "next/head";

const Landing = dynamic(() => import("@/components/pages/Landing"), {
  loading: () => <HomeLoading />,
});

export default function Home({ params}: LangParams) {
  return (
    <div className="w-full">
      <Head>
        <meta name="cryptomus" content="4e5e222e" />
      </Head>
      <Landing params={params} />
    </div>
  );
}
