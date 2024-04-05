"use client";

import type { ChildrenProps } from "@/services/types";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores/zustand/editor-slice";

function FormWrapper({
  className,
  children,
}: ChildrenProps<{ className?: string }>) {
  const isFullScreenEditor = useEditorStore.use.isFullScreen();
  return (
    <div
      className={cn(
        "form-gap form-padding col-span-12 flex h-fit flex-col overflow-y-auto bg-background lg:col-span-6 lg:h-full lg:max-h-full xl:col-span-4",
        isFullScreenEditor && "hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default FormWrapper;
