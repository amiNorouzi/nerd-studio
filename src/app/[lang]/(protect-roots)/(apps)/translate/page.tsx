"use client";
import type { ParamsType } from "@/services/types";
import TranslateLoading from "@/app/[lang]/(protect-roots)/(apps)/translate/loading";
import dynamic from "next/dynamic";

const TranslatePage = dynamic(() => import("@/components/pages/translate"), {
  loading: () => <TranslateLoading />,
});

interface IProps {
  params: ParamsType;
}
export default function Translate({ params }: IProps) {
  return <TranslatePage params={params} />;
}
