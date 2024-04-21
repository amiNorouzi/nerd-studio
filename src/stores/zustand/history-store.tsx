import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";
import type { HistoryAction, HistoryState } from "@/stores/zustand/types";

const initialState = {
  isHistoryOpen: false,
  historySearch: "",
  selectedHistoryItem: null,
  isHistoryInfoOpen: false,
  isGrammarHistoryOpen: false,
} as HistoryState;

const useHistory = create<HistoryState & HistoryAction>()(
  devtools(
    immer(set => ({
      ...initialState,
      setHistoryIsOpen: v =>
        set(state => {
          state.isHistoryOpen = v;
        }),
      setGrammarHistoryIsOpen: v =>
        set(state => {
          state.isGrammarHistoryOpen = v;
        }),
      setHistorySearch: v =>
        set(state => {
          state.historySearch = v;
        }),
      setSelectHistoryItem: v =>
        set(state => {
          state.selectedHistoryItem = v;
        }),
      setHistoryInfoOpen: v =>
        set(state => {
          state.isHistoryInfoOpen = v;
        }),
      resetHistory: () => {
        set(initialState);
      },
    })),
    { name: "history", store: "history" },
  ),
);

export const useHistoryStore = createSelectors(useHistory);
