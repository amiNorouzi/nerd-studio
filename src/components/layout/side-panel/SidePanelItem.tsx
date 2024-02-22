import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

import { MenuItem } from "react-pro-sidebar";
import { IconType } from "react-icons";

import { cn, getHslColorByVar } from "@/lib/utils";
import useCheckSidePanelOpen from "@/components/layout/side-panel/hooks/useCheckSidePanelOpen";

interface IProps {
  title: string;
  to: string;
  icon: string | IconType;
}

/**
 * menu item left icon render image or icon from React icons
 * @param icon //string for image src or React icon type
 * @param isOpenSidePanel for change icon size in open and close
 * @param isActive round image if is active passed true
 */
const renderIcon = (
  icon: string | IconType,
  isOpenSidePanel: boolean,
  isActive: boolean,
) => {
  const ReactIcon = icon;
  //string it means image src so render an Image
  if (typeof icon === "string") {
    return (
      <Image
        src={icon}
        alt="side panel icon"
        width={40}
        height={40}
        className={cn(
          isOpenSidePanel ? "h-5 w-5" : "h-[30px] w-[30px]",
          isActive && !isOpenSidePanel ? "rounded-full" : "rounded-md",
        )}
      />
    );
  }

  //else if is IconType render icon
  return (
    <ReactIcon className={isOpenSidePanel ? "h-5 w-5" : "h-[30px] w-[30px]"} />
  );
};

const SidePanelItem = ({ title, to, icon }: IProps) => {
  const pathname = usePathname();
  const { lang } = useParams();
  const isActive = pathname === `/${lang}${to === "/" ? "" : to}`;

  const isOpenSidePanel = useCheckSidePanelOpen();

  return (
    <MenuItem
      aria-level={1}
      active={isActive}
      icon={renderIcon(icon, isOpenSidePanel, isActive)}
      component={<Link href={`/${lang}${to}`} />}
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
