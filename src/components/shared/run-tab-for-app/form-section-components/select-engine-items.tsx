import { IoCheckmarkSharp } from "react-icons/io5";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCustomSearchParams } from "@/hooks";
import { cn } from "@/lib/utils";
import { engines, statuses } from "./contants";
import type { IProps } from "./types";

export function SelectEngineItems({
  onOpenChange,
}: Omit<IProps, "open" | "children">) {
  const [searchParams, setSearchParams] = useCustomSearchParams();

  return (
    <Command>
      <CommandInput placeholder="Search Engine..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {engines.map(engine => (
            <CommandItem
              key={engine}
              value={engine}
              onSelect={value => {
                setSearchParams("engine", value);
                onOpenChange(false);
              }}
            >
              <IoCheckmarkSharp
                className={cn(
                  "mr-2 h-4 w-4 text-xsm",
                  engine.toLowerCase() ===
                    (searchParams.get("engine")?.toLowerCase() ??
                      engines[0].toLowerCase())
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              {engine}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
