import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDropzone } from "react-dropzone";

const PdfUploadZone = () => {
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
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className=" ">
          <div
            //   {...getRootProps()}
            className="transition-color flex h-full flex-1
          flex-col items-center  justify-center rounded-lg border-2
          border-dashed border-[#9373EE] bg-[#F9F6FF] p-5 text-gray-400
           outline-none duration-300 hover:border-blue-500 hover:text-blue-500"
          >
            {/* <input {...getInputProps()} /> */}
            {isDragActive ? (
              ""
            ) : (
              <div className=" flex h-fit w-fit cursor-pointer flex-col items-center justify-center">
                <img className="w-5/6 h-5/6" src="/images/mobile-upload.svg" alt="" />
                <h1 className=" ">Select your PDF that you want </h1>
                <p>(PDF Document / 5MB & 10Doc Max)</p>
              </div>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <Tabs>
          <TabsList
            className={
              "flex w-full  items-center justify-start rounded-none border-b bg-inherit py-0"
            }
          >
            <TabsTrigger
              className={
                "h-full rounded-none outline-offset-2 data-[state=active]:border-b data-[state=active]:border-purple-300 data-[state=active]:bg-inherit data-[state=active]:shadow-none "
              }
              value="document"
            >
              Document
            </TabsTrigger>
            <TabsTrigger
              className={
                "h-full rounded-none outline-offset-2 data-[state=active]:border-b data-[state=active]:border-purple-300 data-[state=active]:bg-inherit data-[state=active]:shadow-none "
              }
              value="website"
            >
              Website
            </TabsTrigger>
          </TabsList>
          <TabsContent value="document">
            <div
              className="transition-color flex h-72 flex-1
          flex-col items-center  justify-center rounded-lg
          p-5 text-gray-400
           outline-none duration-300 "
            >
              <div className=" flex  cursor-pointer flex-col items-center justify-center gap-2 ">
                <img className={"mb-10 w-16"} src="/images/upload.svg" alt="" />
                <h1 className=" ">
                  Select your image that you want to upscale
                </h1>
                <p>(PDF Document / 5MB & 10Doc Max)</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="website">Website </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PdfUploadZone;
