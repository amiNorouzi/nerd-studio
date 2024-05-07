import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";
// import { useUpdateWorkspaceSession } from "@/hooks/useUpdateWorkspaceSession";

type WorkspaceTransferOwnershipParams = {
    workspace_id: number,
    email: string
};

export function useTransferWorkSpaceOwnerShip({workspace_id}:{workspace_id:number}) {
    const queryClient = useQueryClient();  
    // const updateWorkspaceSession = useUpdateWorkspaceSession();
  
    return useMutation({
      mutationFn: async ({ workspace_id, email }: WorkspaceTransferOwnershipParams) => {
        const { data } = await axiosClient.post<unknown, any, WorkspaceTransferOwnershipParams>('/workspaces/transfer_ownership/', {  workspace_id, email });
        return;
      },
      onSuccess: () => {
          // update session with created new workspace if workspace successfully updated
          //   updateWorkspaceSession(workspace);
          // @ts-ignore
          
          queryClient.invalidateQueries(['workspace-members', workspace_id]);
      },
    });
  }
  
