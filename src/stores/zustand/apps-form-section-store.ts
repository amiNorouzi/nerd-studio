import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";

import type { FormSectionAction, FormSectionState } from "./types";

type StoreType = FormSectionState & FormSectionAction;

const initialValue = {
  temperature: 20,
  frequency: 0,
  presence: 0,
  top: 100,
};

const engines = [
  "GPT-3.5 Turbo",
  "GPT-4 Turbo",
  "Claude-instant",
  "Claude-2",
  "Gemini Pro",
];

const engineSetting = engines.reduce(
  (prev, cur) => {
    prev[cur] = initialValue;
    return prev;
  },
  {} as Record<string, typeof initialValue>,
);
const initialState: FormSectionState = {
  engines: engineSetting,
};

const useForm = create<StoreType>()(
  devtools(
    immer(set => ({
      ...initialState,
      handleEngineSetting: (engineName, settingName, value) =>
        set(state => {
          state.engines[engineName][settingName] = value;
        }),
    })),
    { name: "form-section", store: "form-section" },
  ),
);

export const useFormStore = createSelectors(useForm);
