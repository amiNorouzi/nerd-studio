import { useEditorRef } from "@udecode/plate-common";
import { Icons, iconVariants } from "../icons";
import { Button } from "./button";

export function UndoRedoComponent() {
  const { redo, undo } = useEditorRef();

  const handleUndo = () => {
    undo();
  };
  const handleRedo = () => {
    redo();
  };

  return (
    <div className="flex flex-nowrap">
      <Button
        variant="ghost"
        className="h-5 justify-between px-1 text-xs"
        size="xs"
        onClick={handleUndo}
      >
        <Icons.undo className={iconVariants({ size: "md" })} />
      </Button>
      <Button
        variant="ghost"
        className="h-5 justify-between px-1 text-xs"
        size="xs"
        onClick={handleRedo}
      >
        <Icons.redo className={iconVariants({ size: "md" })} />
      </Button>
    </div>
  );
}
