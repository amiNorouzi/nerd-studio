import React from "react";
import { BsChevronUp } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { statuses } from "./contants";

interface DropDownButtonProps {
  children: React.ReactNode;
  dataOpen: boolean;
}
export function DropDownButton({ dataOpen, children }: DropDownButtonProps) {
  return (
    <Button variant="outline" className="w-full justify-between bg-muted">
      {children}
      <span
        data-open={dataOpen}
        className="transition data-[open=false]:rotate-180"
      >
        <BsChevronUp className="h-4 w-4 opacity-50" />
      </span>
    </Button>
  );
}
