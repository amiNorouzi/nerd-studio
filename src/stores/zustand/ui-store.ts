import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "./createSelectors";
import type { IUiState } from "@/stores/zustand/types";

const initialState = {
  isSidePanelOpen: true,
  isHoverOnSidePanel: false,
};

export const useUi = create<IUiState>()(
  devtools(
    immer(set => ({
      ...initialState,
      setIsHoverOnSidePanel: val =>
        set(state => {
          state.isHoverOnSidePanel = val;
        }),
      setIsSidePanelOpen: (val: boolean) =>
        set(state => {
          state.isSidePanelOpen = val;
        }),
      toggleIsSidePanelOpen: () =>
        set(state => {
          state.isSidePanelOpen = !state.isSidePanelOpen;
        }),
    })),
  ),
);

export const useUiStore = createSelectors(useUi);
