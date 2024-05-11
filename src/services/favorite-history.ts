import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

export function useFavorites() {
  const { data, isFetching } = useQuery({
    queryKey: ["favorites"],
    async queryFn() {
      const { data } = await axiosClient.get<Answer[] | []>(
        "/histories/favorites/",
      );

      return data;
    },
  });

  return { data, isFetching };
}

interface SetFavoriteParams {
  answer_id: number;
  is_favorite: boolean;
}

export function useSetFavorites() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ answer_id, is_favorite }: SetFavoriteParams) => {
      const { data } = await axiosClient.post<SetFavoriteParams>(
        "/histories/favorites/",
        {
          answer_id,
          is_favorite,
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] }); // Invalidate the query to trigger a refetch
    },
  });
}
