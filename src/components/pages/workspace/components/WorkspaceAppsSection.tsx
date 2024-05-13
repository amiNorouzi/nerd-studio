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
}

export default function WorkspaceAppsSection({
  workspace_id,
}: IWorkspaceAppsSectionProps) {
  const {
    common: { search },
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();
  const { lang } = useParams();
  const { data: workspaceApps } = useGetWorkspaceApps({ workspace_id });

  return (
    <div>
      <div className="flex items-start justify-between sm:items-center">
        <h1 className="text-xl font-bold">{workspaceDictionary.apps_title}</h1>

        <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:items-center">
          <CreateNewAppLink
            href={`/${lang}/template/custom-template/create`}
            label={workspaceDictionary.add_app_button_label}
          />

          <div className="relative h-9">
            <Input
              type="search"
              className="!h-9 w-60 bg-muted ps-7 text-sm font-light"
              placeholder={search}
            />
            <div className="absolute start-2 top-1/2 h-4 w-4 -translate-y-1/2">
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      {workspaceApps?.length === 0 ? (
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
        <section className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {workspaceApps?.map(app => (
            <InstalledAppCard app={app} key={app.id} />
          ))}
        </section>
      )}
    </div>
  );
}
