// useWorkspaces.ts
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { Workspace } from "@/services/types";

export function useWorkspaces() {
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const {data: workspaces} = await axiosClient.get('/workspaces/get_user_workspaces');
      return workspaces as Workspace[];
    },
    refetchOnWindowFocus: false, // do not refetch workspaces data on focus out/in
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
  });
}
