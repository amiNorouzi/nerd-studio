'use client';
import React, { useEffect, useState } from "react";

import { spacesTabs } from "@/constants/spaces";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetWorkspaceMembers } from "@/components/pages/workspace/hooks/useGetWorkspaceMembers";
import { useSession } from "next-auth/react";
import { useGetDictionary } from "@/hooks";
import { WorkspaceHeader } from "@/components/pages/workspace/components/WorkspaceHeader";

interface IWorkspaceAppsContainerProps {
    workspace_id: number;
}

export default function WorkspaceAppsContainer({workspace_id}:IWorkspaceAppsContainerProps) {
  //justify if the use is the owner of the workspace to show the setting to user
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [ActiveApp, setActiveApp] = useState<string>('All')

  const {
    data: members,

  } = useGetWorkspaceMembers({ workspace_id });
  const { data: session } = useSession();
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  //check if the user is owner
  useEffect(() => {
    if(members && session){
      console.log('owner checking is running');
      const OwnerAccount = members.filter(member=>member.role.title==='owner');
      session.user.email === OwnerAccount[0].user.email && setIsOwner(true)
    }else{
      setIsOwner(false)
    }


  }, [members,session]);
   return (
    <div className="relative w-full overflow-y-auto p-2 md:p-4 xl:p-6">
    <TabsContent value="tabone">tab one</TabsContent>
      <TabsList className="flex lg:hidden  w-full  ">
        {spacesTabs.map(tab => (
          <TabsTrigger
            value={tab.value}
            key={tab.id}
            className="rounded-none border-b-2 border-transparent bg-transparent pb-3 text-foreground hover:text-primary/80  data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none"
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