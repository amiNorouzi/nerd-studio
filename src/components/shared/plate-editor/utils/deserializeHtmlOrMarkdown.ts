import { checkWindowValidity } from "@/lib/auth/auth-storage";
import { markdownToHtml } from "@/lib/md-to-html";
import {
  PlateEditor,
  TElement,
  TText,
  deserializeHtml,
} from "@udecode/plate-common";
import { deserializeMd } from "@udecode/plate-serializer-md";

export function deserializeHtmlStringOrMarkDown(
  responseMd: string,
  editor: PlateEditor,
) {
  if (!checkWindowValidity()) return;
  //create a html from markdown
  const htmlValue = markdownToHtml(responseMd).toString();

  const parsed = new DOMParser().parseFromString(
    String(htmlValue),
    "text/html",
  );
  const body = parsed.body;

  // const newhtmlValue = plateDeserializeMd(editor,richMarkDown)

  // create slate format from markdown(this function support code in markdown and show it with right style)
  const slateFormatWithCode = deserializeMd(editor, responseMd);

  /**
   * create a slate format from html that created in line 47
   * (this function support table in markdown because of remarkGfm plugin in markdownToHtml function)
   */
  const slateFormatWithTable = deserializeHtml(editor, { element: body });
  // const nodes = deserializeTree(editor, body);

  /**
   * extract an object of tables from slateFormatWithTable that keyof is index them in slateFormatWithTable list
   * and value is table
   */
  const listOfTable = slateFormatWithTable.reduce(
    (prev, cur, i) => {
      if (cur.type === "table") {
        prev[i] = cur;
      }
      return prev;
    },
    {} as Record<number, TElement | TText>,
  );

  /**
   * insert listOfTable Values in slateFormatWithCode list that index of them in list is keyof in listOfTable object
   */
  const slateFormatWithTableAndCode = Object.entries(listOfTable).reduce(
    (prev, cur) => {
      const [index, item] = cur;
      const newArr = [
        ...prev.slice(0, Number(index)),
        item,
        ...prev.slice(Number(index) + 1, prev.length),
      ];

      return newArr;
    },
    slateFormatWithCode,
  );

  // insert slateFormatWithTableAndCode in editor

  return slateFormatWithTableAndCode;
  // editor.insertFragment(slateFormatWithTableAndCode);
}
