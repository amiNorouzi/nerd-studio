"use client";
import { Button } from "@/components/ui/button";
import { Pen } from "@/components/svg-icons";
import { SelectEngine } from "./select-engine";
import { useGetDictionary } from "@/hooks";

export function SubmitButton() {
  const {
    page: { writing },
  } = useGetDictionary();
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {/*show engine select box*/}
      <SelectEngine />
      <Button className="h-14 gap-2">
        <Pen /> {writing.form_rewrite_button}
      </Button>
    </div>
  );
}
