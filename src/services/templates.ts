import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "@/services/axios-client";
import type { TemplateCategoryItem, TemplateItem } from "@/services/types";
import { useAxiosFetcher } from "@/hooks/useAxiosFetcher";
import { CategoryItem } from "@/components/pages/template/types";

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
      presence_penalty,
      frequency_penalty,
      top_p,
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
        top_p,
        presence_penalty,
        frequency_penalty,
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
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 120000,
    refetchInterval: 120000,
    refetchOnReconnect: false,
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

  return !!categories ? getData(categories) : [];
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

  const childCategories = !!childCategoriesData
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
  useTemplate,
  useTemplateParentCategories,
  useTemplatesByChildAndParentCategory,
};

export default templateService;
