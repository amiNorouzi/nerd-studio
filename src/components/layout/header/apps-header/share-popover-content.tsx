"use client"
import React from "react";

import { SocialMedias } from "@/components/shared/SocialMedias";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";
import { useLocation } from "@/hooks/useLocation";
function SocialMediaSection() {
  const {
    components: { user },
  } = useGetDictionary();
  return (
    <div className="flex flex-wrap items-center justify-between">
      {/* share in social media*/}
      <span className="text-base">{user.menu.share_link_for_credits}</span>
      <SocialMedias />
    </div>
  );
}

function CopyLinkSection() {
  const location = useLocation();
  const [handleCopy, isCopy] = useCopyTextInClipBoard(2000);
  const {
    components: {
      user: { menu },
    },
  } = useGetDictionary();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm">{menu.share_link}</span>
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
          {isCopy ? menu.copied : menu.copy}
        </Button>
      </div>
    </div>
  );
}

function Description() {
  const {
    components: {
      user: { menu },
    },
  } = useGetDictionary();
  return (
    <div className="bg-gradiant text-gradiant rounded px-3 py-2">
      <span className="text-gradiant text-sm">
        {menu.share_link_for_credits}
      </span>

      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger className="text-gradiant h-fit p-0 text-sm underline">
          {" "}
          {menu.Learn_more}
        </HoverCardTrigger>

        <HoverCardContent
          side="top"
          sideOffset={12}
          className="col cart-arrow relative max-w-72 gap-2 p-2 text-start"
        >
          <p className="text-xs text-gray-600">
            {
              "Earn 200 credits for everyone who registered Anakin successfully through your link. No invitation limit."
            }
          </p>
        </HoverCardContent>
      </HoverCard>
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
