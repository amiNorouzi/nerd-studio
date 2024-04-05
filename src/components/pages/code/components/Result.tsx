import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import CodeEditor from "./CodeEditor";
import ExplanationBox from "./ExplanationBox";

import { useGetDictionary } from "@/hooks";

interface IProps {
  outputLanguage?: string;
}

/**
 * Result component contains the code snippet and explanation box
 * @param outputLanguage - The language of the code snippet
 * @constructor
 */
function Result({ outputLanguage }: IProps) {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(`//convert hex colors to rgba colors
export function hexToRGBa(hex: string, alpha: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = alpha || 1;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}`);
  }, []);

  return (
    <section className="col col-span-2 mt-7 gap-label-space border-t py-4">
      {/* code editor for show result code*/}
      <Label>{codeDictionary.result_label}</Label>
      <CodeEditor
        value={code}
        setValue={setCode}
        rootClassName="mb-3"
        language={outputLanguage}
      />

      {/* explanation box */}
      <Label>{codeDictionary.explanation_label}</Label>
      <ExplanationBox explanation="In the provided code snippet, the C# code has been converted to Java. The original C# code was commented out using // in Java to maintain the same structure and content. This ensures that the Java code remains as comments and does not affect the functionality of the program. By converting the code in this manner, the original logic and structure are preserved while adapting it to the Java language syntax." />
    </section>
  );
}

export default Result;
