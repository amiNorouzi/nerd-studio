import React, { MutableRefObject } from "react";
import { WordCoordinates } from "./InputDiv";
import { WordIsHovered } from "@/lib/grammar-helpers";
import OptionsSection from "./OptionsSection";

interface Props {
  wordsCoordinates: WordCoordinates[];
  MainRef: MutableRefObject<null>;
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
  optionDivRef: MutableRefObject<null>;
  correctHandler: (word: string, correct: string, index: number) => void;
}

export default function MistakeMarker({
  wordsCoordinates: wordsCoordinates,
  MainRef,
  mouseCoordination: mouseCoordination,
  inputScroll,
  spellCorrection,
  optionDivRef,
  correctHandler,
}: Props) {
  return (
    <>
      {wordsCoordinates && wordsCoordinates.length > 0 && (
        <div
          ref={MainRef}
          id="mistakeMarker"
          style={{
            height: wordsCoordinates[wordsCoordinates.length - 1].coordinates.y
              ? `${wordsCoordinates[wordsCoordinates.length - 1].coordinates.y}px`
              : "auto",
          }}
          className="overflow-y-auto"
        >
          {wordsCoordinates.map((item, index) => {
            return (
              <>
                <div
                  key={item.word + "underline"}
                  style={{
                    top: `${item.coordinates.y - inputScroll!}px`,
                    left: `${item.coordinates.x}px`,
                    width: `${item.coordinates.width}px`,
                    height: `${item.coordinates.height}px`,

                    zIndex: 0,
                  }}
                  className={`absolute h-full ${
                    WordIsHovered(item, mouseCoordination) &&
                    "bg-gray-400 opacity-30 "
                  }  pointer-events-none border-b-[2px] border-b-red-500 `}
                ></div>

                {/* options section */}
                <OptionsSection
                  correctHandler={correctHandler}
                  index={index}
                  inputScroll={inputScroll}
                  item={item}
                  mouseCoordination={mouseCoordination}
                  optionDivRef={optionDivRef}
                  spellCorrection={spellCorrection}
                  key={item.word}
                />
                {/* options section */}
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
