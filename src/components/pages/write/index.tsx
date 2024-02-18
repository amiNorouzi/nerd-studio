import { EditorSection, FormSection } from "./components";
import { memo, Suspense } from "react";

const Form = memo(FormSection);
const Editor = memo(EditorSection);
export function WritePage() {
  return (
    <div className="grid h-full max-h-full grid-cols-12 gap-2 overflow-y-auto p-2 lg:overflow-hidden lg:p-10">
      <Suspense>
        <Form />
      </Suspense>
      <Editor />
    </div>
  );
}
