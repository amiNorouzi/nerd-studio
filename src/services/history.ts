import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { useState } from "react";

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

export function useHistoryVersion({ uuid }: HistoryVersionParams) {

  const { data } = useQuery({
    queryKey: ["history-version",uuid],
    async queryFn() {
      const { data } = await axiosClient.get<HistoryVersion>(
        "/histories/version/" + uuid,
      );
      return data;
    },
  });

  return { data };

}

type HistoryVUpdateParams = {
  answerUuid: string;
  answer_text: string;
};

export function useHistoryUpdate() {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] }); // Invalidate the query to trigger a refetch
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
      queryClient.invalidateQueries({ queryKey: ["history"] }); // Invalidate the query to trigger a refetch
    },
  });
}

const historyService = {
  useHistories,
  useHistoryVersion,
  useHistoryUpdate,
};

export default historyService;


export function useHistoryUpdateChild() {
  const queryClient = useQueryClient();
  const [uuid,setUUID] = useState<string>();
  return useMutation({
    mutationFn: async ({ answerUuid,answer_text }: HistoryVUpdateParams) => {
      setUUID(answerUuid)
      const { data } = await axiosClient.put<Version>(
        "/histories/update/" + answerUuid+'/',
        {
          answer_text,
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history-version", uuid] }); // Invalidate the query to trigger a refetch
    },
  });
}















