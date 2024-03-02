"use client";
import { memo, useState } from "react";

import { useMediaQuery } from "usehooks-ts";
import { LuCheck, LuChevronDown } from "react-icons/lu";

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
import { UserAvatar } from "@/components/user";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { EngineItem, StateSetterType } from "@/services/types";

interface IProps {
  value: string;
  setValue: (item: string) => void;
  engines: EngineItem[];
  triggerClassName?: string;
  contentClassName?: string;
  contentWidth?: number;
}
interface SelectPropsType extends IProps {
  onOpenChange: StateSetterType<boolean>;
}

function CommandSelectEngines({
  setValue,
  value,
  onOpenChange,
  engines,
}: SelectPropsType) {
  function handleSelectItem(item: string) {
    setValue(item);
    onOpenChange(false);
  }
  const {
    components: {
      engine_select: { search_placeholder, no_result_message },
    },
  } = useGetDictionary();

  return (
    <Command>
      <CommandInput placeholder={search_placeholder} />
      <CommandList>
        <CommandEmpty>{no_result_message}</CommandEmpty>
        <CommandGroup>
          {engines.map(item => (
            <CommandItem
              key={item.id}
              value={item.id}
              onSelect={handleSelectItem}
              className={cn(
                "flex cursor-pointer gap-2 px-2 text-xs",
                value === item.id &&
                  "bg-primary-light  aria-selected:bg-primary-light ",
              )}
            >
              <UserAvatar
                imageSrc={item.image}
                name={item.name}
                className="h-5 w-5"
                fallbackClassname="text-[10px]"
              />
              {item.name}
              <LuCheck
                className={cn(
                  "ms-auto h-4 w-4 text-xsm",
                  item.id === value ? "opacity-100" : "opacity-0",
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function EngineSelectComponent(props: IProps) {
  const {
    components: {
      engine_select: { select_message },
    },
  } = useGetDictionary();
  const { engines, value, triggerClassName, contentClassName, contentWidth } =
    props;
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const buttonContent = value
    ? engines.find(item => item.id === value)
    : engines[0];

  const renderTrigger = () => (
    <Button
      variant="outline"
      className={cn(
        "w-full gap-2 bg-muted hover:border-primary-light aria-expanded:border-primary aria-expanded:bg-background",
        triggerClassName,
      )}
    >
      <UserAvatar
        imageSrc={buttonContent?.image || ""}
        name={buttonContent?.name || ""}
        className="h-5 w-5"
        fallbackClassname="text-xs"
      />
      {buttonContent?.name || select_message}
      <span
        data-open={open}
        className="ms-auto transition-all duration-200 data-[open=false]:rotate-180"
      >
        <LuChevronDown className="h-4 w-4 opacity-50" />
      </span>
    </Button>
  );

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{renderTrigger()}</DrawerTrigger>
        <DrawerContent className={contentClassName}>
          <CommandSelectEngines {...props} onOpenChange={setOpen} />
        </DrawerContent>
      </Drawer>
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{renderTrigger()}</PopoverTrigger>
      <PopoverContent
        className={cn("p-0", contentClassName)}
        style={{ width: contentWidth ? contentWidth : "100%" }}
      >
        <CommandSelectEngines {...props} onOpenChange={setOpen} />
      </PopoverContent>
    </Popover>
  );
}
export const EngineSelect = memo(EngineSelectComponent);
