import { cn } from "@/lib/utils";
import React, { RefObject } from "react";

interface Props {
  handleInput: (event: React.FormEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  divRef: RefObject<HTMLDivElement>;
  handleScroll: () => void;
}

export default function EditabelDiv({
  handleInput,
  handleMouseMove,
  divRef,
  handleScroll,
}: Props) {
  return (
    <div
      id="input"
      contentEditable="plaintext-only"
      onInput={handleInput}
      onMouseMove={handleMouseMove}
      ref={divRef}
      onScroll={handleScroll}
      spellCheck={false}
      className={cn(
        "mb-0 h-[400px] w-full overflow-y-auto rounded-lg border bg-muted px-[26px] pb-[50px] pt-2 leading-8 outline-none ring-0 first-line:pl-4 focus:border-primary focus:bg-background",
      )}
    >
      {/* <div contentEditable className="absolute top-3 outline-none">
      {innerText}
    </div> */}
    </div>
  );
}
