"use client";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { SelectAndDrawer } from "@/components/shared";
import { statuses } from "./contants";
import { useMemo } from "react";
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
    page: { writing },
  } = useGetDictionary();
  return (
    <div className="flex flex-col gap-2">
      <span className="m-0 flex items-baseline gap-2 text-xsm font-semibold">
        {writing.form_language}
      </span>
      <ResponseLang />
    </div>
  );
}
