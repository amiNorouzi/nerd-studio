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
    page: { ReWrite },
    components: { editor_section },
  } = useGetDictionary();
  const items = useMemo(() => {
    return characterValueItems.map(item => (
      <SelectItem
        key={item}
        value={item}
        className="flex flex-row-reverse justify-between gap-4 px-2 text-start"
      >
        {`${editor_section[item]}   ${numberOfTextContent(item.split("_").pop() as WordType, editorTextContentValue)}`}
      </SelectItem>
    ));
  }, [editorTextContentValue]);

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="row ms-3 mt-3.5 h-8 w-fit gap-2 border-none ">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>{items}</SelectGroup>
      </SelectContent>
    </Select>
  );
}
