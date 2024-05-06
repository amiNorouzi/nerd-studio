import { useHistoryUpdate } from "@/services/history";
import { useEffect, useState } from "react";
import { useHistoryStore } from "@/stores/zustand/history-store";
import { UseMutateFunction } from "@tanstack/react-query";
import { GrammarGenerateParams } from "@/services/grammar";
import { GenerateTranslateParams } from "@/services/translate";

interface Props {
  generateFn: UseMutateFunction<
    any,
    Error,
    GrammarGenerateParams | GenerateTranslateParams,
    unknown
  >;
  message: string;
}

export const useHandleGeneratedData = ({ generateFn, message }: Props) => {
  const { mutate: updateHistory } = useHistoryUpdate();
  const [text, setText] = useState("");
  const [textInput, setTextInput] = useState("");
  const [updateText, setUpdateText] = useState("");
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();

  useEffect(() => {
    setTextInput(message);
  }, [message]);
  useEffect(() => {
    selectedHistoryItem && setTextInput(selectedHistoryItem.answer_text);
  }, [selectedHistoryItem]);

  useEffect(() => {
    if (!selectedHistoryItem) return;

    let timeoutId: any;

    const timeoutFunction = () => {
      updateHistory({
        answer_text: updateText,
        answerUuid: selectedHistoryItem?.uuid,
      });
    };

    timeoutId = setTimeout(timeoutFunction, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedHistoryItem, updateHistory, updateText]);

  return {
    textInput,
    setText,
    text,

    setUpdateText,
  };
};
