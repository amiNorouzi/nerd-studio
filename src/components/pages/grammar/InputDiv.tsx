import {
  calculateWordCoordinates,
  replaceNthOccurrence,
  spellCorrection,
} from "@/lib/grammer-helpers";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import EditabelDiv from "./EditabelDiv";
import MistakeMarker from "./MistakeMarker";

export interface WordCordinates {
  word: string;
  coordinates: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

const splitedTextFunction = (text: string) => {
  return text.split(" ");
};

function GrtammerInputDiv() {
  const divRef = useRef<HTMLDivElement>(null);
  const optionDivRef = useRef(null);
  const mistakedMarkerRef = useRef(null);
  const [inputText, setInputText] = useState<string[]>([]);
  const [wordsCordinates, setWordsCordinates] = useState<WordCordinates[]>([]);
  const [mouseCordination, setMouseCordination] = useState<{
    x: number;
    y: number;
  }>();
  const [inputScroll, setInputScroll] = useState<number>();

  //split input with space
  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const splitedText = splitedTextFunction(target.innerText);
    setInputText(splitedText);
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
    setMouseCordination(coordinates);
  };

  // calculate words cordinates every time the input text is changed
  useEffect(() => {
    calculateWordCoordinates(divRef, spellCorrection, setWordsCordinates);
    handleScroll();
  }, [inputText]);

  // calculate the cordinates each time the input text is changed
  useEffect(() => {
    // Optionally, you can recalculate when the content changes or on specific events
    calculateWordCoordinates(divRef, spellCorrection, setWordsCordinates);
    // console.log("input text is changes", inputText);
  }, [inputText]);

  // correct the wrong word with the selected correction
  const correctHandler = (word: string, correct: string, index: number) => {
    if (!divRef.current) return;
    let count = 0;
    wordsCordinates.forEach((item, itemIndex) => {
      if (itemIndex <= index) item.word === word && count++;
    });
    const diveText = divRef.current.innerText;

    const correctIinnerText = replaceNthOccurrence(
      diveText,
      word,
      correct,
      count,
    );
    divRef.current.innerHTML = correctIinnerText;
    calculateWordCoordinates(divRef, spellCorrection, setWordsCordinates);
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

  return (
    <div className="relative h-[400px] w-full overflow-hidden ">
      <div className="relative h-full  w-full cursor-text ">
        {/* input field */}

        <EditabelDiv
          divRef={divRef}
          handleInput={handleInput}
          handleMouseMove={handleMouseMove}
          handleScroll={handleScroll}
        />

        {/* input field */}

        {/* wrong words section */}

        {inputText.length > 1 && (
          <MistakeMarker
            Mainref={mistakedMarkerRef}
            correctHandler={correctHandler}
            inputScroll={inputScroll}
            mouseCordination={mouseCordination}
            optionDivRef={optionDivRef}
            spellCorrection={spellCorrection}
            wordsCordinates={wordsCordinates}
          />
        )}
        {/* wrong words section */}
      </div>
    </div>
  );
}

export default GrtammerInputDiv;
