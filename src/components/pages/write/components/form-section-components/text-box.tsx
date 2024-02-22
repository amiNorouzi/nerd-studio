"use client";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";

export function TextBox() {
  const {
    page: { writing },
  } = useGetDictionary();
  return (
    <div className="mt-1 grid gap-2">
      <Label htmlFor="textbox" className="text-xsm font-semibold">
        {writing.form_textarea_label}
      </Label>
      <div className="relative h-full w-full">
        <textarea
          name="userTextBox"
          id="textbox"
          rows={10}
          className="w-full rounded-lg border p-2 outline-none ring-0"
        />
        {/*<div className="absolute bottom-2 start-2 flex justify-start">*/}
        {/*  <Button variant="ghost"><></Button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
