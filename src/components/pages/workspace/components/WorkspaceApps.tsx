import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InstalledAppCard from "./InstalledAppCard";

import { useGetDictionary } from "@/hooks";
import { useGetWorkspaceApps } from "../hooks/useGetWorkspaceApps";

import { apps } from "@/constants/spaces";

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

  const workspaceApps = useGetWorkspaceApps({ workspace_id });

  console.log("workspaceApps: ", workspaceApps);

  return (
    <>
      <div className="flex items-start justify-between sm:items-center">
        <h1 className="text-lg font-bold">{workspaceDictionary.apps_title}</h1>

        <div className="flex flex-col items-end gap-2 sm:flex-row-reverse sm:items-center">
          <Button className="w-fit">
            <IoAdd className="me-2 h-5 w-5" />
            {workspaceDictionary.add_app_button_label}
          </Button>

          <div className="fit relative">
            <Input
              type="search"
              className="w-60 bg-muted ps-7 font-light"
              placeholder={search}
            />
            <FiSearch
              size="1rem"
              className="absolute start-2 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {apps.map(app => (
          <InstalledAppCard app={app} key={app.id} />
        ))}
      </section>
    </>
  );
};
