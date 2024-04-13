import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "element-height flex w-full rounded-lg border bg-muted",
          "outline-none ring-offset-background file:border-0 file:bg-transparent",
          "file:font-normal placeholder:font-light placeholder:text-muted-foreground focus-visible:outline-none ",
          "hover:!border-primary-light focus:bg-background focus:!outline-0 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 ",
          "px-3 py-1 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
