import React, { useRef } from "react";

import Editor from "@monaco-editor/react";
import { LuCopy, LuCopyCheck, LuDownload } from "react-icons/lu";
import { PiShareNetwork } from "react-icons/pi";
import { RiFullscreenExitFill, RiFullscreenFill } from "react-icons/ri";

import { MinimalButton } from "@/components/shared";
import Loading from "@/components/shared/Loading";

import {
  useCopyTextInClipBoard,
  useFullScreenElement,
  useGetDictionary,
} from "@/hooks";

import { cn } from "@/lib/utils";

import { monacoLanguages } from "@/constants/code";
import { downloadCode } from "@/components/pages/code/utils";

interface IProps {
  value: string;
  setValue: (value: string) => void;
  rootClassName?: string;
  headerClassName?: string;
  editorClassName?: string;
  language?: string;
}

/**
 * Code Editor component
 * use microsoft monaco editor
 * used for get code to explain or convert or show code in result
 * @param value - code value
 * @param setValue - set code value
 * @param rootClassName - additional class for root div
 * @param headerClassName - additional class for header div
 * @param editorClassName - additional class for editor div
 * @param language code language (javascript, typescript, python or ...)
 * @constructor
 */
function CodeEditor({
  value,
  setValue,
  rootClassName,
  headerClassName,
  editorClassName,
  language,
}: IProps) {
  const {
    common: { copy, full_screen, download },
  } = useGetDictionary();
  //for copy value
  const [handleCopy, isCopied] = useCopyTextInClipBoard(); // for copy value
  const editorRef = useRef<HTMLDivElement>(null);
  const { handleFullscreen, isActive: isFullScreen } =
    useFullScreenElement(editorRef);

  /**
   * get title for code editor
   * it is selected language or default javascript
   */
  const title =
    monacoLanguages.find(
      item => item.value.toLowerCase() === language?.toLowerCase(),
    )?.key || "Javascript";

  return (
    <div className={cn("w-full", rootClassName)} ref={editorRef}>
      {/*
        header
        contains title and buttons
      */}
      <div
        className={cn(
          "spacing-row h-8 rounded-t-lg bg-muted-foreground px-4 text-background",
          isFullScreen && "h-10 rounded-t-none",
          headerClassName,
        )}
      >
        <p>{title}</p>

        <div className="row gap-1">
          {/*full screen button*/}
          <MinimalButton
            Icon={isFullScreen ? RiFullscreenExitFill : RiFullscreenFill}
            title={full_screen}
            className="hover:bg-muted/30"
            onClick={handleFullscreen}
          />
          {/*download button*/}
          <MinimalButton
            Icon={LuDownload}
            title={download}
            className="hover:bg-muted/30"
            onClick={() => downloadCode(language || "Javascript", value)}
          />
          {/*copy button*/}
          <MinimalButton
            Icon={isCopied ? LuCopyCheck : LuCopy}
            title={copy}
            onClick={() => handleCopy(value)}
            className="hover:bg-muted/30"
          />
        </div>
      </div>

      {/*monaco editor*/}
      <Editor
        height={isFullScreen ? "100%" : "250px"}
        theme="vs-dark"
        defaultLanguage="javascript"
        value={value}
        className={cn("overflow-hidden rounded-b-lg", editorClassName)}
        loading={<Loading showLabel />}
        onChange={val => {
          val && setValue(val);
        }}
        wrapperProps={{
          className: "bg-[#1E1E1E] rounded-b-lg py-3",
        }}
        language={language}
      />
    </div>
  );
}

export default CodeEditor;
