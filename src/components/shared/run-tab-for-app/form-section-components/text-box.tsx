"use client";

import { v4 as uuidv4 } from "uuid";

import { Label } from "@/components/ui/label";
import { CustomTextarea, DescriptionHoverCard } from "@/components/shared";
import RenderIf from "../../RenderIf";

import {useCustomSearchParams, useGetDictionary} from '@/hooks';
import {useDebounce} from '@/hooks/useDebounce';

import type { TemplateItem } from "@/services/types";
import { inputComponents } from "@/constants/template";
import { cn } from "@/lib/utils";

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
    const {common} = useGetDictionary();
    const [, setSearchParams] = useCustomSearchParams();

    const handelOnChange = (text: string) => {
        onChange?.(text);
    };

    useDebounce(() => {
        setSearchParams('text', value);
    }, value, 500);

  return (
    <div className="col gap-label-space relative w-full">
      <Label htmlFor="textbox">{label ?? common.form_textarea_label}</Label>

        {/*text area*/}
        <CustomTextarea
            setValue={handelOnChange}
            value={value}
          maxLength={400}
          placeholder={mainTextAreaPlaceholder}
        />
    </div>
  );
}

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
  const inputs = Array.isArray(template?.params)
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
        {inputs.map(item => {
          const Components = inputComponents[item.type];

          return (
            <div
              className={cn("col col-span-2 gap-2")}
              key={item.id}
              data-isLast={item.order === inputs.length}
            >
              <div className="row w-full gap-2">
                <Label>{item.name}</Label>
                <RenderIf isTrue={!!item.description}>
                  <DescriptionHoverCard description={item.description} />
                </RenderIf>
              </div>
              <Components {...item} onChangeValue={() => {}} />
            </div>
          );
        })}
      </RenderIf>
    </div>
  );
}
