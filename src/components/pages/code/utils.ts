import FileSaver from "file-saver";
import { monacoLanguages } from "@/constants/code";

export function downloadCode(language: string, code: string) {
  const ext =
    monacoLanguages.find(
      item => item.value.toLowerCase() === language?.toLowerCase(),
    )?.ext || "js";

  const blob = new Blob([code], {
    type: "text/plain;charset=utf-8",
  });
  FileSaver.saveAs(blob, `${language}.${ext}`);
}
