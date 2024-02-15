"use client";
import { useState } from "react";

import { HiMiniPlus } from "react-icons/hi2";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateWorkspaceDialog() {
  const [workspaceName, setWorkspaceName] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="row w-full justify-start gap-1 px-3 text-primary hover:!bg-hover"
        >
          <HiMiniPlus />
          New Workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create a Workspace</DialogTitle>
        </DialogHeader>
        <Input
          value={workspaceName}
          onChange={e => setWorkspaceName(e.target.value)}
          placeholder="Workspace Name"
          className="my-2"
        />
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
