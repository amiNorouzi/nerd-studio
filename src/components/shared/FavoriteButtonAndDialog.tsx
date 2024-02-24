import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { StateSetterType } from "@/services/types";

interface DialogProps {
  open: boolean;
  setOpen: StateSetterType<boolean>;
  favorite: boolean;
  children: React.ReactNode;
}
export function FavoriteButtonAndDialog({
  open,
  setOpen,
  favorite,
  children,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="gap-8 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {!favorite
              ? "Template Removed from Favorites"
              : "Template add to favorites"}
          </DialogTitle>
          <DialogDescription>
            {!favorite
              ? "Selected template has been successfully removed from favorites"
              : "Selected template has been successfully added to favorites"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:items-center sm:justify-center">
          <Button
            type="button"
            className="rounded-full sm:w-32"
            onClick={() => setOpen(false)}
          >
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
