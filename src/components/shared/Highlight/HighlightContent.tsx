import React, { useMemo, useState } from "react";
import {
  listOfOptions,
  listOfSocialMedia,
} from "@/components/shared/Highlight/items";
import HighlightContentHeader from "@/components/shared/Highlight/HighlightContentHeader";
import HighlightOptionItemContent from "@/components/shared/Highlight/HighlightOptionItemContent";
import HighlightSocialMediaItemContent from "@/components/shared/Highlight/HighlightSocialMediaItemContent";

export default function HighlightContent() {
  // when user click generate in header this state will be true
  const [generate, setGenerate] = useState(false);
  // items that user  selected
  const [checkedItems, setCheck] = useState<Record<string, boolean>>({});

  // check if any item is selected
  const isAnyItemSelect = useMemo(() => {
    if (Object.keys(checkedItems).length === 0) return false;
    return Object.values(checkedItems).some(item => item);
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
      <div className="grid gap-2 p-4.5 pt-6">
        <div className="grid gap-2">
          {listOfOptionsComponent.map(item => (
            <HighlightOptionItemContent
              key={item}
              item={item}
              itemChecked={checkedItems[item]}
              handleClickCheck={handleClickCheck}
              isAnyItemSelect={isAnyItemSelect}
              isGenerate={generate}
              highlightType={
                item === "Meta description"
                  ? "meta"
                  : (item.toLowerCase() as HighlightType)
              }
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
              highlightType={title.toLowerCase() as HighlightType}
              isGenerate={generate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}