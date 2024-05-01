import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";

type WorkspaceUpdateParams = {
  workspace_id: number;
  name: string;
};

export function useUpdateWorkSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ workspace_id, name }: WorkspaceUpdateParams) => {
      const { data } = await axiosClient.put<unknown, any, Omit<WorkspaceUpdateParams, "workspace_id"> >(`/workspaces/update_workspace/${workspace_id}/`, {name});
      return data as Workspace;
    },
    onSuccess: () => {
        // @ts-ignore
      queryClient.invalidateQueries('workspaces');
    },
  });
}
