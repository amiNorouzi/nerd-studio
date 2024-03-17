"use client";
import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { CustomTextarea } from "@/components/shared";
import RenderIf from "../../RenderIf";

import { useGetDictionary } from "@/hooks";

import type { TemplateState } from "@/stores/zustand/types";

interface IProps {
  template?: TemplateState["currentTemplate"];
  mainTextAreaPlaceholder: string;
  hideToggle?: boolean;
  label?: string;
}

/**
 * this components show user inputs like textarea , upload pdf and url input
 * @constructor
 */
export function MainTextArea({
  mainTextAreaPlaceholder,
  label,
}: Omit<IProps, "template">) {
  const { common } = useGetDictionary();
  const [textareaValue, setTextAreaValue] = useState("");

  return (
    <div className="grid gap-2">
      <div className="relative grid h-full w-full gap-2">
        <Label htmlFor="textbox" className="text-sm font-medium">
          {label ?? common.form_textarea_label}
        </Label>

        {/*text area*/}
        <CustomTextarea
          setValue={setTextAreaValue}
          value={textareaValue}
          maxLength={400}
          placeholder={mainTextAreaPlaceholder}
        />
      </div>
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
}: IProps) {
  const listOfText = template?.inputs ?? [];

  return (
    <div className="mt-1 grid gap-2">
      <MainTextArea
        mainTextAreaPlaceholder={mainTextAreaPlaceholder}
        hideToggle={hideToggle}
        label={label}
      />
      <RenderIf isTrue={listOfText.length !== 0}>
        {listOfText.map(item => (
          <div key={item.id}>
            <Label htmlFor={item.id} className="text-xsm font-semibold">
              {item.title}
            </Label>
            <div className="relative h-full w-full">
              <textarea
                name={item.title}
                id={item.id}
                rows={1}
                className="w-full rounded-lg border bg-muted p-2 outline-none ring-0"
                placeholder={item.placeHolder}
              />
              {/*<div className="absolute bottom-2 start-2 flex justify-start">*/}
              {/*  <Button variant="ghost"><></Button>*/}
              {/*</div>*/}
            </div>
          </div>
        ))}
      </RenderIf>
    </div>
  );
}
