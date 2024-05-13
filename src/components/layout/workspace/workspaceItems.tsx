import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn, getFirstLetter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateWorkspaceDialog } from "@/components/layout/workspace/CreateWorkspaceDialog";
import useCheckSidePanelOpen from "@/components/layout/side-panel/hooks/useCheckSidePanelOpen";
import { TransformedWorkspace } from ".";
import { useChangeDefaultWorkSpace } from "@/components/pages/workspace/hooks/useChangeDefaultWorkSpace";

/**
 * workspace select rendered in side panel if is open else rendered in header
 * @param isHeader for change size and hide it if side panel open
 * @constructor
 */
export function WorkspaceItems({ isHeader = false, workspaces }: { isHeader?: boolean, workspaces:TransformedWorkspace[] }) {
  const [open, setOpen] = React.useState(false);
  const [workSpaceId, setWorkSpaceId] = React.useState<string>(workspaces[0].id);

  // hook to change workspace
  const { mutate: changeDefaultWorkspace, data: workspace } = useChangeDefaultWorkSpace();

  /**
   * on select item change value and close select popover
   * @param workSpaceID
   */
  const handleSelect = React.useCallback((workSpaceID: string) => {
    setWorkSpaceId(workSpaceId === workSpaceID ? "" : workSpaceID);
    setOpen(false);

    // send a request to change workspace in server
    changeDefaultWorkspace({ workspace_id: Number(workSpaceID) });

  }, [changeDefaultWorkspace, workSpaceId]);


  const isSidePanelOpen = useCheckSidePanelOpen();

  if (isHeader && isSidePanelOpen) return null;


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "row gap-1.5 px-2",
            isHeader ? "me-2 w-44" : "mt-1.5 w-full",
          )}
        >
          <div className="centered-col h-6 w-6 rounded-md bg-active text-primary">
            {!!workSpaceId
              ? getFirstLetter(workspaces.find(s => s.default)!.label)
              : "W"}
          </div>
          {workSpaceId
            ? workspaces.find(s => s.default)?.label
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
          <CommandList>
            {/*<CommandInput placeholder="Search workspaces..." />*/}
            <CommandEmpty>No Workspace found.</CommandEmpty>
            <CommandGroup className="p-0">
              {workspaces.map(space => (
                <CommandItem
                  key={space.id}
                  value={space.id}
                  onSelect={handleSelect}
                  className={cn(
                    "mb-1 w-full cursor-pointer px-4 !text-start hover:!bg-hover",
                    space.default && "!bg-active !text-primary",
                  )}
                >
                  {space.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CreateWorkspaceDialog />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
