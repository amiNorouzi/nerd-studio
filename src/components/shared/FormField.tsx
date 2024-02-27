"use client";
import React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FormField<T extends FieldValues>(
  props: React.ComponentPropsWithoutRef<"input"> &
    UseControllerProps<T> & { inputClass?: string },
) {
  const {
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    className,
    children,
    inputClass,
    ...textFieldProps
  } = props;

  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue, shouldUnregister });
  return (
    <div className={cn("flex w-full flex-col gap-1", className)}>
      <Input
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        value={value}
        name={name}
        {...textFieldProps}
        className={cn(
          "h-full w-full outline-none ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          error && "border-destructive",
          inputClass,
        )}
      />

      <span
        className={cn(
          "text-xs text-destructive opacity-0",
          error && "opacity-100",
        )}
      >
        {error?.message}
      </span>

      {children}
    </div>
  );
}
