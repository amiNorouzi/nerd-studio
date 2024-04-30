import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { useSession } from "next-auth/react";

type GrammarGenerateParams = {
  text: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages" | "workspace_id">;

export function useGenerateGrammar() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async ({
      text,
      max_tokens,
      temperature,
      model,
      top_p,
      frequency_penalty,
      presence_penalty,
      document_name,
    }: GrammarGenerateParams) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/grammar/generate_grammar/", {
        model,
        messages: [
          {
            content:
              "You will be provided with statements, and your task is to convert them to standard English.",
            role: "system",
          },
          {
            role: "user",
            content: `grammar errors of: "${text}"`,
          },
        ],
        frequency_penalty,
        presence_penalty,
        temperature,
        max_tokens,
        top_p,
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
