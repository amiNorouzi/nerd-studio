import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { DialogForUpload } from "@/components/shared/run-tab-for-app/form-section-components/dialog-for-upload";

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
  const [file, setFile] = useState<File[]>([]);

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
      <DialogForUpload
        open={openDialog}
        setOpen={setOpenDialog}
        handleSave={() => console.log("save")}
        documentFiles={file}
        setDocumentFiles={setFile}
        url={""}
        setUrl={() => console.log()}
        files={[]}
        handleDeleteFilesFromParent={() => {}}
        setExtractedText={() => {}}
        startConverting={() => {}}
        uploadIndex={1}
        uploadProgress={50}
        uploadStatus={[]}
      />
    </div>
  );
};

export default PdfUploadSection;
