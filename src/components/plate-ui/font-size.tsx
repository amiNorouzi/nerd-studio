import { useEffect, useState } from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import {
  collapseSelection,
  focusEditor,
  useEditorRef,
  setMarks,
  getMarks,
  getSelectionText,
} from "@udecode/plate-common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

import { useEditorStore } from "@/stores/zustand/editor-slice";

const items = {
  "extra small": "12px",
  small: "14px",
  medium: "1rem",
  large: "1.125rem",
  "extra large": "1.25rem",
  "2x extra large": "1.5rem",
} as const;

type ItemsType = typeof items;
type ItemsKey = keyof ItemsType;
type ItemsValue = ItemsType[ItemsKey];

export function FontSize(props: DropdownMenuProps) {
  const [value, setValue] = useState<ItemsValue>("1rem");

  const isEditorChange = useEditorStore.use.isEditorChange();
  const editor = useEditorRef();
  const openState = useOpenState();

  const item = Object.entries(items).find(
    ([key, itemValue]) => itemValue === value,
  ) ?? ["small", "text-sm"];

  useEffect(() => {
    let mount = true;

    if (mount) {
      const marks = getMarks(editor);
      if (marks?.fontSize) {
        setValue(marks.fontSize as ItemsValue);
      } else {
        setValue("1rem");
      }
    }

    return () => {
      mount = false;
    };
  }, [editor, isEditorChange]);

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Font Size"
          isDropdown
          className="text-nowrap capitalize lg:min-w-[130px]"
        >
          {item[0]}
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuLabel>Font Size</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          value={value}
          onValueChange={value => {
            setValue(value as ItemsValue);
            setMarks(editor, { fontSize: value });
            collapseSelection(editor);
            focusEditor(editor);
          }}
        >
          {Object.entries(items).map(([key, itemValue]) => (
            <DropdownMenuRadioItem
              key={itemValue}
              value={itemValue}
              className="min-w-[180px] text-nowrap capitalize"
            >
              {key}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
