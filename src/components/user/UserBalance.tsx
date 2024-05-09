"use client";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

/**
 * show user plan
 * by click open user panel dialog and go upgrade panel
 * @param handleClick
 * @constructor
 */
function UserBalance({ handleClick }: { handleClick: () => void }) {
  const dictionary = useGetDictionary();

  return (
    <Button
      variant="ghost"
      //border-gradiant is a custom class in global.css
      className="spacing-row balance border-gradiant hover-border-gradiant relative h-8 w-full rounded-lg px-2.5 after:!rounded-lg"
      onClick={handleClick}
    >
      <div className="row gap-1">
        {/*<UserBalanceIcon />*/}
        <div className="text-gradiant ms-1">67.66</div>
      </div>

      {/*
        current plan
        TODO: add real data
      */}
      <div className="text-gradiant">{dictionary.common.free}</div>
    </Button>
  );
}

export default UserBalance;
