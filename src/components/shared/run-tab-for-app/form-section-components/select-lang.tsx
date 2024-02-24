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
import { statuses } from "./contants";
import type { IProps } from "./types";

export function SelectLang({
  onOpenChange,
}: Omit<IProps, "open" | "children">) {
  const [searchParams, setSearchParams] = useCustomSearchParams();

  return (
    <Command>
      <CommandInput placeholder="Search language..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map(status => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={value => {
                setSearchParams("response-lang", value);
                onOpenChange(false);
              }}
            >
              <IoCheckmarkSharp
                className={cn(
                  "mr-2 h-4 w-4 text-xsm",
                  status.value === searchParams.get("response-lang")
                    ? "opacity-100"
                    : "opacity-0",
                )}
              />
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
