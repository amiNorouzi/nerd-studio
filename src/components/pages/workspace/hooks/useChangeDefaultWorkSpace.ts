"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";
import { useUpdateWorkspaceSession } from "@/hooks/useUpdateWorkspaceSession";

type WorkspaceChangeParams = {
  workspace_id: number;
};

export function useChangeDefaultWorkSpace() {
  const queryClient = useQueryClient();
  const updateWorkspaceSession = useUpdateWorkspaceSession();

  return useMutation({
    mutationFn: async ({ workspace_id }: WorkspaceChangeParams) => {
      const { data } = await axiosClient.put<
        unknown,
        any,
        WorkspaceChangeParams
      >(`/workspaces/change_default/${workspace_id}/`);
      return data as Workspace;
    },
    onSuccess: workspace => {
      // update session with created new workspace if workspace successfully updated
      updateWorkspaceSession(workspace);
      // @ts-ignore
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });
}
