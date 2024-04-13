import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { HttpStatusCode } from "axios";

type GrammarGenerateParams = {
  text: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages" | "top_p">;

export function useGenerateGrammar() {
  console.log("use Grammar");
  return useMutation({
    mutationFn: async ({
      text,
      model,
      temperature,
      max_tokens,
    }: GrammarGenerateParams) => {
      try {
        const { data } = await axiosClient.post<
          unknown,
          any,
          OpenAiCompletionSchemaInput
        >("/grammar/generate_grammar/", {
          model,
          messages: [
            {
              role: "user",
              content: `some (grammar)! correction:   ${text}`,
            },
          ],
          temperature,
          max_tokens,
          stream: true,
          top_p: 1,
        });

        return data;
      } catch (e) {
        if (e instanceof ErrorEvent) console.log("Error Event", e.error);
        if (typeof e) console.log("Error Typeof", typeof e);
        console.log(e);
      } finally {
        console.log("Finally!");
      }
    },
  });
}
