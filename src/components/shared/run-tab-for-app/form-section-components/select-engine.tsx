import { useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  BsCheck2 as Check,
  BsChevronDown as ChevronDown,
} from "react-icons/bs";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SliderWithTooltip } from "@/components/shared/SliderWithTooltip";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { engines } from "./contants";
import { cn } from "@/lib/utils";

import type { StateSetterType } from "@/services/types";
import { Setting } from "@/components/svg-icons";

interface IProps {
  value: string;
  setValue: (item: string) => void;
  items: string[];
  onOpenChange: StateSetterType<boolean>;
}
function CommandSelectItems({ items, setValue, value, onOpenChange }: IProps) {
  function handleSelectItem(item: string) {
    setValue(item);
    onOpenChange(false);
  }

  return (
    <Command>
      <CommandInput placeholder="Search ..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
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

type SliderProps = React.ComponentProps<typeof Slider> & {
  container?: HTMLDivElement | null;
  open?: boolean;
  onChangeHandler: (v: number[]) => void;
};

export function SliderSetting({
  onChangeHandler,
  className,
  ...props
}: SliderProps) {
  return (
    <SliderWithTooltip
      value={props.value}
      max={100}
      step={1}
      className={cn("w-full", className)}
      onValueChange={onChangeHandler}
      {...props}
    />
  );
}

interface SettingPopoverType {
  open?: boolean;
  onOpenChange?: StateSetterType<boolean>;
}
function SettingPopover(props: SettingPopoverType) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    temperature: 50,
    frequency: 50,
    presence: 50,
    top: 50,
  });
  function onChangeValueHandler(value: number[], name: string) {
    setValues(prev => ({ ...prev, [name]: value[0] }));
  }
  return (
    <Popover {...props} open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="absolute end-7 top-1/2 -translate-y-1/2"
      >
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Setting className="hover:bg-transparent" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="z-40 flex w-96 flex-col gap-6"
        ref={contentRef}
      >
        <span className="text-base text-muted-foreground">Temperature</span>
        <SliderSetting
          open={open}
          onChangeHandler={(v: number[]) =>
            onChangeValueHandler(v, "temperature")
          }
          value={[values.temperature]}
        />

        <span className="text-base text-muted-foreground">
          Frequency penalty
        </span>
        <SliderSetting
          open={open}
          onChangeHandler={(v: number[]) =>
            onChangeValueHandler(v, "frequency")
          }
          value={[values.frequency]}
        />

        <span className="text-base text-muted-foreground">
          Presence penalty
        </span>
        <SliderSetting
          open={open}
          onChangeHandler={(v: number[]) => onChangeValueHandler(v, "presence")}
          value={[values.presence]}
        />

        <span className="text-base text-muted-foreground">Top</span>
        <SliderSetting
          open={open}
          onChangeHandler={(v: number[]) => onChangeValueHandler(v, "top")}
          value={[values.top]}
        />
      </PopoverContent>
    </Popover>
  );
}

function SelectEngineDropDown() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [open, setOpen] = useState(false);
  const [openPopoverEnginSetting, setOpenPopoverEnginSetting] = useState(false);
  const value = searchParams.get("engine") ?? engines[0];

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const buttonContent = value
    ? engines.find(item => item.toLowerCase() === value.toLowerCase())
    : "Select an option";

  const handleSelect = (item: string) =>
    value.toLowerCase() === item.toLowerCase()
      ? setSearchParams("engine")
      : setSearchParams("engine", item);

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="relative">
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-between px-3 py-2")}
            >
              {buttonContent}
              <span data-open={open}>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </span>
            </Button>
          </DrawerTrigger>

          <SettingPopover />
        </div>
        <DrawerContent>
          <div className="mt-4 border-t">
            <CommandSelectItems
              items={engines}
              value={value}
              setValue={handleSelect}
              onOpenChange={setOpen}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Select value={value} onValueChange={handleSelect}>
      <div className="relative">
        <SelectTrigger className={cn("m-0 w-full !text-xsm text-black")}>
          <SelectValue placeholder="Select an option" className="!text-xsm" />
        </SelectTrigger>
        <SettingPopover />
      </div>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xsm font-semibold">Engines</SelectLabel>
          {engines.map(item => (
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

export function SelectEngine() {
  const {
    page: { ReWrite },
  } = useGetDictionary();
  return (
    <div className="flex flex-col justify-center gap-2 ">
      <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
        Engines
      </span>
      <SelectEngineDropDown />
    </div>
  );
}
