import React, { MutableRefObject } from "react";
import { WordCoordinates } from "./InputDiv";
import { WordIsHovered } from "@/lib/grammar-helpers";

interface Props {
  optionDivRef: MutableRefObject<null>;
  item: WordCoordinates;
  mouseCoordination:
    | {
        x: number;
        y: number;
      }
    | undefined;
  inputScroll: number | undefined;
  spellCorrection: {
    wrong: string;
    correct: string[];
  }[];
  correctHandler: (word: string, correct: string, index: number) => void;
  index: number;
}

export default function OptionsSection({
  optionDivRef,
  item,
  mouseCoordination,
  inputScroll,
  spellCorrection,
  correctHandler,
  index,
}: Props) {
  return (
    <div
      ref={optionDivRef}
      key={item.word}
      style={{
        top:
          mouseCoordination!?.y - inputScroll! < 90
            ? `${item.coordinates.y + item.coordinates.height - inputScroll!}px`
            : `${
                item.coordinates.y +
                item.coordinates.height -
                inputScroll! -
                117
              }px`,
        left:
          item.coordinates!?.x < 55
            ? `${item.coordinates.x}px`
            : `${item.coordinates.x - 50}px`,
        width: `${100}px`,
        height: "100px",

        zIndex: 100000,
      }}
      className={`absolute ${
        !WordIsHovered(item, mouseCoordination) && "hidden"
      }  rounded-lg border bg-white shadow-lg
      
       `}
    >
      {spellCorrection
        .filter(spellItem => spellItem.wrong === item.word)[0]
        .correct.map(correct => {
          return (
            <button
              key={correct}
              onClick={() => correctHandler(item.word, correct, index)}
              className="w-full rounded-lg px-2 transition-all hover:bg-gray-300"
            >
              {correct}
            </button>
          );
        })}
    </div>
  );
}
