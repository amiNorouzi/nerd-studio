import React, { memo } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";

function ToggleTabs() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const value = searchParams.get("apps-tab") ?? "run";
  const { components } = useGetDictionary();
  function onChange(val: string) {
    const currentValue = searchParams.get("apps-tab") === val;
    if (currentValue) return;
    if (!val) return;
    setSearchParams("apps-tab", val);
  }

  return (
    <ToggleGroup type="single" value={value} onValueChange={onChange}>
      <ToggleGroupItem
        value="run"
        aria-label="Toggle run"
        data-state={value === "run" ? "on" : "off"}
      >
        {components.apps_header.run}
      </ToggleGroupItem>
      <ToggleGroupItem
        value="info"
        aria-label="Toggle info"
        data-state={value === "info" ? "on" : "off"}
      >
        {components.apps_header.info}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
export const TabButtons = memo(ToggleTabs);
