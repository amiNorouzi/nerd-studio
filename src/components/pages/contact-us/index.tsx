
import { LangParams } from "@/services/types";
import Navbar from "../Landing/layout/Navbar";
import Footer from "@/components/pages/Landing/layout/Footer";
import { FormSectionContactUs } from "./components/form-section";

function ContactUs({ params: { lang } }: LangParams) {
  return (
    <div lang={lang} className="mx-auto max-w-[1920px] overflow-x-hidden">
      <Navbar />
      <main>
        <div
          className={"items mt-16 md:py-10  h-auto space-y-10 bg-[#F8F8F8] md:pb-10 "}
        >
          <div className="w-full space-y-4 pt-3 text-center">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-center text-lg font-normal text-[#747474]">
              Any question or remarks? Just write us a message!
            </p>
          </div>
          <div className="w-full  items-center justify-between rounded-xl bg-white pb-10 md:relative  md:mx-[20vw]  md:flex md:w-auto md:pb-0  ">
            <div className="w-full p-4 md:w-1/2">
              <FormSectionContactUs />
            </div>
            <div className="h-96  w-full rounded-xl bg-white px-10  md:h-[50vh] md:w-1/5 md:px-0">
              <div
                className=" 
                  flex w-full items-center justify-center rounded-xl md:rounded-r-xl md:rounded-l-none
                  bg-gradient-to-r from-[#9D7AFF] to-[#52D5FF] p-4 md:h-full "
              >
                <img
                  className=" right-10 md:absolute"
                  src="/images/map.svg"
                  alt="map"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default ContactUs;
