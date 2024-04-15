"use client";
import Hero from "@/components/pages/Landing/Components/Hero";
import Steps from "@/components/pages/Landing/Components/Steps";
import Features from "@/components/pages/Landing/Components/Features";
import DownloadApp from "@/components/pages/Landing/Components/DownlaodApps";

// @ts-ignore
const Landing = () => {
  return (
    <div>
      <Hero />
      <Steps />
      <Features />
      <DownloadApp />
    </div>
  );
};

export default Landing;
