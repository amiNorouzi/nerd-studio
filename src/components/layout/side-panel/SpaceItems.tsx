import { PiPlanet, PiShoppingBagLight } from "react-icons/pi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SidePanelItem from "@/components/layout/side-panel/SidePanelItem";
import RenderIf from "@/components/shared/RenderIf";
import { Workspace } from "@/components/layout/workspace";

import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

import { useUiStore } from "@/stores/zustand/ui-store";

/**
 * //yed in side panel
 * @param isOpen isSidePanelOpen by expand or open with hover
 * @constructor
 */
function SpaceItems({ isOpen }: { isOpen: boolean }) {
  const { space_items_title } = useGetDictionary().components.side_panel;
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();

  return (
    <Accordion type="single" collapsible className="w-full border-y py-2">
      <AccordionItem value="space" className="!border-b-0">
        <AccordionTrigger
          className={cn(
            "py-0 text-xs font-semibold text-muted-foreground",
            !isOpen && "hidden",
          )}
        >
          {space_items_title}
        </AccordionTrigger>
        <AccordionContent className="pb-0 pt-2">
          <SidePanelItem
            title="App Store"
            to="/app-store"
            icon={PiShoppingBagLight}
            isOpenSidePanel={isOpen}
          />
          <SidePanelItem
            title="Workspace"
            to="/workspace"
            icon={PiPlanet}
            isOpenSidePanel={isOpen}
          />
          <RenderIf isTrue={isSidePanelOpen}>
            <Workspace />
          </RenderIf>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default SpaceItems;
