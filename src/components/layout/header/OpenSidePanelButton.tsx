"use client";
import { FaAnglesRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { useUi } from "@/stores/zustand/ui";

export function OpenSidePanelButton() {
  const { isSidePanelOpen, setIsSidePanelOpen } = useUi();

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
