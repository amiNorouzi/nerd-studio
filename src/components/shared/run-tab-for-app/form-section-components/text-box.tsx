"use client";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import type { TemplateState } from "@/stores/zustand/types";
import RenderIf from "../../RenderIf";

interface IProps {
  template?: TemplateState["currentTemplate"];
}
export function TextBox({ template }: IProps) {
  const listOfText = template?.inputs ?? [];
  const { common, components } = useGetDictionary();

  return (
    <div className="mt-1 grid gap-2">
      <div>
        <Label htmlFor="textbox" className="text-sm font-medium">
          {common.form_textarea_label}
        </Label>
        <div className="relative h-full w-full">
          <textarea
            name="userTextBox"
            id="textbox"
            rows={8}
            placeholder={components.form_section.form_textarea_placeholder}
            defaultValue={template?.prompt ?? ""}
            className="w-full rounded-lg border bg-muted p-2 outline-none ring-0 placeholder:text-xs"
          />
          <span className="text-xs text-muted-foreground">0/200</span>
        </div>
      </div>
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
