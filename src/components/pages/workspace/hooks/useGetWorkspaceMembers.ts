import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { useToast } from "@/components/ui/use-toast";
import { WorkspaceMember } from "../types/members";

type UseGetWorkspaceMembersParams = {
  workspace_id: number;
};

export function useGetWorkspaceMembers({ workspace_id }: UseGetWorkspaceMembersParams) {

    return useQuery<WorkspaceMember[], Error>({
        queryKey: ['workspace-members', workspace_id],
        queryFn: async () => {
            const response = await axiosClient.get<WorkspaceMember[]>(`/workspaces/get_workspace_members/${workspace_id}/`);
            return response.data;
        },
    });
}
