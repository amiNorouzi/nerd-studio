"use client"
import { useState } from "react";

import { PiPlanet, PiShoppingBagLight } from "react-icons/pi";
import { RxDrawingPin, RxDrawingPinFilled } from "react-icons/rx";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SidePanelItem from "@/components/layout/side-panel/SidePanelItem";
import RenderIf from "@/components/shared/RenderIf";
import { Workspace } from "@/components/layout/workspace";
import { MyTooltip } from "@/components/shared/myTooltip";

import useCheckSidePanelOpen from "./hooks/useCheckSidePanelOpen";
import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

/**
 * used in side panel
 * @constructor
 */
function SpaceItems() {
  const { space_items_title } = useGetDictionary().components.side_panel;
  const [pin, setPin] = useState(false);

  const isOpenSidePanel = useCheckSidePanelOpen();

  return (
    <Accordion
      type="single"
      collapsible
      className={cn("w-full border-y py-2", !isOpenSidePanel && "border-t-0")}
      value={pin ? "space" : undefined}
    >
      <AccordionItem value="space" className="!border-b-0">
        <AccordionTrigger
          className={cn(
            "relative items-center px-3 py-0 text-xs font-semibold text-muted-foreground",
            !isOpenSidePanel && "hidden",
          )}
        >
          <div className="spacing-row w-full pe-1">
            {space_items_title}
            <MyTooltip title="Pin in window" side="top">
              <div
                className="fit cursor-pointer p-1"
                onClick={() => setPin(!pin)}
              >
                {pin ? (
                  <RxDrawingPinFilled size=".9rem" className="text-primary" />
                ) : (
                  <RxDrawingPin size=".9rem" />
                )}
              </div>
            </MyTooltip>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-2">
          <SidePanelItem
            title="App Store"
            to="/app-store"
            icon={PiShoppingBagLight}
          />
          <SidePanelItem title="Workspace" to="/workspace" icon={PiPlanet} />
          <RenderIf isTrue={isOpenSidePanel}>
            <div className="px-3 pt-2">
              <Workspace />
            </div>
          </RenderIf>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SpaceItems;
