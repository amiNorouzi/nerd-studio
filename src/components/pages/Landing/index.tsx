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

export default function Landing({ params: { lang } }: LangParams) {
  return (
    <div lang={lang} className="mx-auto max-w-[1920px] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Steps />
        <Features />
        <Services />
        <PromptsSection />
        <CustomPrompt />
        <Mobile />
        <MapWorld />
        <Gpts />
        <Comments />
        <DownloadApp />
        <Footer />
      </main>
    </div>
  );
};
