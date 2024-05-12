// useWorkspaces.ts
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { WorkspaceList } from "@/services/types";

export function useWorkspaces() {
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const {data: workspaces} = await axiosClient.get('/workspaces/get_user_workspaces');
      return workspaces as WorkspaceList[];
    },
  });
}
