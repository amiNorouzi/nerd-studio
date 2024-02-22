"use client";
import { InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RenderIf from "@/components/shared/RenderIf";

import { cn } from "@/lib/utils";
import { CustomInput, ICustomInputProps } from "@/components/forms/CustomInput";

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
      <CustomInput
        {...otherProps}
        className={cn("!h-9 rounded-e-none", className)}
      />
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
