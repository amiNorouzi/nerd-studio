import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type AIWritersParams = {
  prompt: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages">;

export function useAIWriter() {
  return useMutation({
    mutationFn: async ({
      prompt,
      temperature,
      max_tokens,
      model,
      top_p,
      frequency_penalty,
      presence_penalty,
    }: AIWritersParams) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/ai_writers/generate_AI_writer/", {
        model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature,
        max_tokens,
        stream: true,
        top_p,
        frequency_penalty,
        presence_penalty,
      });

      return data;
    },
  });
}

const aIWriterService = {
  useAIWriter,
};

export default aIWriterService;
