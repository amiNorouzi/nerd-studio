/**
 * ! Warning
 * @deprecated don't use this type directly. All types must be in the types directory'
 */
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
  activeTheme: AppTheme;
  setActiveTheme: (val: AppTheme) => void;
  isLandingDrawerOpen:boolean,
  setIsLandingDrawerOpen:(val:boolean)=>void
}

//editor
export interface EditorState {
  isEditorChange: boolean;
  editorValue: any;
  editorTextContent: string;
  isFullScreen: boolean;
}
export interface EditorActions {
  setEditorChange: () => void;
  setEditorValue: (v: any, textContent: string) => void;
  toggleFullScreen: () => void;
  setIsFullScreen: (val: boolean) => void;
}

export type DynamicInputType =
  | "text"
  | "textarea"
  // | "date"
  | "select"
  | "number"
  | "list"
  | "range";

export interface DynamicInput {
  id: string;
  name: string;
  description: string;
  placeholder?: string;
  defaultValue?: string;
  order: number;
  type: DynamicInputType;
  options: {
    id: string;
    value: string;
  }[];
  isAdvance: boolean;
  fieldKey: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface TemplateState {
  currentTemplate: TemplateItem;
  customTemplateInputs: DynamicInput[];
  currentTemplateInputs: { [key: string]: string | number };
  currentTemplatePrompt: string;
  customTemplateDetails: {
    name: string;
    description: string;
    category: {
      name: string;
      id: number;
    };
    icon: string;
    template: string;
  };
}
export interface TemplateAction {
  setCurrentTemplate: (v: TemplateItem) => void;
  setCustomTemplateInputs: (v: DynamicInput | DynamicInput[]) => void;
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
  setCustomTemplateInputType: (id: string, type: DynamicInputType) => void;
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
    v:
      | string
      | {
          name: string;
          id: number;
        },
  ) => void;
  changeCurrentTemplateInputs: (key: string, val: string | number) => void;
  resetCurrentTemplateInputs: () => void;
  setCurrentTemplatePrompt: (val: string) => void;
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
  id: number;
  answer_text: string;
  uuid: string;
  app_type: string;
  created_at: string;
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
  isGrammarHistoryOpen: boolean;

  historySearch: string;
  isHistoryInfoOpen: boolean;
  selectedHistoryItem: Answer | null;
}

export interface WorkspaceState{
  workspaceID:number
  setWorkspaceID:(v:number)=>void
  setDocumentName:(v:string)=>void
  documentName:string
}

export interface HistoryAction {
  setHistoryIsOpen: (v: boolean) => void;
  setGrammarHistoryIsOpen: (v: boolean) => void;
  setHistorySearch: (v: string) => void;
  setSelectHistoryItem: (v: Answer |null) => void;
  resetHistory: () => void;
  setHistoryInfoOpen: (v: boolean) => void;
}

//chat
/**
 * @deprecated don't use this type
 */
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

export interface AiImageState {
  inputs: {
    text_to_image: { [key: string]: string | number };
    image_to_image: { [key: string]: string | number };
    image_upscale: { [key: string]: string | number };
  };
  generatedImages: {
    text_to_image: string[];
    image_to_image: string[];
    image_upscale: string[];
  };
}

export type ImageModelType =
  | "text_to_image"
  | "image_to_image"
  | "image_upscale";
export interface AiImageAction {
  changeInputValue: (
    tab: ImageModelType,
    key: string,
    value: string | number,
  ) => void;
  resetInputValue: (tab: ImageModelType) => void;
  setGeneratedImages: (tab: ImageModelType, images: string[]) => void;
}
export interface FilePdf {
  urlPdf: File[];
  setUrlPdf: (url: File[]) => void;
}
export interface SelectedFilePdf {
  selectedFilePdf: string;
  setSelectedFilePdf: (url: string) => void;
}
export interface CaptureScreen {
  onClick: () => void; // Type of the onClick function
  setOnClick: (newOnClick: () => void) => void;
}
// fixed the type
export interface CaptureScreenPic {
  pic: any[];
  setPic: (pic: any[]) => void;
}
export interface conversation {
  id: string;
  prompt: string[];
  image: string;
  timeLine?: string;
  name: string;
  role: string;

  setConversation(val: Partial<conversation>): void;
}
// {
//       id: "2",
//       prompt: [
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis n",
//       ],
//       image: "/images/logo.png",
//       timeLine: "5 Min ago",
//       name: "kasra",
//       role: "user",
//     },

// ************************************************** WorkSpace Interface ******************************************
export interface WorkSpaceState {
  id: string,
  name: string;
}
