import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type GenerateTranslateParams = {
  pageNumber: number;
};

export function useHistories() {
  return useMutation({
    mutationFn: async ({ pageNumber }: GenerateTranslateParams) => {
      const { data } = await axiosClient.get<History>(
        "/histories/" + pageNumber,
      );

      return data;
    },
  });
}

const historyService = {
  useHistories,
};

export default historyService;
