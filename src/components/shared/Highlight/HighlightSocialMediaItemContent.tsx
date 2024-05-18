"use client";
import { useState } from "react";
import { useGetDictionary } from "@/hooks";
import HighlightGeneratedContent from "@/components/shared/Highlight/HighlightGeneratedContent";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TbWand } from "react-icons/tb";
import { iconVariants } from "@/constants/variants";
import type { IconType } from "react-icons";
import { HighlightItemContentProps } from "@/components/shared/Highlight/HighlightOptionItemContent";
import useGenerateHighlight from "@/services/highlight";

export default function HighlightSocialMediaItemContent({
  itemChecked,
  isAnyItemSelect,
  handleClickCheck,
  item,
  Icon,
  highlightType,
  isGenerate = false,
}: HighlightItemContentProps & { Icon: IconType }) {
  // when user click generate button this state will be true
  const [showTextarea, setShowTextArea] = useState(false);

  const {
    page: { chat },
  } = useGetDictionary();
  const { generateHighlight, message, conversationHistory } =
    useGenerateHighlight();

  const [currentIndex, setCurrentIndex] = useState<number>(
    conversationHistory.length - 1,
  );
  console.log(conversationHistory);
  // handle click on generate button
  function handleGenerate() {
    setShowTextArea(true);
    setCurrentIndex(i => i++);
    generateHighlight({
      content: "hi",
      presence_penalty: 0,
      top_p: 1,
      max_tokens: 100,
      model: "gpt-3.5-turbo-0125",
      temperature: 0.3,
      type: highlightType,
      frequency_penalty: 0,
      document_name: "",
    });
  }

  // if user click on generate button or generate button in header  , we will show generated content
  if (isGenerate || showTextarea)
    return (
      <HighlightGeneratedContent
        item={item}
        highlightType={highlightType}
        regenerate={handleGenerate}
        values={conversationHistory}
      />
    );

  // else we show normal content

  return (
    <div
      key={item}
      className={cn(
        "flex h-9 cursor-pointer items-center gap-2 overflow-hidden rounded-lg border bg-muted py-0 ps-2",
        itemChecked && " border-primary bg-primary-light text-primary-dark",
      )}
      onClick={() => handleClickCheck(item)}
    >
      <span className="me-auto flex items-center gap-2 text-sm">
        <Icon />
        {item}
      </span>
      {isAnyItemSelect ? (
        <Checkbox
          checked={itemChecked}
          onClick={() => handleClickCheck(item)}
          className="me-4 rounded-full"
        />
      ) : (
        <Button
          className="!h-full gap-1 rounded-none px-4 py-2 text-xs text-primary"
          variant="secondary"
          onClick={handleGenerate}
        >
          <TbWand className={iconVariants({ size: "sm" })} />
          {chat.generate_button_label}
        </Button>
      )}
    </div>
  );
}
