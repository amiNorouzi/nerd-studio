import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createSelectors } from "./createSelectors";
import type { IUiState } from "@/stores/zustand/types";
import { accountSettingsItems } from "@/constants/user-panel";

const initialState = {
  isSidePanelOpen: false,
  isHoverOnSidePanel: false,
  isOpenImageHistory: false,
  openUserPanelDialog: false,
  userPanelActiveMenu: accountSettingsItems[0].key,
};

//for all the ui related states like open dialogs

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
      setOpenUserPanelDialog: (val: boolean) =>
        set(state => {
          state.openUserPanelDialog = val;
        }),
      setUserPanelActiveMenu: (val: string) => {
        set(state => {
          state.userPanelActiveMenu = val;
        });
      },
    })),
    { name: "ui", store: "ui" },
  ),
);

export const useUiStore = createSelectors(useUi);
