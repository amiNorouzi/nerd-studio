import { TfiTwitter } from "react-icons/tfi";
import { IoLogoInstagram } from "react-icons/io5";
import { PiLinkedinLogoBold } from "react-icons/pi";
import Link from "next/link";
import { Employee } from "./teams";

const CardContactUs: React.FC<Employee> = ({
  name,
  family,
  avatar,
  role,
  about,
  id
}) => {
  return (
    <Link
      className="block md:w-[20%]"
      href={`/aboutus/${id}`}
    >
      <div className=" w-fit rounded-xl bg-[#F8F8F8] px-2 py-5 text-left  md:text-center">
        <div className=" flex items-center justify-start gap-3  md:flex-col">
          <img
            className="h-[76px] w-[76px] rounded-full bg-red-500"
            src={avatar}
          />
          <div className=" ">
            <h1 className=" text-lg  font-medium">
              {name} {family}
            </h1>
            <p className="text-base font-normal">+3 month</p>
            <p className="text-base font-normal text-[#9373EE] ">
              {role.title}
            </p>
          </div>
        </div>
        <div className="  pt-4 ">
          <p className="text-[14px] font-normal text-[#747474]">
            {about} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Pariatur, sequi?
          </p>
          <div className="flex items-center justify-center gap-5 pt-4">
            <TfiTwitter className="h-4 w-4 text-[#747474]" />
            <IoLogoInstagram className="h-4 w-4 text-[#747474]" />
            <PiLinkedinLogoBold className="h-4 w-4 text-[#747474]" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardContactUs;
