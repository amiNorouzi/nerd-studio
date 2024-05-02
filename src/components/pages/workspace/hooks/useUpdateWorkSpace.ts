import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";
import { useUpdateWorkspaceSession } from "@/hooks/useUpdateWorkspaceSession";

type WorkspaceUpdateParams = {
  workspace_id: number;
  name: string;
};

export function useUpdateWorkSpace() {
  const queryClient = useQueryClient();
  const updateWorkspaceSession = useUpdateWorkspaceSession();

  return useMutation({
    mutationFn: async ({ workspace_id, name }: WorkspaceUpdateParams) => {
      const { data } = await axiosClient.put<unknown, any, Omit<WorkspaceUpdateParams, "workspace_id"> >(`/workspaces/update_workspace/${workspace_id}/`, {name});
      return data as Workspace;
    },
    onSuccess: (workspace) => {
    // update session with created new workspace if workspace successfully updated
    updateWorkspaceSession(workspace)
    // @ts-ignore
      queryClient.invalidateQueries('workspaces');
    },
  });
}
