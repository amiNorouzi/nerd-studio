"use client";
import { useState } from "react";
import { DescriptionHoverCard, SelectAndDrawer } from "@/components/shared";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";

import { SelectResponseLang } from "./select-response-lang";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { selectValues, selectValuesDescription } from "./contants";
import RenderIf from "@/components/shared/RenderIf";
import { cn } from "@/lib/utils";

function NumberOfResults() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    components: { form_section },
  } = useGetDictionary();
  return (
    <div className=" mt-1 flex flex-col gap-3 ">
      <Label
        htmlFor="numOfResult"
        className="flex flex-nowrap gap-2 text-sm font-normal"
      >
        {form_section.form_num_of_results}
        <DescriptionHoverCard
          description={form_section.form_num_of_results_desc}
        />
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

/**
 * this component generate options select boxes
 * @param keyInSearchParam , this key is used to store select value in url search params
 * @param value , list of options
 * @constructor
 */
function Selects({
  keyInSearchParam,
  value,
}: {
  keyInSearchParam: string;
  value: (typeof selectValues)[keyof typeof selectValues];
}) {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    components: { form_section },
  } = useGetDictionary();
  const resolveKey = (
    key: keyof typeof selectValues,
  ): keyof typeof form_section => `form_${key}`;

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
    <div className="flex flex-col gap-3">
      <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
        {
          form_section[
            resolveKey(keyInSearchParam as keyof typeof selectValues)
          ]
        }
        {keyInSearchParam in selectValuesDescription && (
          <DescriptionHoverCard
            description={
              form_section[
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

/**
 * this component generate list of Selects components
 * @constructor
 */
function ListOfSelectBox() {
  return (
    <>
      {Object.entries(selectValues).map(([key, value]) => (
        <Selects key={key} keyInSearchParam={key} value={value} />
      ))}
    </>
  );
}

interface IProps {
  hiddenSelectResponseLang?: boolean;
}

export function OptionsSelectBoxes({
  hiddenSelectResponseLang = false,
}: IProps) {
  const [open, setOpen] = useState(false);
  const {
    components: { form_section },
  } = useGetDictionary();
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "mb-9 flex items-start justify-start gap-3",
            // hiddenSelectResponseLang && "mb-0",
          )}
        >
          <Switch
            id="collapse-trigger"
            checked={open}
            onCheckedChange={setOpen}
          />
          <Label htmlFor="collapse-trigger" className="flex flex-col gap-0.5">
            <span className="text-base font-medium">
              {form_section.form_advanced}
            </span>
            <span className="text-base font-normal text-muted-foreground">
              {form_section.form_advanced_description}
            </span>
          </Label>
        </div>
      </CollapsibleTrigger>
      <div
        data-state={open}
        className="grid grid-cols-1 gap-y-9 data-[state=false]:gap-0"
      >
        {/*show language select box*/}
        <RenderIf isTrue={!hiddenSelectResponseLang}>
          <div className="grid grid-cols-1 items-start gap-x-5 gap-y-3 sm:grid-cols-2">
            <SelectResponseLang />
          </div>
        </RenderIf>
        <CollapsibleContent className="grid grid-cols-1 items-start gap-x-5 gap-y-9  sm:grid-cols-2">
          {/*show list of select box options(creativity,tone,...)*/}
          <ListOfSelectBox />

          {/*show input type number for determine number of results*/}
          <NumberOfResults />
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
