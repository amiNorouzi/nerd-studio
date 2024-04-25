"use client";
import { useMemo } from "react";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { SelectAndDrawer } from "@/components/shared";
import { statuses } from "./contants";
import { Label } from "@/components/ui/label";

/**
 * this component is for select response language that comes from AI
 * @constructor
 */
export function ResponseLang() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const items = useMemo(() => statuses.map(item => item.label), []);
  const handleSelect = (item: string) => setSearchParams("response-lang", item);

  return (
    <SelectAndDrawer
      value={searchParams.get("response-lang") ?? statuses[0].label}
      setValue={handleSelect}
      items={items}
      isSelect={false}
      showSearch={true}
    />
  );
}

export function SelectResponseLang() {
  const {
    components: { form_section },
  } = useGetDictionary();
  return (
    <div className="flex flex-col gap-label-space text-sm">
      <Label>{form_section.form_language}</Label>
      <ResponseLang />
    </div>
  );
}
