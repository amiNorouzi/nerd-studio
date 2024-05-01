import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";

type WorkspaceCreateParams = {
  name: string;
};

export function useCreateNewWorkSpace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: WorkspaceCreateParams) => {
      const { data } = await axiosClient.post<unknown, any, WorkspaceCreateParams>('/workspaces/create_workspace/', { name });
      return data as Workspace;
    },
    onSuccess: () => {
        // @ts-ignore
      queryClient.invalidateQueries('workspaces');
    },
  });
}
