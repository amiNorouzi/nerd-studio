"use client";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Workspace } from "@/components/layout/workspace";
import { OpenSidePanelButton } from "@/components/layout/header/OpenSidePanelButton";

const tabItemClass =
  "rounded-none text-sm font-semibold text-foreground  data-[state=active]:border-b-4 data-[state=active]:border-primary  data-[state=active]:text-primary data-[state=active]:shadow-none hover:text-primary";

export function WorkspaceTabs() {
  return (
    <Tabs
      defaultValue="tabone"
      className="flex h-full w-full flex-col divide-y"
    >
      <div className="flex w-full items-center p-2">
        <OpenSidePanelButton />
        <Workspace isHeader />
        <TabsList className="flex w-full flex-1 items-center justify-start gap-2 bg-background">
          <TabsTrigger value="tabone" className={tabItemClass}>
            TabOne
          </TabsTrigger>
          <TabsTrigger value="tabtwo" className={tabItemClass}>
            Tab two
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="flex-1">
        <TabsContent value="tabone">tab one</TabsContent>
        <TabsContent value="tabtwo">tab two</TabsContent>
      </div>
    </Tabs>
  );
}
