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

import { useEditorStore } from "@/stores/zustand/editor-slice";

import { numberOfTextContent } from "@/lib/numOfChar-word-sentence-token";
import { characterValueItems } from "./constants";
import type { WordType } from "@/services/types";

export function EditorSectionFooter() {
  const editorTextContentValue = useEditorStore.use.editorTextContent();
  const [value, setValue] = useState<string>(characterValueItems[0]);
  const {
    page: { writing },
  } = useGetDictionary();
  const items = useMemo(() => {
    return characterValueItems.map(item => (
      <SelectItem key={item} value={item} className="text-xsm">
        {`${writing[item]} ${numberOfTextContent(item.split("_").pop() as WordType, editorTextContentValue)}`}
      </SelectItem>
    ));
  }, [editorTextContentValue]);

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
