import { Dispatch, ReactNode, SetStateAction } from "react";
import { Locale } from "../../i18n.config";

export type ChildrenProps<P extends any = {}> = P & {
  children: ReactNode | ReactNode[];
};

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen?: () => void;
  handleToggle?: () => void;
}

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
  firstname: string;
  lastname: string;
}
