import React from "react";
export interface IProps {
  open: boolean;
  onOpenChange: (value: ((prevState: boolean) => boolean) | boolean) => void;
  children: React.ReactNode;
}
