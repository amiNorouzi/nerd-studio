import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { Workspace } from "@/services/types";

type UseGetWorkspaceAppsParams = {
  workspace_id: number;
};

export function useGetWorkspaceApps({ workspace_id }: UseGetWorkspaceAppsParams) {
  return useQuery<Workspace[], Error>({
    queryKey: ['workspace-apps', workspace_id],
    queryFn: async () => {
        const { data: workspaceApps } = await axiosClient.get<Workspace[]>(`/workspaces/get_workspace_apps/${workspace_id}/`);
        return workspaceApps;
      }, 
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
