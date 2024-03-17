import React from "react";
import { cn } from "@/lib/utils";

type IProps = React.ComponentPropsWithoutRef<"svg">;
export function Reload({ className, ...props }: IProps) {
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
        d="M17.772 8.00012C16.1428 5.63493 13.1619 4.47677 10.2568 5.22169C9.02629 5.53828 7.90511 6.18385 7.01353 7.08917C6.12187 7.99457 5.49349 9.12561 5.19579 10.361C4.89808 11.5964 4.94228 12.8895 5.32364 14.1017C5.705 15.3138 6.40914 16.3993 7.36053 17.2418C8.31193 18.0842 9.4747 18.6517 10.7241 18.8835C11.9736 19.1153 13.2625 19.0026 14.4528 18.5575C15.643 18.1124 16.6897 17.3517 17.4804 16.357C18.2712 15.3623 18.7763 14.1711 18.9416 12.9111C19.0134 12.3635 19.5155 11.9778 20.0631 12.0496C20.6107 12.1214 20.9964 12.6236 20.9246 13.1712C20.7121 14.7911 20.0627 16.3227 19.046 17.6016C18.0293 18.8805 16.6836 19.8586 15.1533 20.4308C13.623 21.0031 11.9657 21.1479 10.3593 20.8499C8.7529 20.5519 7.25792 19.8222 6.03469 18.7391C4.81147 17.656 3.90615 16.2604 3.41583 14.7019C2.92551 13.1434 2.86868 11.4808 3.25145 9.89244C3.63421 8.30409 4.44212 6.84989 5.58854 5.68581C6.73496 4.52172 8.17664 3.69166 9.75895 3.28466L9.75963 3.28448C13.2427 2.39116 16.8326 3.63491 19.0001 6.30456V4.00012C19.0001 3.44783 19.4478 3.00012 20.0001 3.00012C20.5523 3.00012 21.0001 3.44783 21.0001 4.00012V9.00012C21.0001 9.5524 20.5523 10.0001 20.0001 10.0001H19.457C19.4412 10.0005 19.4255 10.0005 19.4097 10.0001H15.0001C14.4478 10.0001 14.0001 9.5524 14.0001 9.00012C14.0001 8.44783 14.4478 8.00012 15.0001 8.00012H17.772Z"
        fill="#B9BAC0"
      />
    </svg>
  );
}
