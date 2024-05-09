"use client"
import { DialogForUpload } from "@/components/shared/run-tab-for-app/form-section-components/dialog-for-upload";
import {
  usePdfFileStore,
  useSelectedFilePdfStore,
} from "@/stores/zustand/chat-pdf-file";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetUploadedPdf, useUploadPdf } from "@/services/upload-pdf";
import Image from "next/image";

const PdfUploadSection = () => {
  const onDrop = (acceptedFiles: any) => {
    // Handle PDF files here
    console.log("Accepted files:", acceptedFiles);
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        // You can perform actions with the file content here
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  // when pdf uploaded refech the data
  const { refetch } = useGetUploadedPdf();

  const router = useRouter();
  const uploaderPdf = async () => {
    console.log("test upload pdf");

    const res = await uploadPdf(url[url.length - 1]);
    console.log(res);
    await refetch();
  };
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [url, setFile] = useState<File[]>([]);
  const setUrlPdf = usePdfFileStore.use.setUrlPdf();
  const urlPdf = usePdfFileStore.use.urlPdf();
  const selectedFilePdf = useSelectedFilePdfStore.use.selectedFilePdf();
  const uploadStatus = [true];
  const {
    mutateAsync: uploadPdf,
    data,
    uploadProgress,
    setIndex: setUploadIndex,
    index: uploadIndex,
  } = useUploadPdf();
  const handleSaveDialog = async () => {
    console.log("test save dialog");

    setUrlPdf([...url]);
    setOpenDialog(!openDialog);
    uploaderPdf();
    router.push("/chatpdf/edit");
  };
  useEffect(() => {
    console.log(openDialog);
  }, [openDialog]);
  return (
    <div className=" ">
      <div
        onClick={() => {
          setOpenDialog(true);
        }}
        className="transition-color flex h-full flex-1
          flex-col items-center  justify-center rounded-lg border-2
          border-dashed border-[#9373EE] bg-[#F9F6FF] p-5 text-gray-400
           outline-none duration-300 hover:border-blue-500 hover:text-blue-500"
      >
        <div className=" flex h-fit w-fit cursor-pointer flex-col items-center justify-center">
          <Image className="h-5/6 w-5/6" src="/images/mobile-upload.svg" alt="" width={36} height={36}/>
          <h1 className=" ">Select your PDF that you want </h1>
          <p>(PDF Document / 5MB & 10Doc Max)</p>
        </div>
      </div>
      {/*  TODO: remove it */}
      <Link href={"/chatpdf/edit"}>edit</Link>
      <DialogForUpload
        open={openDialog}
        setOpen={setOpenDialog}
        handleSave={handleSaveDialog}
        documentFiles={url}
        setDocumentFiles={setFile}
        url={""}
        setUrl={() => console.log("url")}
        files={urlPdf}
        handleDeleteFilesFromParent={() => console.log()}
        setExtractedText={() => console.log()}
        startConverting={setUrlPdf}
        uploadIndex={1}
        uploadProgress={100}
        uploadStatus={[...uploadStatus]}
        setUploadStatus={() => {}}
      />
    </div>
  );
};

export default PdfUploadSection;
