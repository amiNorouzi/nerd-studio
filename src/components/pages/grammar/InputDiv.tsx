"use client";
import {
  calculateWordCoordinates,
  replaceNthOccurrence,
  spellCorrection,
  splitTextFunction,
} from "@/lib/grammar-helpers";
import { useEffect, useRef, useState } from "react";
import EditableDiv from "./EditableDiv";
import MistakeMarker from "./MistakeMarker";
import { useGetDictionary, useSpeechToText } from "@/hooks";
import { MinimalButton } from "@/components/shared";
import { TbMicrophone } from "react-icons/tb";

export interface WordCoordinates {
  word: string;
  coordinates: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

interface Props {
  onTextChange: (value: string) => void;
  value?: string | number | readonly string[] | undefined;
}

function GrammarInputDiv({ onTextChange, value }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const optionDivRef = useRef(null);
  const mistakeMarkerRef = useRef(null);
  const [inputText, setInputText] = useState<string[]>([]);
  const [wordsCoordinates, setWordsCoordinates] = useState<WordCoordinates[]>(
    [],
  );

  const [mouseCoordination, setMouseCoordination] = useState<{
    x: number;
    y: number;
  }>();
  const [inputScroll, setInputScroll] = useState<number>();

  // handle cleaning the div by clicking the trash icon
  useEffect(() => {
    if (!value && divRef.current) {
      divRef.current.innerHTML = "";
      setWordsCoordinates([]);
    }
  }, [value]);

  //set the default value if existed

  //split input with space
  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    onTextChange(target.innerText);
    const splicedText = splitTextFunction(target.innerText);
    setInputText(splicedText);
  };

  // Calculate the mouse position relative to the div's position

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!divRef.current) return;

    const divOffset = divRef.current.getBoundingClientRect();
    // For X coordinate, no adjustment is needed unless the div also scrolls horizontally
    const relativeX = e.clientX - divOffset.left;

    // Adjust Y coordinate by adding the scrollTop value of the div to account for scrolling
    const scrollTop = divRef.current.scrollTop;
    const relativeY = e.clientY - divOffset.top + scrollTop;

    const coordinates = { x: relativeX, y: relativeY };
    setMouseCoordination(coordinates);
  };

  // calculate words coordinates every time the input text is changed
  useEffect(() => {
    calculateWordCoordinates(divRef, spellCorrection, setWordsCoordinates);
    handleScroll();
  }, [inputText]);

  // calculate the coordinates each time the input text is changed
  useEffect(() => {
    // Optionally, you can recalculate when the content changes or on specific events
    calculateWordCoordinates(divRef, spellCorrection, setWordsCoordinates);
    // console.log("input text is changes", inputText);
  }, [inputText]);

  // correct the wrong word with the selected correction
  const correctHandler = (word: string, correct: string, index: number) => {
    if (!divRef.current) return;
    let count = 0;
    wordsCoordinates.forEach((item, itemIndex) => {
      if (itemIndex <= index) item.word === word && count++;
    });
    const diveText = divRef.current.innerText;

    const correctInnerText = replaceNthOccurrence(
      diveText,
      word,
      correct,
      count,
    );
    divRef.current.innerHTML = correctInnerText;
    calculateWordCoordinates(divRef, spellCorrection, setWordsCoordinates);
  };

  //handling inputDiv scroll to adjust the mistakeMarker div
  const handleScroll = () => {
    if (!divRef.current) return;
    setInputScroll(divRef.current.scrollTop);
  };
  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
      return () => div.removeEventListener("scroll", handleScroll);
    }
  }, []); // Ensure this runs only once on mount

  const { handleToggleRecording, isRecording } = useSpeechToText({
    transcript: value as string,
    setTranscript: onTextChange,
  });

  const {
    common: { copy },
    components: { custom_textarea: dictionary },
  } = useGetDictionary();

  return (
    <div className="relative h-[156px] w-full overflow-hidden ">
      <div className="relative h-full  w-full cursor-text ">
        {/* input field */}

        <EditableDiv
          divRef={divRef}
          handleInput={handleInput}
          handleMouseMove={handleMouseMove}
          handleScroll={handleScroll}
        />
        {isRecording ? (
          <button
            onClick={handleToggleRecording}
            className=" absolute start-1.5 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 hover:bg-red-500 focus:outline-none"
          >
            <svg
              className="h-12 w-12 "
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          </button>
        ) : (
          <MinimalButton
            Icon={TbMicrophone}
            title={dictionary.voice_button_label}
            className="absolute start-1.5 top-4"
            onClick={handleToggleRecording}
          />
        )}
        {divRef.current && divRef.current.innerText.length === 0 && (
          <>
            <p className="pointer-events-none absolute left-[30px] top-4 text-gray-500">
              enter your text that you wish to correct
            </p>
          </>
        )}
        {/* input field */}

        {/* wrong words section */}

        {inputText && inputText.length > 1 && (
          <MistakeMarker
            MainRef={mistakeMarkerRef}
            correctHandler={correctHandler}
            inputScroll={inputScroll}
            mouseCoordination={mouseCoordination}
            optionDivRef={optionDivRef}
            spellCorrection={spellCorrection}
            wordsCoordinates={wordsCoordinates}
          />
        )}
        {/* wrong words section */}
      </div>
    </div>
  );
}

export default GrammarInputDiv;
