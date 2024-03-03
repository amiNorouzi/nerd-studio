"use client";
import React, { useCallback, useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LinkIcon, PdfIcon } from "@/components/svg-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CustomTextarea, UploadPdf } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { FaRegFilePdf } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import RenderIf from "../../RenderIf";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";
import type { TemplateState } from "@/stores/zustand/types";

interface IProps {
  template?: TemplateState["currentTemplate"];
  mainTextAreaPlaceholder: string;
}

/**
 * this components show user inputs like textarea , upload pdf and url input
 * @constructor
 */
export function MainTextArea({
  mainTextAreaPlaceholder,
}: Omit<IProps, "template">) {
  const { common } = useGetDictionary();
  const [textType, setTextType] = useState<string | undefined>();
  const [textareaValue, setTextAreaValue] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileDivWrapper, setPdfFileDivWrapper] =
    useState<HTMLDivElement | null>(null);

  const handlePdfFile = useCallback((file: File | null) => {
    setPdfFile(file);
    setTextType(undefined);
  }, []);

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
      <div className="relative grid h-full w-full gap-2">
        {/*text area*/}
        <RenderIf isTrue={Boolean(!textType)}>
          <CustomTextarea
            setValue={setTextAreaValue}
            value={textareaValue}
            maxLength={400}
            placeholder={mainTextAreaPlaceholder}
            // if file is valid add padding bottom to textarea,size of pdfFile wrapper Height
            style={{
              paddingBottom: pdfFileDivWrapper
                ? `${pdfFileDivWrapper.offsetHeight + 20}px`
                : "",
            }}
          />
        </RenderIf>
        {/*upload pdf*/}
        <RenderIf isTrue={textType === "pdf"}>
          <UploadPdf pdfFile={pdfFile} setPdfFile={handlePdfFile} />
        </RenderIf>
        {/*url input*/}
        <RenderIf isTrue={textType === "url"}>
          <div className="grid gap-3">
            <Label htmlFor="urlInput">{common.url_website}</Label>
            <Input type="url" id="urlInput" className="bg-muted" />
          </div>
        </RenderIf>

        {/*if pdf file is valid , show pdf file icon*/}
        {pdfFile && (
          <div
            className={cn(
              "absolute bottom-10 start-2",
              Boolean(textType) && "relative inset-0",
            )}
            ref={setPdfFileDivWrapper}
          >
            <div className="relative flex   flex-col items-center  justify-center gap-2  truncate">
              <FaRegFilePdf size={25} />
              <span className="truncate text-xs text-muted-foreground">
                {pdfFile.name}
              </span>
              {/*show file*/}
              <div className="absolute inset-0 z-10 flex items-end justify-end rounded-lg bg-transparent p-1 lg:bg-[#00000050] lg:opacity-0 lg:hover:opacity-100">
                <Button
                  variant="ghost"
                  className={cn(
                    "fit z-10 !h-7 !w-7  rounded-full bg-[#98989860]  p-1 text-primary hover:bg-muted hover:text-primary-dark",
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    setPdfFile(null);
                  }}
                >
                  <MdDeleteOutline className={cn("h-5 w-5 text-destructive")} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * this component show text area , url input and upload pdf and if template props is valid show more inputs
 * @param template , if template is valid show another inputs(for templates placeholder)
 * @constructor
 */
export function TextBox({ template, mainTextAreaPlaceholder }: IProps) {
  const listOfText = template?.inputs ?? [];

  return (
    <div className="mt-1 grid gap-2">
      <MainTextArea mainTextAreaPlaceholder={mainTextAreaPlaceholder} />
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
