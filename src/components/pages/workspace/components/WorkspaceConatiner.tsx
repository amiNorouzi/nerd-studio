'use client';
import React, { useState } from 'react';
import { spacesTabs } from "@/constants/spaces";
import { TabsContent } from "@/components/ui/tabs";


interface IWorkspaceConatinerProps {
    workspace_id: number;
}

export default function WorkspaceConatiner({workspace_id}:IWorkspaceConatinerProps) {
   const [state, setState] = useState();
   return (
    <div className="max-h-page h-full w-full overflow-y-auto p-2 md:p-4 xl:p-6">
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