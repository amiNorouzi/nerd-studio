"use client";
import { useEffect } from "react";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { useUi } from "@/stores/zustand/ui";

import { cn, getFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateWorkspaceDialog } from "@/components/layout/workspace/CreateWorkspaceDialog";

const spaces = [
  {
    value: "1",
    label: "My Workspace",
  },
  {
    value: "2",
    label: "Second Space",
  },
];

export function Workspace({ isHeader = false }: { isHeader?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const isSidePanelOpen = useUi(state => state.isSidePanelOpen);

  useEffect(() => {
    setValue(spaces[0].value);
  }, []);

  if (isHeader && isSidePanelOpen) return null;

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("row gap-1.5 px-2", isHeader ? "me-2 w-44" : "w-full")}
        >
          <div className="centered-col h-6 w-6 rounded-md bg-active text-primary">
            {!!value
              ? getFirstLetter(spaces.find(s => s.value === value)!.label)
              : "W"}
          </div>
          {value
            ? spaces.find(space => space.value === value)?.label
            : "Select Workspace..."}
          <ChevronsUpDown className="ms-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-1", isHeader ? "!w-44" : "!w-[220px]")}
        side="top"
        align="center"
      >
        <Command>
          {/*<CommandInput placeholder="Search Spaces..." />*/}
          <CommandEmpty>No Workspace found.</CommandEmpty>
          <CommandGroup className="p-0">
            {spaces.map(space => (
              <CommandItem
                key={space.value}
                value={space.value}
                onSelect={handleSelect}
                className={cn(
                  "mb-1 w-full cursor-pointer px-4 !text-start hover:!bg-hover",
                  value === space.value && "!bg-active !text-primary",
                )}
              >
                {space.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        <CreateWorkspaceDialog />
      </PopoverContent>
    </Popover>
  );
}
