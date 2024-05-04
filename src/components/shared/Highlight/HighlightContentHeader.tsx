import useHighlightStore from "@/stores/zustand/highlight-store";
import { useGetDictionary } from "@/hooks";
import { Button } from "@/components/ui/button";
import { TbWand, TbX } from "react-icons/tb";
import { iconVariants } from "@/constants/variants";

interface HighlightContentHeaderProps {
  handleClickToggleCheckAll: () => void;
  checkAll: boolean;
}

/**
 * this component is for header of highlight
 * @param handleClickToggleCheckAll - handle click on generate all
 * @param checkAll - check if all items are selected
 * @constructor
 */
export default function HighlightContentHeader({
                                                 handleClickToggleCheckAll,
                                                 checkAll,
                                               }: HighlightContentHeaderProps) {
  const setHighlightIsOpen = useHighlightStore.use.setHighlightIsOpen();
  const {
    page: { chat },
  } = useGetDictionary();

  return (
    <div className="flex justify-between p-4.5">
      <Button
        className="gap-1 px-4 py-2 text-xs text-primary"
        variant="muted"
        onClick={handleClickToggleCheckAll}
      >
        <TbWand className="h-4 w-4" />
        {checkAll ? chat.generate_button_label : chat.generate_all_button_label}
      </Button>

      <Button
        variant="ghost"
        className="h-fit w-fit p-2"
        onClick={() => setHighlightIsOpen(false)}
      >
        <TbX className={iconVariants({ size: "md" })} />
      </Button>
    </div>
  );
}