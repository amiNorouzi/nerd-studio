import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";
import { useUpdateWorkspaceSession } from "@/hooks/useUpdateWorkspaceSession";

type WorkspaceCreateParams = {
  name: string;
};

export function useCreateNewWorkSpace() {
  const queryClient = useQueryClient();
  const updateWorkspaceSession = useUpdateWorkspaceSession();

  return useMutation({
    mutationFn: async ({ name }: WorkspaceCreateParams) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        WorkspaceCreateParams
      >("/workspaces/create_workspace/", { name });
      return data as Workspace;
    },
    onSuccess: workspace => {
      // update session with created new workspace if workspace successfully updated
      updateWorkspaceSession(workspace);
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });
}
