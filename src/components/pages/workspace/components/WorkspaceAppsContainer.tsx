'use client';
import React from 'react';

import { spacesTabs } from "@/constants/spaces";
import { TabsContent } from "@/components/ui/tabs";

interface IWorkspaceAppsContainerProps {
    workspace_id: number;
}

export default function WorkspaceAppsContainer({workspace_id}:IWorkspaceAppsContainerProps) {
   return (
    <div className="relative w-full overflow-y-auto p-2 md:p-4 xl:p-6">
    <TabsContent value="tabone">tab one</TabsContent>
    {spacesTabs.map(({ value, Component }) => (
      <TabsContent key={value} value={value}>
        {/*page content*/}
        <Component workspace_id={workspace_id}/>
      </TabsContent>
    ))}
  </div>
   );
}