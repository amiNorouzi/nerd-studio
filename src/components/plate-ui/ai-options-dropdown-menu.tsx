import { getSelectionText, useEditorRef } from "@udecode/plate-common";
import { TbPencilStar } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "@/components/plate-ui/toolbar";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { type BaseEditor, Transforms } from "slate";

export function AiOptionsDropdownMenu(props: DropdownMenuProps) {
  const openState = useOpenState();
  const editor = useEditorRef();
  function handleClickImproveItem(item: string) {
    console.log(item);
    const text = getSelectionText(editor);
    //TODO: fetch response from AI and replace with this text
    Transforms.insertText(editor as BaseEditor, item);
  }

  function handleClickOptionItem(key: string, item: string) {
    console.log(key, item);
    const text = getSelectionText(editor);
    //TODO: fetch response from AI and replace with this text
    Transforms.insertText(editor as BaseEditor, key + item);
  }
  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="AI Options"
          isDropdown
          className=""
        >
          <TbPencilStar className="h-4.5 w-4.5" />
        </ToolbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {improveList.map(item => (
            <DropdownMenuItem
              key={item}
              onClick={() => handleClickImproveItem(item)}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {Object.entries(options).map(([key, value]) => (
            <DropdownMenuSub key={key}>
              <DropdownMenuSubTrigger>{key}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {value.map(item => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => handleClickOptionItem(key, item)}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const improveList = [
  "ReWrite",
  "Summarize Content",
  "Improve Writing",
  "Simplify Language",
  "Expand Content",
  "Shrink Content",
  "Check Grammar",
];
const options = {
  "Change Tone": ["Professional", "Friendly", "Casual", "Witty", "Humorous"],
  "Adjust Style": ["Business", "Legal", "Journalism", "Medical", "Poetic"],
  "Translate to": ["English", "Persian", "French", "Spanish", "Arabic"],
};
