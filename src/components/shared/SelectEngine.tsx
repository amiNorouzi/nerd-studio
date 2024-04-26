"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import {
  BsCheck2 as Check,
  BsChevronDown as ChevronDown,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { type ClassValue } from "clsx";

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

import { useFormStore } from "@/stores/zustand/apps-form-section-store";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { StateSetterType } from "@/services/types";
import { iconVariants } from "@/constants/variants";
import { Label } from "@/components/ui/label";
import { TbSettings } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EnginesType = keyof typeof enginesImage;
interface IProps {
  value: string;
  setValue: (item: string) => void;
  items: string[];
  onOpenChange: StateSetterType<boolean>;
}

/**
 * this component show a list of items in a command component that used in PopoverDrawer
 * @param items
 * @param setValue
 * @param value
 * @param onOpenChange
 * @constructor
 */
function CommandSelectItems({ items, setValue, value, onOpenChange }: IProps) {
  const { common } = useGetDictionary();
  function handleSelectItem(item: string) {
    setValue(item);
    onOpenChange(false);
  }

  return (
    <Command>
      <CommandInput placeholder={common.search_placeholder} />
      <CommandList>
        <CommandEmpty>{common.no_result_message}</CommandEmpty>
        <CommandGroup>
          {items.map(item => (
            <CommandItem
              key={item}
              value={item}
              onSelect={handleSelectItem}
              className={cn(
                "text-xsm flex-row-reverse justify-between px-2",
                value.toLowerCase() === item.toLowerCase() &&
                  "bg-primary-light  aria-selected:bg-primary-light ",
              )}
            >
              <Check
                className={cn(
                  "text-xsm me-2 h-4 w-4",
                  item.toLowerCase() === value.toLowerCase()
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />

              <div className="flex justify-start gap-2">
                <div className="relative h-5 w-5 overflow-hidden rounded-full">
                  <Image
                    src={enginesImage[item as EnginesType]}
                    alt={item}
                    fill
                  />
                </div>
                {item}
              </div>
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

/**
 * this component show range input
 * it used in SettingPopover component
 * @param onChangeHandler
 * @param className
 * @param props
 * @constructor
 */
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

interface SettingPopoverProps {
  engine: string;
}
/**
 * this component show engines setting
 * @constructor
 */
function SettingPopover({ engine }: SettingPopoverProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const {
    components: { select_engine },
  } = useGetDictionary();
  const engineSetting = useFormStore.use.engines();
  const handleEngineSetting = useFormStore.use.handleEngineSetting();
  const engineSettingValue = engineSetting[engine];
  const [openModal, setOpenModal] = useState(false);
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger
        asChild
        className="absolute end-7 top-1/2 -translate-y-1/2"
      >
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <TbSettings
            className={cn(iconVariants({ size: "sm" }), "hover:bg-transparent")}
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="h-[390px] w-[483px] ">
        <div className="absolute top-0 flex h-full w-full flex-col  ">
          <div className="mx-[16px] mb-[8px] mt-[12px] flex justify-between ">
            <div className="flex items-center justify-between gap-2">
              <TbSettings className="text-[24px]" />
              <h4 className="text-[23px] text-base font-medium">
                {select_engine.engine_setting}
              </h4>
            </div>
          </div>
          <div className=" mx-[16px] my-[8px] flex flex-col">
            <div className="mx-[24px] flex flex-col gap-[8px]">
              <div className="flex items-center gap-2">
                <div className="relative h-[18px] w-[18px] overflow-hidden rounded-full">
                  <Image
                    src={enginesImage[engine as EnginesType]}
                    alt={engine}
                    fill
                  />
                  {engine}
                </div>
                <span className="text-[14px] font-[500]">{engine}</span>
              </div>
              <div className="form-gap   flex flex-col">
                <span className="text-base text-muted-foreground">
                  {select_engine.temperature}
                </span>
                <SliderSetting
                  open={open}
                  onChangeHandler={(v: number[]) =>
                    handleEngineSetting(engine, "temperature", v[0])
                  }
                  value={[engineSettingValue.temperature]}
                />

                <span className="text-base text-muted-foreground">
                  {select_engine.frequency_penalty}
                </span>
                <SliderSetting
                  open={open}
                  onChangeHandler={(v: number[]) =>
                    handleEngineSetting(engine, "frequency", v[0])
                  }
                  value={[engineSettingValue.frequency]}
                />

                <span className="text-base text-muted-foreground">
                  {select_engine.presence_penalty}
                </span>
                <SliderSetting
                  open={open}
                  onChangeHandler={(v: number[]) =>
                    handleEngineSetting(engine, "presence", v[0])
                  }
                  value={[engineSettingValue.presence]}
                />

                <span className="text-base text-muted-foreground">
                  {select_engine.top}
                </span>
                <SliderSetting
                  open={open}
                  onChangeHandler={(v: number[]) =>
                    handleEngineSetting(engine, "top", v[0])
                  }
                  value={[engineSettingValue.top]}
                />
              </div>
              <div className=" ml-auto flex flex-row gap-3 ">
                <Button
                  type="submit"
                  className="text-[ #9373EE; ]
             h-[36px] w-[80px] bg-secondary text-primary-dark hover:bg-blue-200"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel{" "}
                </Button>
                <Button
                  type="submit"
                  onClick={() => setOpenModal(false)}
                  className="h-[36px] w-[80px]"
                >
                  Save{" "}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * this component create a select or drawer(in desktop show select and mobile show drawer)
 * to show available engines with settings(Temperature,...)
 * @constructor
 */
function SelectEngineDropDown({ buttonStyle }: { buttonStyle?: ClassValue }) {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const [open, setOpen] = useState(false);
  const engine = searchParams.get("engine") ?? engines[0];
  const {
    components: { select_engine },
  } = useGetDictionary();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const buttonContent = engine
    ? engines.find(item => item.toLowerCase() === engine.toLowerCase())
    : select_engine.select_an_option;

  function handleSelect(item: string) {
    const engineItem = engines.find(
      e => e.toLowerCase() === item.toLowerCase(),
    );
    setSearchParams("engine", engineItem);
  }

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="relative">
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-between px-3 py-2", buttonStyle)}
            >
              <div className="flex justify-start gap-2">
                <div className="relative h-5 w-5  overflow-hidden rounded-full">
                  <Image
                    src={enginesImage[engine as EnginesType]}
                    alt={engine}
                    fill
                  />
                </div>
                {buttonContent}
              </div>

              <span data-open={open}>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </span>
            </Button>
          </DrawerTrigger>

          <SettingPopover engine={engine} />
        </div>
        <DrawerContent>
          <div className="mt-4 border-t">
            <CommandSelectItems
              items={engines}
              value={engine}
              setValue={handleSelect}
              onOpenChange={setOpen}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Select value={engine} onValueChange={handleSelect}>
      <div className="relative">
        <SelectTrigger
          className={cn("!text-xsm m-0 w-full text-foreground", buttonStyle)}
        >
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SettingPopover engine={engine} />
      </div>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xsm font-semibold">
            {select_engine.engines}
          </SelectLabel>
          {engines.map(item => (
            <SelectItem
              key={item}
              value={item}
              className={cn(
                "text-xsm flex-row-reverse justify-between px-2",
                engine.toLowerCase() === item.toLowerCase() &&
                  "bg-primary-light focus:bg-primary-light",
              )}
            >
              <div className="flex justify-start gap-2">
                <div className="relative h-5 w-5  overflow-hidden rounded-full">
                  <Image
                    src={enginesImage[item as EnginesType]}
                    alt={item}
                    fill
                  />
                </div>
                {item}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

interface SelectEngineProps extends React.ComponentPropsWithoutRef<"div"> {
  buttonStyle?: ClassValue;
  title?: string;
  titleStyle?: string;
}
export function SelectEngine({
  className,
  buttonStyle,
  title,
  titleStyle,
  ...divProps
}: SelectEngineProps) {
  const {
    components: { select_engine },
  } = useGetDictionary();
  return (
    <div
      className={cn("flex flex-col justify-center gap-2", className)}
      {...divProps}
    >
      <Label className={cn(titleStyle)}>
        {title ?? select_engine.engine_label}
      </Label>

      <SelectEngineDropDown buttonStyle={buttonStyle} />
    </div>
  );
}

// TODO: replace this with the actual data from the API
const enginesImage = {
  "GPT-3.5 Turbo": "/images/gpt.jpeg",
  "GPT-4 Turbo": "/images/gpt.jpeg",
  "Claude-instant": "/images/cloude.png",
  "Claude-2": "/images/cloude.png",
  "Gemini Pro": "/images/gemni.jpeg",
};
const engines = [
  "GPT-3.5 Turbo",
  "GPT-4 Turbo",
  "Claude-instant",
  "Claude-2",
  "Gemini Pro",
];
