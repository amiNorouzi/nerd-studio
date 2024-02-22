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

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { selectValues, selectValuesDescription } from "./contants";

function NumberOfResults() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    page: { writing },
  } = useGetDictionary();
  return (
    <div className="col-span-4 mt-1 flex flex-col gap-3 sm:col-span-2">
      <Label
        htmlFor="numOfResult"
        className="text-xsm flex flex-nowrap gap-2  font-semibold"
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

  return (
    <>
      {Object.entries(selectValues).map(([key, value]) => (
        <div key={key} className="col-span-4 flex flex-col gap-2 sm:col-span-2">
          <span className="text-xsm m-0 flex items-baseline gap-2 font-semibold">
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
            value={searchParams.get(key) ?? undefined}
            onValueChange={value => setSearchParams(key, value)}
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
  return (
    <div className="grid grid-cols-4 items-start gap-x-5 gap-y-3">
      <ListOfSelectBox />
      <NumberOfResults />
    </div>
  );
}
