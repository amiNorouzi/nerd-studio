import useStream from "@/services/useStreamingApi";
import { useCallback } from "react";

export type GenerateTranslateParams = {
  text: string;
  txLang: string;
  trLang: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages" | "workspace_id">;

export default function useGenerateTranslate() {
  const { generateStream, ...other } = useStream({
    eventName: "translate",
    endpoint: "/translates/generate_translate/",
    invalidationQuery: { queryKey: ["translate"] },
  });
  const generateTranslate = useCallback(
    ({ text, trLang, txLang, ...params }: GenerateTranslateParams) => {
      return generateStream({
        messages: [
          {
            role: "system",
            content: `You will be provided with a sentence in ${txLang}, and your task is to translate it into ${trLang}.`,
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
    generateTranslate,
    ...other,
  };
}
