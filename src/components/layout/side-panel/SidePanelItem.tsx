import Link from "next/link";

import { MenuItem } from "react-pro-sidebar";
import { IconType } from "react-icons";

import { cn, getHslColorByVar } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { memo } from "react";

interface IProps {
  title: string;
  to: string;
  icon: string | IconType;
  isOpenSidePanel: boolean;
}

const renderIcon = (
  icon: string | IconType,
  isOpenSidePanel: boolean,
  isActive: boolean,
) => {
  const ReactIcon = icon;
  if (typeof icon === "string") {
    return (
      <Image
        src={icon}
        alt="{title}"
        width={40}
        height={40}
        className={cn(
          isOpenSidePanel ? "h-5 w-5" : "h-[30px] w-[30px]",
          isActive && !isOpenSidePanel ? "rounded-full" : "rounded-md",
        )}
      />
    );
  }

  return (
    <ReactIcon className={isOpenSidePanel ? "h-5 w-5" : "h-[30px] w-[30px]"} />
  );
};

const SidePanelItem = ({ title, to, icon, isOpenSidePanel }: IProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <MenuItem
      aria-level={1}
      active={isActive}
      icon={renderIcon(icon, isOpenSidePanel, isActive)}
      component={<Link href={to} />}
      rootStyles={{
        color: getHslColorByVar("--foreground"),
        fontSize: "13px",
        fontWeight: 500,
        "&>a": {
          border:
            isActive || isOpenSidePanel || typeof icon === "string"
              ? "none"
              : "1px solid",
          borderColor: getHslColorByVar("--border"),
        },
      }}
    >
      <span className={isOpenSidePanel ? "" : "!hidden"}>{title}</span>
    </MenuItem>
  );
};

export default memo(SidePanelItem);
