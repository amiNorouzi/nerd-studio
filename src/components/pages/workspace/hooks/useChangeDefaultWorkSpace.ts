import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";

type WorkspaceChangeParams = {
  workspace_id: number;
};

export function useChangeDefaultWorkSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ workspace_id }: WorkspaceChangeParams) => {
      const { data } = await axiosClient.put<unknown, any, WorkspaceChangeParams>(`/workspaces/change_default/${workspace_id}/`);
      return data as Workspace;
    },
    onSuccess: () => {
        // @ts-ignore
      queryClient.invalidateQueries('workspaces');
    },
  });
}
