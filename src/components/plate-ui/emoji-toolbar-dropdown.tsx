import React, { ReactNode } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useEditorContext } from "@/stores/contexts/useEditorContext";

type EmojiToolbarDropdownProps = {
  control: ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
};

export function EmojiToolbarDropdown({
  control,
  isOpen,
  setIsOpen,
  children,
}: EmojiToolbarDropdownProps) {
  const { editorAndFooterButtonsWrapperRef } = useEditorContext();
  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>{control}</Popover.Trigger>

      <Popover.Portal container={editorAndFooterButtonsWrapperRef.current}>
        <Popover.Content className="z-[100]">{children}</Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
