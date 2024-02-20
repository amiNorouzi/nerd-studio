import React from "react";
import { cn } from "@/lib/utils";

type IProps = React.ComponentPropsWithoutRef<"svg">;
export function Share({ className, ...props }: IProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "h-5 w-5 fill-foreground/70 transition-all duration-200 group-hover:fill-primary/70",
        className,
      )}
      {...props}
    >
      <path
        d="M16.96 6.17004C18.96 7.56004 20.34 9.77004 20.62 12.32"
        stroke="#4B4B4B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.48975 12.37C3.74975 9.82997 5.10975 7.61997 7.08975 6.21997"
        stroke="#4B4B4B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.18994 20.9399C9.34994 21.5299 10.6699 21.8599 12.0599 21.8599C13.3999 21.8599 14.6599 21.5599 15.7899 21.0099"
        stroke="#4B4B4B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0602 7.70001C13.5956 7.70001 14.8402 6.45537 14.8402 4.92001C14.8402 3.38466 13.5956 2.14001 12.0602 2.14001C10.5249 2.14001 9.28027 3.38466 9.28027 4.92001C9.28027 6.45537 10.5249 7.70001 12.0602 7.70001Z"
        stroke="#4B4B4B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.8298 19.92C6.36515 19.92 7.60981 18.6753 7.60981 17.14C7.60981 15.6046 6.36515 14.36 4.8298 14.36C3.29445 14.36 2.0498 15.6046 2.0498 17.14C2.0498 18.6753 3.29445 19.92 4.8298 19.92Z"
        stroke="#4B4B4B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.1701 19.92C20.7055 19.92 21.9501 18.6753 21.9501 17.14C21.9501 15.6046 20.7055 14.36 19.1701 14.36C17.6348 14.36 16.3901 15.6046 16.3901 17.14C16.3901 18.6753 17.6348 19.92 19.1701 19.92Z"
        stroke="#4B4B4B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
