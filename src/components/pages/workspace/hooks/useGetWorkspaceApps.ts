import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace, WorkspaceApp } from "@/services/types";
import { AllApps } from "@/services/workspace";

type UseGetWorkspaceAppsParams = {
  workspace_id: number;
};
export interface ResponseGetWorkspaceAppsParams {
  id:number
  app:{
    id:number;
    params:string[];
    prompt:string
    stash:string;
    task:string;
    topic:string
    status:string
  }
  workspace:Workspace
}

export function useGetWorkspaceApps({
  workspace_id,
}: UseGetWorkspaceAppsParams) {
  return useQuery<ResponseGetWorkspaceAppsParams[], Error>({
    queryKey: ["workspace-apps", workspace_id],
    queryFn: async () => {
      const response = await axiosClient.get<ResponseGetWorkspaceAppsParams[]>(
        `/workspaces/get_workspace_apps/${workspace_id}/`,
      );
      return response.data;
    },
  });
}
