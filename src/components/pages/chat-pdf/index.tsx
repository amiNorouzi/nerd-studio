import { SetSearchParamProvider } from "@/components/shared";
import ChatPdfContent from "@/components/pages/chat-pdf/ChatPdfContent";
import PdfUploadSection from "@/components/pages/chat-pdf/componets/pdf-upload-section";
import ListPdfFile from "@/components/pages/chat-pdf/componets/ListPdfFile";

export default function ChatWithPdf() {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="chatpdf">
      <div className="flex h-full flex-col items-center justify-center gap-5">
        <PdfUploadSection />
       {/*<ListPdfFile />*/}
        <ChatPdfContent />
      </div>
    </SetSearchParamProvider>
  );
}
