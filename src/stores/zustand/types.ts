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

//template
export interface Input {
  pId: string;
  id: string;
  title: string;
  placeHolder: string;
}

export type CustomTemplateInputType =
  | "text"
  | "textarea"
  // | "date"
  | "select"
  | "number"
  | "list";
export interface CustomTemplateInput {
  id: string;
  name: string;
  description: string;
  placeholder?: string;
  defaultValue?: string;
  order: number;
  type: CustomTemplateInputType;
  options: {
    id: string;
    value: string;
  }[];
  isAdvance: boolean;
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
  templateTab: "default" | "Advance";
  customTemplateInputs: CustomTemplateInput[];
  customTemplateDetails: {
    name: string;
    description: string;
    category: string;
    icon: string;
    template: string;
  };
}
export interface TemplateAction {
  setCurrentTemplate: (v: TemplateState["currentTemplate"]) => void;
  setTemplatePageContent: (v: TemplateState["templateTab"]) => void;
  setCustomTemplateInputs: (
    v: CustomTemplateInput | CustomTemplateInput[],
  ) => void;
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
  setCustomTemplateInputType: (
    id: string,
    type: CustomTemplateInputType,
  ) => void;
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
