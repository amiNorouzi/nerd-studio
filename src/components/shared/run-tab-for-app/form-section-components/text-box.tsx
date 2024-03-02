"use client";
import { Label } from "@/components/ui/label";
import { useGetDictionary } from "@/hooks";
import RenderIf from "../../RenderIf";
import { Button } from "@/components/ui/button";
import { LinkIcon, PdfIcon } from "@/components/svg-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { TemplateState } from "@/stores/zustand/types";
import { useState } from "react";
import { UploadPdf } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface IProps {
  template?: TemplateState["currentTemplate"];
}

export function MainTextArea() {
  const { common, components } = useGetDictionary();
  const [textType, setTextType] = useState<string | undefined>();

  return (
    <div className="grid gap-2">
      <div className="flex flex-row items-end justify-between">
        <Label
          htmlFor="textbox"
          className={cn("text-sm font-medium", !!textType && "opacity-0")}
        >
          {common.form_textarea_label}
        </Label>
        <div className="flex flex-row gap-3">
          <ToggleGroup
            type="single"
            value={textType}
            onValueChange={setTextType}
          >
            <ToggleGroupItem asChild value="pdf" aria-label="Toggle pdf">
              <Button variant="ghost" size="icon">
                <PdfIcon />
              </Button>
            </ToggleGroupItem>
            <ToggleGroupItem asChild value="url" aria-label="Toggle url">
              <Button variant="ghost" size="icon">
                <LinkIcon />
              </Button>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="h-full w-full">
        <RenderIf isTrue={Boolean(!textType)}>
          <div className="relative">
            <textarea
              name="userTextBox"
              id="textbox"
              rows={8}
              placeholder={components.form_section.form_textarea_placeholder}
              defaultValue={""}
              className="w-full rounded-lg border bg-muted p-2 outline-none ring-0 placeholder:text-xs"
            />
          </div>
          <span className="text-xs text-muted-foreground">0/200</span>
        </RenderIf>
        <RenderIf isTrue={textType === "pdf"}>
          <UploadPdf />
        </RenderIf>
        <RenderIf isTrue={textType === "url"}>
          <div className="grid gap-3">
            <Label htmlFor="urlInput">URL Website</Label>
            <Input type="url" id="urlInput" className="bg-muted" />
          </div>
        </RenderIf>
      </div>
    </div>
  );
}

export function TextBox({ template }: IProps) {
  const listOfText = template?.inputs ?? [];

  return (
    <div className="mt-1 grid gap-2">
      <MainTextArea />
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
