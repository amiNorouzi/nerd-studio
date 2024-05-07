"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { Workspace } from "@/services/types";
import { useUpdateWorkspaceSession } from "@/hooks/useUpdateWorkspaceSession";
import useErrorToast from '@/hooks/useErrorToast';
import useSuccessToast from "@/hooks/useSuccessToast";
import type { AxiosError } from "axios";

type WorkspaceDeleteParams = {
  workspace_id: number;
};

export function useDeleteWorkSpace() {
  const {showError} = useErrorToast();
  const {showSuccess} = useSuccessToast();
  
  const queryClient = useQueryClient();
  const updateWorkspaceSession = useUpdateWorkspaceSession();

  return useMutation({
    mutationFn: async ({ workspace_id }: WorkspaceDeleteParams) => {
      const { data } = await axiosClient.delete<unknown, any, WorkspaceDeleteParams>(`/workspaces/delete_workspace/${workspace_id}/`);
      return data as Workspace;
    },
    onSuccess: (workspace) => {
      showSuccess("This workspace successfully deleted!")
      // update session with created new workspace if workspace successfully updated
      updateWorkspaceSession(workspace);
      // @ts-ignore
      queryClient.invalidateQueries('workspaces');
    },
    onError: (error: AxiosError<{detail:string}>) => {
      console.log(error);
      if (error.response) {
        showError(error.response.data.detail);
      } else {
        showError("Sorry! an unkown error occurred");
      }
    }
    
  });
}
