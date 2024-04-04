"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

import { Menu, Sidebar } from "react-pro-sidebar";
import { RiMenuFoldLine } from "react-icons/ri";

import SidePanelItem from "./SidePanelItem";
import { UserMenu, UserPanel } from "@/components/user";
import SpaceItems from "@/components/layout/side-panel/SpaceItems";
import { Button } from "@/components/ui/button";

import { useUiStore } from "@/stores/zustand/ui-store";
import useMobileSize from "@/hooks/useMobileSize";

import { cn, getHslColorByVar } from "@/lib/utils";
import { apps } from "@/constants/side-panel";

//side panel by react-pro-sidebar
//changed it open on hover by onMouseEnter and onMouseLeave event
//overlay on hover and expand on open button click

export function SidePanel() {
  const isMobile = useMobileSize();
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();
  const pathname = usePathname();
  const { lang } = useParams();
  const isHoverOnSidePanel = useUiStore.use.isHoverOnSidePanel();
  const setIsHoverOnSidePanel = useUiStore.use.setIsHoverOnSidePanel();
  const setIsSidePanelOpen = useUiStore.use.setIsSidePanelOpen();
  const collapsed = !isSidePanelOpen;

  const isMainHeader =
    pathname === `/${lang}` ||
    pathname === `/${lang}/workspace` ||
    pathname === `/${lang}/app-store`;

  //need to add padding to main because sidebar go over it on fixed position
  useEffect(() => {
    const main = document.getElementById("main");
    if (collapsed && !isMobile) {
      main!.style.paddingLeft = "68px";
    } else {
      main!.style.paddingLeft = "0px";
    }
  }, [collapsed, isMobile]);

  const isOpen = !collapsed || isHoverOnSidePanel;

  return (
    <>
      <div>
      <Sidebar
        collapsed={collapsed}
        collapsedWidth={isMobile ? "0" : isHoverOnSidePanel ? "240px" : "68px"}
        width="240px"
        transitionDuration={500}
        backgroundColor={getHslColorByVar("--background")}
        rootStyles={{
          overflow: "hidden",
          borderRightWidth: "1px",
          borderRightColor: getHslColorByVar("--border"),
          position: isMobile || collapsed ? "fixed" : "sticky",
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
            "row gap-2.5 border-b py-2",
            !collapsed || isHoverOnSidePanel
              ? "px-4 "
              : "!w-full overflow-hidden px-3",
            isMainHeader ? "h-header" : "h-apps-header",
          )}
        >
          <Image
            src="/images/logo.png"
            alt="nerd logo"
            width={50}
            height={40}
            className={isOpen ? "w-9 md:w-10" : "me-4 w-11"}
          />
          <h1 className="text-gradiant whitespace-nowrap text-lg font-bold md:text-xl">
            Nerd Studio
          </h1>

          <Button
            variant="ghost"
            className="fit me-2 ms-auto p-1 text-muted-foreground lg:hidden"
            onClick={() => setIsSidePanelOpen(false)}
          >
            <RiMenuFoldLine size="1.3rem" />
          </Button>
        </div>

        <Menu
          rootStyles={{
            padding: "10px 0",
          }}
          menuItemStyles={{
            button: ({ active }) => ({
              background: active
                ? `linear-gradient(90deg, ${getHslColorByVar("--primary-light")}, transparent)`
                : "transparent",
              color: active
                ? getHslColorByVar("--foreground")
                : getHslColorByVar("--muted-foreground"),
              display: "flex",
              justifyContent: isOpen ? "start" : "center",
              alignItems: "center",
              padding: isOpen ? "1px 10px" : "1px 4px 1px 0px",
              height: "45px",
              width: "100%",
              zIndex: 1,
              "&:hover": {
                backgroundColor: "var(--hover)",
              },
            }),
            icon: {
              margin: "0 auto",
            },
          }}
        >
          {apps.map(app => (
            <SidePanelItem
              key={app.id}
              title={app.title}
              to={app.route}
              icon={app.icon}
            />
          ))}

          <div className="col absolute inset-x-0 bottom-0 gap-1.5 py-2">
            <SpaceItems />
            <UserMenu />
          </div>
        </Menu>
      </Sidebar>
      </div>
      <UserPanel />
    </>
  );
}
