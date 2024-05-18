import useStream from "@/services/useStreamingApi";
import { useCallback } from "react";

type HighlightParams = {
  content: string;
  type: HighlightType;
} & OpenAiCompletionParams;

export default function useGenerateHighlight() {
  const { generateStream, ...other } = useStream<Pick<HighlightParams, "type">>(
    {
      appType: "highlight",
      endpoint: "/highlights/generate_highlight/",
      invalidationQuery: { queryKey: ["generate_highlight"] },
    },
  );
  const generateHighlight = useCallback(
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
        type,
        ...params,
      });
    },
    [generateStream],
  );

  return {
    generateHighlight,
    ...other,
  };
}
