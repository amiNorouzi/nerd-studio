"use client";
import { Button } from "@/components/ui/button";
import { Pen } from "@/components/svg-icons";
import { useGetDictionary } from "@/hooks";

export function SubmitButton() {
  const {
    page: { writing },
  } = useGetDictionary();
  return (
    <Button className="bg-linearGradient h-[50px] w-full gap-2">
      <Pen /> {writing.form_rewrite_button}
    </Button>
  );
}
