"use client";

import { ChatList } from "../chat/componets";
import { InputPromtChatPdf } from "./components/inputPromtChatPdf";
import PdfView from "./utility/pdfView";


export default function EditPagePdf() {
  return (
    <>
      <div className=" flex w-full  grid-flow-row grid-cols-2 flex-nowrap gap-0">
        <div>
          <PdfView />
        </div>
        <div className="  flex-1 ">
          <div className="relative flex items-center justify-center bg-[#F4F7FE]">
            <div
              style={{ height: "var(--apps-main-height" }}
              className=" overflow-y-auto px-5 py-2"
            >
              <ChatList />
            </div>
            <InputPromtChatPdf />
          </div>
        </div>
      </div>
    </>
  );
}
