"use client"

import { Input } from "@/components/ui/input";
import InstalledAppCard from "./InstalledAppCard";

import { useGetDictionary } from "@/hooks";
import { useGetWorkspaceApps } from "../hooks/useGetWorkspaceApps";
import Link from "next/link";
import { useParams } from "next/navigation";
import CirclePlus from "@/components/svg-icons/CirclePlus";
import SearchIcon from "@/components/svg-icons/SearchIcon";

import Lottie from 'react-lottie';

import * as animationNoApps from '../../../../../public/animations/no-apps-animation.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationNoApps,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
// import { apps } from "@/constants/spaces";

interface WorkspaceAppsProps {
  workspace_id: number;
}

/**
 * Apps tab content in workspace page
 * Show all apps that are installed in the workspace
 */
export const WorkspaceApps: React.FC<WorkspaceAppsProps> = ({ workspace_id }) => {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  const { lang } = useParams();

  const {data: workspaceApps} = useGetWorkspaceApps({ workspace_id });

  return (
    <>
      <div className="flex items-start justify-between sm:items-center">
        <h1 className="text-lg font-bold">{workspaceDictionary.apps_title}</h1>

        <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:items-center">
          <Link href={`/${lang}/template/custom-template/create`} className="w-[134px] h-[37px] px-[23px] py-1.5 bg-violet-500 rounded-lg justify-center text-nowrap items-center gap-2 inline-flex hover:bg-violet-800">
            <CirclePlus />
            <span className="text-center text-stone-50 text-xs font-normal font-['DM Sans'] leading-[18px]">{workspaceDictionary.add_app_button_label}</span>
          </Link>

          <div className="h-9 relative">
            <Input
              type="search"
              className="w-60 bg-muted ps-7 font-light !h-9 text-sm"
              placeholder={search}
            />
            <div className="absolute start-2 top-1/2 -translate-y-1/2 h-4 w-4">
            <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      {/* ٌWorkspace apps */}
      <div className=''>
        <Lottie options={defaultOptions} height={156} width={131}/>
      </div>
      <section className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          workspaceApps?.map(app => (
            <InstalledAppCard app={app} key={app.id} />
          ))
        }
      </section>
    </>
  );
};
