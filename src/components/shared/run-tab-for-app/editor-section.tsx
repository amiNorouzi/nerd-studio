"use client";
import React, { PropsWithChildren, useEffect } from "react";
import {
  Editor,
  EditorSectionFooter,
  EditorSectionHeader,
} from "./editor-section-components";
import "./editor-section.css";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/zustand/editor-slice";

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
        " form-gap col-span-12 flex h-fit overflow-hidden bg-white  transition-all duration-300",
        isFullScreen
          ? "col-span-12 h-full"
          : "  lg:col-span-6 lg:h-full xl:col-span-8 ",
      )}
    >
      <div
        className={cn(
          " m-[18px] mr-[6px]  flex h-fit w-full divide-x overflow-hidden rounded-xl border  bg-background shadow-2xl lg:h-[95%]",
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
