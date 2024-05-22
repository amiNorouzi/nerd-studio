import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import useErrorToast from "@/hooks/useErrorToast";
import useSuccessToast from "@/hooks/useSuccessToast";
import { AxiosError } from "axios";

type WorkspaceInviteMemberParams = {
  workspace_id: number;
  email: string;
  role:string
};

type InvitedMemberDetailsType = {
  workspace: {
    name: string;
  };
  receiver: {
    email: string;
  };
  sender: {
    email: string;
  };
  status: string;
  token: {
    key: string;
  };
};

export function useInviteMember({ workspace_id }: { workspace_id: number }) {
  const { showError } = useErrorToast();
  const { showSuccess } = useSuccessToast();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      workspace_id,
      email,
      role
    }: WorkspaceInviteMemberParams) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        WorkspaceInviteMemberParams
      >("/workspaces/invite_to_workspace/", { workspace_id, email,role });
      return data as InvitedMemberDetailsType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace-members", workspace_id],
      });
    },

  });
}
