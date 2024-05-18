import { useMemo, useState } from "react";
import {
  listOfOptions,
  listOfSocialMedia,
} from "@/components/shared/Highlight/items";
import HighlightContentHeader from "@/components/shared/Highlight/HighlightContentHeader";
import HighlightOptionItemContent from "@/components/shared/Highlight/HighlightOptionItemContent";
import HighlightSocialMediaItemContent from "@/components/shared/Highlight/HighlightSocialMediaItemContent";

interface CheckedItems {
  [key: string]: boolean;
}
export default function HighlightContent() {
  const [generate, setGenerate] = useState(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  const isAnyItemSelected = useMemo(
    () => Object.values(checkedItems).some(item => item),
    [checkedItems],
  );

  const checkAll = useMemo(
    () =>
      listOfOptions.every(item => checkedItems[item]) &&
      listOfSocialMedia.every(item => checkedItems[item.title]),
    [checkedItems],
  );

  const filteredOptions = generate
    ? listOfOptions.filter(item => checkedItems[item])
    : listOfOptions;

  const filteredSocialMedia = generate
    ? listOfSocialMedia.filter(item => checkedItems[item.title])
    : listOfSocialMedia;

  const handleCheck = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleToggleCheckAll = () => {
    const newCheckedState = !checkAll;
    const newCheckedItems: CheckedItems = {};

    listOfOptions.forEach(item => {
      newCheckedItems[item] = newCheckedState;
    });
    listOfSocialMedia.forEach(item => {
      newCheckedItems[item.title] = newCheckedState;
    });

    setCheckedItems(newCheckedItems);
    setGenerate(isAnyItemSelected);
  };

  return (
    <div className="grid grid-cols-1 gap-2 divide-y">
      <HighlightContentHeader
        checkAll={checkAll || isAnyItemSelected}
        handleClickToggleCheckAll={handleToggleCheckAll}
      />
      <div className="grid gap-2 p-4.5 pt-6">
        <div className="grid gap-2">
          {filteredOptions.map(item => (
            <HighlightOptionItemContent
              key={item}
              item={item}
              itemChecked={checkedItems[item]}
              handleClickCheck={handleCheck}
              isAnyItemSelect={isAnyItemSelected}
              isGenerate={generate}
              highlightType="summary"
            />
          ))}
          <span className="mt-2 text-base text-muted-foreground">
            Social Media
          </span>
          {filteredSocialMedia.map(({ Icon, title }) => (
            <HighlightSocialMediaItemContent
              key={title}
              item={title}
              handleClickCheck={handleCheck}
              isAnyItemSelect={false}
              itemChecked={checkedItems[title]}
              Icon={Icon}
              highlightType={"summary"}
              isGenerate={generate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
