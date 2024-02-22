"use client";
import { InputHTMLAttributes, useState, MouseEvent } from "react";

import { PiEye, PiEyeSlash } from "react-icons/pi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RenderIf from "@/components/shared/RenderIf";

import { cn } from "@/lib/utils";

export interface ICustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  rootClassName?: string;
  inputWrapperClassName?: string;
  error?: string;
  isPassword?: boolean;
}

/**
 * input with error message and password toggle
 * @param rootClassName extra class for root div
 * @param error error message
 * @param className extra class for input
 * @param inputWrapperClassName extra class for input wrapper
 * @param type input type
 * @param isPassword is input a password type for show/hide password button
 * @param otherProps other input props
 * @constructor
 */
export function CustomInput({
  rootClassName,
  error,
  className,
  inputWrapperClassName,
  type,
  isPassword = false,
  ...otherProps
}: ICustomInputProps) {
  const [showPass, setShowPass] = useState(false);

  const toggleShowPass = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPass(!showPass);
  };

  return (
    <div className={cn("h-fit w-full", rootClassName)}>
      <div className={cn("relative h-fit w-full", inputWrapperClassName)}>
        <Input
          type={isPassword ? (showPass ? "text" : "password") : type}
          className={cn(
            !!error &&
              "border-destructive hover:border-destructive focus-visible:border-destructive",
            className,
          )}
          {...otherProps}
        />
        <RenderIf isTrue={isPassword}>
          <Button
            type="button"
            className="fit absolute end-2 top-1/2 -translate-y-1/2 p-0 text-muted-foreground hover:text-foreground"
            onClick={toggleShowPass}
            variant="ghost"
          >
            {showPass ? <PiEyeSlash size="1rem" /> : <PiEye size="1rem" />}
          </Button>
        </RenderIf>
      </div>
      <RenderIf isTrue={!!error}>
        <div className="mt-0.5 flex h-3">
          <span className="error">{error}</span>
        </div>
      </RenderIf>
    </div>
  );
}
