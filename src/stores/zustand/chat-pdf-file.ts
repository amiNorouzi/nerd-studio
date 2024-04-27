import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import { CaptureScreen, FilePdf } from "./types";

const initialState = {
  url: "",
};

// @ts-ignore
const usePdfFile = create<FilePdf>()(
  devtools(
    immer(set => ({
      ...initialState,
      setUrl: (val: any) =>
        set(state => {
          state.url = val;
        }),
    })),
    { name: "urlPdf", store: "urlPdf" },
  ),
);
const initialStateCapture = {
  onClick: () => console.log("Initial onClick function called"),

  // Method to update the onClick function
  setOnClick: (newOnClick: () => void) => ({ onClick: newOnClick }),
};

// @ts-ignore
const useStateCapture = create<CaptureScreen>()(
  devtools(
    immer(set => ({
      onClick: () => console.log("Initial onClick function called"),
      setOnClick: (newOnClick: () => void) =>
        set(state => {
          state.onClick = newOnClick;
        }),
    })),
    {
      name: "onClickStore", // Descriptive name for the Redux DevTools
    },
  ),
);

export const usePdfFileStore = createSelectors(usePdfFile);
export const useStateCaptureStore = createSelectors(useStateCapture);
