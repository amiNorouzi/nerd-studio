import React, { TextareaHTMLAttributes } from "react";
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
  setValue: (value: string) => void;
  renderMoreActions?: () => JSX.Element;
}

export function GrammarTextBox({
  maxLength,
  value,
  className,
  setValue,
  rootClassName,
  renderMoreActions,
  ...props
}: IProps) {
  const {
    components: { custom_textarea: dictionary, form_section },
  } = useGetDictionary();
  //for copy value
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value

  return (
    <div className="grid gap-2">
      <div className="flex flex-row items-end justify-between">
        <Label htmlFor="textbox" className={cn("text-sm font-medium")}>
          {form_section.form_grammar_textarea_label}
        </Label>
      </div>
      <div className="relative grid h-full w-full gap-2">
        <div className="relative w-full">
          {/*voice input*/}
          <MinimalButton
            Icon={PiMicrophone}
            title={dictionary.voice_button_label}
            className="absolute start-1.5 top-2.5"
          />

          {/*textarea*/}
          <textarea
            rows={8}
            className={cn(
              "mb-0 w-full rounded-lg border bg-muted px-[26px] pb-6 pt-2 outline-none ring-0 first-line:pl-4 focus:border-primary focus:bg-background",
            )}
            value={value}
            onChange={e => setValue?.(e.target.value)}
            maxLength={maxLength}
            placeholder={form_section.form_grammar_textarea_placeholder}
            {...props}
          />

          {/*404 Error*/}
          <div className="absolute bottom-8 start-4 flex h-[28px] w-[103px] items-center gap-[10px] rounded-[10px] bg-white p-[10px] text-muted-foreground">
            <ErrorIcon />
            <span className="font-sans text-xs text-muted-foreground-light">
              {form_section.form_error}
            </span>
          </div>

          {/*action buttons*/}
          <div className="row absolute bottom-8 end-4 gap-1">
            <MinimalButton
              Icon={MdDeleteOutline}
              title={dictionary.clear_button_label}
              onClick={() => setValue("")}
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
          {/*character count*/}
          <span className="text-xs text-muted-foreground">
            {value?.toString().length}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
}
