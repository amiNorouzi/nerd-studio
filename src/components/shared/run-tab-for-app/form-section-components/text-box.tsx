"use client";

import { v4 as uuidv4 } from "uuid";

import { Label } from "@/components/ui/label";
import { CustomTextarea, DynamicInputsList } from "@/components/shared";
import RenderIf from "../../RenderIf";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { useDebounce } from "@/hooks/useDebounce";

import type { TemplateItem } from "@/services/types";

import { useTemplateStore } from "@/stores/zustand/template-store";
import { DynamicInput } from "@/stores/zustand/types";
import React from "react";

interface IProps {
  template?: TemplateItem;
  mainTextAreaPlaceholder: string;
  hideToggle?: boolean;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * this components show user inputs like textarea , upload pdf and url input
 * @constructor
 */
export function MainTextArea({
  mainTextAreaPlaceholder,
  value,
  onChange,
  label,
}: Omit<IProps, "template">) {
  const { common } = useGetDictionary();
  const [, setSearchParams] = useCustomSearchParams();

  const handelOnChange = (text: string) => {
    onChange?.(text);
  };

  useDebounce(
    () => {
      value && setSearchParams("text", value);
    },
    value,
    500,
  );

  return (
    <div className="col relative w-full gap-label-space">
      <Label htmlFor="textbox">{label ?? common.form_textarea_label}</Label>

      {/*text area*/}
      <CustomTextarea
        setValue={handelOnChange}
        value={value}
        maxLength={4000}
        placeholder={mainTextAreaPlaceholder}
      />
    </div>
  );
}

const TemplateInputs = ({ inputs }: { inputs: DynamicInput[] }) => {
  const currentTemplateInputs = useTemplateStore.use.currentTemplateInputs();
  const changeCurrentTemplateInputs =
    useTemplateStore.use.changeCurrentTemplateInputs();
  return (
    <DynamicInputsList
      components={inputs}
      itemClassName="col-span-1 sm:col-span-2"
      getValue={key => currentTemplateInputs[key]}
      changeValue={(key, val) => changeCurrentTemplateInputs(key, val)}
    />
  );
};

/**
 * this component show text area , url input and upload pdf and if template props is valid show more inputs
 * @param template , if template is valid show another inputs(for templates placeholder)
 * @constructor
 */
export function TextBox({
  template,
  mainTextAreaPlaceholder,
  hideToggle,
  label,
  value,
  onChange,
}: IProps) {
  const inputs: DynamicInput[] = Array.isArray(template?.params)
    ? template?.params?.map((item, index) => ({
        type: item.type,
        id: uuidv4(),
        defaultValue: "",
        description: item.description,
        name: item.label,
        order: index + 1,
        placeholder: item.placeholder,
        options: item.options
          ? item.options.map(option => ({
              id: uuidv4(),
              value: option,
            }))
          : [],
        isAdvance: false,
        fieldKey: item.label.toLowerCase().replaceAll(" ", "_"),
      })) || []
    : [];

  return (
    <div className="col mt-1 w-full gap-2">
      <MainTextArea
        mainTextAreaPlaceholder={mainTextAreaPlaceholder}
        hideToggle={hideToggle}
        label={label}
        value={value}
        onChange={onChange}
      />
      <RenderIf isTrue={inputs.length !== 0}>
        <TemplateInputs inputs={inputs} />
      </RenderIf>
    </div>
  );
}
