import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { WorkspaceApp } from "@/services/types";

type UseGetWorkspaceAppsParams = {
  workspace_id: number;
};

export function useGetWorkspaceApps({
  workspace_id,
}: UseGetWorkspaceAppsParams) {
  return useQuery<WorkspaceApp[], Error>({
    queryKey: ["workspace-apps", workspace_id],
    queryFn: async () => {
      const response = await axiosClient.get<WorkspaceApp[]>(
        `/workspaces/get_workspace_apps/${workspace_id}/`,
      );
      return response.data;
    },
  });
}
