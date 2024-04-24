import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

export function usePinHistory() {
  const { data, isFetching } = useQuery({
    queryKey: ["history-pin"],
    async queryFn() {
      const { data } = await axiosClient.get<Answer[] | []>("/histories/pins/");

      return data;
    },
  });

  return { data, isFetching };
}

interface SetPinParams {
  answer_id: number;
  is_pinned: boolean;
}

export function useSetPinHistory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ answer_id, is_pinned }: SetPinParams) => {
      const { data } = await axiosClient.post<SetPinParams>(
        "/histories/pins/",
        {
          answer_id,
          is_pinned,
        },
      );

      return data;
    },
    onSuccess: () => {
      // @ts-ignore

      queryClient.invalidateQueries(["history-pin"]); // Invalidate the query to trigger a refetch
    },
  });
}
