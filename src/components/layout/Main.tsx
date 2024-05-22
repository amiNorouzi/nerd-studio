import { HTMLProps } from "react";
import { cn } from "@/lib/utils";

export default function Main({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <main className={cn("h-full w-full overflow-auto", className)} {...props} />
  );
}
