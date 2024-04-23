"use client ";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";
import { ReactElement } from "react";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BsFillPrinterFill } from "react-icons/bs";
import { BsArrowsFullscreen } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";

const EditPagePdf = () => {
  const thumbnailPluginInstance = thumbnailPlugin();
  // TODO: amin-sh refactor the code 
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <Toolbar>
      {(slots: ToolbarSlot) => {
        const {
          GoToNextPage,
          Zoom,
          CurrentScale,
          CurrentPageLabel,
          GoToPreviousPage,
          Print,
          NumberOfPages,
          ShowSearchPopover,
          EnterFullScreen,
        } = slots;
        return (
          <div className="flex w-full items-center justify-between border bg-[#EFEFEF] px-2 text-black">
            <div className=" flex items-center">
              <div className=" rounded-md bg-white px-2 py-1">
                <ShowSearchPopover>
                  {props => (
                    <IoIosSearch onClick={props.onClick} className="h-5 w-5" />
                  )}
                </ShowSearchPopover>
              </div>
            </div>
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

  const defaultLayoutPluginInstance = defaultLayoutPlugin({ renderToolbar });
  return (
    <>
      <div className=" h-screen w-[558px] ">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl="/pdf/sample.pdf"
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
    </>
  );
};

export default EditPagePdf;
