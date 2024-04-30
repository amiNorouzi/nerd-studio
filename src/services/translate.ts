import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { useSession } from "next-auth/react";

type GenerateTranslateParams = {
  text: string;
  txLang: string;
  trLang: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages" | "workspace_id">;

export function useGenerateTranslate() {
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      text,
      trLang,
      txLang,
      model,
      temperature,
      max_tokens,
      top_p,
      presence_penalty,
      frequency_penalty,
      document_name,
    }: GenerateTranslateParams) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/translates/generate_translate/", {
        model,
        messages: [
          {
            role: "user",
            content: `Translate the following ${txLang} text to ${trLang}: "${text}"`,
          },
        ],
        temperature,
        max_tokens,
        stream: true,
        top_p,
        presence_penalty,
        frequency_penalty,
        document_name,
        workspace_id: session?.user.workspace.id!,
      });

      return data;
    },
    onSuccess: () => {
      // @ts-ignore

      queryClient.invalidateQueries(["history"]); // Invalidate the query to trigger a refetch
    },
  });
}

type PDFConvertorResponse = {
  text: string;
};

const translateService = {
  useGenerateTranslate,
};

export default translateService;
