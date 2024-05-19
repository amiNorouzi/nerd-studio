"use client"
import React, { memo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { cn } from "@/lib/utils";

interface Props{
  setActiveApp:(val:string)=>void
  sections:string[]
}
export default  function ToggleApp({setActiveApp,sections}:Props) {
  // const [searchParams, setSearchParams] = useCustomSearchParams();
  const [currentValue, setCurrentValue] = useState(sections[0]);
  const { components } = useGetDictionary();
  function onChange(val: string) {
    if(!val) return
    setCurrentValue(val)
    setActiveApp(val)
  }

  const tabClass =
    "w-auto h-full bg-transparent transition-all duration-200 data-[state=on]:bg-background data-[state=on]:shadow-sm text-muted-foreground " +
    "data-[state=on]:!text-foreground";

  return (
    <ToggleGroup

      type="single"
      value={currentValue}
      onValueChange={onChange}
      className="h-9 rounded-md bg-muted p-[1px]"
    >
      {sections.map(section=>{
        return(
          <ToggleGroupItem
            key={section}
            value={section}
            aria-label="Toggle apps"
            data-state={currentValue === section ? "on" : "off"}
            className={tabClass}
          >
            {section}
          </ToggleGroupItem>
        )
      })}

    </ToggleGroup>
  );
}
