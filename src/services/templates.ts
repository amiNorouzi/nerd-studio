import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";

type GenerateTemplateParams = {
  prompt: string;
} & Omit<OpenAiCompletionSchemaInput, "stream" | "messages">;

export function useGenerateTemplate() {
  return useMutation({
    async mutationFn({
      prompt,
      model,
      temperature,
      max_tokens,
    }: GenerateTemplateParams) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        OpenAiCompletionSchemaInput
      >("/templates/generate_template/", {
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
      });

      return data;
    },
  });
}

const templateService = {
  useGenerateTemplate,
};

export default templateService;
