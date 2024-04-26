import { SidebarChatPdf } from "@/components/pages/chat-pdf/componets/sidebarChatPdf";
import { PropsWithChildren } from "react";

const EditPageChatWithPdf = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="relative flex">
        <SidebarChatPdf />
        {children}
      </div>
    </>
  );
};

export default EditPageChatWithPdf;
