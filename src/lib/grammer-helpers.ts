import { WordCordinates } from "@/components/pages/grammar/InputDiv";
import { Dispatch, ReactHTMLElement, RefObject, SetStateAction } from "react";

//replace a nth repeated word in a string with other words
export function replaceNthOccurrence(
  str: string,
  word: string,
  replaceWord: string,
  n: number,
) {
  let regex = new RegExp(`\\b${word}\\b`, "g"); // Use \b for word boundary
  let counter = 0; // Initialize a counter
  return str.replace(regex, match => {
    counter++; // Increment counter for each word occurrence
    if (counter === n) {
      // When the nth occurrence is found
      return replaceWord; // Replace it
    }
    return match; // Otherwise, return the match (original word)
  });
}

// calculate width , height , x,y of each words

export const calculateWordCoordinates = (
  ref: RefObject<HTMLDivElement>,
  spellCorrection: { wrong: string; correct: string[] }[],
  setWordsCoordinates: Dispatch<SetStateAction<WordCordinates[]>>,
) => {
  const editableDiv = ref.current;

  if (!editableDiv || !editableDiv.childNodes.length) {
    console.warn("Editable div is empty or does not contain text nodes.");
    return [];
  }

  const textContent = editableDiv.textContent || "";
  const regex = /(\S+|\s+)/g;
  const tokens = textContent.match(regex) || [];

  if (tokens.length === 0) {
    console.warn("No tokens to calculate coordinates for.");
    return [];
  }

  const scrollLeft = editableDiv.scrollLeft;
  const scrollTop = editableDiv.scrollTop;

  let currentIndex = 0;
  const wordCoordinates: any = [];

  tokens.forEach((token, i) => {
    if (/\S/.test(token)) {
      // Process only if the token is not just spaces
      let { textNode, startOffset } = findTextNodeAndOffset(
        editableDiv,
        currentIndex,
      );

      if (!textNode) {
        console.warn("Could not find a text node for word calculation.");
        return; // Continue with the next token
      }

      const range = document.createRange();
      try {
        range.setStart(textNode, startOffset);
        range.setEnd(textNode, startOffset + token.length);

        const { x, y, width, height } = range.getBoundingClientRect();
        const relativeX =
          x - editableDiv.getBoundingClientRect().left + scrollLeft;
        const relativeY =
          y - editableDiv.getBoundingClientRect().top + scrollTop;

        wordCoordinates.push({
          word: token,
          coordinates: { x: relativeX, y: relativeY, width, height },
        });
      } catch (error) {
        console.error("Error calculating coordinates for a word", error);
      } finally {
        range.detach(); // Clean up the range
      }
    }
    currentIndex += token.length; // Increment currentIndex by the length of the token (including spaces)
  });

  const filteredWordsByWrong = wordCoordinates.filter(item => {
    const misspelled = spellCorrection.some(
      correction => correction.wrong === item.word,
    );
    return misspelled;
  });
  setWordsCoordinates(filteredWordsByWrong);
  return wordCoordinates;
};

// Helper function to find the correct text node and the character offset for a given index
function findTextNodeAndOffset(container: any, index: number) {
  let currentOffset = 0;
  for (const node of container.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const nextOffset = currentOffset + node.length;
      if (index < nextOffset) {
        return { textNode: node, startOffset: index - currentOffset };
      }
      currentOffset = nextOffset;
    }
  }
  return { textNode: null, startOffset: 0 };
}

//check if the word is hovered or not
export const WordIsHovered = (
  item: WordCordinates,
  mouseCordination:
    | {
        x: number;
        y: number;
      }
    | undefined,
) => {
  if (!mouseCordination) return;
  const XinRange =
    item.coordinates.x < mouseCordination.x &&
    mouseCordination.x < item.coordinates.x + item.coordinates.width;

  const YinRange =
    item.coordinates.y < mouseCordination.y &&
    mouseCordination.y < item.coordinates.y + item.coordinates.height;

  // console.log("XinRange && YinRange", XinRange, YinRange);
  if (XinRange && YinRange) return true;
  return false;
};

//spell correction samples
export const spellCorrection: { wrong: string; correct: string[] }[] = [
  { wrong: "helllo", correct: ["hello", "Hello", "halo"] },
  { wrong: "hwo", correct: ["how"] },
  { wrong: "yuo", correct: ["you"] },
  { wrong: "whoo", correct: ["who"] },
  { wrong: "teh", correct: ["the", "The"] },
  { wrong: "becuase", correct: ["because"] },
  { wrong: "definatly", correct: ["definitely"] },
  { wrong: "recieve", correct: ["receive"] },
  { wrong: "adress", correct: ["address"] },
  { wrong: "goverment", correct: ["government"] },
  { wrong: "seperate", correct: ["separate"] },
  { wrong: "wich", correct: ["which"] },
  { wrong: "occured", correct: ["occurred"] },
  { wrong: "untill", correct: ["until"] },
  { wrong: "tomorow", correct: ["tomorrow"] },
  { wrong: "alot", correct: ["a lot"] },
  { wrong: "thier", correct: ["their"] },
  { wrong: "wierd", correct: ["weird"] },
  { wrong: "accomodate", correct: ["accommodate"] },
  { wrong: "didnt", correct: ["didn't"] },
  { wrong: "writting", correct: ["writing"] },
  { wrong: "arround", correct: ["around"] },
  { wrong: "managment", correct: ["management"] },
  { wrong: "concious", correct: ["conscious"] },
  { wrong: "persue", correct: ["pursue"] },
  { wrong: "comming", correct: ["coming"] },
  { wrong: "arguement", correct: ["argument"] },
  { wrong: "buisness", correct: ["business"] },
  { wrong: "enviroment", correct: ["environment"] },
  { wrong: "fourty", correct: ["forty"] },
  { wrong: "futher", correct: ["further"] },
  { wrong: "begining", correct: ["beginning"] },
  { wrong: "aquire", correct: ["acquire"] },
  { wrong: "neccessary", correct: ["necessary"] },
  { wrong: "ocassion", correct: ["occasion"] },
  { wrong: "privelege", correct: ["privilege"] },
  { wrong: "speach", correct: ["speech"] },
  { wrong: "succesful", correct: ["successful"] },
  { wrong: "weigth", correct: ["weight"] },
  { wrong: "beleive", correct: ["believe"] },
];

//handle mouse movement in the editablediv
export const handleMouseMove = (
  e: React.MouseEvent,
  divRef: RefObject<HTMLDivElement>,
  setMouseCordination: (
    value: SetStateAction<
      | {
          x: number;
          y: number;
        }
      | undefined
    >,
  ) => void,
) => {
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
