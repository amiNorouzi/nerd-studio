import { useState } from "react";

import { Label } from "@/components/ui/label";
import CommonSettings from "./CommonSettings";
import CodeLanguageSelect from "./CodeLanguageSelect";
import CodeEditor from "./CodeEditor";
import Result from "./Result";

import { useGetDictionary } from "@/hooks";
import { useCodeConvertor, useGenerateCode } from "@/services/code-generator";
import { useEventChanel } from "@/services/events-chanel";

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
  const [fromLang, setFromLang] = useState("auto");
  const [toLang, setToLang] = useState("Auto");
  const [code, setCode] = useState("");
  const { mutate } = useCodeConvertor();
  const generatedCode = useEventChanel({ eventName: "code" });

  const handleGenerate = () => {
    mutate({
      code,
      fromLang,
      toLang,
      model: "gpt-3.5-turbo-0125",
      temperature: 0.1,
      max_tokens: 100,
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 1,
    });
  };

  return (
    <div className="form-gap grid grid-cols-2">
      {/* from language select */}
      <div className="col col-span-2 gap-label-space sm:col-span-1">
        <Label>{codeDictionary.code_convert_from_language_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={setFromLang} />
      </div>

      {/* to language select */}
      <div className="col col-span-2 gap-label-space sm:col-span-1">
        <Label>{codeDictionary.code_convert_to_language_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={setToLang} />
      </div>

      {/* code input */}
      <div className="col col-span-2 gap-label-space">
        <Label>{codeDictionary.code_convert_code_input_label}</Label>
        <CodeEditor
          value={code}
          setValue={setCode}
          language={fromLang == "auto" ? undefined : fromLang}
        />
      </div>

      {/* common settings for all features of code */}
      <CommonSettings
        onSubmit={handleGenerate}
        submitButtonTitle={codeDictionary.code_convert_button_label}
      />

      <Result generatedCode={generatedCode} outputLanguage={toLang} />
    </div>
  );
}

export default CodeConvertor;
