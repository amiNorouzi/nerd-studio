import { useEffect, useState } from "react";
import { useGetDictionary } from "@/hooks";
import useGenerateHighlight from "@/services/highlight";
import  useEventChanel  from "@/services/events-chanel";
import useHighlightStore from "@/stores/zustand/highlight-store";
import HighlightGeneratedContent from "@/components/shared/Highlight/HighlightGeneratedContent";
import { cn } from "@/lib/utils";
import RenderIf from "@/components/shared/RenderIf";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TbWand } from "react-icons/tb";
import { iconVariants } from "@/constants/variants";
import type { IconType } from "react-icons";

export interface HighlightItemContentProps {
  item: string;
  itemChecked: boolean;
  handleClickCheck: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: string,
  ) => void;
  isAnyItemSelect: boolean;
  isGenerate?: boolean;
  highlightType: HighlightType;
}

export default function HighlightOptionItemContent({
  itemChecked,
  isAnyItemSelect,
  handleClickCheck,
  item,
  highlightType,
  isGenerate = false,
}: HighlightItemContentProps) {
  // when user click generate button this state will be true
  const [showTextarea, setShowTextArea] = useState(false);

  const {
    page: { chat },
  } = useGetDictionary();
  // const { mutate: mutateGenerate } = useGenerateHighlight();

  // console.info("event", message);
  const setGeneratedHighlight = useHighlightStore.use.setGeneratedHighlight();
  const highlightMessages = useHighlightStore.use.messages();
  const [currentIndex, setCurrentIndex] = useState<number>(
    highlightMessages[highlightType].length === 0
      ? 0
      : highlightMessages[highlightType].length - 1,
  );

  // useEffect(() => {
  //   setGeneratedHighlight(currentIndex, { [highlightType]: [message] });
  // }, [currentIndex, highlightType, message, setGeneratedHighlight]);

  // handle click on generate button
  function handleGenerate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setShowTextArea(true);
    // mutateGenerate({
    //   content: "hi",
    //   presence_penalty: 0.0,
    //   top_p: 0.9,
    //   frequency_penalty: 0.0,
    //   max_tokens: 100,
    //   model: "gpt-3.5-turbo-0125",
    //   temperature: 0.0,
    //   type: highlightType,
    // });
  }

  // if user click on generate button or generate button in header  , we will show generated content
  if (isGenerate || showTextarea)
    return (
      <HighlightGeneratedContent
        item={item}
        highlightType={highlightType}
        regenerate={handleGenerate}
        setCurrentIndex={setCurrentIndex}
      />
    );

  // else we show normal content
  return (
    <div
      key={item}
      className={cn(
        "flex h-9 cursor-pointer items-center gap-2 overflow-hidden rounded-lg border bg-muted ps-2",
        itemChecked && " border-primary bg-primary-light text-primary-dark",
      )}
      onClick={e => handleClickCheck(e, item)}
    >
      <RenderIf isTrue={isAnyItemSelect}>
        <Checkbox
          checked={itemChecked}
          onClick={e => handleClickCheck(e, item)}
          className="data-[state=checked]:border-primary-dark data-[state=checked]:bg-transparent data-[state=checked]:text-primary-dark "
        />
      </RenderIf>
      <span className="me-auto text-sm">{item}</span>
      <RenderIf isTrue={!isAnyItemSelect}>
        <Button
          className="!h-full gap-1 rounded-none px-4 py-2 text-xs text-primary"
          variant="secondary"
          onClick={handleGenerate}
        >
          <TbWand className={iconVariants({ size: "sm" })} />
          {chat.generate_button_label}
        </Button>
      </RenderIf>
    </div>
  );
}
