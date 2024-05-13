"use client";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useCallback } from "react";
import {
  useStateCapturePicStore,
  useStateCaptureStore,
} from "@/stores/zustand/chat-pdf-file";
import { ScreenCapture } from "react-screen-capture";
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

  }, []);

  const StartCapture = useStateCaptureStore.use.setOnClick();

  const pdfKey = 8123681638163;
  const screenKey = 9273924982;
  return (
    <div
      style={{ height: "var(--apps-main-height" }}
      className=" w-[600px] overflow-auto "
    >
      {/*<ScreenCapture*/}
      {/*  key={screenKey}*/}
      {/*  onEndCapture={handleScreenCapture}*/}
      {/*  onStartCapture={onStartCapture}*/}
      {/*  componentDidMount={() => console.log("componentDidMount")}*/}
      {/*  componentWillUnmount={() => console.log("componentWillUnmount")}*/}
      {/*>*/}
      {/*  {({ onStartCapture }: any) => {*/}
      {/*    StartCapture(onStartCapture);*/}
      {/*    return (*/}
      {/*      <>*/}
      {/*        <PdfMemo key={pdfKey} init={1} />*/}
      {/*      </>*/}
      {/*    );*/}
      {/*  }}*/}
      {/*</ScreenCapture>*/}
    </div>
  );
}
