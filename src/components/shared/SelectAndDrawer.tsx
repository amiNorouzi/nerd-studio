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

interface IProps {
  value: string;
  setValue: (item: string) => void;
  items: string[];
  showSearch?: boolean;
  isSelect?: boolean;
  label?: string;
  src?: string;
  buttonStyle?: string;
}
interface SelectPropsType extends IProps {
  onOpenChange: StateSetterType<boolean>;
}

function CommandSelectItems({
  items,
  setValue,
  value,
  onOpenChange,
  showSearch = true,
  src,
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
              key={item}
              value={item}
              onSelect={handleSelectItem}
              className={cn(
                "flex-row-reverse justify-between px-2 text-xsm",
                value.toLowerCase() === item.toLowerCase() &&
                  "bg-primary-light  aria-selected:bg-primary-light ",
              )}
            >
              <Check
                className={cn(
                  "me-2 h-4 w-4 text-xsm",
                  item.toLowerCase() === value.toLowerCase()
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              {item}
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
}: Omit<IProps, "showSearch" | "isSelect">) {
  return (
    <Select value={value} onValueChange={setValue}>
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
              key={item}
              value={item}
              className={cn(
                "flex-row-reverse justify-between px-2 text-xsm",
                value.toLowerCase() === item.toLowerCase() &&
                  "bg-primary-light focus:bg-primary-light",
              )}
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
function UserSelectAndDrawer(props: IProps) {
  const { buttonStyle, items, value, isSelect = true, setValue, label } = props;
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const buttonContent = value
    ? items.find(item => item.toLowerCase() === value.toLowerCase())
    : "Select an option";

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-between px-3 py-2", buttonStyle)}
          >
            {buttonContent}
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
            <CommandSelectItems {...props} onOpenChange={setOpen} />
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
          {buttonContent}
          {/*<span*/}
          {/*  data-open={open}*/}
          {/*  // className="transition data-[open=false]:rotate-180"*/}
          {/*>*/}
          <ChevronDown className="h-4 w-4 opacity-50" />
          {/*</span>*/}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <CommandSelectItems {...props} onOpenChange={setOpen} />
      </PopoverContent>
    </Popover>
  );
}
export const SelectAndDrawer = memo(UserSelectAndDrawer);
