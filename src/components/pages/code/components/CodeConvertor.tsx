import { useState } from "react";

import { Label } from "@/components/ui/label";
import CommonSettings from "./CommonSettings";
import CodeLanguageSelect from "./CodeLanguageSelect";
import CodeEditor from "./CodeEditor";
import Result from "./Result";

import { useGetDictionary } from "@/hooks";

/**
 * covert code from one language to another
 * used in main section of code page
 * one feature for AI code page
 * rendered when feature in search params is code-converter
 * @constructor
 */
function CodeConvertor() {
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();
  const [fromLanguage, setFromLanguage] = useState("auto");
  const [toLanguage, setToLanguage] = useState("Auto");
  const [code, setCode] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4 xl:gap-7">
      {/* from language select */}
      <div className="col col-span-2 gap-2 sm:col-span-1">
        <Label>{codeDictionary.code_convert_from_language_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={setFromLanguage} />
      </div>

      {/* to language select */}
      <div className="col col-span-2 gap-2 sm:col-span-1">
        <Label>{codeDictionary.code_convert_to_language_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={setToLanguage} />
      </div>

      {/* code input */}
      <div className="col col-span-2 gap-2">
        <Label>{codeDictionary.code_convert_code_input_label}</Label>
        <CodeEditor
          value={code}
          setValue={setCode}
          language={fromLanguage == "auto" ? undefined : fromLanguage}
        />
      </div>

      {/* common settings for all features of code */}
      <CommonSettings
        submitButtonTitle={codeDictionary.code_convert_button_label}
      />

      <Result outputLanguage={toLanguage} />
    </div>
  );
}

export default CodeConvertor;
