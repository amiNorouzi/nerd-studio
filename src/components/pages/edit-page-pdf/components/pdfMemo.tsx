"use client"
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { useSelectedFilePdfStore } from "@/stores/zustand/chat-pdf-file";
import { memo, ReactElement, useRef, useState } from "react";
import { defaultLayoutPlugin, ToolbarSlot } from "@react-pdf-viewer/default-layout";
import { BsArrowsFullscreen, BsFillPrinterFill, BsLayoutSidebar } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";



export const PdfMemo= memo(function PdfMemoFun ({ init }: { init:number }){
  const [screenCapture, setScreenCapture] = useState<string>("");
  console.log("pdf memo render");
  const thumbnailPluginInstance = thumbnailPlugin();

  const { Thumbnails } = thumbnailPluginInstance;

  const selectedFilePdfUrl = useSelectedFilePdfStore.use.selectedFilePdf();
  const pdfRef = useRef(null)
  const renderToolbar = (Toolbar: (props: any) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          GoToNextPage,
          Zoom,
          CurrentPageLabel,
          GoToPreviousPage,
          Print,
          NumberOfPages,
          ShowSearchPopover,
          EnterFullScreen,
        } = slots;
        return (
          <div className=" relative flex w-full items-center justify-between border bg-[#EFEFEF] px-2 text-black">
            <div className=" flex items-center gap-2">
              <div
                className={"cursor-pointer rounded-md bg-white p-2 text-black"}
                onClick={() => {
                  setOpenThumbnail(!isOpenThumbnail);
                }}
              >
                <BsLayoutSidebar className="h-4 w-4" />
              </div>
              <div className=" rounded-md bg-white px-2 py-1">
                <ShowSearchPopover>
                  {props => (
                    <IoIosSearch onClick={props.onClick} className="h-5 w-5" />
                  )}
                </ShowSearchPopover>
              </div>
            </div>
            <div></div>
            <div className=" flex items-center">
              <div className="ml-auto px-2">
                <GoToPreviousPage>
                  {props => (
                    <button
                      className={`rounded-md border-none bg-white text-white cursor-${props.isDisabled ? "not-allowed" : "pointer"} px-2 py-2`}
                      disabled={props.isDisabled}
                      onClick={props.onClick}
                    >
                      <FaArrowLeftLong
                        className={`${props.isDisabled ? "text-gray-100" : "text-black"}`}
                      />
                    </button>
                  )}
                </GoToPreviousPage>
              </div>

              <div className="flex w-fit gap-1 px-0.5">
                <span>Page</span>
                <span>
                  <CurrentPageLabel />
                </span>
                <p className="text-black">of</p>
                <span>
                  <NumberOfPages />
                </span>
              </div>
              <div className="px-0.5">
                <GoToNextPage>
                  {props => (
                    <button
                      className={`bg-${props.isDisabled ? "slate-500" : "white"} rounded-md border-none  cursor-${props.isDisabled ? "not-allowed" : "pointer"} px-2 py-2`}
                      disabled={props.isDisabled}
                      onClick={props.onClick}
                    >
                      <FaArrowRightLong className="text-black" />
                    </button>
                  )}
                </GoToNextPage>
              </div>
            </div>
            <div className=" flex items-center">
              <div className="ml-auto rounded-md bg-white px-2">
                <Zoom />
              </div>
              <div className="px-2">
                <Print>
                  {props => (
                    <button
                      className="cursor-pointer rounded-md border-none bg-white px-2 py-2 text-black"
                      onClick={props.onClick}
                    >
                      <BsFillPrinterFill />
                    </button>
                  )}
                </Print>
              </div>

              <div
                className={` ${isOpenThumbnail ? "left-0" : "left-[-30vw]"} h-[89vh] absolute top-9  bg-muted-dark transition-all duration-700 ease-linear `}
              >
                {" "}
                <Thumbnails />
              </div>
              <div className=" rounded-md bg-white p-2 ">
                <EnterFullScreen>
                  {props => <BsArrowsFullscreen />}
                </EnterFullScreen>
              </div>
            </div>
          </div>
        );
      }}
    </Toolbar>
  );
  const [isOpenThumbnail, setOpenThumbnail] = useState<boolean>(false);

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: defaultTabs => [],
  });
  return (
     <>
       <Worker  workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    {selectedFilePdfUrl.length > 3 ? (
          <Viewer
            ref={pdfRef}
            initialPage={init}
        fileUrl={"https://nerdstudio-backend-bucket.s3.amazonaws.com/media/pdfs/pdf-5f956914-9670-4f45-a0de-c922f9b5ca39.pdf"}
      plugins={[defaultLayoutPluginInstance, thumbnailPluginInstance]}
/>
      ):""}
  </Worker>
       </>


  )

})
