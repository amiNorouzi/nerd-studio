import React from "react";

import { SocialMedias } from "@/components/shared/SocialMedias";
import { MyTooltip } from "@/components/shared/myTooltip";
import { Button } from "@/components/ui/button";

import { useLocation } from "@/hooks/useLocation";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

function SocialMediaSection() {
  const {
    components: { apps_header },
  } = useGetDictionary();
  return (
    <div className="flex items-center justify-between">
      {/* share in social media*/}
      <span className="text-base">{apps_header.share_link_for_credits}</span>
      <SocialMedias />
    </div>
  );
}

function CopyLinkSection() {
  const location = useLocation();
  const [handleCopy, isCopy] = useCopyTextInClipBoard(2000);
  const {
    components: { apps_header },
  } = useGetDictionary();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm">{apps_header.share_link}</span>
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
          {isCopy ? apps_header.copied : apps_header.copy}
        </Button>
      </div>
    </div>
  );
}

function Description() {
  const {
    components: { apps_header },
  } = useGetDictionary();
  return (
    <div className="bg-gradiant text-gradiant rounded px-3 py-2">
      <span className="text-gradiant text-sm">
        {apps_header.share_link_for_credits}
      </span>

      <MyTooltip
        title="Earn 200 credits for everyone who registered Anakin successfully through your link. No invitation limit."
        contentClass="w-72 text-sm"
      >
        <span className="text-gradiant text-sm underline">
          {apps_header.Learn_more}
        </span>
      </MyTooltip>
    </div>
  );
}

export function SharePopoverContent() {
  return (
    <>
      {/*in this section we can share link in social media*/}
      <SocialMediaSection />
      <div className="flex flex-col gap-3">
        <Description />

        <CopyLinkSection />
      </div>
    </>
  );
}
