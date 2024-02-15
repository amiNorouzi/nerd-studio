interface EditorState {
  isEditorChange: boolean;
  editorValue: any;
}
interface EditorActions {
  setEditorChange: () => void;
  setEditorValue: (v: any) => void;
}
