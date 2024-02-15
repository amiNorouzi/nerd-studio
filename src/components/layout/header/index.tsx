import { OpenSidePanelButton } from "./OpenSidePanelButton";
import { Workspace } from "@/components/layout/workspace";

export function Header() {
  return (
    <header className="row h-12 w-full border-b px-2">
      <OpenSidePanelButton />
      <Workspace isHeader />
      <h1>Header</h1>
    </header>
  );
}
