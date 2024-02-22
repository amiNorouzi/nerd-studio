import {
  Editor,
  EditorSectionFooter,
  EditorSectionHeader,
} from "./editor-section-component";
import "../styles/editor-section.css";
export function EditorSection() {
  return (
    <div className=" col-span-12 h-fit overflow-hidden  bg-card  lg:col-span-6 lg:h-full xl:col-span-8">
      <EditorSectionHeader />
      <Editor />
      <EditorSectionFooter />
    </div>
  );
}
