import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type HighlightParams = {
  content: string;
  type?: HighlightType;
} & Omit<OpenAiCompletionSchemaInput, "messages">;

export function useGenerateHighlight() {
  return useMutation({
    async mutationFn({
      content,
      top_p,
      presence_penalty,
      frequency_penalty,
      max_tokens,
      temperature,
      model,
      type,
      stream,
    }: HighlightParams) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        { type: HighlightParams["type"] } & OpenAiCompletionSchemaInput
      >("/highlights/generate_highlight/", {
        frequency_penalty,
        max_tokens,
        messages: [
          {
            content:
              "Summarize content you are provided with for twitter social network.",
            role: "system",
          },
          {
            content,
            role: "user",
          },
        ],
        model,
        presence_penalty,
        stream,
        temperature,
        top_p,
        type,
      });
      console.warn("service", data);
      return data;
    },
  });
}

const highlightService = {
  useHighlight: useGenerateHighlight,
};

export default highlightService;
