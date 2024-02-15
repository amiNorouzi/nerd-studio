import { ReactNode } from "react";

export type ChildrenProps<P extends any = {}> = P & {
  children: ReactNode | ReactNode[];
};

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleToggle?: () => void;
}
