import React from "react";
import { cn } from "@/lib/utils";

type IProps = React.ComponentPropsWithoutRef<"svg">;
export function Bookmark({ className, ...props }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 5C8.73478 5 8.48043 5.10536 8.29289 5.29289C8.10536 5.48043 8 5.73478 8 6V18.2338L11.4855 16.1425C11.8022 15.9525 12.1978 15.9525 12.5145 16.1425L16 18.2338V6C16 5.73478 15.8946 5.48043 15.7071 5.29289C15.5196 5.10536 15.2652 5 15 5H9ZM6.87868 3.87868C7.44129 3.31607 8.20435 3 9 3H15C15.7956 3 16.5587 3.31607 17.1213 3.87868C17.6839 4.44129 18 5.20435 18 6V20C18 20.3603 17.8062 20.6927 17.4927 20.8702C17.1792 21.0477 16.7944 21.0429 16.4855 20.8575L12 18.1662L7.5145 20.8575C7.20556 21.0429 6.82081 21.0477 6.5073 20.8702C6.19379 20.6927 6 20.3603 6 20V6C6 5.20435 6.31607 4.44129 6.87868 3.87868Z"
      />
    </svg>
  );
}
