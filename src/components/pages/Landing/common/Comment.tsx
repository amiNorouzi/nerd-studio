import Image from "next/image";
import { Star } from "@/components/svg-icons/Star";

interface Props{
  index:number;
  f:(v:number)=>string | undefined

}

export function CommentSection({f,index}:Props){

  return (
    <div
      key={index}
      className={` ${f(index)}   mr-4 flex w-full min-w-0 max-w-[400px] flex-none flex-col rounded-3xl   p-6 `}
    >
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
            <span className="sub-title-color text-xs ">
                    Warsaw, Poland
                  </span>
          </div>
        </div>
        {/*Rating*/}
        <div className="flex flex-row">
          <span className="text-base">4.5</span>
          <Star className="size-6" />
        </div>
      </div>
      <div className="text-base font-normal leading-6">
              <span className=" flex md:hidden">
                “Wow... I am very happy to use this VPN, it turned out to be
                more than.
              </span>
        <span className="hidden md:flex">
                “Wow... I am very happy to use this VPN, it turned out to be
                more than my expectations and so far there have been no
                problems. LaslesVPN always the best”.
              </span>
      </div>
    </div>
  )
}