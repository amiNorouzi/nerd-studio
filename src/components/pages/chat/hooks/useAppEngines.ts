// useApppaces.ts
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

export function useAppEngines() {
  // const queryClient = useQueryClient();

  return useQuery({
    // @ts-ignore
    queryKey: ['app-engines'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/engines/');
      return data as any[];
    }, 
    refetchOnWindowFocus: false, // do not refetch Apppaces data on focus out/in
    staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
  });
}
