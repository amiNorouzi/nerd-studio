import { memo, Suspense, useMemo } from "react";

import { EditorSection, FormSection } from "./components";
import type { SearchParamsType } from "@/services/types";

const Form = memo(FormSection);
const Editor = memo(EditorSection);

interface IProps {
  searchParamsAppSTab: SearchParamsType;
}
export function WritePage({ searchParamsAppSTab }: IProps) {
  const runContent = (
    <>
      <Suspense>
        <Form />
      </Suspense>
      <Editor />
    </>
  );
  const contentWrite = useMemo(() => {
    const runContent = (
      <>
        <Suspense>
          <Form />
        </Suspense>
        <Editor />
      </>
    );
    const tabValue = searchParamsAppSTab["apps-tab"];

    if (tabValue === "info") return <div>info tab</div>;
    return runContent;
  }, [searchParamsAppSTab]);

  return (
    <div className="grid h-full max-h-full grid-cols-12 divide-x overflow-y-auto lg:overflow-hidden ">
      {contentWrite}
    </div>
  );
}
