"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";
import { useUpdateWorkspaceSession } from "@/hooks/useUpdateWorkspaceSession";

type WorkspaceDeleteParams = {
  workspace_id: number;
};

export function useDeleteWorkSpace() {
  const queryClient = useQueryClient();
  const updateWorkspaceSession = useUpdateWorkspaceSession();

  return useMutation({
    mutationFn: async ({ workspace_id }: WorkspaceDeleteParams) => {
      const { data } = await axiosClient.delete<unknown, any, WorkspaceDeleteParams>(`/workspaces/delete_workspace/${workspace_id}/`);
      return data as Workspace;
    },
    onSuccess: (workspace) => {
      
      // update session with created new workspace if workspace successfully updated
      updateWorkspaceSession(workspace);
      // @ts-ignore
      queryClient.invalidateQueries('workspaces');
    },
  });
}
