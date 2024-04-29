"use client";

import { ChatList } from "../chat/componets";
import { InputPromtChatPdf } from "./components/inputPromtChatPdf";
import PdfView from "./utility/pdfView";

export default function EditPagePdf() {
  const messages = [
    {
      id: "2",
      prompt: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
      ],
      image: "/images/logo.png",
      timeLine: "5 Min ago",
      name: "kasra",
      role: "user",
    },
    {
      id: "1",
      prompt: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
      ],
      image: "/images/gemni.jpeg",
      timeLine: "5 Min ago",
      name: "kasra",
      role: "user",
    },
  ];
  
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
              <ChatList messages={messages} />
            </div>
            <InputPromtChatPdf />
          </div>
        </div>
      </div>
    </>
  );
}
