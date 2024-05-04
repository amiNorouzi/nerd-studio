"use client";
import CodeLoading from "@/app/[lang]/(protect-roots)/(apps)/code/loading";
import dynamic from "next/dynamic";

const CodePage = dynamic(() => import("@/components/pages/code"), {
  loading: () => <CodeLoading />,
});

export default function Code() {
  return <CodePage />;
}
