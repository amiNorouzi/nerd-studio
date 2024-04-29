"use client";
import { memo } from "react";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import { MenuItem } from "react-pro-sidebar";

import { cn, getHslColorByVar } from "@/lib/utils";
import useCheckSidePanelOpen from "@/components/layout/side-panel/hooks/useCheckSidePanelOpen";

import type { AppIconType } from "@/components/svg-icons/AppsIcons";
import { IconType } from "react-icons";
import { iconVariants } from "@/constants/variants";
import { useSidbarPDfStore } from "@/stores/zustand/ui-store";

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

const SidePanelItemPdf = ({ title, to, icon }: IProps) => {
  const isSidePanelOpen = useSidbarPDfStore.use.isSidePanelOpen();
  const { lang } = useParams();
  const isHoverOnSidePanel = useSidbarPDfStore.use.isHoverOnSidePanel();

  const isOpenSidePanel = isSidePanelOpen || isHoverOnSidePanel;
  console.log(isOpenSidePanel);

  const isActive = false;
  return (
    <MenuItem
      aria-level={1}
      icon={renderIcon(icon, isOpenSidePanel, isActive, to.includes("grammar"))}
      component={<div></div>}
      rootStyles={{
        color: getHslColorByVar("--foreground"),
        fontSize: "13px",
        fontWeight: 400,
        width: "100%",
        // border: "1px solid",
        "&>a": {
          justifyContent: isOpenSidePanel ? "start" : "center",
          transition: "all 300ms",
          borderColor: "transparent",
          borderLeft: "3px solid transparent",
          backgroundColor: "red",
        },
      }}
    >
      {isOpenSidePanel && <span>{title}</span>}
    </MenuItem>
  );
};

export default memo(SidePanelItemPdf);
