import { LuChevronDown } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetDictionary } from "@/hooks";

/**
 * button use for toggle collapsible div
 * @param isOpen for change icon rotation
 * @param handleToggle onClick
 * @constructor
 */
function CollapsibleToggle({
  isOpen,
  handleToggle,
}: {
  isOpen: boolean;
  handleToggle: () => void;
}) {
  const {
    common: { hide, details },
  } = useGetDictionary();
  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      className="fit row ms-auto gap-1 p-1 text-xs text-muted-foreground"
    >
      {isOpen ? hide : details}
      <LuChevronDown
        className={cn(
          "h-3 w-3 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
      />
    </Button>
  );
}

export default CollapsibleToggle;
