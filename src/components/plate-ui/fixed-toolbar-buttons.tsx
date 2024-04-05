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
import { AiModal } from "@/components/plate-ui/ai-modal";
import { AiOptionsDropdownMenu } from "@/components/plate-ui/ai-options-dropdown-menu";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import { cn } from "@/lib/utils";

interface IProps {
  isReadOnly?: boolean;
}

export function FixedToolbarButtons({ isReadOnly = false }: IProps) {
  const readOnly = useEditorReadOnly();
  const isFullScreen = useEditorStore.use.isFullScreen();

  return (
    <div className="w-full overflow-hidden px-3 pb-3 print:opacity-0">
      <div
        className="flex flex-wrap "
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!isReadOnly && !readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <AiModal />
              <AiOptionsDropdownMenu />
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
              <FontSize />
              <FontFamily />
            </ToolbarGroup>
            {/*<div className="flex-grow" />*/}
            <ToolbarGroup noSeparator className={cn(isFullScreen && "ms-auto")}>
              <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                <Icons.bold className={iconVariants({ size: "md" })} />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Italic (⌘+I)" nodeType={MARK_ITALIC}>
                <Icons.italic className={iconVariants({ size: "md" })} />
              </MarkToolbarButton>
              <MarkToolbarButton
                tooltip="Underline (⌘+U)"
                nodeType={MARK_UNDERLINE}
              >
                <Icons.underline className={iconVariants({ size: "md" })} />
              </MarkToolbarButton>

              <MarkToolbarButton
                tooltip="Strikethrough (⌘+⇧+M)"
                nodeType={MARK_STRIKETHROUGH}
              >
                <Icons.strikethrough className={iconVariants({ size: "md" })} />
              </MarkToolbarButton>
              <MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>
                <Icons.code className={iconVariants({ size: "md" })} />
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
                <Icons.color
                  className={iconVariants({ variant: "toolbar", size: "md" })}
                />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Highlight Color"
              >
                <Icons.bg
                  className={iconVariants({ variant: "toolbar", size: "md" })}
                />
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

        <div className={cn(!isFullScreen && "ms-auto")} />

        {!isReadOnly && (
          <ToolbarGroup noSeparator>
            <ModeDropdownMenu />
          </ToolbarGroup>
        )}
      </div>
    </div>
  );
}
