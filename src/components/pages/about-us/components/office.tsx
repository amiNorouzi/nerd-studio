import { TfiTwitter } from "react-icons/tfi";
import { IoLogoInstagram } from "react-icons/io5";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { LuFacebook } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const Office = () => {
  return (
    <div className="space-y-5  bg-[#F8F8F8] py-5 text-center text-[#181818]">
      <h1 className=" text-4xl font-bold">Visit our offices</h1>
      <p className="text-[14px] font-normal text-[#747474]">
        Find us at these location.
      </p>
      <div className="mx-5  items-center justify-between space-y-3 rounded-xl bg-white pt-3 md:mx-[25%] md:flex md:space-y-0 md:pt-0">
        <div className="md:px-l space-y-3 px-4 text-start  md:pl-10 md:pt-3">
          <h1 className=" text-2xl font-medium text-black">San Francisco</h1>
          <p className=" text-base font-normal text-[#747474]">
            Find us at these location.
          </p>
          <div className=" space-y-2 md:space-y-4">
            <div className="flex items-center justify-start gap-4">
              <FiPhone className="h-4 w-4 " />
              <p>(+40) 772 100 200</p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <MdOutlineEmail className="h-4 w-4 " />
              <p>hello@creative-tim.com</p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <CiLocationOn className="h-4 w-4 " />
              <p>Dyonisie Wolf Bucharest, RO 010458</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5 pt-4">
            <TfiTwitter className="h-4 w-4 text-[#747474]" />
            <IoLogoInstagram className="h-4 w-4 text-[#747474]" />
            <PiLinkedinLogoBold className="h-4 w-4 text-[#747474]" />
            <LuFacebook className="h-4 w-4 text-[#747474]" />
          </div>
          <button className="w-full rounded-xl bg-[#F2EEFD] py-3 text-[14px] font-medium text-[#9373EE]">
            Contact Us
          </button>
        </div>
        <img
          className=" h-full w-full rounded-b-xl  md:w-auto"
          src="/images/map2.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Office;
