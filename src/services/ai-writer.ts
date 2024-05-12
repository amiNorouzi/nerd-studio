"use client"

import useStream from "@/services/useStreamingApi";
import { useCallback } from "react";

type AIWritersParams = {
  text: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages" | "workspace_id">;

export default function useAIWriter() {
  const { generateStream, ...other } = useStream({
    eventName: "ai_writer",
    endpoint: "/ai_writers/generate_AI_writer/",
    invalidationQuery: { queryKey: ["ai_writer"] },
  });
  const generateRewrite = useCallback(
    ({ text, ...params }: AIWritersParams) => {
      return generateStream({
        messages: [
          {
            role: "system",
            content: "you are a helpful assistant.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        ...params,
      });
    },
    [generateStream],
  );

  return {
    generateRewrite,
    ...other,
  };
}
