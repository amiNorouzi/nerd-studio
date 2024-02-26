"use client";
import { DescriptionHoverCard } from "@/components/shared";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";

import { SelectResponseLang } from "./select-response-lang";
import { SelectEngine } from "./select-engine";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { selectValues, selectValuesDescription } from "./contants";
import { useState } from "react";

function NumberOfResults() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    page: { writing },
  } = useGetDictionary();
  return (
    <div className=" mt-1 flex flex-col gap-3 ">
      <Label
        htmlFor="numOfResult"
        className="flex flex-nowrap gap-2 text-xsm  font-semibold"
      >
        {writing.form_num_of_results}
        <DescriptionHoverCard description={writing.form_num_of_results_desc} />
      </Label>
      <Input
        type="number"
        id="numOfResult"
        value={searchParams.get("numOfResults") ?? "1"}
        onChange={e => setSearchParams("numOfResults", e.target.value)}
        min={1}
        className="h-[40px]"
      />
    </div>
  );
}

function ListOfSelectBox() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    page: { writing },
  } = useGetDictionary();
  const resolveKey = (key: keyof typeof selectValues): keyof typeof writing =>
    `form_${key}`;

  function onChange(key: string, value: string) {
    if (value === "Auto") {
      setSearchParams(key);
    } else {
      setSearchParams(key, value);
    }
  }
  return (
    <>
      {Object.entries(selectValues).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-2">
          <span className="m-0 flex items-baseline gap-2 text-xsm font-semibold">
            {writing[resolveKey(key as keyof typeof selectValues)]}
            {key in selectValuesDescription && (
              <DescriptionHoverCard
                description={
                  writing[
                    selectValuesDescription[
                      key as keyof typeof selectValuesDescription
                    ]
                  ]
                }
              />
            )}
          </span>
          <Select
            value={searchParams.get(key) ?? value[0]}
            onValueChange={v => onChange(key, v)}
          >
            <SelectTrigger className="m-0 w-full">
              <SelectValue
                placeholder="Select an option"
                className="text-xsm"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xsm font-semibold">
                  {key}
                </SelectLabel>
                {value.map(item => (
                  <SelectItem key={item} value={item} className="text-xsm">
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ))}
    </>
  );
}

export function SelectBoxes() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <div className="mb-5 flex items-center justify-start gap-2">
          <Label htmlFor="collapse-trigger">Advanced</Label>
          <Switch
            id="collapse-trigger"
            checked={open}
            onCheckedChange={setOpen}
          />
        </div>
      </CollapsibleTrigger>
      <div className="grid grid-cols-1 gap-y-3">
        <div className="grid grid-cols-1 items-start gap-x-5 gap-y-3 sm:grid-cols-2">
          {/*show language select box*/}
          <SelectResponseLang />
          {/*show engine select box*/}
          <SelectEngine />
        </div>
        <CollapsibleContent className="grid grid-cols-1 items-start gap-x-5 gap-y-3 sm:grid-cols-2">
          {/*show list of select box options(creativity,tone,...)*/}
          <ListOfSelectBox />

          {/*show input type number for determine number of results*/}
          <NumberOfResults />
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
