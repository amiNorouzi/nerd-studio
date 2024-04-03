import { TemplateItem } from "@/services/types";

export interface IUiState {
  isSidePanelOpen: boolean;
  isHoverOnSidePanel: boolean;
  setIsHoverOnSidePanel: (val: boolean) => void;
  setIsSidePanelOpen: (val: boolean) => void;
  toggleIsSidePanelOpen: () => void;
  openUserPanelDialog: boolean;
  setOpenUserPanelDialog: (val: boolean) => void;
  userPanelActiveMenu: string;
  setUserPanelActiveMenu: (val: string) => void;
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

export type TemplateInputType =
  | "text"
  | "textarea"
  // | "date"
  | "select"
  | "number"
  | "list";
export interface TemplateInput {
  id: string;
  name: string;
  description: string;
  placeholder?: string;
  defaultValue?: string;
  order: number;
  type: TemplateInputType;
  options: {
    id: string;
    value: string;
  }[];
  isAdvance: boolean;
}

export interface TemplateState {
  currentTemplate: TemplateItem;
  customTemplateInputs: TemplateInput[];
  customTemplateDetails: {
    name: string;
    description: string;
    category: string;
    icon: string;
    template: string;
  };
}
export interface TemplateAction {
  setCurrentTemplate: (v: TemplateItem) => void;
  setCustomTemplateInputs: (v: TemplateInput | TemplateInput[]) => void;
  addCustomTemplateOption: (
    id: string,
    v: {
      id: string;
      value: string;
    },
  ) => void;
  setCustomTemplateInputValue: (
    id: string,
    key: "name" | "description" | "placeholder" | "defaultValue",
    v: string,
  ) => void;
  setCustomTemplateInputType: (id: string, type: TemplateInputType) => void;
  deleteCustomTemplateInput: (id: string) => void;
  toggleCustomTemplateInputAdvance: (id: string) => void;
  changeCustomTemplateInputOptionValue: (
    id: string,
    optionId: string,
    value: string,
  ) => void;
  deleteCustomTemplateInputOption: (id: string, optionId: string) => void;
  resetCustomTemplate: () => void;
  setCustomTemplateDetails: (
    key: "name" | "description" | "category" | "icon" | "template",
    v: string,
  ) => void;
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
  date: string;
  description?: string;
  question: string;
  engine: string;
  engineIcon: string;
  feature?: string;
}
export interface HistoryState {
  isHistoryOpen: boolean;
  historySearch: string;
  isHistoryInfoOpen: boolean;
  selectedHistoryItem: HistoryItem | null;
}
export interface HistoryAction {
  setHistoryIsOpen: (v: boolean) => void;
  setHistorySearch: (v: string) => void;
  setSelectHistoryItem: (v: HistoryItem) => void;
  resetHistory: () => void;
  setHistoryInfoOpen: (v: boolean) => void;
}

//chat
export interface messageForHighlight {
  id: string;
  prompt: string[];
  image: string;
  timeLine: string;
  name: string;
  role: string;
}
export interface ChatHistoryItem {
  id: string;
  title: string;
  description: string;
  timeline: string;
  file?: string | string[];
  engine: string;
  engineIcon: string;
  prompt: string;
}
export interface ChatState {
  files: File[];
  chatTextBoxValue: string;
  selectedHistoryItem: ChatHistoryItem | null;
  historyList: ChatHistoryItem[];
  selectedMessageForHighlight: messageForHighlight | null;
  openHighlightBox: boolean;
}
export interface ChatAction {
  setFiles: (v: File[]) => void;
  addFiles: (v: File[]) => void;
  setChatTextBoxValue: (v: string) => void;
  setSelectHistoryItem: (v: ChatHistoryItem) => void;
  setHistoryList: (v: ChatHistoryItem[]) => void;
  setSelectedMessageForHighlight: (v: messageForHighlight) => void;
  setOpenHighlightBox: (v: boolean) => void;
}
