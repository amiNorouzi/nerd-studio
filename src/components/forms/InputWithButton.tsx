"use client";
import { Button } from "@/components/ui/button";
import { CustomInput, ICustomInputProps } from "@/components/forms/CustomInput";

import { cn } from "@/lib/utils";

interface IProps extends ICustomInputProps {
  btnTitle: string;
  handleClickButton: () => void;
  btnClassName?: string;
  btnVariant?: "destructive" | "outline" | "secondary";
}

/**
 * Input with button on right side for action
 * @param btnTitle - title of button
 * @param handleClickButton - action on button click
 * @param btnClassName - class for button
 * @param rootClassName - extra class for root div
 * @param btnVariant - variant of button
 * @param className - extra class for input
 * @param otherProps - other input props
 * @constructor
 */
export function InputWithButton({
  btnTitle,
  handleClickButton,
  btnClassName,
  rootClassName,
  btnVariant,
  className,
  ...otherProps
}: IProps) {
  return (
    <div className={cn("flex h-9 w-full", rootClassName)}>
      {/* input field */}
      <CustomInput
        {...otherProps}
        className={cn("!h-9 rounded-e-none", className)}
      />
      {/* button rendered right side of input */}
      <Button
        variant={btnVariant}
        type="button"
        className={cn("!h-full rounded-s-none", btnClassName)}
        onClick={handleClickButton}
      >
        {btnTitle}
      </Button>
    </div>
  );
}
