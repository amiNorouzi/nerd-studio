import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { BsArrowsFullscreen, BsFillPrinterFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import {
  defaultLayoutPlugin,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";
import { memo, ReactElement, useCallback, useMemo, useRef, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import {
  useSelectedFilePdfStore,
  useStateCapturePicStore,
  useStateCaptureStore,
} from "@/stores/zustand/chat-pdf-file";
import { ScreenCapture } from "react-screen-capture";
import { useConvertPicToText, useUploadPdf } from "@/services/upload-pdf";
import { PdfMemo } from "@/components/pages/edit-page-pdf/components/pdfMemo";

export default function PdfView() {
  const setPic = useStateCapturePicStore.use.setPic();
  const pics = useStateCapturePicStore.use.pic();
  // const { mutate } = useConvertPicToText();
  // const { mutate: uploadtest } = useUploadPdf();
  //




  const handleScreenCapture = useCallback((capture: string) => {
    setPic([...pics, capture]);
  }, []);

  const onStartCapture = useCallback(() => {
    console.log("Starting Capture");
  }, []);

  const StartCapture = useStateCaptureStore.use.setOnClick();


const pdfKey = 8123681638163
  const screenKey = 9273924982
  return (
    <div
      style={{ height: "var(--apps-main-height" }}
      className=" w-[600px] overflow-auto "
    >
      {/* @ts-ignore */}
      <ScreenCapture
        key = {screenKey}
        onEndCapture={handleScreenCapture}
        /* @ts-ignore*/
        onStartCapture={onStartCapture}
        componentDidMount={()=>console.log("componentDidMount")}
        componentWillUnmount={()=>console.log("componentWillUnmount")}
      >
        {({ onStartCapture }: any) => {
          StartCapture(onStartCapture)
          console.log("test if");
          return (
            <>
              <PdfMemo key={pdfKey} init={1} />
            </>
          );
        }}
      </ScreenCapture>
    </div>
  );
}
// eslint-disable-next-line react/display-name
const PdfMemoTest =memo(({ name }: { name: string }) => {
  console.log("PdfMemo Rendered");
  return <div>{name}</div>;
});

