"use client";
import { memo } from "react";

import { MenuItem } from "react-pro-sidebar";
import { MdDelete } from "react-icons/md";

import { cn, getHslColorByVar } from "@/lib/utils";

import { IconType } from "react-icons";
import { iconVariants } from "@/constants/variants";
import { useSidbarPDfStore } from "@/stores/zustand/ui-store";
import { usePdfDelete } from "@/services/upload-pdf";
import { useSelectedFilePdfStore } from "@/stores/zustand/chat-pdf-file";

interface IProps {
  title: string;
  to: string;
  id: string;
  icon: IconType;
  refetch: () => void;
}

/**
 * menu item left icon render image or icon from React icons
 * @param icon //string for image src or React icon type
 * @param isOpenSidePanel for change icon size in open and close
 * @param isActive round image if is active passed true
 * @param hasCustomIcon
 */
const renderIcon = (
  icon: IconType,
  isOpenSidePanel: boolean,
  isActive: boolean,
) => {
  const Icon = icon;

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

const SidePanelItemPdf = ({ title, to, icon, id, refetch }: IProps) => {
  const isSidePanelOpen = useSidbarPDfStore.use.isSidePanelOpen();
  const { mutate, isSuccess, isPending } = usePdfDelete();
  const isHoverOnSidePanel = useSidbarPDfStore.use.isHoverOnSidePanel();

  const setSelectedFilePdfUrl =
    useSelectedFilePdfStore.use.setSelectedFilePdf();
  const isOpenSidePanel = isSidePanelOpen || isHoverOnSidePanel;

  const isActive = false;
  const onDeleteHandler = () => {
    if (!isPending) {
      mutate({ id: id });
    }
  };
  return (
    <MenuItem
      aria-level={1}
      icon={renderIcon(icon, isOpenSidePanel, isActive)}
      component={<div></div>}
      rootStyles={{
        color: getHslColorByVar("--foreground"),
        fontSize: "13px",
        fontWeight: 400,
        width: "100%",
        "&>a": {
          justifyContent: isOpenSidePanel ? "start" : "center",
          transition: "all 300ms",
          borderColor: "transparent",
          borderLeft: "3px solid transparent",
          backgroundColor: "red",
        },
      }}
    >
      {isOpenSidePanel && (
        <div className="flex w-full items-center  justify-between gap-4">
          <div
            onClick={() => setSelectedFilePdfUrl(to)}
            className="flex w-full items-center  justify-between gap-4"
          >
            {title}
          </div>
          <div className="">
            <MdDelete
              onClick={() => {
                onDeleteHandler()
                refetch();
              }}
              className={`${isPending ? "disabled:text-red-300" : "hover:text-red-600"} h-4 w-4 `}
            />
          </div>
        </div>
      )}
    </MenuItem>
  );
};

export default memo(SidePanelItemPdf);
