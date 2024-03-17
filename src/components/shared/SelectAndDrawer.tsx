"use client";
import { memo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  BsCheck2 as Check,
  BsChevronDown as ChevronDown,
} from "react-icons/bs";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import RenderIf from "@/components/shared/RenderIf";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import type { StateSetterType } from "@/services/types";
import Image from "next/image";

type objectItem = Partial<Record<string, string>> & {
  id: string;
  image?: string;
  value: string;
};
type Items = objectItem | string;
interface IProps {
  value: Items;
  setValue: (item: string) => void;
  items: Items[];

  showSearch?: boolean;
  isSelect?: boolean;
  label?: string;
  buttonStyle?: string;
}
interface SelectPropsType extends IProps {
  onOpenChange: StateSetterType<boolean>;
  items: objectItem[];
  value: objectItem;
}

function CommandSelectItems({
  items,
  setValue,
  value,
  onOpenChange,
  showSearch = true,
}: SelectPropsType) {
  function handleSelectItem(item: string) {
    setValue(item);
    onOpenChange(false);
  }

  return (
    <Command>
      <RenderIf isTrue={showSearch}>
        <CommandInput placeholder="Search ..." />
      </RenderIf>
      <CommandList>
        <RenderIf isTrue={showSearch}>
          <CommandEmpty>No results found.</CommandEmpty>
        </RenderIf>
        <CommandGroup>
          {items.map(item => (
            <CommandItem
              key={item.id}
              value={item.id}
              onSelect={handleSelectItem}
              className={cn(
                "flex-row-reverse justify-between px-2 text-xsm",
                value.value.toLowerCase() === item.value.toLowerCase() &&
                  "bg-primary-light  aria-selected:bg-primary-light ",
              )}
            >
              <Check
                className={cn(
                  "me-2 h-4 w-4 text-xsm",
                  item.value.toLowerCase() === value.value.toLowerCase()
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              <div className="flex justify-start gap-2">
                {item.image && (
                  <div className="relative  h-5  w-5 overflow-hidden rounded-full">
                    <Image src={item.image} alt={item.id} fill />
                  </div>
                )}
                {item.value}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function SelectComponent({
  items,
  setValue,
  value,
  label,
  buttonStyle,
}: Omit<IProps, "showSearch" | "isSelect" | "items"> & {
  items: objectItem[];
  value: objectItem;
}) {
  console.log(value);
  return (
    <Select value={value.id} onValueChange={setValue}>
      <SelectTrigger
        className={cn("m-0 w-full !text-xsm text-black", buttonStyle)}
      >
        <SelectValue placeholder="Select an option" className="!text-xsm" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xsm font-semibold">{label}</SelectLabel>
          {items.map(item => (
            <SelectItem
              key={item.id}
              value={item.id}
              className={cn(
                "flex-row-reverse justify-between px-2 text-xsm",
                value.value.toLowerCase() === item.value.toLowerCase() &&
                  "bg-primary-light focus:bg-primary-light",
              )}
            >
              <div className="flex justify-start gap-2">
                {item.image && (
                  <div className="relative  h-5  w-5 overflow-hidden rounded-full">
                    <Image src={item.image} alt={item.id} fill />
                  </div>
                )}
                {item.value}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function UserSelectAndDrawer(props: IProps) {
  const {
    buttonStyle,
    items: itemList,
    value: userValue,
    isSelect = true,
    setValue,
    label,
  } = props;
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // this function check if items list is list of string
  function isListOfString(arr: Items[]) {
    return (
      Array.isArray(arr) && arr.every(element => typeof element === "string")
    );
  }

  //////////* in this section we convert value and list of items to objectItem type///////////
  const value: objectItem =
    typeof userValue === "string"
      ? { id: userValue, value: userValue }
      : userValue;

  // if items list is strings list then convert it to objectItem[]
  const items: objectItem[] = isListOfString(itemList)
    ? (itemList.map(item => ({
        id: item,
        value: item,
        image: "",
      })) as unknown as objectItem[])
    : (itemList as unknown as objectItem[]);
  ////////////////////////////////*//////////////////////////////////////////////////

  const buttonContent = value
    ? items.find(item => item.value.toLowerCase() === value.value.toLowerCase())
        ?.value
    : "Select an option";

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-between px-3 py-2", buttonStyle)}
          >
            <div className="flex justify-start gap-2">
              {/*if image is valid then show it*/}
              {value.image && (
                <div className="relative h-5 w-5  overflow-hidden rounded-full">
                  <Image src={value.image} alt={value.value} fill />
                </div>
              )}
              {buttonContent}
            </div>
            <span
              data-open={open}
              // className="transition data-[open=false]:rotate-180"
            >
              <ChevronDown className="h-4 w-4 opacity-50" />
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <CommandSelectItems
              {...props}
              items={items}
              value={value}
              onOpenChange={setOpen}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );

  if (isSelect) {
    return (
      <SelectComponent
        setValue={setValue}
        value={value}
        items={items}
        label={label}
        buttonStyle={buttonStyle}
      />
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between bg-muted px-3 py-2 hover:border-primary-light hover:text-foreground aria-expanded:border-primary",
            buttonStyle,
          )}
        >
          <div className="flex justify-start gap-2">
            {/*if image is valid then show it*/}

            {value.image && (
              <div className="relative h-5 w-5  overflow-hidden rounded-full">
                <Image src={value.image} alt={value.value} fill />
              </div>
            )}
            {buttonContent}
          </div>
          {/*<span*/}
          {/*  data-open={open}*/}
          {/*  // className="transition data-[open=false]:rotate-180"*/}
          {/*>*/}
          <ChevronDown className="h-4 w-4 opacity-50" />
          {/*</span>*/}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <CommandSelectItems
          {...props}
          items={items}
          value={value}
          onOpenChange={setOpen}
        />
      </PopoverContent>
    </Popover>
  );
}

export const SelectAndDrawer = memo(UserSelectAndDrawer);
