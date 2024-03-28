import fetcher from "@/services/server-fetcher";

import type { TemplateCategoryItem } from "@/services/types";

export const getTemplatesApi = async () => {
  try {
    return await fetcher<TemplateCategoryItem[]>("/templates/public/", {
      cache: "force-cache",
    });
  } catch (e) {
    console.log("error in get templates", e);
  }
};

// export const getTemplateParentCategories = async () => {
//   try {
//     return await fetcher<
//       {
//         id: number;
//         name: string;
//       }[]
//     >("/templates/parent_categories/", {
//       cache: "force-cache",
//     });
//   } catch (e) {
//     console.log("error in get templates parent categories", e);
//   }
// };
