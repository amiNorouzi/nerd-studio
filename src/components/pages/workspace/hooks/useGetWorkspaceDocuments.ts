import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { WorkspaceDocument } from "@/services/types";

type UseGetWorkspaceDocumentsParams = {
  workspace_id: number;
  app_type: string;
  page: number;
};

export function useGetWorkspaceDocuments({
  workspace_id,
  app_type,
  page
}: UseGetWorkspaceDocumentsParams) {
  return useQuery<WorkspaceDocument[], Error>({
    queryKey: ["workspace-docs", workspace_id],
    queryFn: async () => {
      const response = await axiosClient.get<WorkspaceDocument[]>(
        `/workspaces/get_workspace_documents/${workspace_id}/?app_type=${app_type}&page=${page}`,
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
