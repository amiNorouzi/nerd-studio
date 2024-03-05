import React from "react";
import {
  Editor,
  EditorSectionFooter,
  EditorSectionHeader,
} from "./editor-section-components";
import "./editor-section.css";
import { cn } from "@/lib/utils";

interface IProps {
  children: React.ReactNode;
}
export function EditorSection({ children }: IProps) {
  return (
    <div
      className={cn(
        " col-span-12 flex  h-fit overflow-hidden bg-card  px-4 py-6 lg:col-span-6 lg:h-full lg:px-12 xl:col-span-8",
      )}
    >
      <div className="flex h-fit divide-x  overflow-hidden rounded-2xl border shadow-2xl lg:h-full">
        {/* editor section*/}
        <div className="h-fit overflow-hidden    lg:h-full">
          <EditorSectionHeader />
          <Editor />
          <EditorSectionFooter />
        </div>
        {/* history section*/}
        {children}
      </div>
    </div>
  );
}
