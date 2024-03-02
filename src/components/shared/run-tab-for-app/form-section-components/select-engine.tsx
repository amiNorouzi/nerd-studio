import { SelectAndDrawer } from "@/components/shared";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { engines } from "./contants";
import { useCallback } from "react";

function SelectEngineDropDown() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const value = searchParams.get("engine") ?? engines[0];
  const handleSelect = (item: string) =>
    value.toLowerCase() === item.toLowerCase()
      ? setSearchParams("engine")
      : setSearchParams("engine", item);

  return (
    <SelectAndDrawer
      value={searchParams.get("engine") ?? engines[0]}
      setValue={handleSelect}
      items={engines}
      isSelect
    />
  );
}

export function SelectEngine() {
  const {
    page: { ReWrite },
  } = useGetDictionary();
  return (
    <div className="flex flex-col justify-center gap-2 ">
      <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
        Engines
      </span>
      <SelectEngineDropDown />
    </div>
  );
}
