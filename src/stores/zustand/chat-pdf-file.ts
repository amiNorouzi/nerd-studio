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
  pic: "",
};
const initialStateSelectedFilePdf = {
  selectedFilePdf: "",
};

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
      setPic: (val: FormData) =>
        set(state => {
          state.pic = val;
        }),
    })),
    { name: "pic", store: "pic" },
  ),
);
const useStateConversation = create<conversation>()(
  devtools(
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
