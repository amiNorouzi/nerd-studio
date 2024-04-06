import { memo } from "react";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import { MenuItem } from "react-pro-sidebar";

import { cn, getHslColorByVar } from "@/lib/utils";
import useCheckSidePanelOpen from "@/components/layout/side-panel/hooks/useCheckSidePanelOpen";

import type { AppIconType } from "@/components/svg-icons/AppsIcons";
import { IconType } from "react-icons";
import { iconVariants } from "@/constants/variants";

interface IProps {
  title: string;
  to: string;
  icon: IconType | AppIconType;
}

/**
 * menu item left icon render image or icon from React icons
 * @param icon //string for image src or React icon type
 * @param isOpenSidePanel for change icon size in open and close
 * @param isActive round image if is active passed true
 * @param hasCustomIcon
 */
const renderIcon = (
  icon: IconType | AppIconType,
  isOpenSidePanel: boolean,
  isActive: boolean,
  hasCustomIcon: boolean,
) => {
  const Icon = icon;

  if (hasCustomIcon) {
    return <Icon isActive={isActive} hasTitle={isOpenSidePanel} />;
  }

  return (
    <Icon
      className={cn(
        "text-muted-foreground",
        iconVariants({ size: isOpenSidePanel ? "md" : "lg" }),
        isActive && "text-primary",
      )}
    />
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
      icon={renderIcon(icon, isOpenSidePanel, isActive, to.includes("grammar"))}
      component={<Link href={`/${lang}${to}`} />}
      rootStyles={{
        color: getHslColorByVar("--foreground"),
        fontSize: "13px",
        fontWeight: 400,
        "&>a": {
          justifyContent: isOpenSidePanel ? "start" : "center",
          transition: "all 300ms",
          borderColor: "transparent",
          borderLeft: "3px solid transparent",
          "&>.ps-menu-label": {
            display: isOpenSidePanel ? "flex" : "none",
          },
          borderLeftColor: isActive
            ? getHslColorByVar("--primary")
            : "transparent",
        },
      }}
    >
      <span className={isOpenSidePanel ? "" : "!hidden"}>{title}</span>
    </MenuItem>
  );
};

export default memo(SidePanelItem);
