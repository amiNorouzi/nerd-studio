import { JSX, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type IAppIconProps = ComponentPropsWithoutRef<"svg"> & {
  isActive?: boolean;
  hasTitle?: boolean;
};

export type AppIconType = (props: IAppIconProps) => JSX.Element;

export function GrammarIcon({
  className,
  isActive,
  hasTitle,
  ...props
}: IAppIconProps) {
  const pathClassName = cn(
    "stroke-muted-foreground",
    isActive && (hasTitle ? "stroke-primary" : "stroke-foreground"),
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      className={cn(className, "fill-none", hasTitle ? "h-5 w-5" : "h-6 w-6")}
      {...props}
    >
      <g clipPath="url(#clip0_471_8010)">
        <path
          d="M21 13.5C21 14.6935 21.4741 15.8381 22.318 16.682C23.1619 17.5259 24.3065 18 25.5 18C26.6935 18 27.8381 17.5259 28.682 16.682C29.5259 15.8381 30 14.6935 30 13.5C30 12.3065 29.5259 11.1619 28.682 10.318C27.8381 9.47411 26.6935 9 25.5 9C24.3065 9 23.1619 9.47411 22.318 10.318C21.4741 11.1619 21 12.3065 21 13.5Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pathClassName}
        />
        <path
          d="M6 18V10.5C6 9.90905 6.1164 9.32389 6.34254 8.77792C6.56869 8.23196 6.90016 7.73588 7.31802 7.31802C7.73588 6.90016 8.23196 6.56869 8.77792 6.34254C9.32389 6.1164 9.90905 6 10.5 6C11.0909 6 11.6761 6.1164 12.2221 6.34254C12.768 6.56869 13.2641 6.90016 13.682 7.31802C14.0998 7.73588 14.4313 8.23196 14.6575 8.77792C14.8836 9.32389 15 9.90905 15 10.5V18"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pathClassName}
        />
        <path
          d="M6 13.5H15"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pathClassName}
        />
        <path
          d="M30 9V18"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pathClassName}
        />
        <path
          d="M6 24H24"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pathClassName}
        />
        <path
          d="M6 30H15"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pathClassName}
        />
        <path
          d="M21 30L24 33L31.5 25.5"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={pathClassName}
        />
      </g>
      <defs>
        <clipPath id="clip0_471_8010">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
