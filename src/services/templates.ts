import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { TemplateCategoryItem, TemplateItem } from "@/services/types";
import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import { CategoryItem } from "@/components/pages/template/types";
import useStream from "@/services/useStreamingApi";
import { useCallback } from "react";

type GenerateTemplateParams = {
  prompt: string;
} & OpenAiCompletionParams;

export function useGenerateTemplate() {
  const { generateStream, ...other } = useStream({
    appType: "template",
    endpoint: "/templates/generate_template/",
    invalidationQuery: { queryKey: ["generate_template"] },
  });
  const generateTemplate = useCallback(
    ({ prompt, ...params }: GenerateTemplateParams) => {
      return generateStream({
        messages: [
          {
            role: "system",
            content: "you are a helpful assistant",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        ...params,
      });
    },
    [generateStream],
  );

  return {
    generateTemplate,
    ...other,
  };
}

type CreateTemplateParams = {
  topic: string;
  task: string;
  prompt: string;
  params: {
    type: "text";
    label: string;
    description: string;
    placeholder: string;
  }[];
  category_id: number;
};

export function useCreateTemplate() {
  return useMutation({
    async mutationFn({
      prompt,
      params,
      category_id,
      topic,
      task,
    }: CreateTemplateParams) {
      const { data } = await axiosClient.post<
        unknown,
        any,
        CreateTemplateParams
      >("/templates/", {
        topic,
        params,
        category_id,
        task,
        prompt,
      });

      return data;
    },
  });
}

export function useTemplate() {
  const { axiosFetch } = useAxiosFetcher();
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["all-templates"],
    queryFn: () =>
      axiosFetch<TemplateCategoryItem[]>({
        url: "/templates/public/",
      }),
  });

  return { templates, isLoading };
}

function getData(data: CategoryItem[]) {
  return data.map(item => ({
    ...item,
    value: item.name,
    id: String(item.id),
  }));
}

export function useTemplateParentCategories() {
  const { axiosFetch } = useAxiosFetcher();
  const { data: categories } = useQuery({
    queryKey: ["template-parent-categories"],
    queryFn: () =>
      axiosFetch<CategoryItem[]>({
        url: "/templates/parent_categories/",
      }),
  });

  return categories ? getData(categories) : [];
}

export function useChildCategories(selectedParentCategoryId: number) {
  const { axiosFetch } = useAxiosFetcher();
  const { data: childCategoriesData, isLoading } = useQuery({
    queryKey: ["template-child-categories", selectedParentCategoryId],
    queryFn: () =>
      axiosFetch<CategoryItem[]>({
        url: `/templates/child_categories/${selectedParentCategoryId}/child/`,
      }),
    enabled: !!selectedParentCategoryId,
  });

  const childCategories = childCategoriesData
    ? getData(childCategoriesData)
    : [];

  return { childCategories, isLoading };
}

type TemplatesByChildAndParentCategoryParams = {
  selectedParentCategoryId: number;
  selectedChildCategoryId: number;
};

/**
 * Get templates by child category and parent category.
 */
export function useTemplatesByChildAndParentCategory({
  selectedParentCategoryId,
  selectedChildCategoryId,
}: TemplatesByChildAndParentCategoryParams) {
  const { axiosFetch } = useAxiosFetcher();
  const { data } = useQuery({
    queryKey: [
      "template-advance-topics",
      selectedParentCategoryId,
      selectedChildCategoryId,
    ],
    queryFn: () =>
      axiosFetch<TemplateItem[]>({
        url: `/templates/child_categories/${selectedParentCategoryId}/child/${selectedChildCategoryId}/templates/`,
      }),
  });

  return data;
}

const templateService = {
  useGenerateTemplate,
  useCreateTemplate,
  useTemplate,
  useTemplateParentCategories,
  useTemplatesByChildAndParentCategory,
};

export default templateService;
