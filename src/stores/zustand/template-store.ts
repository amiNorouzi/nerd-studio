import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import type { TemplateAction, TemplateState } from "./types";
import { value } from "@/components/shared/run-tab-for-app/editor-section-components/constants";

type StoreType = TemplateState & TemplateAction;

//@ts-ignore
const initialState = {
  currentTemplate: {},
  templateTab: "default",
  customTemplateInputs: [],
  customTemplateDetails: {
    name: "",
    description: "",
    category: "",
    icon: "",
    template: "",
  },
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
      setCustomTemplateInputs: v =>
        set(state => {
          if (Array.isArray(v)) {
            state.customTemplateInputs = v;
          } else {
            state.customTemplateInputs.push(v);
          }
        }),
      addCustomTemplateOption: (id, v) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input.options.push(v);
          }
        }),
      setCustomTemplateInputValue: (id, key, v) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input[key] = v;
          }
        }),
      setCustomTemplateInputType: (id, type) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input.type = type;
          }
        }),
      deleteCustomTemplateInput: id =>
        set(state => {
          state.customTemplateInputs = state.customTemplateInputs.filter(
            input => input.id !== id,
          );
        }),
      toggleCustomTemplateInputAdvance: id =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input.isAdvance = !input.isAdvance;
          }
        }),
      changeCustomTemplateInputOptionValue: (id, optionId, value) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            const option = input.options.find(option => option.id === optionId);
            if (option) {
              option.value = value;
            }
          }
        }),
      deleteCustomTemplateInputOption: (id, optionId) =>
        set(state => {
          const input = state.customTemplateInputs.find(
            input => input.id === id,
          );
          if (input) {
            input.options = input.options.filter(o => o.id !== optionId);
          }
        }),
      resetCustomTemplate: () =>
        set(state => {
          state.customTemplateInputs = [];
          state.customTemplateDetails = initialState.customTemplateDetails;
        }),
      setCustomTemplateDetails: (key, v) =>
        set(state => {
          state.customTemplateDetails[key] = v;
        }),
    })),
    { name: "template", store: "template" },
  ),
);

export const useTemplateStore = createSelectors(useTemplate);
