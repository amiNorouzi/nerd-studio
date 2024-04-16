import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type HistoriesParams = {
  pageNumber: number;
};

export function useHistories() {
  return useMutation({
    mutationFn: async ({ pageNumber }: HistoriesParams) => {
      const { data } = await axiosClient.get<History>(
        "/histories/" + pageNumber,
      );

      return data;
    },
  });
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

const historyService = {
  useHistories,
};

export default historyService;
