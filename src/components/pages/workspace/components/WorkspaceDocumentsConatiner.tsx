'use client';
import React, { useState } from 'react';
import { spacesTabs } from "@/constants/spaces";
import { TabsContent } from "@/components/ui/tabs";


interface IWorkspaceDocumentsConatinerProps {
    workspace_id: number;
}

export default function WorkspaceDocumentsConatiner({workspace_id}:IWorkspaceDocumentsConatinerProps) {
   return (
    <div className="w-full overflow-y-auto p-2 md:p-4 xl:p-6">
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