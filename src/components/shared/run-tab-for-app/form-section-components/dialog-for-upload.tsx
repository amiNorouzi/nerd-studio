import React, { useEffect, useState } from "react";
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
  files: File[];
  successfulUploads: number;
  uploadIndex: number | null;
  uploadProgress: number;
  handleDeleteFilesFromParent: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileIndex: number,
  ) => void;
  startConverting(files: File[]): void;
  setExtractedText: (text: string) => void;
}
export function DialogForUpload({
  open,
  setOpen,
  handleSave,
  documentFiles,
  setDocumentFiles,
  url,
  setUrl,
  files,
  successfulUploads,
  uploadIndex,
  uploadProgress,
  startConverting,
  setExtractedText,
  handleDeleteFilesFromParent,
}: IProps) {
  const [tab, setTab] = useState("document");
  const [pendingButton, setPendingButton] = useState(false);

  useEffect(() => {
    if (successfulUploads === 0) setPendingButton(false);
    if (successfulUploads === files.length) setOpen(false);
  }, [successfulUploads]);
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
      <DialogContent className="flex max-h-[406px] w-[450px]    max-w-xl flex-col  justify-start gap-[8px] p-0  ">
        <DialogHeader className="m-[12px] mx-[16px] ">
          <DialogTitle className="flex gap-2 text-lg font-medium">
            {form_section.form_upload}
          </DialogTitle>
        </DialogHeader>
        <div className="flex h-full   flex-col ">
          <Tabs
            value={tab}
            onValueChange={setTab}
            className="h-full w-full flex-1 justify-between  px-4"
          >
            <TabsList className=" flex h-[36px] w-full justify-start gap-3 border-b bg-transparent py-0">
              <TabsTrigger value="document" className={tabClass}>
                <TbFileUpload size={20} />
                {form_section.form_upload}
              </TabsTrigger>
              <TabsTrigger value="url" className={tabClass}>
                <AiOutlineLink size={20} />
                {form_section.form_url_website}
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="document"
              className="max-h-[245px] min-h-[173px] overflow-hidden rounded-lg  "
            >
              <div className="flex  flex-col-reverse items-center  justify-center    border py-0">
                {documentFiles.length > 0 && (
                  <div className="  flex h-[72px]   w-full flex-row  gap-[6px]   bg-muted-dark px-[47px]">
                    {documentFiles.map((file, index) => (
                      <div key={index} className="relative  ">
                        <TooltipForUploadedFile
                          file={file}
                          handleDeleteFiles={handleDeleteFile}
                          index={index}
                          uploadIndex={uploadIndex}
                          uploadProgress={uploadProgress}
                          topOfTextField={false}
                          handleDeleteFilesFromParent={
                            handleDeleteFilesFromParent
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
                <UploadZone
                  documentFiles={documentFiles}
                  setDocumentFiles={handlePdfFile}
                  className="mb-0 h-[173px]  border-none lg:mb-0 xl:mb-0"
                />
              </div>
            </TabsContent>

            <TabsContent
              value="url"
              className="flex w-full items-center justify-center  "
            >
              <div className=" mb-[8px] grid w-full gap-2 ">
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

          <div className=" mx-[16px] mb-[12px] flex h-[36px] justify-end  gap-3  ">
            <Button
              className="w-[80px] bg-secondary text-primary-dark hover:bg-blue-200"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            {!pendingButton && (
              <Button
                className="w-[80px] "
                onClick={() => {
                  handleSave(tab);
                  setPendingButton(true);
                  startConverting(documentFiles);
                  setExtractedText("");
                }}
              >
                {form_section.form_save}
              </Button>
            )}
            {pendingButton && (
              <Button className="w-[80px] ">
                {successfulUploads}/{files.length}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
