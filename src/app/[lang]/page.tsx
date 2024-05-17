import type { LangParams } from "@/services/types";
import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const Landing = dynamic(() => import("@/components/pages/Landing"), {
  loading: () => <HomeLoading />,
});

export default function Home({ params}: LangParams) {
  return (
    <div className='w-full'>
    <Landing params={params} />
    </div>
)
}
