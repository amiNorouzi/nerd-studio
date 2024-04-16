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

// @ts-ignore
const Landing = ({ lang }) => {
  return (
    <div lang={lang}>
      <Navbar />
      <div>
        <Hero />
        <Steps />
        <Features />
        <DownloadApp />
        <PromptsSection />
        <CustomPrompt />
        <Mobile />
      </div>
    </div>
  );
};

export default Landing;
