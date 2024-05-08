import { cn } from "@/lib/utils";
import React, { RefObject } from "react";

interface Props {
  handleInput: (event: React.FormEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  divRef: RefObject<HTMLDivElement>;
  handleScroll: () => void;
  pasteHandler:(e:React.ClipboardEvent<HTMLDivElement>)=>void
}

export default function EditableDiv({
  handleInput,
  handleMouseMove,
  divRef,
  handleScroll,
                                      pasteHandler
}: Props) {

  return (
    <div
      id="input"
      contentEditable
      onInput={handleInput}
      onMouseMove={handleMouseMove}
      ref={divRef}
      onScroll={handleScroll}
      spellCheck={false}
      onPaste={pasteHandler}
      className={cn(
        "mb-0 h-full w-full cursor-text overflow-y-auto  rounded-lg border-0  px-[32px] pb-[50px] pt-2  leading-tight outline-none ring-0 first-line:pl-4 first-line:pt-8 ",
      )}
    >
      {/* <div contentEditable className="absolute top-3 outline-none">
      {innerText}
    </div> */}
    </div>
  );
}
