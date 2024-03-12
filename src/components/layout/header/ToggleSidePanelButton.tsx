"use client";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/zustand/ui-store";
import { cn } from "@/lib/utils";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { TbMenu2 } from "react-icons/tb";

//used in header for open side  and close panel

export function ToggleSidePanelButton() {
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen(); //side panel open state
  const toggleIsSidePanelOpen = useUiStore.use.toggleIsSidePanelOpen(); //side panel toggle open state handler

  return (
    <Button
      variant="ghost"
      className="fit me-2 p-1 text-muted-foreground"
      onClick={toggleIsSidePanelOpen}
    >
      {/*
        flip icon horizontally (from right to left) when side panel is open
      */}
      <TbMenu2 size="1.3rem" />
    </Button>
  );
}
