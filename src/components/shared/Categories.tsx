"use client";
import React, { useRef } from "react";

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
import { useCustomSearchParams } from "@/hooks";
import { cn } from "@/lib/utils";

interface IProps extends React.ComponentPropsWithoutRef<"nav"> {
  name: string;
  categories: string[];
  onChangeTabValue?: (v: string) => void;
  defaultValue?: string;
  value?: string;
  setShowAdvance?:(v:boolean)=>void
}

/**
 * list of apps categories
 * used in app store to user sort apps by category
 * if items is get space more than available width of container, will show more button
 * @constructor
 */
export function Categories({
  name,
  categories,
  onChangeTabValue,
  className,
  defaultValue,
                             setShowAdvance,
  value,
  ...navProps
}: IProps) {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  // get container ref for calculate width
  const ref = useRef<HTMLDivElement>(null);
  //calculate width of container
  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  /**
   * average tab size is 110px
   * calculate max item that can be shown in container by container width / average tab size
   */
  const maxItem = Math.floor(width / 130);

  function handleSelect(v: string) {
    if (onChangeTabValue) {
      setShowAdvance?.(false)
      onChangeTabValue(v);
    } else {
      setSearchParams(name, v);
    }
  }

  return (
    <nav className={cn("w-full max-w-full", className)} ref={ref} {...navProps}>
      <Tabs
        className="h-full w-full"
        onValueChange={handleSelect}
        value={
          value
            ? value
            : searchParams.get(name) || defaultValue || ''
        }
      >
        <TabsList className="row w-full justify-start gap-2 bg-transparent p-0">
          {categories.slice(0, maxItem).map(category => (
            <TabsTrigger
              key={category}
              value={category}
              className="h-[50px] min-w-[102px] max-w-full rounded-lg bg-muted px-4 py-2 text-muted-foreground hover:text-primary data-[state=active]:bg-primary-light data-[state=active]:text-primary"
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
              <HoverCardContent side="bottom" className="col max-w-40 p-1">
                {categories.slice(maxItem).map(category => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="row h-fit w-full justify-start px-2.5 py-2 capitalize text-foreground/70 hover:bg-hover focus-visible:ring-offset-0"
                    onClick={() => handleSelect(category)}
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
