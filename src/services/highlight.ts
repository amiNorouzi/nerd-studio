import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import useStream from "@/services/useStreamingApi";
import { useCallback } from "react";

type HighlightParams = {
  content: string;
  type?: HighlightType;
} & Omit<OpenAiCompletionSchemaInput, "messages">;

export default function useGenerateHighlight() {
  const { generateStream, ...other } = useStream({
    appType: "translate", //todo
    endpoint: "/highlights/generate_highlight/",
    invalidationQuery: { queryKey: ["generate_highlight"] },
  });
  const generateTranslate = useCallback(
    ({ type, content, ...params }: HighlightParams) => {
      return generateStream({
        messages: [
          {
            role: "system",
            content: `Summarize content you are provided with for ${type} social network.`,
          },
          {
            role: "user",
            content,
          },
        ],
        ...params,
      });
    },
    [generateStream],
  );

  return {
    generateTranslate,
    ...other,
  };
}
