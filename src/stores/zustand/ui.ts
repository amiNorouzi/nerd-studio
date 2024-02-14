import { create } from "zustand";
import type { IUiState } from "@/stores/zustand/types";

const initialState = {
  isSidePanelOpen: true,
};

export const useUi = create<IUiState>(set => ({
  ...initialState,
  setIsSidePanelOpen: (val: boolean) => set({ isSidePanelOpen: val }),
  toggleIsSidePanelOpen: () =>
    set(state => ({ isSidePanelOpen: !state.isSidePanelOpen })),
}));
