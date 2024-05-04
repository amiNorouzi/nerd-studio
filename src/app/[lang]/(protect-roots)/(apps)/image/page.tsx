import ImageLoading from "@/app/[lang]/(protect-roots)/(apps)/image/loading";
import dynamic from "next/dynamic";

const AiImagePage = dynamic(() => import("@/components/pages/ai-image"), {
  loading: () => <ImageLoading />,
});

export default function AIImage() {
  return <AiImagePage />;
}
