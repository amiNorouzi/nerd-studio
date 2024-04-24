import { SidebarChatPdf } from "@/components/pages/chatPdf/componets/sidebarChatPdf";
import { PropsWithChildren } from "react";

const EditPageChatWithPdf = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="relative flex h-full">
        <SidebarChatPdf />
        {children}
      </div>
    </>
  );
};

export default EditPageChatWithPdf;
