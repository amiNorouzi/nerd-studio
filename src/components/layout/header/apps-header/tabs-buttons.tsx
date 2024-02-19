import React, { memo } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCustomSearchParams } from "@/hooks";

function ToggleTabs() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const value = searchParams.get("apps-tab") ?? "run";
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
        Run
      </ToggleGroupItem>
      <ToggleGroupItem
        value="info"
        aria-label="Toggle info"
        data-state={value === "info" ? "on" : "off"}
      >
        Info
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
export const TabButtons = memo(ToggleTabs);
