import Hero from "@/components/pages/Landing/Components/Hero";
import Steps from "@/components/pages/Landing/Components/Steps";
import Features from "@/components/pages/Landing/Components/Features";
import DownloadApp from "@/components/pages/Landing/Components/DownlaodApps";
import Navbar from "@/components/pages/Landing/layout/Navbar";
import PromptsSection from "@/components/pages/Landing/Components/Prompts";
import CustomPrompt from "@/components/pages/Landing/Components/CustomPropt";
import Mobile from "@/components/pages/Landing/Components/Mobile";
import Gpts from "@/components/pages/Landing/Components/Gpts";
import Footer from "@/components/pages/Landing/layout/Footer";
import Comments from "@/components/pages/Landing/Components/comments";
import Services from "@/components/pages/Landing/Components/Services";
import MapWorld from "@/components/pages/Landing/Components/MapWorld";
import type { LangParams } from "@/services/types";
import { getLandingData } from "@/services/static-pages/landing";

export default async function Landing({ params: { lang } }: LangParams) {
  const data = await getLandingData();
  return (
    <div lang={lang} className="mx-auto h-full w-full overflow-x-hidden relative">
      <Navbar />
      <main>
        <Hero />
        <Steps />
        <Features />
        <Services services={data?.services} />
        <PromptsSection prompts={data?.apps} />
        <CustomPrompt />
        <Mobile />
        <MapWorld />
        <Gpts />
        <Comments comments={data?.comments} />
        <DownloadApp />
        <Footer />
      </main>
    </div>
  );
}
