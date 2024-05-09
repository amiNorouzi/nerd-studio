import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import { AiImageAction, AiImageState, FilePdf } from "./types";

type StoreType = AiImageState & AiImageAction;
interface FilePic {
  pic: File[];
  setPic: (pic: File[]) => void;
}
const initialStateFile = {
  pic: [],
};
const initialState = {
  inputs: {
    text_to_image: {},
    image_to_image: {},
    image_upscale: {},
  },
  generatedImages: {
    text_to_image: [],
    image_to_image: [],
    image_upscale: [],
  },
} as AiImageState;
const initialStateIamge = {
  imageUrl: "",
};

const useAiImage = create<StoreType>()(
  devtools(
    immer(set => ({
      ...initialState,
      changeInputValue: (tab, key, val) =>
        set(state => {
          state.inputs[tab][key] = val;
        }),
      resetInputValue: tab =>
        set(state => {
          state.inputs[tab] = {
            text: state.inputs[tab].text || "",
          };
        }),
      setGeneratedImages: (tab, images) =>
        set(state => {
          state.generatedImages[tab] = images;
        }),
    })),
    { name: "image", store: "image" },
  ),
);
const useImageUrl = create<any>()(
  devtools(


    immer(set => ({
      ...initialStateIamge,
      setUrlImage: (val: string) =>// @ts-ignore
        set(state => {
          state.imageUrl = val;
        }),
    })),
    { name: "urlPdf", store: "urlPdf" },
  ),
);
// @ts-ignore
const usePicFile = create<FilePic>()(
  devtools(
    // @ts-ignore

    immer(set => ({
      ...initialStateFile,
      setPic: (val: File[]) =>
        set(state => {
          state.pic = val;
        }),
    })),
    { name: "picFile", store: "picFile" },
  ),
);
export const useAiImageStore = createSelectors(useAiImage);
export const useImageUrlStore = createSelectors(useImageUrl);
export const usePicFileStore = createSelectors(usePicFile);
