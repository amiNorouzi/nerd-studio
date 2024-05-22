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
import { useEffect, useState } from "react";
import { useAddAppToWorkspace, useGetUserApps } from "@/services/workspace";
import { AppCard } from "@/components/pages/workspace/components/AppCard";
import { useWorkspaceStore } from "@/stores/zustand/workspace";
import { useSession } from "next-auth/react";
import { useWorkspaces } from "@/components/pages/workspace/hooks/useWorkspaces";
import { WorkspacePagination } from "@/components/pages/workspace/components/WorkspacePagination";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/useMediaQuery";
import { WorkspaceList } from "@/services/types";

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
  searched:string
  workspaces: WorkspaceList[] | undefined
}

export default function WorkspaceAppsSection({
  workspace_id,
                                               ActiveApp,searched,workspaces
}: IWorkspaceAppsSectionProps) {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  //page number
  const [page,setPage]=useState(1);

  // const {data:MainWorkspaceApps} = useGetUserApps()
  const {data:childWorkspaceApps} = useGetWorkspaceApps({workspace_id,page});

  //get all workspaces
  const { lang } = useParams();

  //show more in all tabs
  const [showMore,setShowMore] = useState(false)
  //check for screen size
  const isDesktop = useMediaQuery('(min-width: 1024px)');


  const appToShowInMobileInAllTab = childWorkspaceApps ? (showMore ?childWorkspaceApps.apps : childWorkspaceApps.apps.slice(0, 4)) : []
  const appToShowInDesktopInAllTab = childWorkspaceApps ? (showMore ?childWorkspaceApps.apps : childWorkspaceApps.apps.slice(0, 8)) : []

  return (
    <div>


      {( childWorkspaceApps?.apps.length===0) ? (
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


        <section className='flex flex-col mx-[16px] gap-4 lg:mx-[32px]'>



          <div  className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">

          {ActiveApp ==='Apps' && childWorkspaceApps && childWorkspaceApps.apps.map(app => (
            <>
              {searched ==='' &&

            <InstalledAppCard appId ={app.id}  app={app.app} key={app.id} workspace_id={workspace_id} workspaces={workspaces} />
              }
              {
                searched.length>0 &&
                app.app.topic.trim().toLowerCase().includes(searched.trim().toLowerCase()) &&
                <InstalledAppCard appId ={app.id}  app={app.app} key={app.id} workspace_id={workspace_id} workspaces={workspaces} />

              }
            </>
            // <AppCard/>
          ))}

          {ActiveApp ==='All' && !isDesktop &&  appToShowInMobileInAllTab.map(app => (
            <InstalledAppCard appId ={app.id}  app={app.app} key={app.id} workspace_id={workspace_id} workspaces={workspaces} />
            // <AppCard/>
          ))}
          {ActiveApp ==='All' && isDesktop &&  appToShowInDesktopInAllTab.map(app => (
            <>
              {searched ==='' &&
            <InstalledAppCard appId ={app.id}  app={app.app} key={app.id} workspace_id={workspace_id} workspaces={workspaces} />
              }
              {
                searched.length>0 &&
                app.app.topic.trim().toLowerCase().includes(searched.trim().toLowerCase()) &&
                <InstalledAppCard appId ={app.id}  app={app.app} key={app.id} workspace_id={workspace_id} workspaces={workspaces} />

              }
                </>
            // <AppCard/>
          ))}

          </div>
          {
            ActiveApp ==='All' &&childWorkspaceApps && childWorkspaceApps.apps.length>3 &&
            <div className='w-full flex  '>
              {

                <div onClick={()=>setShowMore(prev=>!prev)} className={cn(' cursor-pointer  h-[37px] flex bg-secondary text-primary border rounded-xl  items-center justify-center',!isDesktop ?"w-full" : 'w-[134px] mx-auto')}>
                  <p>

                    {showMore ? 'Show Less' : 'Show More'}
                  </p>
                </div>
              }
            </div>

          }
        </section>
          <div className='w-full flex items-center justify-center '>
            {ActiveApp ==='Apps' && childWorkspaceApps && childWorkspaceApps.paginator.num_pages>1 &&

          <div className='flex w-[90%]'>

                    <WorkspacePagination pages={childWorkspaceApps.paginator.num_pages} currenPage = {childWorkspaceApps.current_page} setPage={setPage} />
          </div>
            }
          </div>
        </div>
      )}
    </div>
  );
}
