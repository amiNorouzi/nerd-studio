import React from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
export function Run({
  children,

  className,
  ...divProps
}: IProps) {
  return (
    <div
      className={cn(
        "grid h-fit max-h-full grid-cols-12 divide-y overflow-y-auto lg:flex  lg:h-full lg:divide-x lg:overflow-hidden ",
        className,
      )}
      {...divProps}
    >
      {children}
    </div>
  );
}

const EditorSection = dynamic(() => import("./editor-section"), {
  loading: () => <HomeLoading />,
  ssr: false
});
const FormSection = dynamic(() => import("./form-section"), {
  loading: () => <HomeLoading />,
  ssr: false
});
const TranslateFormSection = dynamic(() => import("./translate-form"), {
  loading: () => <HomeLoading />,
  ssr: false
});
const GrammarFormSection = dynamic(() => import("./grammar-form"), {
  loading: () => <HomeLoading />,
  ssr: false
});

Run.Editor = EditorSection;
Run.Form = FormSection;
Run.TranslateForm = TranslateFormSection;
Run.GrammarForm = GrammarFormSection;
