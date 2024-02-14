"use client";

import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useMediaQuery } from "usehooks-ts";
import { useEffect, useState } from "react";
import { SidePanelItem } from "@/components/layout/side-panel/SidePanelItem";
import { FaAngleLeft, FaAppStore } from "react-icons/fa";
import { cn, getHslColorByVar } from "@/lib/utils";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";
import { useUi } from "@/stores/zustand/ui";
import { Button } from "@/components/ui/button";
import { FaAnglesLeft } from "react-icons/fa6";
import RenderIf from "@/components/shared/RenderIf";

export function SidePanel() {
  const isMobile = useMediaQuery("(max-width:768px)");

  const { isSidePanelOpen, setIsSidePanelOpen } = useUi();
  const [hovered, setHovered] = useState(false);

  const collapsed = isMobile ? true : !isSidePanelOpen;

  useEffect(() => {
    const main = document.getElementById("main");
    if (collapsed) {
      main!.style.paddingLeft = "68px";
    } else {
      main!.style.paddingLeft = "0px";
    }
  }, [collapsed]);

  const isOpen = !collapsed || hovered;

  return (
    <Sidebar
      collapsed={collapsed}
      collapsedWidth={hovered ? "240px" : "68px"}
      width="240px"
      backgroundColor={getHslColorByVar("--background")}
      rootStyles={{
        overflow: "hidden",
        borderRightWidth: "1px",
        borderRightColor: getHslColorByVar("--border"),
        position: collapsed ? "fixed" : "sticky",
        top: 0,
        bottom: 0,
        zIndex: 100,
        height: "100%",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "spacing-row h-11 py-2",
          !collapsed || hovered ? "px-4 " : "!w-full overflow-hidden px-3",
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
          <p className="whitespace-nowrap text-[13px] font-medium">
            Nerd Studio
          </p>
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
          root: { margin: "4px auto" },
          button: ({ active }) => ({
            margin: "0 auto",
            borderRadius: isOpen ? "0.5rem" : "50%",
            display: "flex",
            justifyContent: isOpen ? "start" : "center",
            alignItems: "center",
            padding: isOpen ? "1px 3px" : "2px",
            gap: isOpen ? "1px" : "0",
            height: "fit-content",
            backgroundColor: active ? "var(--hover)" : "transparent",
            border: "2px solid #900",
            aspectRatio: isOpen ? "auto" : "1 / 1",
            "&:hover": {
              backgroundColor: "var(--hover)",
            },
          }),
          icon: {
            color: getHslColorByVar("--foreground"),
            margin: "0 auto",
          },
        }}
      >
        <SidePanelItem
          title="App Store"
          to="/store"
          icon={FiShoppingBag}
          isOpenSidePanel={isOpen}
        />
        <SidePanelItem
          title="Create App"
          to="/store"
          icon={FaAppStore}
          isOpenSidePanel={isOpen}
        />
        <SidePanelItem
          title="Chat"
          to="/store"
          icon="/images/gpt.jpeg"
          isOpenSidePanel={isOpen}
        />
      </Menu>
    </Sidebar>
  );
}
