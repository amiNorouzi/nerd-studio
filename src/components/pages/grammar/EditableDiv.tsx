import { cn } from "@/lib/utils";
import React, { RefObject } from "react";

interface Props {
  handleInput: (event: React.FormEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  divRef: RefObject<HTMLDivElement>;
  handleScroll: () => void;
}

export default function EditableDiv({
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
        "mb-0 h-full w-full overflow-y-auto rounded-lg  border-0   px-[26px] pb-[50px] pt-2 leading-8 outline-none ring-0 first-line:pl-4 ",
      )}
    >
      {/* <div contentEditable className="absolute top-3 outline-none">
      {innerText}
    </div> */}
    </div>
  );
}
