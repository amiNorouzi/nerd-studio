import { useState } from "react";

import { SelectAndDrawer } from "@/components/shared";
import { Label } from "@/components/ui/label";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";

import { languages } from "./contants";
import { getLangById } from "@/lib/utils";

/**
 * this component is for select translate languages
 * @constructor
 */
export function SelectGrammarLanguage() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const trLang = searchParams.get("trLang") ?? languages[1].id;
  const [value, setValue] = useState({
    trLang: getLangById(trLang),
  });
  const {
    page: { grammar },
  } = useGetDictionary();
  function setLanguage(id: string, name: string) {
    const item = getLangById(id);
    if (!item) return;
    setValue(prev => ({ ...prev, [name]: item }));
    setSearchParams(name, id);
  }

  return (
    <div className="form-gap grid w-full grid-cols-1 items-start">
      {/*select translate language*/}
      <div className="flex flex-col gap-label-space">
        <Label>{grammar.grammar_language_label}</Label>

        <SelectAndDrawer
          value={value.trLang as any}
          setValue={v => setLanguage(v, "trLang")}
          items={languages}
        />
      </div>
    </div>
  );
}
