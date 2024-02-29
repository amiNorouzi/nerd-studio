"use client";
import { DescriptionHoverCard, SelectAndDrawer } from "@/components/shared";
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
import { useCallback, useState } from "react";

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
      />
    </div>
  );
}

function Selects({
  keyInSearchParam,
  value,
}: {
  keyInSearchParam: string;
  value: (typeof selectValues)[keyof typeof selectValues];
}) {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    page: { writing },
  } = useGetDictionary();
  const resolveKey = (key: keyof typeof selectValues): keyof typeof writing =>
    `form_${key}`;

  function handleSelect(item: string) {
    console.log(item);

    if (item.toLowerCase() === "auto") {
      setSearchParams(keyInSearchParam);
    } else {
      const foundedItemInList = value.find(
        valueInList => item.toLowerCase() === valueInList.toLowerCase(),
      );

      setSearchParams(keyInSearchParam, foundedItemInList);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="m-0 flex items-baseline gap-2 text-xsm font-semibold">
        {writing[resolveKey(keyInSearchParam as keyof typeof selectValues)]}
        {keyInSearchParam in selectValuesDescription && (
          <DescriptionHoverCard
            description={
              writing[
                selectValuesDescription[
                  keyInSearchParam as keyof typeof selectValuesDescription
                ]
              ]
            }
          />
        )}
      </span>

      <SelectAndDrawer
        value={searchParams.get(keyInSearchParam) ?? value[0]}
        setValue={handleSelect}
        items={value as unknown as string[]}
      />
    </div>
  );
}

function ListOfSelectBox() {
  return (
    <>
      {Object.entries(selectValues).map(([key, value]) => (
        <Selects key={key} keyInSearchParam={key} value={value} />
      ))}
    </>
  );
}

export function SelectBoxes() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <div className="mb-5 flex items-start justify-start gap-2">
          <Switch
            id="collapse-trigger"
            checked={open}
            onCheckedChange={setOpen}
          />
          <Label htmlFor="collapse-trigger" className="flex flex-col gap-1">
            <span>Advanced</span>
            <span className="text-muted-foreground">
              More access for more accurate results
            </span>
          </Label>
        </div>
      </CollapsibleTrigger>
      <div className="grid grid-cols-1 gap-y-3">
        <div className="grid grid-cols-1 items-start gap-x-5 gap-y-3 sm:grid-cols-2">
          {/*show language select box*/}
          <SelectResponseLang />
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
