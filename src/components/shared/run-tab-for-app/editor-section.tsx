import {
  Editor,
  EditorSectionFooter,
  EditorSectionHeader,
} from "./editor-section-components";
import "./editor-section.css";
export function EditorSection() {
  return (
    <div className=" col-span-12  h-fit overflow-hidden bg-card  px-4 py-3 lg:col-span-6 lg:h-full lg:px-8 xl:col-span-8">
      <div className="h-fit overflow-hidden  rounded border shadow-2xl lg:h-full">
        <EditorSectionHeader />
        <Editor />
        <EditorSectionFooter />
      </div>
    </div>
  );
}
