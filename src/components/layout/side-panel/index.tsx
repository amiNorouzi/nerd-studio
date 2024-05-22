"use client";
import { useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";
import { Sidebar } from "react-pro-sidebar";
import { useUiStore } from "@/stores/zustand/ui-store";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";
import useOutsideClick from "@/hooks/useOutSideClick";
import { getHslColorByVar } from "@/lib/utils";
import { dirInLocalStorage } from "@/stores/browser-storage";
import { useHistoryStore } from "@/stores/zustand/history-store";
import SidePanelHeader from "./SidePanelHeader";
import SidePanelMenu from "./SidePanelMenu";
import { UserPanel } from "@/components/user";

export function SidePanel() {
  const isMobile = useMediaQuery("(max-width:1024px)");
  const isSidePanelOpen = useUiStore.use.isSidePanelOpen();
  const pathname = usePathname();
  const { lang } = useParams();
  const isHoverOnSidePanel = useUiStore.use.isHoverOnSidePanel();
  const setIsHoverOnSidePanel = useUiStore.use.setIsHoverOnSidePanel();
  const setIsSidePanelOpen = useUiStore.use.setIsSidePanelOpen();
  const isCollapsed = !isSidePanelOpen;
  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const isLtr = dir === "ltr";
  const { activeTheme } = useTheme();
  const sidebarRef = useRef(null);

  const isMainHeader = [`/${lang}/dashboard`, `/${lang}/workspace`, `/${lang}/app-store`].includes(pathname);

  useEffect(() => {
    const main = document.getElementById("main");
    if (main) {
      main.classList.toggle("main-padding", isCollapsed && !isMobile);
    }
  }, [isCollapsed, isMobile]);

  useOutsideClick(sidebarRef, isMobile, setIsSidePanelOpen);
  const setGrammarHistoryIsOpen = useHistoryStore.use.setGrammarHistoryIsOpen();
  const setSelectHistoryItem = useHistoryStore.use.setSelectHistoryItem();

  const isOpen = !isCollapsed || isHoverOnSidePanel;

  return (
    <>
      <div>
        <Sidebar
          ref={sidebarRef}
          collapsed={isCollapsed}
          collapsedWidth={isMobile ? "0" : isHoverOnSidePanel ? "180px" : "60px"}
          width="180px"
          transitionDuration={500}
          backgroundColor={getHslColorByVar("--background")}
          rootStyles={{
            overflow: "hidden",
            borderRightWidth: isLtr ? "1px" : 0,
            borderLeftWidth: isLtr ? 0 : "1px",
            borderColor: getHslColorByVar("--border"),
            position: isMobile || isCollapsed ? "fixed" : "sticky",
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
          <SidePanelHeader
            isCollapsed={isCollapsed}
            isHoverOnSidePanel={isHoverOnSidePanel}
            isMainHeader={isMainHeader}
            setIsSidePanelOpen={setIsSidePanelOpen}
          />
          <SidePanelMenu
            isOpen={isOpen}
            activeTheme={activeTheme}
            setGrammarHistoryIsOpen={setGrammarHistoryIsOpen}
            setSelectHistoryItem={setSelectHistoryItem}
          />
        </Sidebar>
      </div>
      <UserPanel />
    </>
  );
}
