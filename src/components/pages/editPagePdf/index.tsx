"use client ";

import { ChatList, PromptInput } from "../chat/componets";
import { InputPromtChatPdf } from "./components/inputPromtChatPdf";
import PdfView from "./utility/pdfView";

const EditPagePdf = () => {
  return (
    <div className=" flex w-full  grid-flow-row grid-cols-2 flex-nowrap gap-0">
      <PdfView />
      <div className="  flex-1 ">
        <div className="relative flex items-center justify-center bg-[#F4F7FE]">
          <div
            style={{ height: "var(--apps-main-height" }}
            className=" overflow-y-auto "
          >
            <ChatList />
          </div>
          <InputPromtChatPdf />
        </div>
      </div>
    </div>
  );
};

export default EditPagePdf;
