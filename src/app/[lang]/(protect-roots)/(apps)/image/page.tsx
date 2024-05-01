import AiImagePage from "@/components/pages/ai-image";
import { Suspense } from "react";
import ImageLoading from "@/app/[lang]/(protect-roots)/(apps)/image/loading";

export default function AIImage() {
  return (
    <Suspense fallback={<ImageLoading />}>
      <AiImagePage />
    </Suspense>
  );
}
