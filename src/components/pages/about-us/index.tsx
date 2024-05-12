import { LangParams } from "@/services/types";
import Footer from "@/components/pages/Landing/layout/Footer";
import HeroSection from "./components/hero-section";
import CardContactUs from "./components/card";
import Office from "./components/office";
import TeamsSection from "./components/teams";

function AboutUsPage({ params: { lang } }: LangParams) {
  return (
    <>
      <div lang={lang} className="mx-auto max-w-[1920px] overflow-x-hidden">
        <main className="bg-white">
          <HeroSection />
          <div className="mx-[5%] hidden -translate-y-10 items-center justify-center rounded-md bg-white px-5 py-8 shadow-xl md:flex">
            <div className="flex items-center justify-center gap-4 ">
              <img
                className="h-16 w-16 rounded-md"
                src="/images/gpt.jpeg"
                alt=""
              />
              <div className="">
                <h1 className=" text-2xl font-medium">title</h1>
                <p className="w-2/3 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <img
                className="h-16 w-16 rounded-md"
                src="/images/gpt.jpeg"
                alt=""
              />
              <div className="">
                <h1 className=" text-2xl font-medium">title</h1>
                <p className="w-2/3 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <img
                className="h-16 w-16 rounded-md"
                src="/images/gpt.jpeg"
                alt=""
              />
              <div className="">
                <h1 className=" text-2xl font-medium">title</h1>
                <p className="w-2/3 text-[14px] font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <TeamsSection />
          <Office />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default AboutUsPage;
