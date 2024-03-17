"use client";
import { useState } from "react";

import { PiQuestion } from "react-icons/pi";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

/**
 * used in settings popover
 * a hover card with info button that also open with click for mobile devices
 * @param description description of target option
 * @constructor
 */
export function DescriptionHoverCard({
  description,
  iconSize = "0.9rem",
}: {
  description: string;
  iconSize?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard
      openDelay={200}
      closeDelay={100}
      open={open}
      onOpenChange={setOpen}
    >
      <HoverCardTrigger className="h-fit p-0" onClick={() => setOpen(!open)}>
        <PiQuestion size={iconSize} className="text-blue-400" />
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        sideOffset={12}
        className="col cart-arrow relative max-w-72 gap-2 p-2 text-start"
      >
        <p className="text-xs text-gray-600">{description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
