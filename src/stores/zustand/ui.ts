import { create } from "zustand";
import type { IUiState } from "@/stores/zustand/types";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

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
