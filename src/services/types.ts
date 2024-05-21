/**
 * ! Warning
 * @deprecated don't use this type directly. All types must be in the types directory'
 */
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Locale } from "../../i18n.config";
import { DynamicInputType } from "@/stores/zustand/types";

export type ChildrenProps<P extends any = {}> = P & {
  children: ReactNode | ReactNode[];
};

export interface PlanFeatureItem {
  id: string;
  title: string;
  description: string;
}

export interface PlanItem {
  id: string;
  title: string;
  isActive: boolean;
  isFree: boolean;
  isDaily: boolean;
  price: number;
  yearlyPrice: number;
  creditsAmount: number;
  description: string;
  features: PlanFeatureItem[];
}

export type StateSetterType<T> = Dispatch<SetStateAction<T>>;

export interface AppItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  category: string;
  installCount: number;
}

export interface LangParams {
  params: { lang: Locale };
}

export interface SearchParamsType {
  [key: string]: string | string[] | undefined;
}

export interface ParamsType {
  lang: Locale;
  templateId: string;
}

export type WordType = "char" | "word" | "sentence" | "token";

export interface SCRPropsType {
  searchParams: SearchParamsType;
  params: ParamsType;
}

export interface ChatItem {
  id: string;
  message: string;
  isBot: boolean;
  image: string;
  name: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  thumbnailImage: string;
  imageCount: number;
}

export interface EngineItem {
  id: string;
  name: string;
  image: string;
}

export interface CodeHistoryItem {
  id: string;
  title: string;
  date: string;
  feature: string;
  engine: string;
  engineIcon: string;
}

export interface WorkspaceList {
  id: number;
  role: string;
  user: {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    date_joined: string;
    phone_number: string;
    description: string;
    is_verified: boolean;
  };
  workspace: Workspace;
}

export interface Workspace {
  name: string;
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  is_default: boolean;
  is_base: boolean;
}

export interface WorkspaceApp {
  id: number;
  app: {
    id: number;
    topic: string;
    task: string;
    prompt: string;
    params: [{}];
    status: string;
  };
  workspace: Workspace;
}

export interface WorkspaceDocument {

documents:WorkspaceDocumentProps[]
  paginator: {
    per_page:number
    num_pages:number
  }
  current_page:number
}

export interface WorkspaceDocumentProps{
  id: number;
  workspace: {
    name: string;
  };
  history: {
    id: number;
    answer_text: string;
    uuid: string;
    app_type: string;
    created_at: string;
    urls: string[];
  };
  name: string;

}

export interface AuthReturn {
  refresh_token: string;
  access_token: string;
  workspace: Workspace;
}

export interface User {
  username: string;
  email: string;
  workspace: Workspace;
  sub: string;
  iat: number;
  exp: number;
}
export interface TemplateParamsItem {
  type: DynamicInputType;
  label: string;
  description: string;
  placeholder: string;
  options: string[];
}
export interface TemplateItem {
  id: number;
  topic: string;
  task: string;
  prompt: string;
  params: TemplateParamsItem[];
}

export interface TemplateCategoryItem {
  category_name: string;
  templates: TemplateItem[];
}

export interface ModelParamsItem {
  enum: string[];
  show: "true" | "false";
  type: "select" | "text" | "number" | "range";
  label: string;
  default: string;
  is_advance: "true" | "false";
  description_i18key: string;
  maximum: number;
  minimum: number;
  step?: number;
}
export interface ModelItem {
  model: string;
  url: {
    name: string;
    url: string;
  };
  params: { [index: string]: ModelParamsItem };
  is_active: boolean;
}
