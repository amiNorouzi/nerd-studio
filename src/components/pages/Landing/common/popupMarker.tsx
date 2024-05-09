import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const PopupMarker = ({ left, top }: { left?: number; top?: number }) => {
  return (
    <div
      className={`absolute left-[${left}] top-[${top}] flex w-fit max-w-[285px] flex-col rounded-3xl bg-[#EFEFEF] p-4`}
    >
      <Image
        src="/images/landing/popupImage.png"
        alt="popupImage"
        width={253}
        height={139}
        className="mb-4.5 rounded-3xl"
      />
      <div>
        <div className="mb-5 flex flex-row items-center justify-between">
          <div className="flex flex-row">
            {/* Avatar */}
            <div className="me-1.5 rounded-full">
              <Image
                width={50}
                height={50}
                src="/images/landing/popupAvatar.png"
                alt="Avatar"
              />
            </div>
            {/* Name */}
            <div className="flex flex-col gap-y-[6px]">
              <span className="text-base font-medium leading-6">
                Viezh Robert
              </span>
              <span className="sub-title-color text-xs">Warsaw, Poland</span>
            </div>
          </div>
          {/* Rating */}
          <div className="flex flex-row">
            <span className="text-base">4.5</span>
            <Star className="size-6" />
          </div>
        </div>
        <div className="text-xs">
          <p>
            “I like it because I like to travel far and still can connect with
            high speed.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupMarker;
