"use client"
import {  useHistoryUpdateChild } from "@/services/history";
import { useEffect, useState } from "react";
import { useHistoryStore } from "@/stores/zustand/history-store";


interface Props {

  message: string;
}

export const useHandleGeneratedData = ({  message }: Props) => {
  const { mutate: updateHistory } = useHistoryUpdateChild();
  const [text, setText] = useState("");
  const [textInput, setTextInput] = useState("");
  const [updateText, setUpdateText] = useState("");
  const selectedHistoryItem = useHistoryStore.use.selectedHistoryItem();
  console.log('textInput',textInput);
  console.log('updateText',updateText);
  useEffect(() => {
    setTextInput(message);
  }, [message]);
  useEffect(() => {

    selectedHistoryItem && setTextInput(selectedHistoryItem.answer_text);
  }, [selectedHistoryItem]);



  useEffect(() => {
    if (!selectedHistoryItem || updateText==='' || textInput.trim() === updateText.trim()) return;

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
  }, [ updateHistory, updateText]);

  return {
    textInput,
    setText,
    text,

    setUpdateText,
  };
};
