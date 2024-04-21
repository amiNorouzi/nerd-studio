import React, { useState } from "react";
import { TbFileUpload } from "react-icons/tb";
import { AiOutlineLink } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { UploadZone, TooltipForUploadedFile } from "@/components/shared";

import { useGetDictionary } from "@/hooks";
import type { StateSetterType } from "@/services/types";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSave: (v: string) => void;
  documentFiles: File[];
  setDocumentFiles: StateSetterType<File[]>;
  url: string;
  setUrl: StateSetterType<string>;
}
export function DialogForUpload({
  open,
  setOpen,
  handleSave,
  documentFiles,
  setDocumentFiles,
  url,
  setUrl,
}: IProps) {
  const [tab, setTab] = useState("document");

  const {
    common,
    components: { form_section },
  } = useGetDictionary();
  function handlePdfFile(file: File[]) {
    setDocumentFiles(v => [...v, ...file]);
  }

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

  const tabClass =
    "flex  gap-2 rounded-none pb-3 text-muted-foreground shadow-none data-[state=active]:border-b data-[state=active]:border-primary\n" +
    "data-[state=active]:text-primary  data-[state=active]:shadow-none";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex h-full max-h-[420px] w-full  max-w-xl flex-col  justify-start gap-3 p-0">
        <DialogHeader className="m-0 p-4">
          <DialogTitle className="flex gap-2 text-lg font-medium">
            {form_section.form_upload}
          </DialogTitle>
        </DialogHeader>
        <div className="flex h-full flex-1 flex-col">
          <Tabs
            value={tab}
            onValueChange={setTab}
            className="h-full w-full flex-1  justify-between"
          >
            <TabsList className="flex w-full justify-start gap-3 border-b bg-transparent px-4 py-0">
              <TabsTrigger value="document" className={tabClass}>
                <TbFileUpload size={20} />
                {form_section.form_upload}
              </TabsTrigger>
              <TabsTrigger value="url" className={tabClass}>
                <AiOutlineLink size={20} />
                {form_section.form_url_website}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="document" className="p-6">
              <div className="flex w-full items-center  justify-center gap-2  rounded-xl border py-0">
                {documentFiles.length > 0 && (
                  <div className="max-w-1/2 flex flex-wrap gap-1 p-2">
                    {documentFiles.map((file, index) => (
                      <TooltipForUploadedFile
                        file={file}
                        handleDeleteFiles={handleDeleteFile}
                        index={index}
                        key={index}
                      />
                    ))}
                  </div>
                )}
                <UploadZone
                  documentFiles={documentFiles}
                  setDocumentFiles={handlePdfFile}
                  className="mb-0 rounded-none border-none lg:mb-0 xl:mb-0"
                />
              </div>
            </TabsContent>

            <TabsContent
              value="url"
              className="flex w-full items-center justify-center  "
            >
              <div className="grid w-full gap-1.5 p-6">
                <Label htmlFor="urlInput">{common.url_website}</Label>
                <Input
                  type="url"
                  id="urlInput"
                  className="bg-muted"
                  onChange={e => setUrl(e.target.value)}
                  value={url}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex w-full justify-end p-6">
            <Button className="w-fit px-9" onClick={() => handleSave(tab)}>
              {form_section.form_save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
