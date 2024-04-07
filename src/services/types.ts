import { Dispatch, ReactNode, SetStateAction } from "react";
import { Locale } from "../../i18n.config";
import { TemplateInputType } from "@/stores/zustand/types";

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

export interface AuthReturn {
  refresh_token: string;
  access_token: string;
}

export interface User {
  username: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}
export interface TemplateParamsItem {
  type: TemplateInputType;
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
  type: "select" | "text" | "number";
  label: string;
  default: string;
  is_advance: "true" | "false";
  description_i18key: string;
  maximum: number;
  minimum: number;
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
