"use client";
import { InputHTMLAttributes } from "react";

import { TbPlus, TbTrash } from "react-icons/tb";
import type { SelectProps } from "@radix-ui/react-select";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useTemplateStore } from "@/stores/zustand/template-store";

import type { CustomTemplateInput } from "@/stores/zustand/types";

type ChangeValue = { onChangeValue: (val: string | number) => void };
type InputProps = InputHTMLAttributes<HTMLInputElement> &
  CustomTemplateInput &
  ChangeValue;
type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> &
  CustomTemplateInput &
  ChangeValue;
type SingleSelectProps = SelectProps & CustomTemplateInput & ChangeValue;

export function TextInput({
  placeholder,
  defaultValue,
  onChangeValue,
  ...otherProps
}: InputProps) {
  return (
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...otherProps}
      onChange={e => onChangeValue(e.target.value)}
    />
  );
}

export function NumberInput({
  placeholder,
  defaultValue,
  onChangeValue,
  ...otherProps
}: InputProps) {
  return (
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...otherProps}
      type="number"
      onChange={e => onChangeValue(e.target.value)}
    />
  );
}

export function LongTextInput({
  placeholder,
  defaultValue,
  onChangeValue,
  className,
  ...otherProps
}: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      defaultValue={defaultValue}
      rows={5}
      className={cn(
        "w-full rounded-lg border bg-muted p-4 outline-none ring-0 focus:border-primary focus:bg-background",
        className,
      )}
      {...otherProps}
      onChange={e => onChangeValue(e.target.value)}
    />
  );
}

export function SingleSelect({
  placeholder,
  defaultValue,
  options,
  value,
  onChangeValue,
  ...otherProps
}: SingleSelectProps) {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChangeValue}
    >
      <SelectTrigger className="col-span-8 md:col-span-2">
        <SelectValue placeholder={placeholder} {...otherProps} />
      </SelectTrigger>
      <SelectContent>
        {options.map(item => (
          <SelectItem key={item.id} value={item.value}>
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function TextListInputs({
  placeholder,
  defaultValue,
  className,
  id,
  options,
  ...otherProps
}: InputProps) {
  const addCustomTemplateOption =
    useTemplateStore.use.addCustomTemplateOption();
  const changeCustomTemplateInputOptionValue =
    useTemplateStore.use.changeCustomTemplateInputOptionValue();
  const deleteCustomTemplateInputOption =
    useTemplateStore.use.deleteCustomTemplateInputOption();

  const addOption = () => {
    addCustomTemplateOption(id, {
      id: uuidv4(),
      value: `option-${options.length + 1}`,
    });
  };
  return (
    <div className={cn("col gap-2", className)} {...otherProps}>
      {options.map(option => (
        <div key={option.id} className="row gap-2">
          <Input
            className="h-9 w-fit flex-grow"
            value={option.value}
            onChange={e =>
              changeCustomTemplateInputOptionValue(
                id,
                option.id,
                e.target.value,
              )
            }
          />
          <Button
            className="h-8 w-8 rounded-full bg-destructive/10 p-1 text-destructive hover:bg-destructive/30"
            onClick={() => deleteCustomTemplateInputOption(id, option.id)}
          >
            <TbTrash size={15} />
          </Button>
        </div>
      ))}
      <Button className="h-8 w-8 rounded-full p-1" onClick={addOption}>
        <TbPlus size={15} />{" "}
      </Button>
    </div>
  );
}
