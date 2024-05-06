"use client"
import React from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { TbShare } from "react-icons/tb";

import { MinimalButton } from "@/components/shared";

import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

/**
 * use for show result explanation
 * box contains explanation and copy, share button
 * @param explanation - explanation text of result
 * @constructor
 */
function ExplanationBox({ explanation }: { explanation: string }) {
  const {
    common: { copy, share },
  } = useGetDictionary();
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy explanation

  return (
    <div className="col w-full gap-3 rounded-lg  bg-muted px-3 py-2 lg:px-4 lg:py-3">
      {/* explanation text */}
      <p className="font-normal text-muted-foreground">{explanation}</p>
      <div className="row justify-end gap-1">
        {/* share button */}
        <MinimalButton
          Icon={TbShare}
          title={share}
          className="hover:bg-muted/30"
        />
        {/* copy button */}
        <MinimalButton
          Icon={isCopied ? LuCopyCheck : LuCopy}
          title={copy}
          onClick={() => handleCopy(explanation)}
          className="hover:bg-muted/30"
        />
      </div>
    </div>
  );
}

export default ExplanationBox;
