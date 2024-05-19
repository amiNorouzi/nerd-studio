"use client";

import { Input } from "@/components/ui/input";
import InstalledAppCard from "./InstalledAppCard";

import { useGetDictionary } from "@/hooks";
import { useParams } from "next/navigation";
import SearchIcon from "@/components/svg-icons/SearchIcon";

import Lottie from "react-lottie";

import * as animationNoApps from "../../../../../public/animations/no-apps-animation.json";
import CreateNewAppLink from "./CreateNewAppLink";
import { useGetWorkspaceApps } from "../hooks/useGetWorkspaceApps";
import ToggleApp from "@/components/pages/workspace/components/ToggleApp";
import { useState } from "react";
import { useAddAppToWorkspace, useGetUserApps } from "@/services/workspace";
import { AppCard } from "@/components/pages/workspace/components/AppCard";
import { useWorkspaceStore } from "@/stores/zustand/workspace";
import { useSession } from "next-auth/react";
import { useWorkspaces } from "@/components/pages/workspace/hooks/useWorkspaces";
import { WorkspacePagination } from "@/components/pages/workspace/components/WorkspacePagination";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationNoApps,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
// import { apps } from "@/constants/spaces";

interface IWorkspaceAppsSectionProps {
  workspace_id: number;
  ActiveApp:string
}

export default function WorkspaceAppsSection({
  workspace_id,
                                               ActiveApp
}: IWorkspaceAppsSectionProps) {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  //receive Apps of the workspace

  const {data:MainWorkspaceApps} = useGetUserApps()
  const {data:childWorkspaceApps} = useGetWorkspaceApps({workspace_id});

  //get all workspaces
  const {data:workspaces, error, isLoading, isFetching, isError, isSuccess} = useWorkspaces();
  const { lang } = useParams();
  return (
    <div>


      {(MainWorkspaceApps?.length === 0 && childWorkspaceApps?.length===0) ? (
        <div className="mt-12 flex h-full grow items-center justify-center gap-4">
          <div>
            <Lottie options={defaultOptions} height={156} width={131} />
          </div>
          <div className="flex h-full flex-col justify-center">
            <div className="flex h-full grow flex-col justify-center gap-4">
              <span className="flex h-full flex-col items-center text-2xl font-bold capitalize">
                No App Created Yet!
              </span>
              <span className="items-center text-[14px] capitalize text-gray-400">
                Please create new app!
              </span>
              <CreateNewAppLink
                href={`/${lang}/template/custom-template/create`}
                label={workspaceDictionary.add_app_button_label}
                className="w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-col gap-5'>


        <section className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">



          { childWorkspaceApps?.map(app => (
            <InstalledAppCard appId ={app.id}  app={app.app} key={app.id} workspace_id={workspace_id} workspaces={workspaces} />
            // <AppCard/>
          ))}

        </section>
          <div className='w-full flex items-center justify-center '>
            {(ActiveApp ==='Apps' && ((MainWorkspaceApps && MainWorkspaceApps.length>0) || (childWorkspaceApps && childWorkspaceApps.length>0))) &&

<div className='flex w-[90%]'>

          <WorkspacePagination pages={10} />
</div>
            }
          </div>
        </div>
      )}
    </div>
  );
}
