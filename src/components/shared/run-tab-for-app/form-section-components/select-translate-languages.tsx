import { useState } from "react";
import { SelectAndDrawer } from "@/components/shared";
import { useGetDictionary } from "@/hooks";
import { languages } from "./contants";

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
  const setLanguage = (id: string, name: string) => {
    const item = languages.find(
      item => item.id.toLowerCase() === id.toLowerCase(),
    );
    console.log(item);
    setValue(prev => ({ ...prev, [name]: item }));
  };
  return (
    <div className="grid grid-cols-1 items-start gap-x-5 gap-y-9  sm:grid-cols-2">
      {/*select text language*/}
      <div className="flex flex-col gap-3">
        <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
          {translate.text_language_label}
        </span>

        <SelectAndDrawer
          value={value.fromLang}
          setValue={v => setLanguage(v, "fromLang")}
          items={languages}
        />
      </div>
      {/*select translate language*/}
      <div className="flex flex-col gap-3">
        <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
          {translate.translate_language_label}
        </span>

        <SelectAndDrawer
          value={value.toLang}
          setValue={v => setLanguage(v, "toLang")}
          items={languages}
        />
      </div>
    </div>
  );
}
