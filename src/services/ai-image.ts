import { useMutation, useQuery } from "@tanstack/react-query";

import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import { useAiImageStore } from "@/stores/zustand/ai-image-store";
import { dataURLtoFile } from "@/components/pages/ai-image/utils";
import useImageTabs from "@/components/pages/ai-image/hooks/useImageTabs";

import type { ImageModelType } from "@/stores/zustand/types";
import type { ModelItem } from "@/services/types";
import axiosClient from "./axios-client";

export function useGetImageModels(currentModelType: string) {
  const { axiosFetch } = useAxiosFetcher();
  return useQuery({
    queryKey: ["engines", currentModelType],
    queryFn: () =>
      axiosFetch<ModelItem[]>({
        url: `/engines/?app_type=${currentModelType}`,
        method: "post",
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

function normalizeRequestData(
  currentModelType: ImageModelType,
  model: string,
  inputs: { [key: string]: string | number },
) {
  try {
    let data: FormData | { [key: string]: string | number } = {
      model,
      ...inputs,
    };
    if (currentModelType !== "text_to_image") {
      data = new FormData();
      const { mask = "", image, ...restData } = inputs;
      data.append("image", dataURLtoFile(image as string, "image"));
      if (currentModelType === "image_upscale") {
        const { upscale_by = "width", upscale_value = 512 } = restData;
        data.append(
          "generate_data",
          JSON.stringify({ [upscale_by]: upscale_value }),
        );
      } else {
        data.append("generate_data", JSON.stringify(restData));
      }
      if (!!mask && mask !== "") {
        data.append("mask", dataURLtoFile(mask as string, "mask"));
      }
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}

function useImageGenerate() {
  const inputs = useAiImageStore.use.inputs();
  const setGeneratedImages = useAiImageStore.use.setGeneratedImages();
  const { currentModelType } = useImageTabs();
  const { axiosFetch } = useAxiosFetcher();

  const currentTabInputs = inputs[currentModelType];

  return useMutation({
    mutationFn: async ({
      modelUlr,
      model,
    }: {
      modelUlr: string;
      model: string;
    }) => {
      const data = await axiosFetch<string[]>(
        {
          url: modelUlr,
          method: "post",
          showError: true,
          requestConfig: {
            headers: {
              "Content-Type":
                currentModelType === "text_to_image"
                  ? "application/json"
                  : "multipart/form-data",
            },
          },
        },
        normalizeRequestData(currentModelType, model, currentTabInputs),
      );
      if (data) {
        console.log({ data });
        setGeneratedImages(currentModelType, data);
      }
      return data;
    },
  });
}
export function useGeneratePic() {
  return useMutation({
    async mutationFn({
      sizePic,
      model,
      prompt,
    }: {
      model: string;
      sizePic: string;
      prompt: string;
    }) {
      try {
        const response = await axiosClient.post<any>(
          "/images/open_ai_generate_text_to_image/",
          {
            model: model,
            n: 1,
            prompt: prompt,
            quality: "standard",
            response_format: "url",
            size: "1024x1024",
            style: "vivid",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log("res:", response.data);
        return response.data;
      } catch (err) {
        console.log("error happened in the upload", err);
      }
    },
  });
}
