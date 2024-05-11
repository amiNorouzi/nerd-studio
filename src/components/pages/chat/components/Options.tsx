import React from "react";
import { cn } from "@/lib/utils";
interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}
export function Options({ children, className, ...divProps }: IProps) {
  return (
    <div
      className={cn("col form-gap flex-grow items-center", className)}
      {...divProps}
    >
      {children}
    </div>
  );
}
