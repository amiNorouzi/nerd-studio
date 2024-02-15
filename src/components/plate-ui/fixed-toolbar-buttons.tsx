import React from "react";
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { MARK_FONT_SIZE } from "@udecode/plate-font";
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import { useEditorReadOnly } from "@udecode/plate-common";
import { ListStyleType } from "@udecode/plate-indent-list";

import { Icons, iconVariants } from "@/components/icons";

import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ModeDropdownMenu } from "./mode-dropdown-menu";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";
import { AlignDropdownMenu } from "./align-dropdown-menu";
import { TableDropdownMenu } from "./table-dropdown-menu";
import { UndoRedoComponent } from "./undo-redo";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { EmojiCombobox } from "./emoji-combobox";
import { EmojiDropdownMenu } from "./emoji-dropdown-menu";
import { IndentToolbarButton } from "./indent-toolbar-button";
import { OutdentToolbarButton } from "./outdent-toolbar-button";
import { ListToolbarButton } from "./list-toolbar-button";
import { IndentListToolbarButton } from "./indent-list-toolbar-button";
import { HighlightLeaf } from "./highlight-leaf";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { FontSize } from "./font-size";
import { FontFamily } from "./font-family";
import { LineHeightDropdownMenu } from "./line-height-dropdown-menu";

interface IProps {
  isReadOnly?: boolean;
}

export function FixedToolbarButtons({ isReadOnly = false }: IProps) {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full overflow-hidden print:opacity-0">
      <div
        className="flex flex-nowrap overflow-x-auto"
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!isReadOnly && !readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
              <FontSize />
              <FontFamily />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>
                <Icons.code />
              </MarkToolbarButton>
              <AlignDropdownMenu />
              <LineHeightDropdownMenu />
              <IndentListToolbarButton nodeType={ListStyleType.Disc} />
              <IndentListToolbarButton nodeType={ListStyleType.Decimal} />

              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>
            <ToolbarGroup>
              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                <Icons.color className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Highlight Color"
              >
                <Icons.bg className={iconVariants({ variant: "toolbar" })} />
              </ColorDropdownMenu>
            </ToolbarGroup>
            <ToolbarGroup>
              <TableDropdownMenu />
              <EmojiDropdownMenu />
              {/* <HighlightLeaf/> */}
              <MoreDropdownMenu />
            </ToolbarGroup>
            <ToolbarGroup>
              <UndoRedoComponent />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        {!isReadOnly && (
          <ToolbarGroup noSeparator>
            <ModeDropdownMenu />
          </ToolbarGroup>
        )}
      </div>
    </div>
  );
}
