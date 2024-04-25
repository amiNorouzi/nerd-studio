import { memo } from "react";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";

import { MenuItem } from "react-pro-sidebar";

import { cn, getHslColorByVar } from "@/lib/utils";
import useCheckSidePanelOpen from "@/components/layout/side-panel/hooks/useCheckSidePanelOpen";
import { IconType } from "react-icons";
import { iconVariants } from "@/constants/variants";

interface IProps {
  title: string;
  to: string;
  icon: IconType;
}

/**
 * menu item left icon render image or icon from React icons
 * @param icon
 * @param isActive
 */
const renderIcon = (icon: IconType, isActive: boolean) => {
  const Icon = icon;

  return (
    <Icon
      className={cn(
        "text-muted-foreground",
        iconVariants({ size: "md" }),
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
      icon={renderIcon(icon, isActive)}
      component={<Link href={`/${lang}${to}`} />}
      className={"text-sm"}
      rootStyles={{
        color: getHslColorByVar("--foreground"),
        fontWeight: 400,
        "&>a": {
          transition: "all 300ms",
          borderColor: "transparent",
          borderLeft: "3px solid transparent",
          padding: "10px !important",
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
