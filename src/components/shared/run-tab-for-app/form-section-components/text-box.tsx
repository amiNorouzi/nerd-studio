"use client";
import React, { useCallback, useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LinkIcon, PdfIcon } from "@/components/svg-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CustomTextarea, UploadDocuments } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { FaRegFilePdf } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineFileWord } from "react-icons/ai";
import RenderIf from "../../RenderIf";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";
import type { TemplateState } from "@/stores/zustand/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  hideToggle = false,
  label,
}: Omit<IProps, "template">) {
  const { common } = useGetDictionary();
  const [textType, setTextType] = useState<string | undefined>();
  const [textareaValue, setTextAreaValue] = useState("");
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [pdfFileDivWrapper, setPdfFileDivWrapper] =
    useState<HTMLDivElement | null>(null);

  const handlePdfFile = useCallback((file: File[]) => {
    setDocumentFiles(v => [...v, ...file]);
    // setTextType(undefined);
  }, []);

  function handleDeleteFile(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) {
    e.stopPropagation();
    const filterList = documentFiles.filter(
      (item, index) => fileIndex !== index,
    );
    setDocumentFiles(filterList);
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-row items-end justify-between">
        <Label
          htmlFor="textbox"
          className={cn("text-sm font-medium", !!textType && "opacity-0")}
        >
          {label ?? common.form_textarea_label}
        </Label>
        <div className={cn("flex flex-row gap-3", hideToggle && "hidden")}>
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
            // if file is valid add padding bottom to textarea,size of documentFiles wrapper Height
            style={{
              paddingBottom: pdfFileDivWrapper
                ? `${pdfFileDivWrapper.clientHeight + 20}px`
                : "",
            }}
          />
        </RenderIf>
        {/*upload pdf*/}
        <RenderIf isTrue={textType === "pdf"}>
          <UploadDocuments
            documentFiles={documentFiles}
            setDocumentFiles={handlePdfFile}
          />
        </RenderIf>
        {/*url input*/}
        <RenderIf isTrue={textType === "url"}>
          <div className="grid gap-3">
            <Label htmlFor="urlInput">{common.url_website}</Label>
            <Input type="url" id="urlInput" className="bg-muted" />
          </div>
        </RenderIf>

        {/*if documents file is valid , show documents file icon*/}
        <div
          className={cn(
            "absolute bottom-10 start-2 flex max-w-[75%] flex-wrap gap-3",
            Boolean(textType) && "relative inset-0",
          )}
          ref={setPdfFileDivWrapper}
        >
          {documentFiles.map((file, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    key={index}
                    className="relative flex   flex-col  items-center justify-center   truncate"
                  >
                    {file.type === "application/pdf" ? (
                      <FaRegFilePdf size={50} />
                    ) : (
                      <AiOutlineFileWord size={50} />
                    )}

                    {/*show file*/}
                    <div className="absolute inset-0 z-10 flex items-end justify-end rounded-lg bg-transparent p-1 lg:bg-[#00000050] lg:opacity-0 lg:hover:opacity-100">
                      <Button
                        variant="ghost"
                        className={cn(
                          "fit z-10 !h-7 !w-7  rounded-full bg-[#98989860]  p-1 text-primary hover:bg-muted hover:text-primary-dark",
                        )}
                        onClick={e => handleDeleteFile(e, index)}
                      >
                        <MdDeleteOutline
                          className={cn("h-5 w-5 text-destructive")}
                        />
                      </Button>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{file.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
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
