export interface IUiState {
  isSidePanelOpen: boolean;
  isHoverOnSidePanel: boolean;
  setIsHoverOnSidePanel: (val: boolean) => void;
  setIsSidePanelOpen: (val: boolean) => void;
  toggleIsSidePanelOpen: () => void;
}

//editor
export interface EditorState {
  isEditorChange: boolean;
  editorValue: any;
  editorTextContent: string;
}
export interface EditorActions {
  setEditorChange: () => void;
  setEditorValue: (v: any, textContent: string) => void;
}

//template
export interface Input {
  pId: string;
  id: string;
  title: string;
  placeHolder: string;
}
export interface TemplateState {
  currentTemplate: {
    id: string;
    icon: string;
    favorite: boolean;
    title: string;
    description: string;
    category: string;
    prompt: string;
    inputs: Input[];
  };
}
export interface TemplateAction {
  setCurrentTemplate: (v: TemplateState["currentTemplate"]) => void;
}

//engine
export type engineSettingState = Record<
  string,
  { top: number; temperature: number; presence: number; frequency: number }
>;
export interface FormSectionState {
  engines: engineSettingState;
}
export interface FormSectionAction {
  handleEngineSetting: (
    engineName: string,
    settingName: "top" | "temperature" | "presence" | "frequency",
    value: number,
  ) => void;
}

//history

export interface HistoryItem {
  id: string;
  title: string;
  data: string;
  description: string;
  question: string;
  engine: string;
  engineIcon: string;
}
export interface HistoryState {
  isHistoryOpen: boolean;
  historySearch: string;
  selectedHistoryItem: HistoryItem | null;
}
export interface HistoryAction {
  setHistoryIsOpen: (v: boolean) => void;
  setHistorySearch: (v: string) => void;
  setSelectHistoryItem: (v: HistoryItem) => void;
  resetHistory: () => void;
}
