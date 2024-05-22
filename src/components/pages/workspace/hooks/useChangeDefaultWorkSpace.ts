"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";
import { useUpdateWorkspaceSession } from "@/hooks/useUpdateWorkspaceSession";
import { useWorkspaceStore } from "@/stores/zustand/workspace";

type WorkspaceChangeParams = {
  workspace_id: number;
};

export function useChangeDefaultWorkSpace() {
  const setWorkspceID = useWorkspaceStore.use.setWorkspaceID()
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
      setWorkspceID(workspace.id);
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });
}
