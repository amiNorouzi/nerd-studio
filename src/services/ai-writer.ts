import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type AIWritersParams = {
  prompt: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages">;

export function useAIWriter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      prompt,
      temperature,
      max_tokens,
      model,
      top_p,
      frequency_penalty,
      presence_penalty,
      document_name,
      workspace_id,
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
        workspace_id,
        document_name,
      });

      return data;
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(["history"]); // Invalidate the query to trigger a refetch
    },
  });
}

const aIWriterService = {
  useAIWriter,
};

export default aIWriterService;
