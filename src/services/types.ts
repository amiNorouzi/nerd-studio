import { ReactNode } from "react";

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
