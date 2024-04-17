"use client";
//hazhir
//TODO:Fixed this imports
import Hero from "@/components/pages/Landing/Components/Hero";
import Steps from "@/components/pages/Landing/Components/Steps";
import Features from "@/components/pages/Landing/Components/Features";
import DownloadApp from "@/components/pages/Landing/Components/DownlaodApps";
import Navbar from "@/components/pages/Landing/layout/Navbar";
import PromptsSection from "@/components/pages/Landing/Components/Prompts";
import CustomPrompt from "@/components/pages/Landing/Components/CustomPropt";
import Mobile from "@/components/pages/Landing/Components/Mobile";
import Services from "@/components/pages/Landing/Components/Services";
import Hazhir from "@/components/pages/Landing/common/carousel";
import Gpts from "@/components/pages/Landing/Components/Gpts";
import Footer from "@/components/pages/Landing/layout/Footer";

// @ts-ignore
const Landing = ({ lang }) => {
  return (
    <div lang={lang} className="mx-auto max-w-[1920px] overflow-x-hidden">
      <Navbar />
      <div>
        <Hero />
        <Steps />
        <Features />
        <PromptsSection />
        <CustomPrompt />
        <Mobile />
        <Gpts />
        <DownloadApp />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
