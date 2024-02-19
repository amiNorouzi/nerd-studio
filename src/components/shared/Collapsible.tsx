import { ChildrenProps } from "@/services/types";
import { cn } from "@/lib/utils";

interface IProps {
  isOpen: boolean;
  className?: string;
  openClassName?: string;
}

export function Collapsible({
  isOpen,
  className,
  openClassName,
  children,
}: ChildrenProps<IProps>) {
  return (
    <div
      className={cn(
        "max-h-0 overflow-hidden transition-all duration-300",
        isOpen && "max-h-dvh",
        className,
        isOpen && openClassName,
      )}
    >
      {children}
    </div>
  );
}
