"use client";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";

function PromptTextArea() {
  const {
    page: { image: imageDictionary },
  } = useGetDictionary();

  return (
    <>
      <Label htmlFor="image-prompt-teaxtarea">
        {imageDictionary.prompt_title}
      </Label>
      <div className="relative mb-2 w-full lg:mb-3 xl:mb-5">
        <textarea
          name="promptTextbox"
          id="image-prompt-teaxtarea"
          rows={8}
          placeholder={imageDictionary.prompt_placeholder}
          className="w-full rounded-lg border bg-muted p-2 outline-none ring-0 focus:border-primary focus:bg-background"
        />
        <span className="text-xs text-muted-foreground">0/200</span>
      </div>
    </>
  );
}

export default PromptTextArea;
