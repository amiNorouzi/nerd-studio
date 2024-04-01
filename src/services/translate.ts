import {useMutation} from '@tanstack/react-query';
import axiosClient from '@/services/axios-client';

type GenerateTranslateParams = {
    text: string
    txLang: string
    trLang: string
} & Omit<OpenAiCompletionSchemaInput, 'stream' | 'messages'>

export function useGenerateTranslate() {
    return useMutation({
        mutationFn: async ({text, trLang, txLang, model, temperature, max_tokens}: GenerateTranslateParams) => {
            const {data} = await axiosClient.post<unknown, any, OpenAiCompletionSchemaInput>(
                '/translates/generate_translate/',
                {
                    model,
                    messages: [
                        {
                            role: 'user',
                            content: `Translate the following ${txLang} text to ${trLang}: "${text}"`,
                        },
                    ],
                    temperature,
                    max_tokens,
                    stream: true,
                },
            );

            return data;
        },
    });
}

const translateService = {
    useGenerateTranslate,
};

export default translateService;
