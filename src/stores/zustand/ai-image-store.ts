import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import type { AiImageAction, AiImageState } from "./types";

type StoreType = AiImageState & AiImageAction;

const initialState = {
  inputs: {
    text_to_image: {},
    image_to_image: {},
    image_upscale: {},
  },
} as AiImageState;

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
          state.inputs[tab] = {};
        }),
    })),
    { name: "image", store: "image" },
  ),
);

export const useAiImageStore = createSelectors(useAiImage);
