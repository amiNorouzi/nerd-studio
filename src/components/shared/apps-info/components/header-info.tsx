import React from "react";
interface IProps {
  children: React.ReactNode;
}

export function HeaderInfo({ children }: IProps) {
  return (
    <div className="flex w-full items-start justify-between gap-6 ">
      {children}
    </div>
  );
}
