import { useState } from "react";
import { SelectAndDrawer } from "@/components/shared";
import { useGetDictionary } from "@/hooks";
import { languages } from "./contants";
import { Label } from "@/components/ui/label";

/**
 * this component is for select translate languages
 * @constructor
 */
export function SelectTranslateLanguages() {
  const [value, setValue] = useState({
    fromLang: languages[0],
    toLang: languages[0],
  });
  const {
    page: { translate },
  } = useGetDictionary();
  function setLanguage(id: string, name: string) {
    const item = languages.find(
      item => item.id.toLowerCase() === id.toLowerCase(),
    );
    if (!item) return;
    setValue(prev => ({ ...prev, [name]: item }));
  }
  return (
    <div className="form-gap grid grid-cols-1 items-start sm:grid-cols-2">
      {/*select text language*/}
      <div className="gap-label-space flex flex-col">
        <Label>{translate.text_language_label}</Label>

        <SelectAndDrawer
          value={value.fromLang}
          setValue={v => setLanguage(v, "fromLang")}
          items={languages}
        />
      </div>
      {/*select translate language*/}
      <div className="gap-label-space flex flex-col">
        <Label>{translate.translate_language_label}</Label>

        <SelectAndDrawer
          value={value.toLang}
          setValue={v => setLanguage(v, "toLang")}
          items={languages}
        />
      </div>
    </div>
  );
}
