"use client";
import { ChatList } from "../chat/componets";
import { InputPromtChatPdf } from "./components/inputPromtChatPdf";
import PdfView from "./utility/pdfView";
import { useEffect, useState } from "react";
import { useConvertPicToText } from "@/services/upload-pdf";
import { useStateCapturePicStore } from "@/stores/zustand/chat-pdf-file";

export default function EditPagePdf() {
  const [messages, setMessages] = useState<any>([]);
  const { isPending, isSuccess, mutateAsync } = useConvertPicToText();
  useStateCapturePicStore.use.pic();
  const pics = useStateCapturePicStore.use.pic();

  useEffect(() => {
    const getData = async () => {
      const data = await mutateAsync(pics[pics.length - 1]);

      if (!isPending && data) {
        console.log("padding");

        setMessages([
          ...messages,
          {
            id: "2",
            // @ts-ignore
            prompt: [`${data}`],
            image: "/images/logo.png",
            timeLine: "5 Min ago",
            name: "kasra",
            role: "assistance",
          },
        ]);
      }
    };
    getData();
  }, [pics]);
  return (
    <div className="w-full">
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
    </div>
  );
}
