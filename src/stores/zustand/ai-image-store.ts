import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import { AiImageAction, AiImageState } from "./types";

type StoreType = AiImageState & AiImageAction;
interface FilePic {
  pic: File[];
  setPic: (pic: File[]) => void;
}
const initialStateFile = {
  pic: [] as File[],
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
const initialStateImage = {
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

type ImageUrl = { setUrlImage(val: string): void } & typeof initialStateImage;
const useImageUrl = create<ImageUrl>()(
  devtools(
    immer(set => ({
      ...initialStateImage,
      setUrlImage: (val: string) =>
        set(state => {
          state.imageUrl = val;
        }),
    })),
    { name: "urlPdf", store: "urlPdf" },
  ),
);

const usePicFile = create<FilePic>()(
  devtools(
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
