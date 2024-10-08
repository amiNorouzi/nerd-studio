import dynamic from "next/dynamic";
import ChatPdfEditPageLoading from "@/app/[lang]/(protect-roots)/(apps)/chatpdf/edit/loading";

const EditPagePdf = dynamic(() => import("@/components/pages/edit-pdf-page"), {
  loading: () => <ChatPdfEditPageLoading />,
});

export default function EditPage() {
  return <EditPagePdf />;
}
