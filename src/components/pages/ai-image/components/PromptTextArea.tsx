"use client";

import { Label } from "@/components/ui/label";
import { CustomTextarea } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import useInputValue from "@/components/pages/ai-image/hooks/useInputValue";

/**
 * Prompt textarea component
 * used for image prompt to generate
 * includes label and textarea and character count
 * @constructor
 */
function PromptTextArea() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();
  const { getValue, changeValue } = useInputValue();
  console.log(getValue("text"));
  return (
    <div className="col gap-label-space">
      {/*label*/}
      <Label htmlFor="image-prompt-teaxtarea">
        {imageDictionary.prompt_title}
      </Label>
      <CustomTextarea
        name="text"
        id="image-prompt-teaxtarea"
        placeholder={imageDictionary.prompt_placeholder}
        maxLength={4000}
        value={String(getValue("text") || "")}
        setValue={val => changeValue("text", val)}
      />
    </div>
  );
}

export default PromptTextArea;
