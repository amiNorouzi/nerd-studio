import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/stores/zustand/createSelectors";
import { HistoryAction, HistoryState, WorkspaceState } from "@/stores/zustand/types";

const initialState = {
  workspaceID:0
} as WorkspaceState;

const useWorkspace = create<WorkspaceState>()(
  devtools(
    immer(set => ({
      ...initialState,
      setWorkspaceID: v =>
        set(state => {
          state.workspaceID = v;
        }),

    })),
    { name: "workspace", store: "workspace" },
  ),
);

export const useWorkspaceStore = createSelectors(useWorkspace);
