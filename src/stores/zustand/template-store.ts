import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import type { TemplateAction, TemplateState } from "./types";

type StoreType = TemplateState & TemplateAction;

const initialState = {
  currentTemplate: {},
  templateTab: "default",
} as TemplateState;

const useTemplate = create<StoreType>()(
  devtools(
    immer(set => ({
      ...initialState,
      setCurrentTemplate: v =>
        set(state => {
          state.currentTemplate = v;
        }),
      setTemplatePageContent: v =>
        set(state => {
          state.templateTab = v;
        }),
    })),
    { name: "template", store: "template" },
  ),
);

export const useTemplateStore = createSelectors(useTemplate);
