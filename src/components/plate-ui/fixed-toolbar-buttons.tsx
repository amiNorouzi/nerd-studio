import React from "react";
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import { MARK_BG_COLOR, MARK_COLOR } from "@udecode/plate-font";
import { useEditorReadOnly } from "@udecode/plate-common";
import { ListStyleType } from "@udecode/plate-indent-list";

import { Icons, iconVariants } from "@/components/icons";

import { InsertDropdownMenu } from "./insert-dropdown-menu";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarGroup } from "./toolbar";
import { TurnIntoDropdownMenu } from "./turn-into-dropdown-menu";
import AlignToolbarGroup from "./align-toolbar-group";
import { ColorDropdownMenu } from "./color-dropdown-menu";
import { IndentListToolbarButton } from "./indent-list-toolbar-button";
import { MoreDropdownMenu } from "./more-dropdown-menu";
import { FontFamily } from "./font-family";
import { AiOptionsDropdownMenu } from "@/components/plate-ui/ai-options-dropdown-menu";
import { useEditorStore } from "@/stores/zustand/editor-slice";

interface IProps {
  isReadOnly?: boolean;
}

export function FixedToolbarButtons({ isReadOnly = false }: IProps) {
  const readOnly = useEditorReadOnly();
  const isFullScreen = useEditorStore.use.isFullScreen();

  return (
    <div className="w-full overflow-hidden px-3 pb-3 print:opacity-0">
      <div
        className="flex flex-wrap justify-between"
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!isReadOnly && !readOnly && (
          <>
            <ToolbarGroup noSeparator>
              {/*<AiModal />*/}
              <AiOptionsDropdownMenu />
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
              {/*<FontSize />*/}
              <FontFamily />
            </ToolbarGroup>
            {/*<div className="flex-grow" />*/}
            <div className="flex">
              <ToolbarGroup noSeparator>
                <MarkToolbarButton tooltip="Bold (⌘+B)" nodeType={MARK_BOLD}>
                  <Icons.bold className={iconVariants({ size: "md" })} />
                </MarkToolbarButton>
                <MarkToolbarButton
                  tooltip="Italic (⌘+I)"
                  nodeType={MARK_ITALIC}
                >
                  <Icons.italic className={iconVariants({ size: "md" })} />
                </MarkToolbarButton>
                <MarkToolbarButton
                  tooltip="Underline (⌘+U)"
                  nodeType={MARK_UNDERLINE}
                >
                  <Icons.underline className={iconVariants({ size: "md" })} />
                </MarkToolbarButton>
              </ToolbarGroup>
              {/*<ToolbarGroup>*/}
              {/*<MarkToolbarButton*/}
              {/*  tooltip="Strikethrough (⌘+⇧+M)"*/}
              {/*  nodeType={MARK_STRIKETHROUGH}*/}
              {/*>*/}
              {/*  <Icons.strikethrough className={iconVariants({ size: "md" })} />*/}
              {/*</MarkToolbarButton>*/}
              {/*<MarkToolbarButton tooltip="Code (⌘+E)" nodeType={MARK_CODE}>*/}
              {/*  <Icons.code className={iconVariants({ size: "md" })} />*/}
              {/*</MarkToolbarButton>*/}
              {/*</ToolbarGroup>*/}
              <AlignToolbarGroup />
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
                  <Icons.colorPicker
                    className={iconVariants({ variant: "toolbar", size: "md" })}
                  />
                </ColorDropdownMenu>
              </ToolbarGroup>
              <ToolbarGroup>
                {/*<LineHeightDropdownMenu />*/}
                <IndentListToolbarButton nodeType={ListStyleType.Disc} />
                <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
                <MoreDropdownMenu />
                {/*<OutdentToolbarButton />*/}
                {/*<IndentToolbarButton />*/}
              </ToolbarGroup>
              {/*<ToolbarGroup>*/}
              {/*<TableDropdownMenu />*/}
              {/*<EmojiDropdownMenu />*/}
              {/* <HighlightLeaf/> */}

              {/*</ToolbarGroup>*/}
              {/*<ToolbarGroup>*/}
              {/*  <UndoRedoComponent />*/}
              {/*</ToolbarGroup>*/}
            </div>
          </>
        )}

        {/*<div className={cn(!isFullScreen && "ms-auto")} />*/}

        {/*{!isReadOnly && (*/}
        {/*  <ToolbarGroup noSeparator>*/}
        {/*    <ModeDropdownMenu />*/}
        {/*  </ToolbarGroup>*/}
        {/*)}*/}
      </div>
    </div>
  );
}
