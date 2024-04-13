import React, { MutableRefObject } from "react";
import { WordCordinates } from "./InputDiv";
import { WordIsHovered } from "@/lib/grammer-helpers";

interface Props {
  wordsCordinates: WordCordinates[];
  Mainref: MutableRefObject<null>;
  mouseCordination:
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
  wordsCordinates,
  Mainref,
  mouseCordination,
  inputScroll,
  spellCorrection,
  optionDivRef,
  correctHandler,
}: Props) {
  return (
    <>
      {wordsCordinates.length > 0 && (
        <div
          ref={Mainref}
          id="mistakedMarker"
          style={{
            height: wordsCordinates[wordsCordinates.length - 1].coordinates.y
              ? `${wordsCordinates[wordsCordinates.length - 1].coordinates.y}px`
              : "auto",
          }}
          className="overflow-y-auto"
        >
          {wordsCordinates.map((item, index) => {
            return (
              <>
                <div
                  key={index}
                  style={{
                    top: `${item.coordinates.y - inputScroll!}px`,
                    left: `${item.coordinates.x}px`,
                    width: `${item.coordinates.width}px`,
                    height: `${item.coordinates.height}px`,

                    zIndex: 0,
                  }}
                  className={`absolute h-full ${
                    WordIsHovered(item, mouseCordination) &&
                    "bg-gray-400 opacity-30 "
                  }  pointer-events-none border-b-[2px] border-b-red-500 `}
                ></div>
                <div
                  ref={optionDivRef}
                  key={index + "hello"}
                  style={{
                    top:
                      mouseCordination!?.y - inputScroll! < 290
                        ? `${
                            item.coordinates.y +
                            item.coordinates.height -
                            inputScroll!
                          }px`
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
                    !WordIsHovered(item, mouseCordination) && "hidden"
                  }  rounded-lg border bg-white shadow-lg
                    
                     `}
                >
                  {spellCorrection
                    .filter(spellItem => spellItem.wrong === item.word)[0]
                    .correct.map(correct => {
                      return (
                        <button
                          key={correct}
                          onClick={() =>
                            correctHandler(item.word, correct, index)
                          }
                          className="w-full rounded-lg px-2 transition-all hover:bg-gray-300"
                        >
                          {correct}
                        </button>
                      );
                    })}
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
