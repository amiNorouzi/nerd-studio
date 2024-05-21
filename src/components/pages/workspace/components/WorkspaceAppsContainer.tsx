'use client';
import React, { useEffect, useState } from "react";

import { spacesTabs } from "@/constants/spaces";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetWorkspaceMembers } from "@/components/pages/workspace/hooks/useGetWorkspaceMembers";
import { useSession } from "next-auth/react";
import { useGetDictionary } from "@/hooks";
import { WorkspaceHeader } from "@/components/pages/workspace/components/WorkspaceHeader";
import useIsWorkspaceOwner from "@/hooks/use-isWorkspaceOwner";

interface IWorkspaceAppsContainerProps {
    workspace_id: number;
}

export default function WorkspaceAppsContainer({workspace_id}:IWorkspaceAppsContainerProps) {
  const [ActiveApp, setActiveApp] = useState<string>('All')
  const {
    data: members,

  } = useGetWorkspaceMembers({ workspace_id });
  const { data: session } = useSession();
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  //check if the user is owner
  const {isOwner} = useIsWorkspaceOwner({members})

   return (
    <div className="relative w-full overflow-y-auto ">
    <TabsContent value="tabone">tab one</TabsContent>
      <TabsList className="flex sticky top-0 z-[200] justify-evenly lg:hidden  w-full  ">
        {spacesTabs.map(tab => (
          <TabsTrigger
            value={tab.value}
            key={tab.id}
            className=" w-auto rounded-none border-b-2 border-transparent bg-transparent pb-3 text-foreground hover:text-primary/80 data-[state=active]:bg-transparent  data-[state=active]:border-primary data-[state=active]:text-primary  data-[state=active]:shadow-none"
          >
            {workspaceDictionary[tab["i18TitleKey"]]}
          </TabsTrigger>
        ))}
      </TabsList>

      {spacesTabs.map(({ value, Component }) => (

      <TabsContent key={value} value={value}>
        {/*page content*/}
        {value ==='settings' && isOwner &&
        <Component workspace_id={workspace_id} />
        }
        {
          value !=='settings' &&
          <Component workspace_id={workspace_id}  />

        }
      </TabsContent>
    ))}
  </div>
   );
}