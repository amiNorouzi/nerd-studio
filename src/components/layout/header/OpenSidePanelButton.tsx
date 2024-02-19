"use client";
import { FaAnglesRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/stores/zustand/ui-store";

//used in header for open side panel

export function OpenSidePanelButton() {
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen(); //side panel open state
  const setIsSidePanelOpen = useUiStore.use.setIsSidePanelOpen(); //side panel open state handler

  //don't show when side panel is open (close button is in side panel
  if (isSidePanelOpen) return null;

  return (
    <Button
      variant="ghost"
      className="fit me-2 p-0 text-muted-foreground"
      onClick={() => setIsSidePanelOpen(true)}
    >
      <FaAnglesRight size="0.75rem" />
    </Button>
  );
}
