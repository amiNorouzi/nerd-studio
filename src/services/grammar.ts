import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { useSession } from "next-auth/react";
import useStream from "@/services/useStreamingApi";
import { useCallback } from "react";
import { GenerateTranslateParams } from "@/services/translate";

export type GrammarGenerateParams = {
  text: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages" | "workspace_id">;

export function useGenerateGrammar() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { generateStream, ...other } = useStream({
    appType: "grammar",
    endpoint: "/grammar/generate_grammar/",
    invalidationQuery: { queryKey: ["history"] },
  });

  const generateGrammar = useCallback(
    ({ text,...params }: GrammarGenerateParams) => {
      return generateStream({
        messages: [
          {
            content:
              "You will be provided with statements, and your task is to convert them to standard English.",
            role: "system",
          },
          {
            role: "user",
            content: `${text}"`,
          },
        ],
        ...params,
      });
    },
    [generateStream],
  );

  return {
    generateGrammar,
    ...other,
  };
}

