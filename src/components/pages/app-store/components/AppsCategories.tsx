"use client";
import { useRef } from "react";

import { useResizeObserver } from "usehooks-ts";
import { IoIosMore } from "react-icons/io";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import RenderIf from "@/components/shared/RenderIf";

// list of apps categories for test
//TODO fetch with api
const categories = [
  "Recommended",
  "Writing",
  "Chat",
  "Image",
  "Video",
  "Audio",
  "Social",
  "Programing",
  "Other",
];

/**
 * list of apps categories
 * used in app store to user sort apps by category
 * if items is get space more than available width of container, will show more button
 * @constructor
 */
export function AppsCategories() {
  // get container ref for calculate width
  const ref = useRef<HTMLDivElement>(null);
  //calculate width of container
  const { width = 0, height = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  /**
   * average tab size is 85px
   * calculate max item that can be shown in container by container width / average tab size
   */
  const maxItem = Math.floor(width / 85);

  return (
    <nav className="w-full max-w-full" ref={ref}>
      <Tabs defaultValue="Recommended" className="h-full w-full">
        <TabsList className="row w-full justify-start gap-1 overflow-hidden border-b bg-transparent pb-0">
          {categories.slice(0, maxItem).map(category => (
            <TabsTrigger
              key={category}
              value={category}
              className="rounded-none border-b-2 border-transparent bg-transparent pb-2 text-sm
               text-muted-foreground hover:text-primary data-[state=active]:border-primary
              data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              {category}
            </TabsTrigger>
          ))}
          {/*
           * if items is get space more than available width of container, will show more button
           * a hover card will show when hover on more button and show rest of categories vertically list
           */}
          <RenderIf isTrue={maxItem < categories.length}>
            <HoverCard openDelay={10} closeDelay={50}>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="fit p-1 ">
                  <IoIosMore size="1rem" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side="bottom" className="col max-w-36 p-1">
                {categories.slice(maxItem).map(category => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="row h-fit w-full justify-start px-2.5 py-2 text-foreground/70 hover:bg-hover focus-visible:ring-offset-0"
                  >
                    {category}
                  </Button>
                ))}
              </HoverCardContent>
            </HoverCard>
          </RenderIf>
        </TabsList>
      </Tabs>
    </nav>
  );
}
