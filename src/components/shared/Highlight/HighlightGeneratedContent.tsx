import React, { useEffect, useState } from "react";
import useHighlightStore from "@/stores/zustand/highlight-store";
import { useCopyTextInClipBoard } from "@/hooks";
import { Button } from "@/components/ui/button";
import {
  TbChevronLeft,
  TbChevronRight,
  TbEdit,
  TbReload,
} from "react-icons/tb";
import { iconVariants } from "@/constants/variants";
import { MinimalButton } from "@/components/shared";
import { LuCopy, LuCopyCheck } from "react-icons/lu";
import { HighlightItemContentProps } from "@/components/shared/Highlight/HighlightOptionItemContent";

type HighlightGeneratedContentProps = {
  highlightType: HighlightType;
  regenerate: () => void;
  values: string[];
} & Pick<HighlightItemContentProps, "item">;
/**
 * this component is for generated content (textarea and action buttons)  of highlight
 * @param item
 * @param highlightType
 * @param regenerate
 * @param setCurrentIndex
 * @param value
 * @param isLastSlide
 * @param slideCount
 * @constructor
 */
export default function HighlightGeneratedContent({
  item,
  highlightType,
  regenerate,
  values,
}: HighlightGeneratedContentProps) {
  const [highlightIndexToShow, setHighlightIndexToShow] = useState(1);
  const [editable, setEditable] = useState(false);
  const highlightMessages = useHighlightStore.use.messages();
  const [handleCopy, isCopy] = useCopyTextInClipBoard();
  const slideCount = values.length === 0 ? 1 : values.length;
  const isLastSlide = highlightIndexToShow === slideCount;
  const [textValue, setTextValue] = useState('');
  useEffect(() => {
    setTextValue(values[highlightIndexToShow - 1]);
  }, [highlightIndexToShow, values]);

  return (
    <div className="grid gap-2">
      <div className="mt-2 flex justify-between">
        <span className="text-sm text-muted-foreground ">{item}</span>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Button
            className="fit p-0"
            variant="ghost"
            onClick={() => setHighlightIndexToShow(v => v - 1)}
            disabled={highlightIndexToShow === 1}
          >
            <TbChevronLeft className={iconVariants({ size: "md" })} />
          </Button>
          <span className="text-sm text-muted-foreground-light">{`${highlightIndexToShow}/${slideCount}`}</span>
          <Button
            className="fit p-0"
            variant="ghost"
            onClick={() => !isLastSlide && setHighlightIndexToShow(v => v + 1)}
            disabled={isLastSlide}
          >
            <TbChevronRight className={iconVariants({ size: "md" })} />
          </Button>
        </div>
      </div>
      <div className="relative">
        <textarea
          value={textValue}
          rows={5}
          className="mb-0 w-full rounded-lg border bg-muted px-[26px] pb-6 pt-2 outline-none ring-0 focus:border-primary "
          disabled={!editable}
          onChange={event => {
            setTextValue(event.currentTarget.value);
          }}
        />
        <div className="absolute bottom-2 end-3 flex w-fit gap-1 rounded-lg bg-background px-1 py-0.5 text-muted-foreground">
          <MinimalButton Icon={TbReload} onClick={regenerate} />
          <MinimalButton Icon={TbEdit} onClick={() => setEditable(v => !v)} />
          <MinimalButton
            Icon={isCopy ? LuCopyCheck : LuCopy}
            onClick={() => handleCopy(textValue)}
          />
        </div>
      </div>
    </div>
  );
}
