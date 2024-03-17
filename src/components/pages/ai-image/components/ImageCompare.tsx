"use client";

import { useState, MouseEvent } from "react";
import Image from "next/image";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { cn } from "@/lib/utils";

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
}

function ImageCompare({ beforeImage, afterImage }: ImageCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const tagClass =
    "absolute bottom-2 rounded-lg bg-black/50 px-3 py-2 text-center text-white";

  return (
    <div className="group relative w-full" onMouseUp={handleMouseUp}>
      <div
        className="relative m-auto aspect-[70/45] w-full max-w-[700px] cursor-col-resize select-none overflow-hidden rounded-lg"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMove}
      >
        <Image alt="" fill priority src={afterImage} />

        <div
          className="absolute left-0 right-0 top-0 m-auto aspect-[70/45] w-full max-w-[700px] select-none overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image fill priority alt="" src={beforeImage} />
        </div>
        <div
          className="absolute bottom-0 top-0 w-0.5 cursor-ew-resize bg-white"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="row absolute -right-[23px] top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 group-hover:-right-[27px]">
            <FaCaretLeft className="-mr-2 h-8 w-8 text-white transition-all duration-200 group-hover:-mr-1" />
            <FaCaretRight className="-ml-2 h-8 w-8 text-white transition-all duration-200 group-hover:-ml-1" />
          </div>
        </div>
        <span className={cn(tagClass, "left-2")}>Before</span>
        <span className={cn(tagClass, "right-2")}>After</span>
      </div>
    </div>
  );
}

export default ImageCompare;
