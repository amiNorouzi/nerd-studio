import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import {
  CaptureScreen,
  CaptureScreenPic,
  conversation,
  FilePdf,
  SelectedFilePdf,
} from "./types";

const initialState = {
  urlPdf: [],
};
const initialStatePic = {
  pic: [""],
};
const initialStateSelectedFilePdf = {
  selectedFilePdf: [""],
};

// @ts-ignore
const usePdfFile = create<FilePdf>()(
  devtools(
    // @ts-ignore

    immer(set => ({
      ...initialState,
      setUrlPdf: (val: File[]) =>
        set(state => {
          state.urlPdf = val;
        }),
    })),
    { name: "urlPdf", store: "urlPdf" },
  ),
);
// @ts-ignore
const useSelectedFilePdf = create<SelectedFilePdf>()(
  devtools(
    // @ts-ignore

    immer(set => ({
      ...initialStateSelectedFilePdf,
      setSelectedFilePdf: (val: string) =>
        set(state => {
          // @ts-ignore

          state.selectedFilePdf = val;
        }),
    })),
    { name: "PdfSelected", store: "PdfSelected" },
  ),
);

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
const useStateCapturePic = create<CaptureScreenPic>()(
  devtools(
    immer(set => ({
      ...initialStatePic,
      setPic: (val: any) =>
        set(state => {
          state.pic = val;
        }),
    })),
    { name: "pic", store: "pic" },
  ),
);
const useStateConversation = create<conversation>()(
  devtools(
    // @ts-ignore

    immer(set => ({
      id: "",
      prompt: [],
      image: "",
      timeLine: "",
      name: "",
      role: "",
      setConversation: (val: Partial<conversation>) =>
        set(state => {
          if (val.id !== undefined) state.id = val.id;
          if (val.prompt !== undefined) state.prompt = val.prompt;
          if (val.image !== undefined) state.image = val.image;
          if (val.timeLine !== undefined) state.timeLine = val.timeLine;
          if (val.name !== undefined) state.name = val.name;
          if (val.role !== undefined) state.role = val.role;
        }),
    })),
    { name: "ConversationStore" },
  ),
);

export const usePdfFileStore = createSelectors(usePdfFile);
export const useStateCaptureStore = createSelectors(useStateCapture);
export const useSelectedFilePdfStore = createSelectors(useSelectedFilePdf);
export const useStateCapturePicStore = createSelectors(useStateCapturePic);
export const useStateConversationStore = createSelectors(useStateConversation);
