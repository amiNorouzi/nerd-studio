"use client";
import { useEffect, useRef } from "react";
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
import { useTheme } from "@/hooks/useTheme";
import useOutsideClick from "@/hooks/useOutSideClick";

import { cn, getHslColorByVar } from "@/lib/utils";
import { apps } from "@/constants/side-panel";
import { dirInLocalStorage } from "@/stores/browser-storage";
import { useHistoryStore } from "@/stores/zustand/history-store";

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
  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const isLtr = dir === "ltr";
  const { activeTheme } = useTheme();

  const isMainHeader =
    pathname === `/${lang}/dashboard` ||
    pathname === `/${lang}/workspace` ||
    pathname === `/${lang}/app-store`;

  //need to add padding to main because sidebar go over it on fixed position
  useEffect(() => {
    const main = document.getElementById("main");
    if (collapsed && !isMobile) {
      main!.classList.add("main-padding");
    } else {
      main!.classList.remove("main-padding");
    }
  }, [collapsed, isMobile, lang]);

  //Handel outsideClick in mobile
  const sidebarRef = useRef<HTMLHtmlElement>(null);
  useOutsideClick(sidebarRef, isMobile, setIsSidePanelOpen);
  const setGrammarHistoryIsOpen = useHistoryStore.use.setGrammarHistoryIsOpen();
  const setSelectHistoryItem = useHistoryStore.use.setSelectHistoryItem();

  const isOpen = !collapsed || isHoverOnSidePanel;

  return (
    <>
      <div>
        <Sidebar
          ref={sidebarRef}
          collapsed={collapsed}
          collapsedWidth={
            isMobile ? "0" : isHoverOnSidePanel ? "180px" : "68px"
          }
          width="180px"
          transitionDuration={500}
          backgroundColor={getHslColorByVar("--background")}
          rootStyles={{
            overflow: "hidden",
            borderRightWidth: isLtr ? "1px" : 0,
            borderLeftWidth: isLtr ? 0 : "1px",
            borderColor: getHslColorByVar("--border"),
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
                : "!w-full overflow-hidden px-4",
              isMainHeader ? "h-header" : "h-apps-header",
            )}
          >
            <Image
              src="/images/logo.png"
              alt="nerd logo"
              width={24}
              height={24}
            />
            <h1 className="text-gradiant whitespace-nowrap text-lg font-bold">
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
                  ? `linear-gradient(90deg, ${getHslColorByVar(activeTheme.includes("-dark") ? "--primary-dark" : "--primary-light")}, transparent)`
                  : "transparent",
                color: active
                  ? getHslColorByVar("--foreground")
                  : getHslColorByVar("--muted-foreground"),
                display: "flex",
                justifyContent: isOpen ? "start" : "center",
                alignItems: "center",
                padding: isOpen ? "1px 10px" : "1px 4px 1px 0px",
                height: "var(--spacing-element-height)",
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
            onClick={() => {
              setGrammarHistoryIsOpen(false);
              setSelectHistoryItem({
                answer_text: "",
                id: 0,
                app_type: "grammar",
                uuid: "12121212",
                created_at: "12121212",
              });
            }}
          >
            {apps.map(app => (
              <SidePanelItem
                key={app.id}
                title={app.title}
                to={app.route}
                icon={app.Icon}
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
