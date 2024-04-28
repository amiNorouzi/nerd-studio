import { useDropzone } from "react-dropzone";
import { DialogForUpload } from "@/components/shared/run-tab-for-app/form-section-components/dialog-for-upload";
import {
  usePdfFileStore,
  useSelectedFilePdfStore,
} from "@/stores/zustand/chat-pdf-file";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  // Only accept PDF files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 5242880,
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [url, setFile] = useState<File[]>([]);
  const setUrlPdf = usePdfFileStore.use.setUrlPdf();
  const setSelectedFilePdf = useSelectedFilePdfStore.use.setSelectedFilePdf();
  const selectedFilePdf = useSelectedFilePdfStore.use.selectedFilePdf();
  const uploadStatus = [true, true];
  const handleSaveDialog = () => {
    setSelectedFilePdf(url[url.length - 1]);
    setUrlPdf([...url]);
    setOpenDialog(false);
    // TODO: redirect when in  the edit page
    redirect("/chatpdf/edit");
  };
  return (
    <div className=" ">
      <div
        className="transition-color flex h-full flex-1
          flex-col items-center  justify-center rounded-lg border-2
          border-dashed border-[#9373EE] bg-[#F9F6FF] p-5 text-gray-400
           outline-none duration-300 hover:border-blue-500 hover:text-blue-500"
      >
        {isDragActive ? (
          ""
        ) : (
          <div
            onClick={() => setOpenDialog(!openDialog)}
            className=" flex h-fit w-fit cursor-pointer flex-col items-center justify-center"
          >
            <img
              className="h-5/6 w-5/6"
              src="/images/mobile-upload.svg"
              alt=""
            />
            <h1 className=" ">Select your PDF that you want </h1>
            <p>(PDF Document / 5MB & 10Doc Max)</p>
          </div>
        )}
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
        files={selectedFilePdf}
        handleDeleteFilesFromParent={() => console.log()}
        setExtractedText={() => console.log()}
        startConverting={setUrlPdf}
        uploadIndex={1}
        uploadProgress={3}
        uploadStatus={[...uploadStatus]}
      />
    </div>
  );
};

export default PdfUploadSection;
