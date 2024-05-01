import CodePage from "@/components/pages/code";
import { Suspense } from "react";
import CodeLoading from "@/app/[lang]/(protect-roots)/(apps)/code/loading";

export default function Code() {
  return (
    <Suspense fallback={<CodeLoading />}>
      <CodePage />
    </Suspense>
  );
}
