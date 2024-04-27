import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import { CaptureScreen, FilePdf, SelectedFilePdf } from "./types";

const initialState = {
  urlPdf: [],
};
const initialStateSelectedFilePdf = {
  selectedFilePdf: "",
};

// @ts-ignore
const usePdfFile = create<FilePdf>()(
  devtools(
    immer(set => ({
      ...initialState,
      setUrlPdf: (val: any) =>
        set(state => {
          state.urlPdf = val;
        }),
    })),
    { name: "urlPdf", store: "urlPdf" },
  ),
);
const useSelectedFilePdf = create<SelectedFilePdf>()(
  devtools(
    immer(set => ({
      ...initialStateSelectedFilePdf,
      setSelectedFilePdf: (val: any) =>
        set(state => {
          state.selectedFilePdf = val;
        }),
    })),
    { name: "PdfSelected", store: "PdfSelected" },
  ),
);
const initialStateCapture = {
  onClick: () => console.log("Initial onClick function called"),

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
export const useSelectedFilePdfStore = createSelectors(useSelectedFilePdf);
