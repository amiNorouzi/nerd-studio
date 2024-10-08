import React, { useRef } from "react";
import { cn } from "@udecode/cn";
import { PlateContent } from "@udecode/plate-common";
import { cva } from "class-variance-authority";

import type { PlateContentProps } from "@udecode/plate-common";
import type { VariantProps } from "class-variance-authority";

const editorVariants = cva(
  cn(
    "relative overflow-x-auto whitespace-pre-wrap break-words",
    "min-h-[80px] h-full  w-full bg-background px-[50px] py-[60px] text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
    "[&_[data-slate-placeholder]]:text-muted-foreground [&_[data-slate-placeholder]]:!opacity-100",
    "[&_[data-slate-placeholder]]:top-[auto_!important]",
    "[&_strong]:font-bold",
  ),
  {
    variants: {
      variant: {
        // outline: "border border-input",
        ghost: "",
      },
      // focused: {
      //   true: "ring-2 ring-ring ring-offset-2",
      // },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      // focusRing: {
      //   true: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      //   false: "",
      // },
      size: {
        sm: "text-sm",
        md: "text-base",
      },
    },
    defaultVariants: {
      // variant: "outline",
      // focusRing: true,
      size: "sm",
    },
  },
);

export type EditorProps = PlateContentProps &
  VariantProps<typeof editorVariants> & {
    contentRef?: React.MutableRefObject<HTMLDivElement | null>;
  };

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      className,
      disabled,
      // focused,
      // focusRing,
      readOnly,
      size,
      variant,
      contentRef,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className="relative h-full max-h-full w-full flex-1 overflow-y-auto overflow-x-hidden  print:!h-fit print:!overflow-visible"
        style={{ height: "calc(100% - 62px)" }}
      >
        <PlateContent
          className={cn(
            editorVariants({
              disabled,
              // focused,
              // focusRing,
              size,
              variant,
            }),
            className,
          )}
          disableDefaultStyles
          readOnly={disabled ?? readOnly}
          aria-disabled={disabled}
          {...props}
          // ref={contentRef}
        />
      </div>
    );
  },
);
Editor.displayName = "Editor";

export { Editor };
