import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

interface GrammarParams
  extends Omit<OpenAiCompletionSchemaInput, "stream" | "messages"> {
  text: string;
}

export function useGenerateGrammar() {
  return useMutation({
    mutationFn: async ({
      text,
      max_tokens,
      temperature,
      model,
      top_p,
    }: GrammarParams) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/grammar/generate_grammar/", {
        model,
        messages: [
          {
            role: "user",
            content: `grammar errors of: "${text}"`,
          },
        ],
        temperature,
        max_tokens,
        stream: true,
        top_p,
      });

      return data;
    },
  });
}
