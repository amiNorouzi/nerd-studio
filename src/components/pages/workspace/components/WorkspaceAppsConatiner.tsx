'use client';
import React, { useState } from 'react';
import Lottie from 'react-lottie';

import * as animationNoApps from '@/components/animations/no-apps-animation.json';
import { spacesTabs } from "@/constants/spaces";
import { TabsContent } from "@/components/ui/tabs";

const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animationNoApps,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

interface IWorkspaceAppsConatinerProps {
    workspace_id: number;
}

export default function WorkspaceAppsConatiner({workspace_id}:IWorkspaceAppsConatinerProps) {
   return (
    <div className="relative h-[50%] w-full overflow-y-auto p-2 md:p-4 xl:p-6">
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