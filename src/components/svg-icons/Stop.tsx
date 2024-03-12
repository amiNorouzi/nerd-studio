import React from "react";
import { cn } from "@/lib/utils";

type IProps = React.ComponentPropsWithoutRef<"svg">;
export function Stop({ className, ...props }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      className={className}
      fill="none"
      {...props}
    >
      <path d="M17 4.3252H7C6.20435 4.3252 5.44129 4.64127 4.87868 5.20388C4.31607 5.76648 4 6.52955 4 7.3252V17.3252C4 18.1208 4.31607 18.8839 4.87868 19.4465C5.44129 20.0091 6.20435 20.3252 7 20.3252H17C17.7956 20.3252 18.5587 20.0091 19.1213 19.4465C19.6839 18.8839 20 18.1208 20 17.3252V7.3252C20 6.52955 19.6839 5.76648 19.1213 5.20388C18.5587 4.64127 17.7956 4.3252 17 4.3252Z" />
    </svg>
  );
}
