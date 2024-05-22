"use client";
import { DialogForUpload } from "@/components/shared/run-tab-for-app/form-section-components/dialog-for-upload";
import {
  usePdfFileStore,
  useSelectedFilePdfStore,
} from "@/stores/zustand/chat-pdf-file";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetUploadedPdf, useUploadPdf } from "@/services/upload-pdf";
import Image from "next/image";

const PdfUploadSection = () => {
  const onDrop = (acceptedFiles: any) => {
    // Handle PDF files here
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        // You can perform actions with the file content here
        const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);
    });
  };
  // when pdf uploaded refech the data
  const { refetch } = useGetUploadedPdf();

  const router = useRouter();
  const uploaderPdf = async () => {
    const res = await uploadPdf(url[url.length - 1]);
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
    setUrlPdf([...url]);
    setOpenDialog(!openDialog);
    uploaderPdf();
    router.push("/chatpdf/edit");
  };
  useEffect(() => {}, [openDialog]);
  return (
    <div
      onClick={() => {
        setOpenDialog(true);
      }}
      className="transition-color flex w-8/12 cursor-pointer
          flex-col items-center justify-center rounded-lg border-2 p-5
          border-dashed border-[#9373EE] bg-[#F9F6FF] text-gray-400
          hover:border-blue-500 hover:text-blue-500"
    >
      <Image
        src="/images/mobile-upload.svg"
        alt="mobile-upload"
        width={152}
        height={152}
      />
      <p className='text-2xl m-0'>Select your PDF that you want </p>
      <p>(PDF Document / 5MB & 10Doc Max)</p>
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
