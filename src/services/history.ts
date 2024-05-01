import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type HistoriesParams = {
  pageNumber: number;
};

export function useHistories({ pageNumber }: HistoriesParams) {
  const { data } = useQuery({
    queryKey: ["history"],
    async queryFn() {
      const { data } = await axiosClient.get<History>(
        "/histories/" + "?" + pageNumber,
      );

      return data;
    },
  });

  return { data };
}

type HistoryVersionParams = {
  uuid: string;
};

export function useHistoryVersion() {
  return useMutation({
    mutationFn: async ({ uuid }: HistoryVersionParams) => {
      const { data } = await axiosClient.get<HistoryVersion>(
        "/histories/" + uuid,
      );
      return data;
    },
  });
}

type HistoryVUpdateParams = {
  answerUuid: string;
  answer_text: string;
};

export function useHistoryUpdate() {
  return useMutation({
    mutationFn: async ({ answerUuid, answer_text }: HistoryVUpdateParams) => {
      const { data } = await axiosClient.put<Version>(
        "/histories/update/" + answerUuid,
        {
          answer_text,
        },
      );

      return data;
    },
  });
}
export function useHistoryDelete() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ answerUuid }: { answerUuid: string }) => {
      const { data } = await axiosClient.delete<Version>(
        "/histories/delete" + "/" + answerUuid,
      );

      return data;
    },
    onSuccess: () => {
      // @ts-ignore

      queryClient.invalidateQueries(["history"]); // Invalidate the query to trigger a refetch
    },
  });
}

const historyService = {
  useHistories,
  useHistoryVersion,
  useHistoryUpdate,
};

export default historyService;
