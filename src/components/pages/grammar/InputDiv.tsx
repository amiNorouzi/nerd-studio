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
import { MinimalButton, TooltipForUploadedFile } from "@/components/shared";
import { TbMicrophone } from "react-icons/tb";

import { useHandleUpload } from "@/components/shared/run-tab-for-app/form-section-components/useHandleUpload";
import { AiOutlineLink } from "react-icons/ai";
import { Button } from "@/components/ui/button";

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
  files?: File[];
  setFiles?: (files: File[]) => void;
  setUserUrl?: (url: string) => void;
  userUrl?: string;
  extractedText?: string;
  uploadStatus?: boolean[];
}

function GrammarInputDiv({
  onTextChange,
  value,
  files,
  setFiles,
  setUserUrl,
  userUrl,
  extractedText,
  uploadStatus,
}: Props) {
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
  const [focused, setFocused] = useState(false);

  // set the input value to extracted text from pdf
  useEffect(() => {
    if (extractedText && divRef && divRef.current) {
      divRef.current.innerHTML = extractedText;
      onTextChange(extractedText);
    }
  }, [extractedText]);

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

  //handle uploaded files section
  const {
    fileType,
    open,
    documentFiles,
    url,
    setDocumentFiles,
    setUrl,
    setOpen,
    handleDeleteFilesFromParent,
    handleDeleteUrl,
    handleSave,
    handleTriggerOpenButton,
  } = useHandleUpload({ files, setFiles, setUserUrl, userUrl });

  const isFileOrUrlValid =
    (fileType === "file" && files && files.length > 0) ||
    (fileType === "url" && userUrl);

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={`relative ${files && uploadStatus && uploadStatus.filter(item => item).length > 0 ? "h-[210px]" : "h-[156px]"} ${uploadStatus && uploadStatus.filter(item => item).length === 0 && "h-[156px]"}  w-full rounded-lg  border   pt-2 leading-8 outline-none ring-0 first-line:pl-4 ${focused && " bg-background"}  ${!focused && "bg-muted "} `}
    >
      {files &&
        files.length > 0 &&
        uploadStatus &&
        uploadStatus.filter(item => item).length > 0 && (
          <div className="mx-4 h-[50px]  border-b">
            <div className="flex flex-wrap gap-1">
              {fileType === "file" &&
                files.map((file, index) => (
                  <>
                    {uploadStatus && uploadStatus[index] && (
                      <TooltipForUploadedFile
                        file={file}
                        handleDeleteFiles={handleDeleteFilesFromParent}
                        index={index}
                        key={index}
                        topOfTextField={true}
                      />
                    )}
                  </>
                ))}
              {fileType === "url" && userUrl && (
                <div className="group relative flex items-center justify-start gap-1 rounded-md border border-black p-3">
                  <AiOutlineLink />
                  {userUrl}
                  <Button
                    variant="ghost"
                    size={"sm"}
                    className="h-3 w-3 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={handleDeleteUrl}
                  >
                    X
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      <div className="relative h-[103px]  w-full cursor-pointer overflow-hidden">
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
            className=" absolute start-2.5 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 hover:bg-red-500 focus:outline-none"
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
            className="absolute start-2.5 top-1"
            onClick={handleToggleRecording}
          />
        )}
        {divRef.current && divRef.current.innerText.length === 0 && (
          <>
            <p className="pointer-events-none absolute left-[32px] top-0  text-gray-500">
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
