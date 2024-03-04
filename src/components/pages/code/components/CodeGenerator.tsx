import { useState } from "react";

import { CustomTextarea } from "@/components/shared";
import { Label } from "@/components/ui/label";
import CommonSettings from "./CommonSettings";
import CodeLanguageSelect from "./CodeLanguageSelect";
import Result from "./Result";

import { useGetDictionary } from "@/hooks";

/**
 * generate code by explanation feature
 * used in main section of code page
 * rendered when feature value in search params is "code-generator"
 * @constructor
 */
function CodeGenerator() {
  const [currentLanguage, setCurrentLanguage] = useState("Auto");
  const [promptValue, setPromptValue] = useState("");
  const {
    page: { code: codeDictionary },
  } = useGetDictionary();

  return (
    <div className="grid grid-cols-2 gap-4 xl:gap-7">
      {/*code language input*/}
      <div className="col col-span-2 gap-2">
        <Label>{codeDictionary.code_language_select_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={setCurrentLanguage} />
      </div>

      {/*code explanation input*/}
      <div className="col col-span-2 gap-2">
        <Label htmlFor="generate-code-textarea">
          {codeDictionary.generate_code_textarea_label}
        </Label>
        <CustomTextarea
          id="generate-code-textarea"
          setValue={setPromptValue}
          value={promptValue}
          placeholder={codeDictionary.generate_code_textarea_placeholder}
          maxLength={4000}
        />
      </div>

      {/*common settings for all features of code*/}
      <CommonSettings
        submitButtonTitle={codeDictionary.generate_button_label}
      />

      <Result outputLanguage={currentLanguage} />
    </div>
  );
}

export default CodeGenerator;
