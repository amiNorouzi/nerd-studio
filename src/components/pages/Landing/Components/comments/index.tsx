import Image from "next/image";
import { Star } from "@/components/svg-icons/Star";

const Comments = () => {
  return (
    <div className="padding-y  padding-x">
      <div className="flex max-w-[400px] flex-col rounded-xl border-[2px] border-[#9373EE] bg-[#F2EEFD] p-6 shadow-xl">
        <div className="mb-5 flex flex-row items-center justify-between">
          <div className="flex flex-row">
            {/*Avatar*/}
            <div className="me-1.5 rounded-full">
              <Image
                width={50}
                height={50}
                src={"/images/landing/Avatar.png"}
                alt={"Avatar"}
              />
            </div>
            {/*Name*/}
            <div className=" flex flex-col gap-y-[6px]">
              <span className="text-base font-medium leading-6">
                Viezh Robert
              </span>
              <span className="sub-title-color text-xs ">Warsaw, Poland</span>
            </div>
          </div>
          {/*Rating*/}
          <div className="flex flex-row">
            <span className="text-base">4.5</span>
            <Star className="size-6" />
          </div>
        </div>
        <div className="text-base font-normal leading-6">
          “Wow... I am very happy to use this VPN, it turned out to be more than
          my expectations and so far there have been no problems. LaslesVPN
          always the best”.
        </div>
      </div>
    </div>
  );
};

export default Comments;
