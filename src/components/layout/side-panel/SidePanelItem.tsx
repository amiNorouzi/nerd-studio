import Link from "next/link";

import { MenuItem } from "react-pro-sidebar";
import { IconType } from "react-icons";

import { cn, getHslColorByVar } from "@/lib/utils";
import Image from "next/image";

interface IProps {
  title: string;
  to: string;
  icon: string | IconType;
  isOpenSidePanel?: boolean;
}

export function SidePanelItem({ title, to, icon, isOpenSidePanel }: IProps) {
  const isActive = title === "Chat";
  const Icon = () => {
    const ReactIcon = icon;
    if (typeof icon === "string") {
      return (
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className={cn(
            "aspect-square ",
            isOpenSidePanel ? "w-5" : "w-8",
            isActive ? "rounded-full" : "rounded-md",
          )}
        />
      );
    }

    return <ReactIcon size={isOpenSidePanel ? "1.2rem" : "1.8rem"} />;
  };

  return (
    <MenuItem
      aria-level={1}
      active={isActive}
      icon={<Icon />}
      component={<Link href={to} />}
      rootStyles={{
        color: getHslColorByVar("--foreground"),
        fontSize: "13px",
        fontWeight: 500,
      }}
    >
      <span className="!hidden">{title}</span>
    </MenuItem>
  );
}
