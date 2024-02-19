"use client";
import { useEffect } from "react";
import Image from "next/image";

import { Menu, Sidebar } from "react-pro-sidebar";
import { useMediaQuery } from "usehooks-ts";
import { FaAnglesLeft } from "react-icons/fa6";

import SidePanelItem from "./SidePanelItem";
import { UserMenu } from "@/components/user";
import { Button } from "@/components/ui/button";
import SpaceItems from "@/components/layout/side-panel/SpaceItems";

import { cn, getHslColorByVar } from "@/lib/utils";
import { useUiStore } from "@/stores/zustand/ui-store";

import { apps } from "@/constants/side-panel";

//side panel by react-pro-sidebar
//changed it open on hover by onMouseEnter and onMouseLeave event
//overlay on hover and expand on open button click

export function SidePanel() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();
  const isHoverOnSidePanel = useUiStore.use.isHoverOnSidePanel();
  const setIsSidePanelOpen = useUiStore.use.setIsSidePanelOpen();
  const setIsHoverOnSidePanel = useUiStore.use.setIsHoverOnSidePanel();
  const collapsed = isMobile ? true : !isSidePanelOpen;

  //need to add padding to main because sidebar go over it on fixed position
  useEffect(() => {
    const main = document.getElementById("main");
    if (collapsed) {
      main!.style.paddingLeft = "68px";
    } else {
      main!.style.paddingLeft = "0px";
    }
  }, [collapsed]);

  const isOpen = !collapsed || isHoverOnSidePanel;

  return (
    <Sidebar
      collapsed={collapsed}
      collapsedWidth={isHoverOnSidePanel ? "240px" : "68px"}
      width="240px"
      transitionDuration={400}
      backgroundColor={getHslColorByVar("--background")}
      rootStyles={{
        overflow: "hidden",
        borderRightWidth: "1px",
        borderRightColor: getHslColorByVar("--border"),
        position: collapsed ? "fixed" : "sticky",
        top: 0,
        bottom: 0,
        zIndex: 40,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => setIsHoverOnSidePanel(true)}
      onMouseLeave={() => setIsHoverOnSidePanel(false)}
    >
      <div
        className={cn(
          "spacing-row h-11 py-2",
          !collapsed || isHoverOnSidePanel
            ? "px-4 "
            : "!w-full overflow-hidden px-3",
        )}
      >
        <div className="row gap-1">
          <Image
            src="/images/logo.png"
            alt="nerd logo"
            width={50}
            height={40}
            className={isOpen ? "w-8" : "me-4 w-11"}
          />
          <p className="text-xsm whitespace-nowrap font-medium">Nerd Studio</p>
        </div>
        <Button
          variant="ghost"
          className="fit p-0"
          onClick={() => setIsSidePanelOpen(false)}
        >
          <FaAnglesLeft size="1rem" />
        </Button>
      </div>

      <Menu
        rootStyles={{ padding: "4px 12px" }}
        menuItemStyles={{
          root: { margin: isOpen ? "4px auto" : "5px auto" },
          button: ({ active }) => ({
            background: active && isOpen ? "var(--active-bg)" : "transparent",
            color:
              active && isOpen
                ? getHslColorByVar("--primary")
                : getHslColorByVar("--foreground"),
            margin: "0 auto",
            borderRadius: isOpen ? "0.5rem" : "50%",
            display: "flex",
            justifyContent: isOpen ? "start" : "center",
            alignItems: "center",
            padding: isOpen ? "1px 3px" : "2px",
            gap: isOpen ? "1px" : "0",
            height: isOpen ? "32px" : "40px",
            width: isOpen ? "100%" : "40px",
            zIndex: 1,
            position: "relative",
            "&:after": {
              content: '""',
              display: active && !isOpen ? "block" : "none",
              position: "absolute",
              top: "-1px",
              left: "-1px",
              right: "-1px",
              bottom: "-1px",
              borderRadius: "50px",
              border: "2px solid transparent",
              background: "linear-gradient(#3d73eb,#de8fff) border-box",
              WebkitMask:
                "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              maskComposite: "exclude",
            },
            "&:hover": {
              backgroundColor: "var(--hover)",
            },
          }),
          icon: ({ active }) => ({
            color:
              active && isOpen
                ? getHslColorByVar("--primary")
                : getHslColorByVar("--foreground"),
            margin: "0 auto",
          }),
        }}
      >
        {apps.map(app => (
          <SidePanelItem
            key={app.id}
            title={app.title}
            to={app.route}
            icon={app.icon}
            isOpenSidePanel={isOpen}
          />
        ))}

        <div className="col absolute inset-x-0 bottom-0 gap-1.5 px-3 py-2">
          <SpaceItems isOpen={isOpen} />
          <UserMenu isOpenSidePanel={isOpen} />
        </div>
      </Menu>
    </Sidebar>
  );
}
