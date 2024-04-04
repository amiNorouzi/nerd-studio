import { useState } from "react";

import { SelectAndDrawer } from "@/components/shared";
import { Label } from "@/components/ui/label";

import {useCustomSearchParams, useGetDictionary} from '@/hooks';

import { languages } from "./contants";
import {getLangById} from '@/lib/utils';

/**
 * this component is for select translate languages
 * @constructor
 */
export function SelectTranslateLanguages() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const txLang = searchParams.get('txLang') ?? languages[0].id;
  const trLang = searchParams.get('trLang') ?? languages[1].id;
  const [value, setValue] = useState({
    txLang: getLangById(txLang),
    trLang: getLangById(trLang),
  });
  const {
    page: { translate },
  } = useGetDictionary();
  function setLanguage(id: string, name: string) {
    const item = getLangById(id);
    if (!item) return;
    setValue(prev => ({ ...prev, [name]: item }));
    setSearchParams(name, id);
  }

  return (
    <div className="form-gap grid grid-cols-1 items-start sm:grid-cols-2">
      {/*select text language*/}
      <div className="gap-label-space flex flex-col">
        <Label>{translate.text_language_label}</Label>

        <SelectAndDrawer
            value={value.txLang as any}
            setValue={v => setLanguage(v, 'txLang')}
          items={languages}
        />
      </div>
      {/*select translate language*/}
      <div className="gap-label-space flex flex-col">
        <Label>{translate.translate_language_label}</Label>

        <SelectAndDrawer
            value={value.trLang as any}
            setValue={v => setLanguage(v, 'trLang')}
          items={languages}
        />
      </div>
    </div>
  );
}
