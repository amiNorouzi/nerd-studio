import React, { TextareaHTMLAttributes, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button, ButtonProps } from "@/components/ui/button";
import { PiMicrophone } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { MyTooltip } from "@/components/shared";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";
import { ErrorIcon } from "@/components/svg-icons";
import GrammarInputDiv from "@/components/pages/grammar/InputDiv";
import { SelectGrammarLanguage } from "./select-grammar-language";
import { OptionsSelectBoxes } from "./options-select-boxes";
import { usePDFConvertor } from "@/services/translate";
import { Upload } from "./upload";

interface IButtonProps extends ButtonProps {
  Icon: IconType;
  iconClassname?: string;
}
const MinimalButton = ({
  className,
  title,
  Icon,
  iconClassname,
  ...otherProps
}: IButtonProps) => (
  <MyTooltip title={title}>
    <Button
      variant="ghost"
      className={cn("fit p-0.5", className)}
      {...otherProps}
    >
      <Icon size="1rem" className={iconClassname} />
    </Button>
  </MyTooltip>
);

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  rootClassName?: string;
  onTextAreaChange: (value: string) => void;
  renderMoreActions?: () => JSX.Element;
}

export function GrammarTextBox({
  maxLength,
  value,
  className,
  onTextAreaChange,
  onSubmit,
  rootClassName,
  renderMoreActions,
  ...props
}: IProps) {
  const {
    components: { custom_textarea: dictionary, form_section },
  } = useGetDictionary();
  //for copy value
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value

  //for upload file
  const [url, setUrl] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  console.log("files", files);

  const { mutateAsync: covertPDF } = usePDFConvertor();

  const covertToText = async (files: File[]) => {
    const text = await covertPDF(files[0]);
    onTextAreaChange?.(text);
  };
  const onSelectFiles = (files: File[]) => {
    setFiles(files);
    covertToText(files);
  };
  return (
    <div className="col form-gap">
      <div className="col max-h-[254px] min-h-[200px] gap-label-space">
        <Label htmlFor="gramer-textbox" className={cn("text-sm font-medium")}>
          {form_section.form_grammar_textarea_label}
        </Label>
        <div className="relative h-fit w-full ">
          {/*voice input*/}
          <MinimalButton
            Icon={PiMicrophone}
            title={dictionary.voice_button_label}
            className="absolute start-1.5 top-2"
          />

          {/*textarea*/}

          <GrammarInputDiv
            onTextChange={onTextAreaChange}
            value={value}
            setFiles={onSelectFiles}
            setUserUrl={setUrl}
            files={files}
            userUrl={url}
          />

          {/*404 Error*/}
          {/* {value && value.toString().length > 0 && (
            <div className="absolute bottom-3 start-3 flex h-[28px] w-[103px] items-center gap-[10px] rounded-[10px] bg-white p-[10px] text-muted-foreground">
              <ErrorIcon />
              <span className="font-sans text-xs text-muted-foreground-light">
                {form_section.form_error}
              </span>
            </div>
          )} */}

          {
            <div className="absolute -bottom-3  start-3 flex h-[28px] w-[103px] items-center gap-[10px] rounded-[10px]  p-[10px] text-muted-foreground">
              <Upload
                setFiles={onSelectFiles}
                setUserUrl={setUrl}
                files={files}
                userUrl={url}
              />
            </div>
          }

          {/*action buttons*/}
          {value && value.toString().length > 0 && (
            <div className="row absolute bottom-3 end-3.5 gap-1 bg-white">
              <MinimalButton
                Icon={MdDeleteOutline}
                title={dictionary.clear_button_label}
                onClick={() => onTextAreaChange("")}
              />
              <MinimalButton
                Icon={HiOutlineSpeakerWave}
                title={dictionary.speak_button_label}
              />
              <MinimalButton
                Icon={isCopied ? LuCopyCheck : LuCopy}
                title={dictionary.copy_button_label}
                onClick={() => handleCopy(value!.toString())}
              />
              {!!renderMoreActions && renderMoreActions()}
            </div>
          )}
        </div>

        {/*character count*/}
        <span className="-mt-2 ps-1 text-xs text-muted-foreground">
          {value?.toString().length}/{maxLength}
        </span>
      </div>
      <SelectGrammarLanguage />
      <OptionsSelectBoxes hiddenSelectResponseLang />
    </div>
  );
}
