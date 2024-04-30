import { useState } from "react";

import { CustomTextarea } from "@/components/shared";
import { Label } from "@/components/ui/label";
import CommonSettings from "./CommonSettings";
import CodeLanguageSelect from "./CodeLanguageSelect";
import Result from "./Result";

import { useGetDictionary } from "@/hooks";
import { useGenerateCode } from "@/services/code-generator";
import { useEventChanel } from "@/services/events-chanel";

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
  const { mutate } = useGenerateCode();
  const { message: generatedCode, reset } = useEventChanel({
    eventName: "code",
  });
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    reset();
    mutate({
      prompt,
      language: currentLanguage,
      model: "gpt-3.5-turbo-0125",
      temperature: 0.1,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0,
      workspace_id: 1,
      document_name: "New Document",
    });
  };
  return (
    <div className="form-gap grid grid-cols-2">
      {/*code language input*/}
      <div className="col col-span-2 gap-label-space">
        <Label>{codeDictionary.code_language_select_label}</Label>
        <CodeLanguageSelect setCurrentLanguage={setCurrentLanguage} />
      </div>

      {/*code explanation input*/}
      <div className="col col-span-2 gap-label-space">
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
        onSubmit={handleGenerate}
        submitButtonTitle={codeDictionary.generate_button_label}
      />

      <Result generatedCode={generatedCode} outputLanguage={currentLanguage} />
    </div>
  );
}

export default CodeGenerator;
