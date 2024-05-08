import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type WorkspaceTransferOwnershipParams = {
    workspace_id: number,
    email: string
};

export function useTransferWorkSpaceOwnerShip({workspace_id,}:{workspace_id:number}) {
    const queryClient = useQueryClient();  
    return useMutation({
      mutationFn: async ({ workspace_id, email }: WorkspaceTransferOwnershipParams) => {
        const { data } = await axiosClient.post<unknown, any, WorkspaceTransferOwnershipParams>('/workspaces/transfer_ownership/', {  workspace_id, email });
        return;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['workspace-members', workspace_id]
        });
      },
    });
  }
  
