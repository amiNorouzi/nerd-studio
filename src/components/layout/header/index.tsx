import { OpenSidePanelButton } from "./OpenSidePanelButton";

export function Header() {
  return (
    <header className="row h-12 w-full border-b px-2">
      <OpenSidePanelButton />
      <h1>Header</h1>
    </header>
  );
}
