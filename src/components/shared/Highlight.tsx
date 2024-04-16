import React, { useMemo, useState } from "react";

import { useMediaQuery } from "usehooks-ts";
import {
  TbChevronLeft,
  TbChevronRight,
  TbX,
  TbHighlight,
  TbWand,
  TbBrandFacebook,
  TbBrandYoutube,
  TbBrandLinkedin,
  TbBrandTelegram,
  TbBrandWhatsapp,
  TbBrandInstagram,
  TbBrandTiktok,
  TbEdit,
  TbReload,
} from "react-icons/tb";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RenderIf from "@/components/shared/RenderIf";

import { useChatStore } from "@/stores/zustand/chat-store";
import { useCopyTextInClipBoard, useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";
import { iconVariants } from "@/constants/variants";

import type { IconType } from "react-icons";
import { MinimalButton } from "@/components/shared/index";
import useHighlightStore from "@/stores/zustand/highlight-store";

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
export function HighlightContentHeader({
  handleClickToggleCheckAll,
  checkAll,
}: HighlightContentHeaderProps) {
  const setOpenHighLight = useChatStore.use.setOpenHighlightBox();
  const {
    page: { chat },
  } = useGetDictionary();
  return (
    <div className="flex gap-2 p-3">
      <div className="me-auto flex items-center gap-2 text-primary">
        <TbHighlight className="h-6 w-6" />
        <span className="text-sm font-medium">{chat.highlight}</span>
      </div>
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
        className="p-0"
        onClick={() => setOpenHighLight(false)}
      >
        <TbX className={iconVariants({ size: "md" })} />
      </Button>
    </div>
  );
}

interface HighlightItemContentProps {
  item: string;
  itemChecked: boolean;
  handleClickCheck: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: string,
  ) => void;
  isAnyItemSelect: boolean;
  isGenerate?: boolean;
}

/**
 * this component is for generated content (textarea and action buttons)  of highlight
 * @param item
 * @constructor
 */
export function HighlightGeneratedContent({
  item,
}: Pick<HighlightItemContentProps, "item">) {
  const [promptIndexToShow, setPromptIndexToShow] = useState(0);
  const [editable, setEditable] = useState(false);
  const selectedHighlightItem = useChatStore.use.selectedMessageForHighlight();
  const [handleCopy, isCopy] = useCopyTextInClipBoard();
  return (
    <div className="grid gap-2">
      <div className="mt-2 flex justify-between">
        <span className="text-sm text-muted-foreground ">{item}</span>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Button
            className="fit p-0"
            variant="ghost"
            onClick={() => setPromptIndexToShow(v => v - 1)}
            disabled={promptIndexToShow === 0}
          >
            <TbChevronLeft className={iconVariants({ size: "md" })} />
          </Button>
          <span className="text-sm text-muted-foreground-light">{`${promptIndexToShow + 1}/${selectedHighlightItem?.prompt.length}`}</span>
          <Button
            className="fit p-0"
            variant="ghost"
            onClick={() => setPromptIndexToShow(v => v + 1)}
            disabled={
              promptIndexToShow === selectedHighlightItem!.prompt.length - 1
            }
          >
            <TbChevronRight className={iconVariants({ size: "md" })} />
          </Button>
        </div>
      </div>
      <div className="relative">
        <textarea
          value={selectedHighlightItem?.prompt[promptIndexToShow]}
          rows={5}
          className="mb-0 w-full rounded-lg border bg-muted px-[26px] pb-6 pt-2 outline-none ring-0 focus:border-primary "
          disabled={!editable}
        />
        <div className="absolute bottom-2 end-3 flex w-fit gap-1 rounded-lg bg-background px-1 py-0.5 text-muted-foreground">
          <MinimalButton Icon={TbReload} />
          <MinimalButton Icon={TbEdit} onClick={() => setEditable(v => !v)} />
          <MinimalButton
            Icon={isCopy ? LuCopyCheck : LuCopy}
            onClick={() =>
              handleCopy(selectedHighlightItem?.prompt[promptIndexToShow] ?? "")
            }
          />
        </div>
      </div>
    </div>
  );
}
export function HighlightOptionItemContent({
  itemChecked,
  isAnyItemSelect,
  handleClickCheck,
  item,
  isGenerate = false,
}: HighlightItemContentProps) {
  // when user click generate button this state will be true
  const [showTextarea, setShowTextArea] = useState(false);

  const {
    page: { chat },
  } = useGetDictionary();

  // handle click on generate button
  function handleGenerate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setShowTextArea(true);
  }

  // if user click on generate button or generate button in header  , we will show generated content
  if (isGenerate || showTextarea)
    return <HighlightGeneratedContent item={item} />;

  // else we show normal content
  return (
    <div
      key={item}
      className={cn(
        "flex min-h-[44px] cursor-pointer items-center gap-2 overflow-hidden rounded-lg border bg-muted ps-2",
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

export function HighlightSocialMediaItemContent({
  itemChecked,
  isAnyItemSelect,
  handleClickCheck,
  item,
  Icon,
  isGenerate = false,
}: HighlightItemContentProps & { Icon: IconType }) {
  // when user click generate button this state will be true
  const [showTextarea, setShowTextArea] = useState(false);

  const {
    page: { chat },
  } = useGetDictionary();

  // handle click on generate button
  function handleGenerate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setShowTextArea(true);
  }

  // if user click on generate button or generate button in header  , we will show generated content
  if (isGenerate || showTextarea)
    return <HighlightGeneratedContent item={item} />;

  // else we show normal content

  return (
    <div
      key={item}
      className={cn(
        "flex min-h-[44px] cursor-pointer items-center gap-2 overflow-hidden rounded-lg border bg-muted py-0 ps-2",
        itemChecked && " border-primary bg-primary-light text-primary-dark",
      )}
      onClick={e => handleClickCheck(e, item)}
    >
      <span className="me-auto flex items-center gap-2 text-sm">
        <Icon />
        {item}
      </span>
      {isAnyItemSelect ? (
        <Checkbox
          checked={itemChecked}
          onClick={e => handleClickCheck(e, item)}
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

export function HighlightContent() {
  // when user click generate in header this state will be true
  const [generate, setGenerate] = useState(false);
  // items that user  selected
  const [checkedItems, setCheck] = useState<Record<string, boolean>>({});

  // check if any item is selected
  const isAnyItemSelect = useMemo(() => {
    if (Object.keys(checkedItems).length === 0) return false;
    const itemSelected = Object.values(checkedItems).some(item => item);
    return itemSelected;
  }, [checkedItems]);

  // check if all items are selected
  const checkAll = useMemo(() => {
    const isAllListOfOptionSelected = listOfOptions.some(
      item => checkedItems[item],
    );
    const isAllListOfSocialMediaSelected = listOfSocialMedia.some(
      item => checkedItems[item.title],
    );

    return isAllListOfOptionSelected && isAllListOfSocialMediaSelected;
  }, [checkedItems]);

  // if user click on generate all we will show only selected items
  const listOfOptionsComponent = generate
    ? listOfOptions.filter(item => {
        if (checkedItems[item]) return item;
      })
    : listOfOptions;

  // if user click on generate all we will show only selected items
  const listOfSocialMediaComponent = generate
    ? listOfSocialMedia.filter(item => {
        if (checkedItems[item.title]) return item;
      })
    : listOfSocialMedia;

  /**
   * handle click on check box
   * @param e MouseEvent
   * @param item - item that user click on it
   */
  function handleClickCheck(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: string,
  ) {
    e.stopPropagation();
    setCheck(v => ({
      ...v,
      [item]: !v[item],
    }));
  }

  // handle click on generate all
  function handleClickToggleCheckAll() {
    const isCheckAll = !checkAll;
    if (!isAnyItemSelect) {
      listOfOptions.forEach(item => {
        setCheck(v => ({ ...v, [item]: isCheckAll }));
      });
      listOfSocialMedia.forEach(item => {
        setCheck(v => ({ ...v, [item.title]: isCheckAll }));
      });
    } else {
      setGenerate(true);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 divide-y">
      {/*header , title, generate all, close button*/}
      <HighlightContentHeader
        checkAll={checkAll || isAnyItemSelect}
        handleClickToggleCheckAll={handleClickToggleCheckAll}
      />
      <div className="grid gap-2 px-9 pt-6">
        <div className="grid gap-2">
          {listOfOptionsComponent.map(item => (
            <HighlightOptionItemContent
              key={item}
              item={item}
              itemChecked={checkedItems[item]}
              handleClickCheck={handleClickCheck}
              isAnyItemSelect={isAnyItemSelect}
              isGenerate={generate}
            />
          ))}
          <span className="mt-2 text-base text-muted-foreground">
            Social Media
          </span>
          {listOfSocialMediaComponent.map(({ Icon, title }) => (
            <HighlightSocialMediaItemContent
              key={title}
              item={title}
              handleClickCheck={handleClickCheck}
              isAnyItemSelect={isAnyItemSelect}
              itemChecked={checkedItems[title]}
              Icon={Icon}
              isGenerate={generate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export function Highlight({ children, className, ...props }: IProps) {
  const isOpenHighlightBox = useHighlightStore.use.isHighlightOpen();
  const setOpenHighLightBox = useHighlightStore.use.setHighlightIsOpen();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div
        className={cn(
          "flex h-full w-0 max-w-0 basis-0 flex-col items-center  justify-start   gap-4 divide-y bg-background opacity-0 transition-all duration-300",
          isOpenHighlightBox &&
            " w-full  max-w-[400px] basis-3/4  border-s  pt-0 opacity-100 xl:basis-1/2",
          className,
        )}
        {...props}
      >
        {/*content*/}
        <div className="w-full overflow-y-auto overflow-x-hidden pt-3">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Drawer open={isOpenHighlightBox} onOpenChange={setOpenHighLightBox}>
      <DrawerContent className="max-h-[90dvh] gap-2 p-2">
        {children}
      </DrawerContent>
    </Drawer>
  );
}

const listOfOptions = ["Meta description", "Summary"];
const listOfSocialMedia = [
  {
    Icon: TbBrandFacebook,
    title: "Facebook",
  },
  {
    Icon: TbBrandYoutube,
    title: "YouTube",
  },
  {
    Icon: TbBrandLinkedin,
    title: "Linkedin",
  },
  {
    Icon: TbBrandTelegram,
    title: "Telegram",
  },
  {
    Icon: TbBrandWhatsapp,
    title: "WhatsApp",
  },
  {
    Icon: TbBrandInstagram,
    title: "Instagram",
  },
  {
    Icon: TbBrandTiktok,
    title: "TikTok",
  },
];
