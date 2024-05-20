import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiMenuFoldLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

type Props = {
  isCollapsed: boolean;
  isHoverOnSidePanel: boolean;
  isMainHeader: boolean;
  setIsSidePanelOpen(isSidePanelOpen: boolean): void;
};
export default function SidePanelHeader({
  isCollapsed,
  isHoverOnSidePanel,
  isMainHeader,
  setIsSidePanelOpen,
}: Props) {
  return (
    <div
      className={cn(
        "row gap-2.5 border-b py-2",
        !isCollapsed || isHoverOnSidePanel
          ? "px-4 "
          : "!w-full overflow-hidden px-4",
        isMainHeader ? "h-header" : "h-apps-header",
      )}
    >
      <Image src="/images/logo.png" alt="nerd logo" width={24} height={24} />
      <h1 className="text-gradiant whitespace-nowrap text-lg font-bold">
        Nerd Studio
      </h1>
      <Button
        variant="ghost"
        className="fit me-2 ms-auto p-1 text-muted-foreground lg:hidden"
        onClick={() => setIsSidePanelOpen(false)}
      >
        <RiMenuFoldLine size="1.3rem" />
      </Button>
    </div>
  );
}
