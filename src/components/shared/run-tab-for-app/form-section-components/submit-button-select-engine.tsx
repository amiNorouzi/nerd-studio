"use client";
import { Button } from "@/components/ui/button";
import { SelectEngine } from "@/components/shared";

interface IProps {
  buttonContent: string;
}

export function SubmitButtonSelectEngine({ buttonContent }: IProps) {
  return (
    <div className="grid grid-cols-1 items-end gap-5 sm:grid-cols-2">
      {/*show engine select box*/}
      <SelectEngine />
      {/*submit button*/}
      <Button>{buttonContent}</Button>
    </div>
  );
}
