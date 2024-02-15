import { remark } from "remark";
import remarkHTML from "remark-html";
import remarkGfm from "remark-gfm";
// import remarkMdx from "remark-mdx";

// import markdown from "remark-parse";

// import {
//   DeserializeMdPlugin,
//   KEY_DESERIALIZE_MD,
//   RemarkPluginOptions,
//   remarkPlugin,
// } from "@udecode/plate-serializer-md";
// import { PlateEditor, Value, getPluginOptions } from "@udecode/plate-common";
// import { unified } from "unified";

export const markdownToHtml = (markdown: string) => {
  const html = remark().use(remarkGfm).use(remarkHTML).processSync(markdown);

  return html.value;
};

// export const plateDeserializeMd = <V extends Value>(
//   editor: PlateEditor<V>,
//   data: string
// ) => {
//   const { elementRules, textRules } = getPluginOptions<DeserializeMdPlugin, V>(
//     editor,
//     KEY_DESERIALIZE_MD
//   );

//   const tree: any = unified()
//     .use(markdown)
//     .use(remarkGfm)
//     .use(remarkPlugin, {
//       editor,
//       elementRules,
//       textRules,

//     } as unknown as RemarkPluginOptions<V>)
//     .processSync(data);

//   return tree;
// };
