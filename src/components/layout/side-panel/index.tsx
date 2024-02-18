"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Menu, Sidebar } from "react-pro-sidebar";
import { useMediaQuery } from "usehooks-ts";
import { FaAnglesLeft } from "react-icons/fa6";
import { PiChartBarLight, PiPlanet, PiShoppingBagLight } from "react-icons/pi";
import { FaPen } from "react-icons/fa6";

import SidePanelItem from "./SidePanelItem";
import { UserBalance } from "./UserBalance";
import { AccountMenu } from "./AccountMenu";
import { Button } from "@/components/ui/button";
import RenderIf from "@/components/shared/RenderIf";
import { Workspace } from "@/components/layout/workspace";

import { cn, getHslColorByVar } from "@/lib/utils";
import { useUi } from "@/stores/zustand/ui";
import { useParams } from "next/navigation";

const sidePanelItems = [
  { title: "Dashboard", to: "", icon: PiChartBarLight },
  { title: "Chat", to: "chat", icon: "/images/gpt.jpeg" },
  {
    title: "Artist",
    to: "artist",
    icon: "/images/artist.png",
  },
  {
    title: "Write",
    to: "/write",
    icon: FaPen,
  },
] as const;

export function SidePanel() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const { lang } = useParams();
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
            height: isOpen ? "35px" : "40px",
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
        {sidePanelItems.map(item => (
          <SidePanelItem
            key={item.title}
            isOpenSidePanel={isOpen}
            {...item}
            to={`/${lang}/${item.to}`}
          />
        ))}

        <div className="hr my-2 w-full" />
        <p className={cn("mb-2", !isOpen && "hidden")}>Space</p>
        <SidePanelItem
          title="App Store"
          to="/app-store"
          icon={PiShoppingBagLight}
          isOpenSidePanel={isOpen}
        />
        <SidePanelItem
          title="Workspace"
          to="/workspace"
          icon={PiPlanet}
          isOpenSidePanel={isOpen}
        />
        <div className="hr my-2 w-full" />
        <p className={cn("mb-2", !isOpen && "hidden")}>Recent</p>
        <SidePanelItem
          title="Artist"
          to="/artist"
          icon="/images/artist.png"
          isOpenSidePanel={isOpen}
        />
      </Menu>
      <div className="col absolute inset-x-0 bottom-0 gap-3 px-3 py-2">
        <RenderIf isTrue={isSidePanelOpen}>
          <Workspace />
        </RenderIf>
        <AccountMenu setHovered={setHovered} isOpenSidePanel={isOpen} />
      </div>
    </Sidebar>
  );
}
