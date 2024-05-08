'use server'
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
// import { Landing, useLandingData } from "@/services/landing";
import axiosClient from "@/services/axios-client";

async function getData(){
  try {
    // @ts-ignore
    const { data } = await axiosClient.get<Landing>("/landing/get_landing_data/");
    return data;
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);
    // You can choose to throw the error again to propagate it
    throw error;
  }
}



export default async function Landing({ params: { lang } }: LangParams) {
  const data = await getData();
  console.log('------------------data received is----------------',data);
  return (
    <div lang={lang} className="mx-auto max-w-[1920px] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Steps />
        <Features />
        <Services services={data.services} />
        <PromptsSection />
        <CustomPrompt />
        <Mobile />
        <MapWorld />
        <Gpts />
        <Comments comments={data.comments} />
        <DownloadApp />
        <Footer />
      </main>
    </div>
  );
};
