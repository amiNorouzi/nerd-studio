import React from "react";
interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <div className="flex h-full w-full items-start justify-center overflow-hidden">
      {children}
    </div>
  );
}
