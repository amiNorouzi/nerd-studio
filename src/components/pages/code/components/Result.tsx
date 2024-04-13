import React, { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import CodeEditor from "./CodeEditor";
import ExplanationBox from "./ExplanationBox";

import { useGetDictionary } from "@/hooks";

interface IProps {
  outputLanguage?: string;
  generatedCode: string;
}

/**
 * Result component contains the code snippet and explanation box
 * @param outputLanguage - The language of the code snippet
 * @param generatedCode
 * @constructor
 */
function Result({ outputLanguage, generatedCode }: IProps) {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();
  const [code, setCode] = useState("");
  useEffect(() => {
    setCode(generatedCode);
  }, [generatedCode]);

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
