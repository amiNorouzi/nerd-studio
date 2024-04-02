'use client';
import {HistoryBox, HistoryInfo, HistoryItems, Run, SetSearchParamProvider} from '@/components/shared';

import {HistoryInfoContent} from './history-info-content';
import type {ParamsType} from '@/services/types';
import {useEventChanel} from '@/services/events-chanel';
import {useGenerateTranslate, usePDFConvertor} from '@/services/translate';
import {useSearchParams} from 'next/navigation';
import {languages} from '@/components/shared/run-tab-for-app/form-section-components/contants';
import {getLangById} from '@/lib/utils';
import {useState} from 'react';

interface IProps {
    params: ParamsType;
}

export default function TranslatePage({params}: IProps) {
    const searchParams = useSearchParams();
    const translation = useEventChanel({
        eventName: 'message',
    });
    const {mutateAsync: covertPDF} = usePDFConvertor();
    const {mutate: generateTranslate} = useGenerateTranslate();
    const [text, setText] = useState('');
    const handleGenerate = () => {
        if (text) {
            generateTranslate({
                text,
                trLang: getLangById(searchParams.get('trLang') ?? '')?.value ?? languages[1].value,
                txLang: getLangById(searchParams.get('txLang') ?? '')?.value ?? languages[0].value,
                model: 'gpt-3.5-turbo-0125',
                temperature: 0.1,
                max_tokens: 100,
            });
        }
    };

    const covertToText = async (files: File[]) => {
        const text = await covertPDF(files[0]);
        setText(text);
    };

    return (
        <SetSearchParamProvider appName="app" appSearchParamValue="Translate">
            <Run>
                <Run.TranslateForm
                    params={params}
                    onUpload={covertToText}
                    onTextAreaChange={setText}
                    value={text}
                    onSubmit={handleGenerate}
                />
                <Run.Editor
                    value={translation}
                    onChange={() => {
                    }}
                >
                    <HistoryBox>
                        <HistoryItems appName="Translate"/>
                    </HistoryBox>
                    {/* this is a sheet that when user select an item in history then this sheet open and show history information */}
                    <HistoryInfo>
                        <HistoryInfoContent/>
                    </HistoryInfo>
                </Run.Editor>
            </Run>
        </SetSearchParamProvider>
    );
}
