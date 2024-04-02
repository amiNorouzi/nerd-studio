import {useState} from 'react';
import {SelectAndDrawer} from '@/components/shared';
import {useCustomSearchParams, useGetDictionary} from '@/hooks';
import {languages} from './contants';
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
    <div className="grid grid-cols-1 items-start gap-x-5 gap-y-9  sm:grid-cols-2">
      {/*select text language*/}
      <div className="flex flex-col gap-3">
        <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
          {translate.text_language_label}
        </span>

        <SelectAndDrawer
            value={value.txLang as any}
            setValue={v => setLanguage(v, 'txLang')}
          items={languages}
        />
      </div>
      {/*select translate language*/}
      <div className="flex flex-col gap-3">
        <span className="m-0 flex items-baseline gap-2 text-sm font-normal">
          {translate.translate_language_label}
        </span>

        <SelectAndDrawer
            value={value.trLang as any}
            setValue={v => setLanguage(v, 'trLang')}
          items={languages}
        />
      </div>
    </div>
  );
}
