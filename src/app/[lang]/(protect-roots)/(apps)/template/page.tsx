"use client";
import TemplateLoading from "@/app/[lang]/(protect-roots)/(apps)/template/loading";
import dynamic from "next/dynamic";

const TemplatePage = dynamic(() => import("@/components/pages/template"), {
  loading: () => <TemplateLoading />,
});

export default function Template() {
  return <TemplatePage />;
}
