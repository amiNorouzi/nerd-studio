"use client";

import React from "react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  useAlignDropdownMenu,
  useAlignDropdownMenuState,
} from "@udecode/plate-alignment";

import { Icons, iconVariants } from "@/components/icons";

import { useOpenState } from "./dropdown-menu";
import { ToolbarButton, ToolbarGroup } from "./toolbar";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/zustand/editor-slice";

const items = [
  {
    value: "left",
    Icon: Icons.alignLeft,
  },
  {
    value: "center",
    Icon: Icons.alignCenter,
  },
  {
    value: "right",
    Icon: Icons.alignRight,
  },
  // {
  //   value: "justify",
  //   icon: Icons.alignJustify,
  // },
];

export default function AlignToolbarGroup({
  children,
  ...props
}: DropdownMenuProps) {
  return (
    <ToolbarGroup>
      {items.map(({ value: itemValue, Icon }) => (
        <ToolbarButton key={itemValue}>
          <Icon className={iconVariants({ variant: "toolbar" })} />
        </ToolbarButton>
      ))}
    </ToolbarGroup>
  );
}
