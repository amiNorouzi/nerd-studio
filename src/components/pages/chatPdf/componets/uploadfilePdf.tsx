import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDropzone } from "react-dropzone";

export function UploadFilePdf() {
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
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <div className=" px-[143px] py-[48px]">
            <div
              //   {...getRootProps()}
              className="transition-color flex h-72 flex-1
          flex-col items-center  justify-center rounded-lg border-2
          border-dashed border-[#9373EE] bg-[#F9F6FF] p-5 text-gray-400
           outline-none duration-300 hover:border-blue-500 hover:text-blue-500"
            >
              {/* <input {...getInputProps()} /> */}
              {isDragActive ? (
                ""
              ) : (
                <div className=" flex cursor-pointer flex-col items-center justify-center">
                  <img src="/images/mobile-upload.svg" alt="" />
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
                {...getRootProps()}
                className="transition-color flex h-72 flex-1
          flex-col items-center  justify-center rounded-lg
          p-5 text-gray-400
           outline-none duration-300 "
              >
                <div className=" flex  cursor-pointer flex-col items-center justify-center gap-2 ">
                  <img
                    className={"mb-10 w-16"}
                    src="/images/upload.svg"
                    alt=""
                  />
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
      <div className="flex flex-col items-center justify-center gap-10">
        <div className=" text-5xl font-bold">
          Chat with any
          <span className=" ml-2 inline-block w-fit -rotate-[2deg] bg-[#9373EE] px-2 py-3 text-white">
            <p className="rotate-[2deg] text-5xl font-bold"> PDF document!</p>
          </span>
        </div>
        <p className=" mx-[15%] w-auto text-center text-xl font-medium text-[#747474]">
          We, at ChatPDF.guru, have revolutionized the way you interact with
          your PDF documents forever. This will save you time, boost
          productivity, and enhance your learning and reading speed.
        </p>
      </div>
    </div>
  );
}
