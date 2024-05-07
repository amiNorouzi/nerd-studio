"use client"
import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import useImageTabs from "./useImageTabs";

import { useGetDictionary } from "@/hooks";
import { useAiImageStore } from "@/stores/zustand/ai-image-store";
import { useGetImageModels } from "@/services/ai-image";
import { isEmpty } from "@/lib/utils";

import type { CategoryItem } from "@/components/pages/template/types";
import type { DynamicInput, ImageModelType } from "@/stores/zustand/types";

function useImageModels() {
  const [activeModel, setActiveModel] = useState("");
  const [activeModelUrl, setActiveModelUrl] = useState("");
  const { axiosFetch } = useAxiosFetcher();
  const { currentModelType } = useImageTabs();
  const queryClient = useQueryClient();
  const { api_keys } = useGetDictionary();
  const changeInputValue = useAiImageStore.use.changeInputValue();
  const resetInputValue = useAiImageStore.use.resetInputValue();

  const { data = [], isPending } = useGetImageModels(currentModelType);

  useEffect(() => {
    const tabToPrefetch = ["image_to_image", "image_upscale"];
    tabToPrefetch.forEach(tab => {
      queryClient.prefetchQuery({
        queryKey: ["engines", tab],
        queryFn: () =>
          axiosFetch<CategoryItem[]>({
            url: `/engines/?app_type=${tab}`,
            method: "post",
          }),
      });
    });
  }, [axiosFetch, queryClient]);

  const models = data.map(item => ({
    id: item.model,
    name: item.model,
    image: "/image/gpt.jpeg",
  }));

  useEffect(() => {
    if (
      !isEmpty(models) &&
      (!activeModel || !models.find(item => item.id === activeModel))
    ) {
      setActiveModel(models[0].id);
    }
  }, [activeModel, models]);

  useEffect(() => {
    if (activeModel) {
      setActiveModelUrl(
        data?.find(item => item.model === activeModel)?.url.url || "",
      );
      resetInputValue(currentModelType);
      const params = data.find(item => item.model === activeModel)?.params;
      if (!!params && !isEmpty(params)) {
        Object.keys(params || []).forEach(key => {
          changeInputValue(currentModelType, key, params[key].default);
        });
      }
    }
  }, [activeModel, changeInputValue, currentModelType, data, resetInputValue]);

  const activeModelData = data.find(item => item.model === activeModel);

  const inputComponents: DynamicInput[] = Object.keys(
    activeModelData?.params || [],
  ).map((key, index) => {
    const item = activeModelData?.params[key]!;
    return {
      type: item.type,
      id: uuidv4(),
      defaultValue: item.default,
      description: api_keys[item.description_i18key as keyof typeof api_keys],
      name: api_keys[item.label as keyof typeof api_keys],
      order: index + 1,
      placeholder: "",
      options: item.enum
        ? item.enum.map(option => ({
            id: uuidv4(),
            value: option,
          }))
        : [],
      isAdvance: item.is_advance === "true",
      fieldKey: key,
      ...(!!item.minimum && { min: item.minimum }),
      ...(!!item.maximum && { max: item.maximum }),
      ...(!!item.step && { step: item.step }),
    };
  });

  const advanceInputs = [...inputComponents].filter(item => item.isAdvance);
  const basicInputs = [...inputComponents].filter(item => !item.isAdvance);

  return {
    models,
    activeModel,
    setActiveModel,
    isLoading: isPending,
    advanceInputs,
    basicInputs,
    activeModelUrl,
  };
}

export default useImageModels;
