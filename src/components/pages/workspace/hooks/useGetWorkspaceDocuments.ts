import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { WorkspaceDocument } from "@/services/types";

export type App_types = "template" | "ai_writer" | "translate" | "code" | "grammar" | "text_to_image" | "image_to_image" | "image_upscale" | "highlight";

type UseGetWorkspaceDocumentsParams = {
  workspace_id: number;
  app_type: App_types;
  page: number;
};

export function useGetWorkspaceDocuments({
  workspace_id,
  app_type,
  page
}: UseGetWorkspaceDocumentsParams) {
  return useQuery<WorkspaceDocument, Error>({
    queryKey: ["workspace-docs", workspace_id,app_type],
    queryFn: async () => {
      const response = await axiosClient.get<WorkspaceDocument>(
        `/workspaces/get_workspace_documents/${workspace_id}/?app_type=${app_type}&page=${page}`,
      );
      return response.data;
    },
  });
}
