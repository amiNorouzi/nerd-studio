import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";
import type { ChatAction, ChatState } from "@/stores/zustand/types";

const initialState = {
  files: [],
  chatTextBoxValue: "",
  selectedHistoryItem: null,
  historyList: [],
} as ChatState;

const useChat = create<ChatState & ChatAction>()(
  devtools(
    immer(set => ({
      ...initialState,
      setFiles: v =>
        set(state => {
          state.files = v;
        }),
      addFiles: v =>
        set(state => {
          state.files = [...state.files, ...v];
        }),
      setChatTextBoxValue: v =>
        set(state => {
          state.chatTextBoxValue = v;
        }),
      setSelectHistoryItem: v =>
        set(state => {
          state.selectedHistoryItem = v;
        }),
      setHistoryList: v =>
        set(state => {
          state.historyList = v;
        }),
    })),

    { name: "chat", store: "chat" },
  ),
);
export const useChatStore = createSelectors(useChat);
