import {
  calculateWordCoordinates,
  replaceNthOccurrence,
  spellCorrection,
  splitTextFunction,
} from "@/lib/grammar-helpers";
import { useEffect, useRef, useState } from "react";
import EditableDiv from "./EditableDiv";
import MistakeMarker from "./MistakeMarker";

export interface WordCoordinates {
  word: string;
  coordinates: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

function GammerInputDiv() {
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

  //split input with space
  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
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

  return (
    <div className="relative h-[400px] w-full overflow-hidden ">
      <div className="relative h-full  w-full cursor-text ">
        {/* input field */}

        <EditableDiv
          divRef={divRef}
          handleInput={handleInput}
          handleMouseMove={handleMouseMove}
          handleScroll={handleScroll}
        />

        {/* input field */}

        {/* wrong words section */}

        {inputText.length > 1 && (
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

export default GammerInputDiv;
