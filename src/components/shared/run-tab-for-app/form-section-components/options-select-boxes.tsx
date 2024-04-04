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

/**
 * this component generate input type number for determine number of results
 * @constructor
 */
function NumberOfResults() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    components: { form_section },
  } = useGetDictionary();
  return (
    <div className=" gap-label-space mt-1 flex flex-col ">
      <Label htmlFor="numOfResult" className="flex flex-nowrap gap-1">
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

  /**
   * this function handle select change
   * @param item , selected item
   */
  function handleSelect(item: string) {
    // if item is auto remove it from search params
    if (item.toLowerCase() === "auto") {
      setSearchParams(keyInSearchParam);
    } else {
      // find item in list and set it in search params
      const foundedItemInList = value.find(
        valueInList => item.toLowerCase() === valueInList.toLowerCase(),
      );

      setSearchParams(keyInSearchParam, foundedItemInList);
    }
  }

  return (
    <div className="gap-label-space flex flex-col">
      <Label className="row m-0 gap-1">
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
      </Label>

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

/**
 * this component generate options select boxes like tone , creativity , ...
 * @param hiddenSelectResponseLang
 * @constructor
 */
export function OptionsSelectBoxes({
  hiddenSelectResponseLang = false,
}: IProps) {
  const [open, setOpen] = useState(false);
  const {
    components: { form_section },
  } = useGetDictionary();
  return (
    <>
      <RenderIf isTrue={!hiddenSelectResponseLang}>
        <SelectResponseLang />
      </RenderIf>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <div
            className={cn(
              "row mb-form-gap gap-3",
              // hiddenSelectResponseLang && "mb-0",
            )}
          >
            <Switch
              id="collapse-trigger"
              checked={open}
              onCheckedChange={setOpen}
            />
            <Label htmlFor="collapse-trigger" className="flex flex-col">
              <span className=" font-medium">{form_section.form_advanced}</span>
              <span className="text-xs font-normal text-muted-foreground">
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
          <CollapsibleContent className="form-gap grid grid-cols-1 items-start sm:grid-cols-2">
            {/*show list of select box options(creativity,tone,...)*/}
            <ListOfSelectBox />

            {/*show input type number for determine number of results*/}
            <NumberOfResults />
          </CollapsibleContent>
        </div>
      </Collapsible>
    </>
  );
}
