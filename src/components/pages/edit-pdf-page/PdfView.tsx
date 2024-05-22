"use client";
import { useCallback } from "react";
import {
  useStateCapturePicStore,
  useStateCaptureStore,
} from "@/stores/zustand/chat-pdf-file";
import PdfViewer from "@/features/PdfViewer";

export default function PdfView() {
  const setPic = useStateCapturePicStore.use.setPic();
  const pics = useStateCapturePicStore.use.pic();
  // const { mutate } = useConvertPicToText();
  // const { mutate: uploadtest } = useUploadPdf();
  //


  return (
    <div
      style={{ height: "var(--apps-main-height" }}
      className=" w-[600px] overflow-auto "
    >
      <PdfViewer pdf={}/>
    </div>
  );
}
