import { SidebarChatPdf } from "@/components/pages/chat-pdf/componets/sidebarChatPdf";
import { PropsWithChildren, Suspense } from "react";
import ChatPdfEditPageLoading from "@/app/[lang]/(protect-roots)/(apps)/chatpdf/edit/loading";

const EditPageChatWithPdf = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<ChatPdfEditPageLoading />}>
      <div className="relative flex">
        <SidebarChatPdf />
        {children}
      </div>
    </Suspense>
  );
};

export default EditPageChatWithPdf;
