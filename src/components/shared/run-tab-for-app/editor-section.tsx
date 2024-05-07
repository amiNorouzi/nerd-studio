"use client";
import React, { PropsWithChildren, useEffect } from "react";
import "./editor-section.css";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/zustand/editor-slice";
import dynamic from "next/dynamic";
import HomeLoading from "@/app/[lang]/loading";

const Editor = dynamic(() => import("./editor-section-components/editor"), {
  loading: () => <HomeLoading />,
});
const EditorSectionFooter = dynamic(
  () => import("./editor-section-components/footer"),
  {
    loading: () => <HomeLoading />,
  },
);
const EditorSectionHeader = dynamic(
  () => import("./editor-section-components/header-actions"),
  {
    loading: () => <HomeLoading />,
  },
);

type Props = {
  value: string;
  onChange: (text: string) => void;
} & PropsWithChildren;

/**
 * this component is a wrapper for editor section
 * @param children
 * @constructor
 */
export default function EditorSection({ children, onChange, value }: Props) {
  const isFullScreen = useEditorStore.use.isFullScreen();
  const setIsFullScreen = useEditorStore.use.setIsFullScreen();

  useEffect(() => {
    return () => {
      setIsFullScreen(false);
    };
  }, []);

  return (
    <div
      className={cn(
        "col-span-12 flex h-fit overflow-hidden bg-white  transition-all duration-300",
        isFullScreen ? "col-span-12 h-full" : "  h-full  lg:col-span-8 ",
      )}
    >
      <div
        className={cn(
          " m-[18px] flex h-fit w-full divide-x overflow-hidden rounded-xl border  bg-background shadow-2xl lg:h-[95%]",
          isFullScreen && "h-full rounded-none border-none shadow-none",
        )}
      >
        {/* editor section*/}

        <div className="relative h-fit w-full overflow-hidden lg:h-full">
          {/* editor header like download and save and workspace */}
          <EditorSectionHeader />
          {/* editor */}
          <Editor value={value} onChange={onChange} />
          {/*editor footer contains number of words or char ,...*/}
          <EditorSectionFooter />
        </div>
        {/* history section*/}
      </div>
      {children}
    </div>
  );
}
