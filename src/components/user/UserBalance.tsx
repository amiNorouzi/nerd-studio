"use client";
import { Button } from "@/components/ui/button";
import { UserBalanceIcon } from "@/components/svg-icons";

import { useGetDictionary } from "@/hooks";

//show user plan
//by click open user panel dialog and go upgrade panel

function UserBalance({ handleClick }: { handleClick: () => void }) {
  const dictionary = useGetDictionary();

  return (
    <Button
      variant="ghost"
      className="spacing-row balance border-gradiant relative h-8 w-full rounded-lg px-2.5 hover:after:!rounded-lg"
      onClick={handleClick}
    >
      <div className="row gap-1">
        <UserBalanceIcon />
        <div className="text-gradiant ms-1">67.66</div>
      </div>

      <div className="text-gradiant">{dictionary.common.free}</div>
    </Button>
  );
}

export default UserBalance;
