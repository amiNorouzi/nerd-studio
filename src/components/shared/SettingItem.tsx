import { ReactNode } from "react";

import type { ChildrenProps } from "@/services/types";

interface ISettingItemProps {
  title: string;
  Action: ReactNode;
}

/**
 * SettingItem component show the setting item with title, Action and children
 * @param title
 * @param Action button or any action
 * @param children
 * @constructor
 */
export function SettingItem({
  title,
  Action,
  children,
}: ChildrenProps<ISettingItemProps>) {
  return (
    <div className="row border-b px-3 py-4 last:border-b-0">
      <p className="w-40 text-foreground/80">{title}</p>
      <div className="row w-full px-2">{children}</div>
      {Action}
    </div>
  );
}
