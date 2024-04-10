import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type CodeConvertorParams = {
  code: string;
  fromLang: string;
  toLang: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages">;

export function useCodeConvertor() {
  return useMutation({
    async mutationFn({
      code,
      model,
      temperature,
      max_tokens,
      fromLang,
      toLang,
    }: CodeConvertorParams) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/codes/generate_code/", {
        model,
        messages: [
          {
            role: "user",
            content: `convert this code from ${fromLang} to ${toLang} language: "${code}"`,
          },
        ],
        temperature,
        max_tokens,
        stream: true,
        top_p: 1.0,
      });

      return data;
    },
  });
}

type GenerateCodeParams = {
  prompt: string;
  language: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages">;

export function useGenerateCode() {
  return useMutation({
    async mutationFn({
      prompt,
      model,
      temperature,
      max_tokens,
      language,
    }: GenerateCodeParams) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/codes/generate_code/", {
        model,
        messages: [
          {
            role: "user",
            content: `generate ${language} code for this prompt: "${prompt}"`,
          },
        ],
        temperature,
        max_tokens,
        stream: true,
        top_p: 1.0,
      });

      return data;
    },
  });
}
type CodeExplainerParams = {
  info: string;
  code: string;
  language: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages">;

export function useCodeExplainer() {
  return useMutation({
    async mutationFn({
      info,
      code,
      model,
      temperature,
      max_tokens,
      language,
    }: CodeExplainerParams) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/codes/generate_code/", {
        model,
        messages: [
          {
            role: "user",
            content: `Explain this ${language} code: ${info} \n"${code}"`,
          },
        ],
        temperature,
        max_tokens,
        stream: true,
        top_p: 1.0,
      });

      return data;
    },
  });
}

const codeService = {
  useCodeConvertor,
  useGenerateCode,
  useCodeExplainer,
};

export default codeService;
