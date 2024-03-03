import React from "react";
import { cn } from "@/lib/utils";

type IProps = React.ComponentPropsWithoutRef<"svg">;
export function ErrorIcon({ className, ...props }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.49984 5C2.96007 5 3.33317 5.3731 3.33317 5.83333V9.16667H4.99984V5.83333C4.99984 5.3731 5.37293 5 5.83317 5C6.29341 5 6.6665 5.3731 6.6665 5.83333V14.1667C6.6665 14.6269 6.29341 15 5.83317 15C5.37293 15 4.99984 14.6269 4.99984 14.1667V10.8333H3.33317C2.89114 10.8333 2.46722 10.6577 2.15466 10.3452C1.8421 10.0326 1.6665 9.60869 1.6665 9.16667V5.83333C1.6665 5.3731 2.0396 5 2.49984 5ZM7.98799 5.48816C8.30055 5.1756 8.72448 5 9.1665 5H10.8332C11.2752 5 11.6991 5.1756 12.0117 5.48816C12.3242 5.80072 12.4998 6.22464 12.4998 6.66667V13.3333C12.4998 13.7754 12.3242 14.1993 12.0117 14.5118C11.6991 14.8244 11.2752 15 10.8332 15H9.1665C8.72448 15 8.30055 14.8244 7.98799 14.5118C7.67543 14.1993 7.49984 13.7754 7.49984 13.3333V6.66667C7.49984 6.22464 7.67543 5.80072 7.98799 5.48816ZM10.8332 6.66667L9.1665 6.66667V13.3333H10.8332V6.66667ZM14.1665 5C14.6267 5 14.9998 5.3731 14.9998 5.83333V9.16667H16.6665V5.83333C16.6665 5.3731 17.0396 5 17.4998 5C17.9601 5 18.3332 5.3731 18.3332 5.83333V14.1667C18.3332 14.6269 17.9601 15 17.4998 15C17.0396 15 16.6665 14.6269 16.6665 14.1667V10.8333H14.9998C14.5578 10.8333 14.1339 10.6577 13.8213 10.3452C13.5088 10.0326 13.3332 9.60869 13.3332 9.16667V5.83333C13.3332 5.3731 13.7063 5 14.1665 5Z"
        fill="#B9BAC0"
      />
    </svg>
  );
}
