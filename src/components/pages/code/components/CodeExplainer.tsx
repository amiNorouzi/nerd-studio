import { useState } from "react";

import { Label } from "@/components/ui/label";
import CodeLanguageSelect from "./CodeLanguageSelect";
import { CustomTextarea } from "@/components/shared";
import CommonSettings from "./CommonSettings";
import CodeEditor from "./CodeEditor";
import Result from "./Result";

import { useGetDictionary } from "@/hooks";

/**
 * code explainer feature
 * used in main section of code page
 * rendered when feature value in search params is "code-explainer"
 * @constructor
 */
function CodeExplainer() {
  const [currentLanguage, setCurrentLanguage] = useState("auto");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [code, setCode] = useState("");
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  return (
    <div className="grid grid-cols-2 gap-4 xl:gap-7">
      {/* input code language */}
      <div className="col col-span-2 gap-2">
        <Label>{codeDictionary.code_language_select_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={setCurrentLanguage} />
      </div>

      {/* input additional info */}
      <div className="col col-span-2 gap-2">
        <Label htmlFor="code-explain-additional-info">
          {codeDictionary.explainer_additional_textarea_label}
        </Label>
        <CustomTextarea
          id="code-explain-additional-info"
          setValue={setAdditionalInfo}
          value={additionalInfo}
          placeholder={codeDictionary.explainer_additional_textarea_description}
          maxLength={2000}
          rows={2}
        />
      </div>

      {/* input code */}
      <div className="col col-span-2 gap-2">
        <Label>{codeDictionary.explainer_code_input_label}</Label>
        <CodeEditor
          value={code}
          setValue={setCode}
          language={currentLanguage == "auto" ? undefined : currentLanguage}
        />
      </div>

      {/*common settings for all features of code*/}
      <CommonSettings
        submitButtonTitle={codeDictionary.explainer_button_label}
      />

      <Result outputLanguage={currentLanguage} />
    </div>
  );
}

export default CodeExplainer;
