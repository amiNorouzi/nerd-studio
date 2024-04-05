"use client";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { CustomTextarea } from "@/components/shared";

import { useGetDictionary } from "@/hooks";

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
  const [value, setValue] = useState("");

  return (
    <div className="col gap-label-space">
      {/*label*/}
      <Label htmlFor="image-prompt-teaxtarea">
        {imageDictionary.prompt_title}
      </Label>
      <CustomTextarea
        name="promptTextbox"
        id="image-prompt-teaxtarea"
        placeholder={imageDictionary.prompt_placeholder}
        maxLength={4000}
        setValue={setValue}
        value={value}
      />
    </div>
  );
}

export default PromptTextArea;
