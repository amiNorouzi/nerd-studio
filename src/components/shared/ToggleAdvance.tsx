"use client";
import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible } from "./Collapsible";

import { useGetDictionary } from "@/hooks";

import type { ChildrenProps } from "@/services/types";
import { cn } from "@/lib/utils";

/**
 * `ToggleAdvance` is a React component that provides a toggleable advanced settings section.
 * It uses the `useState` hook from React for managing the open/close state of the advanced settings section.
 * It uses the `useGetDictionary` hook to get the localized strings for the component.
 * It uses the `Switch` component for the toggle switch, the `Label` component for the label of the switch,
 * and the `Collapsible` component for the collapsible advanced settings section.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The children to be rendered inside the `Collapsible` component.
 *
 * @returns {JSX.Element} The rendered `ToggleAdvance` component.
 */
export function ToggleAdvance({
  children,
  className,
  contentClassName,
}: ChildrenProps<{ className?: string; contentClassName?: string }>) {
  // Use `useState` to manage the open/close state of the advanced settings section.
  const [open, setOpen] = useState(false);

  // Use `useGetDictionary` to get the localized strings for the component.
  const {
    components: { toggle_Advance: dictionary },
  } = useGetDictionary();

  // Render the `ToggleAdvance` component.
  return (
    <>
      <div
        className={cn("mb-5 flex items-start justify-start gap-2", className)}
      >
        {/* The `Switch` component for the toggle switch. */}
        <Switch
          id="collapse-trigger"
          checked={open}
          onCheckedChange={setOpen}
        />
        {/* The `Label` component for the label of the switch. */}
        <Label htmlFor="collapse-trigger" className="flex flex-col gap-1">
          <span>{dictionary.advance_settings_title}</span>
          <span className="text-muted-foreground">
            {dictionary.advance_settings_descriptions}
          </span>
        </Label>
      </div>

      {/* The `Collapsible` component for the collapsible advanced settings section. */}
      <Collapsible className={contentClassName} isOpen={open}>
        {children}
      </Collapsible>
    </>
  );
}
