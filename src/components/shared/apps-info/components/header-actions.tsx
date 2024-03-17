"use client";
import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";
import { FiAlertTriangle, FiTrash } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGetDictionary } from "@/hooks";

interface DeleteAlertTypes {
  open: boolean;
  onOpenChange: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onClick: () => void;
}
function DeleteAlert(props: DeleteAlertTypes) {
  const {
    components: { info_tab },
  } = useGetDictionary();
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent className="w-full max-w-[450px]">
        <div className="flex items-start  gap-4">
          <FiAlertTriangle size={30} color={"#ffa000"} />
          <div className="flex flex-1 flex-col gap-8">
            <AlertDialogHeader>
              <AlertDialogTitle>{info_tab.delete_alert_title}</AlertDialogTitle>
              <AlertDialogDescription>
                {info_tab.delete_alert_desc}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={props.onClick}>
                {info_tab.cancel}
              </AlertDialogCancel>
              <AlertDialogAction
                className="border bg-inherit text-destructive hover:border-destructive hover:bg-inherit"
                onClick={props.onClick}
              >
                {info_tab.delete}
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteButton(props: { onClick: () => void }) {
  const {
    components: { info_tab },
  } = useGetDictionary();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <BsThreeDots />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <Button variant="ghost" className="gap-2" onClick={props.onClick}>
            <FiTrash />
            {info_tab.delete}
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function HeaderActions() {
  const [open, setOpen] = useState(false);
  const {
    components: { info_tab },
  } = useGetDictionary();
  return (
    <>
      {/*actions(delete and add to workspace)  */}
      <div className="flex items-center gap-2">
        <Button className="bg-linearGradient">
          {info_tab.add_to_workSpace}
        </Button>

        <DeleteButton onClick={() => setOpen(true)} />

        <DeleteAlert
          open={open}
          onOpenChange={setOpen}
          onClick={() => setOpen(false)}
        />
      </div>
    </>
  );
}
