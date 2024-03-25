import { TbDeviceImac, TbPrompt } from "react-icons/tb";

import { getDictionary } from "@/lib/dictionary";

import type { Locale } from "../../../../i18n.config";
import { Button } from "@/components/ui/button";
import { SelectEngine } from "@/components/shared";
import {
  AddCustomInput,
  PreviewForm,
  PromptDetailsForm,
  ResetAndCreateButtons,
} from "@/components/pages/custom-template/components";

async function CustomTemplatePage({ lang }: { lang: Locale }) {
  const {
    page: { custom_template: dictionary },
  } = await getDictionary(lang);
  return (
    <div className="max-h-apps-page grid h-fit grid-cols-12 overflow-y-auto bg-background lg:h-full lg:overflow-hidden">
      <section className="col lg:max-h-apps-page col-span-12 h-fit lg:col-span-8 lg:h-full lg:overflow-y-auto">
        <div className="col items-center gap-2 border-b px-4 py-3 text-center lg:px-9">
          <h1 className="text-2xl font-bold">{dictionary.page_title}</h1>
          <p className="max-w-3xl font-normal text-muted-foreground">
            {dictionary.page_description}
          </p>
        </div>
        <PromptDetailsForm />
        <AddCustomInput />
        <ResetAndCreateButtons />
      </section>
      <section className="col relative col-span-12 flex h-fit flex-col overflow-y-auto border bg-background shadow-xl lg:col-span-4 lg:h-full lg:max-h-full">
        <div className="row gap-2 border-b px-9 py-2">
          <TbDeviceImac size={20} />
          {dictionary.preview_title}
        </div>
        <div className="row gap-2 border-b px-9 py-4">
          <TbPrompt size={20} />
          {dictionary.prompt_title}
        </div>
        <PreviewForm />
        <div className=" sticky bottom-0 mt-auto grid grid-cols-1 items-end gap-4 bg-background px-4 pb-4 sm:grid-cols-2 lg:px-7">
          <SelectEngine />
          <Button>{dictionary.generate_button_label}</Button>
        </div>
      </section>
    </div>
  );
}

export default CustomTemplatePage;
