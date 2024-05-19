import { SetSearchParamProvider } from "@/components/shared";
import ChatPdfContent from "@/components/pages/chat-pdf/ChatPdfContent";
import PdfUploadSection from "@/components/pages/chat-pdf/componets/pdf-upload-section";

export default function ChatWithPdf() {
  return (
    <SetSearchParamProvider appName="app" appSearchParamValue="chatpdf">
      <div className="flex h-full justify-center flex-col items-center gap-5">
        <PdfUploadSection />
        {/*<ListPdfFile />*/}
        <ChatPdfContent />
      </div>
    </SetSearchParamProvider>
  );
}
