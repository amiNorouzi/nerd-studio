import { EditorSection, FormSection } from "./components";

export function WritePage() {
  return (
    <div className="grid h-full max-h-full grid-cols-12 gap-2 overflow-y-auto p-2 lg:overflow-hidden lg:p-10">
      <FormSection />
      <EditorSection />
    </div>
  );
}
