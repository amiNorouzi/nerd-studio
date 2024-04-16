import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";
import { HighlightAction, HighlightState } from "@/stores/zustand/types";

const initialState = {
  isHighlightOpen: false,
} as HighlightState;

const useHighlight = create<HighlightState & HighlightAction>()(
  devtools(
    immer(set => ({
      ...initialState,
      setHighlightIsOpen: isOpen =>
        set(state => {
          state.isHighlightOpen = isOpen;
        }),
    })),
    { name: "highlight", store: "highlight" },
  ),
);

const useHighlightStore = createSelectors(useHighlight);

export default useHighlightStore;
