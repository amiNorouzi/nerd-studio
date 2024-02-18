import React from "react";

import { SocialMedias } from "@/components/shared/SocialMedias";
import { MyTooltip } from "@/components/shared/myTooltip";
import { Button } from "@/components/ui/button";

import { useLocation } from "@/hooks/useLocation";
import { useCopyTextInClipBoard } from "@/hooks";

export function SharePopoverContent() {
  const location = useLocation();
  const [handleCopy, isCopy] = useCopyTextInClipBoard(2000);
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-base">Share</span>
        <SocialMedias />
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-gradiant text-gradiant rounded px-3 py-2">
          <span className="text-gradiant text-sm">
            Share link to earn more credits.
          </span>

          <MyTooltip
            title="Earn 200 credits for everyone who registered Anakin successfully through your link. No invitation limit."
            contentClass="w-72 text-sm"
          >
            <span className="text-gradiant text-sm underline">Learn more</span>
          </MyTooltip>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm">Share link</span>
          <div className="flex w-full justify-center">
            <input
              readOnly
              title={location?.href}
              value={location?.href}
              className="flex-1 rounded-md rounded-e-none border border-e-0 px-2 text-sm focus:outline-0"
              type="text"
            />
            <Button
              onClick={() => handleCopy(location?.href ?? "")}
              className="h-full rounded-s-none text-sm"
            >
              {isCopy ? "Copied" : "Copy link"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
