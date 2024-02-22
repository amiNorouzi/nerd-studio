"use client";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDictionary } from "@/hooks";
import { characterValueItems } from "./constants";

export function EditorSectionFooter() {
  const [value, setValue] = useState<string>(characterValueItems[0]);
  const {
    page: { writing },
  } = useGetDictionary();
  const items = useMemo(() => {
    return characterValueItems.map(item => (
      <SelectItem key={item} value={item} className="text-xsm">
        {writing[item]}
      </SelectItem>
    ));
  }, []);
  return (
    <div className="h-14">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className=" h-[42px] w-[200px] border-none">
          <SelectValue placeholder="Select an option" className="text-xsm" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{items}</SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
