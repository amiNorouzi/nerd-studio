export interface IUiState {
  isSidePanelOpen: boolean;
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
