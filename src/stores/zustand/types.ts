export interface IUiState {
  isSidePanelOpen: boolean;
  isHoverOnSidePanel: boolean;
  setIsHoverOnSidePanel: (val: boolean) => void;
  setIsSidePanelOpen: (val: boolean) => void;
  toggleIsSidePanelOpen: () => void;
}

export interface EditorState {
  isEditorChange: boolean;
  editorValue: any;
}
export interface EditorActions {
  setEditorChange: () => void;
  setEditorValue: (v: any) => void;
}
