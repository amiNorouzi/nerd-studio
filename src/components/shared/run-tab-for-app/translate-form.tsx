'use client';
import {useSearchParams} from 'next/navigation';
import {
    OptionsSelectBoxes,
    SelectTranslateLanguages,
    SubmitButtonSelectEngine,
    TextBox,
    Upload,
} from './form-section-components';
import {RenderImageOrIcon} from '@/components/shared';

import {useGetDictionary} from '@/hooks';
import {apps} from '@/constants/side-panel';
import type {ParamsType} from '@/services/types';
import {useState} from 'react';
import {usePDFConvertor} from '@/services/translate';

interface IProps {
    params: ParamsType;
    value: string;
    onTextAreaChange: (value: string) => void;
    onSubmit: () => void;
}

/**
 * translate form section
 * @param params
 * @param onUpload
 * @constructor
 */
export default function TranslateFormSection({params, value, onTextAreaChange, onSubmit}: IProps) {
    const {
        page: {translate},
    } = useGetDictionary();
    const [files, setFiles] = useState<File[]>([]);
    const [url, setUrl] = useState<string>("");
    const searchParams = useSearchParams();
    const appName = searchParams.get("app");
    // find app info from apps constant that we had set in search url params in SetSearchParamProvider
    const app = apps.find(
      app => app.title.toLowerCase() === appName?.toLowerCase(),
    );
    const {mutateAsync: covertPDF} = usePDFConvertor();
    const covertToText = async (files: File[]) => {
        const text = await covertPDF(files[0]);
        onTextAreaChange?.(text);
    };
    const onSelectFiles = (files: File[]) => {
        setFiles(files);
        covertToText(files);
    };

    return (
      <>
          <div
            className="col-span-12 flex h-fit flex-col gap-9 overflow-y-auto bg-card p-4  lg:col-span-6 lg:h-full  lg:max-h-full xl:col-span-4">
              <div className="flex justify-between">
                  <div className="flex items-center justify-start gap-3">
                      {app?.icon && <RenderImageOrIcon icon={app.icon}/>}
                      <h3 className="text-base font-semibold">{app?.title}</h3>
                  </div>
              </div>
              {/*select language from/to for translate*/}
              <SelectTranslateLanguages/>
              {/*text area and pdf upload and url input*/}
              <TextBox
                mainTextAreaPlaceholder={translate.text_input_placeholder}
                value={value}
                onChange={onTextAreaChange}
              />
              {/*upload pdf and url input*/}
              <Upload
                setFiles={onSelectFiles}
                setUserUrl={setUrl}
                files={files}
                userUrl={url}
              />

              {/*option section like response lang or creativity,...*/}
              <OptionsSelectBoxes hiddenSelectResponseLang/>
              {/*submit button and select engine with setting*/}
              <SubmitButtonSelectEngine
                onClick={onSubmit}
                buttonContent={translate.submit_button_label}
              />
          </div>
      </>
    );
}
