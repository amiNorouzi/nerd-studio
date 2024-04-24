import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import { useState } from "react";

type GenerateTranslateParams = {
  text: string;
  txLang: string;
  trLang: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages">;

export function useGenerateTranslate() {
  return useMutation({
    mutationFn: async ({
      text,
      trLang,
      txLang,
      model,
      temperature,
      max_tokens,
      frequency_penalty,
      presence_penalty,
      top_p,
    }: GenerateTranslateParams) => {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/translates/generate_translate/", {
        model,
        messages: [
          {
            role: "user",
            content: `Translate the following ${txLang} text to ${trLang}: "${text}"`,
          },
        ],
        temperature,
        max_tokens,
        stream: true,
        frequency_penalty,
        presence_penalty,
        top_p,
      });

      return data;
    },
  });
}

type PDFConvertorResponse = {
  text: string;
};

const translateService = {
  useGenerateTranslate,
};

export default translateService;
