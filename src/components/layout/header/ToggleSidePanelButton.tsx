"use client";
import { FaAnglesRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/zustand/ui-store";
import { cn } from "@/lib/utils";

//used in header for open side  and close panel

export function ToggleSidePanelButton() {
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen(); //side panel open state
  const toggleIsSidePanelOpen = useUiStore.use.toggleIsSidePanelOpen(); //side panel toggle open state handler

  return (
    <Button
      variant="ghost"
      className="fit me-2 p-0 text-muted-foreground"
      onClick={toggleIsSidePanelOpen}
    >
      {/*
        rotate icon 180 degree (from right to left) when side panel is open
      */}
      <FaAnglesRight
        size="0.75rem"
        className={cn(
          "transition-transform duration-200",
          isSidePanelOpen && "rotate-180",
        )}
      />
    </Button>
  );
}
