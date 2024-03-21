import { useRef } from "react";
import { getSelectionText, useEditorRef } from "@udecode/plate-common";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/plate-ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type BaseEditor, Transforms } from "slate";

export function AiModal() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editor = useEditorRef();
  function handleSubmit() {
    const text = inputRef.current?.value;
    if (!text) return;
    // const text = getSelectionText(editor); // selected text
    //TODO: fetch response from AI and replace with this text
    Transforms.insertText(editor as BaseEditor, text);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-fit w-fit p-2">AI</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Assistant</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Input
            type="text"
            ref={inputRef}
            placeholder="Tell Ai Assistant what to do with entire text..."
          />
        </div>
        <DialogFooter className="gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSubmit}>Apply</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
