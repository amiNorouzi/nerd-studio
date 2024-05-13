"use client";
import { useEffect, useRef } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { Menu, Sidebar } from "react-pro-sidebar";

import { useSidbarPDfStore } from "@/stores/zustand/ui-store";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";
import useOutsideClick from "@/hooks/useOutSideClick";

import { cn, getHslColorByVar } from "@/lib/utils";
import { dirInLocalStorage } from "@/stores/browser-storage";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
  TbPdf,
} from "react-icons/tb";
import SidePanelItemPdf from "./SidePanelItemPdf";
import { Badge } from "@/components/ui/badge";
import { LuPlus } from "react-icons/lu";
import PdfUploadSection from "./pdf-upload-section";
import { useGetUploadedPdf } from "@/services/upload-pdf";

//side panel by react-pro-sidebar
//changed it open on hover by onMouseEnter and onMouseLeave event
//overlay on hover and expand on open button click

export function SidebarChatPdf() {
  const isMobile = useMediaQuery("");
  const isSidePanelOpen = useSidbarPDfStore.use.isSidePanelOpen();
  const pathname = usePathname();
  const { lang } = useParams();
  const isHoverOnSidePanel = useSidbarPDfStore.use.isHoverOnSidePanel();
  //
  const setIsHoverOnSidePanel = useSidbarPDfStore.use.setIsHoverOnSidePanel();
  //
  const setIsSidePanelOpen = useSidbarPDfStore.use.setIsSidePanelOpen();
  const collapsed = !isSidePanelOpen;
  const dir = dirInLocalStorage.get().dir ?? "ltr";
  const isLtr = dir === "ltr";
  const { activeTheme } = useTheme();

  const isMainHeader =
    pathname === `/${lang}/dashboard` ||
    pathname === `/${lang}/workspace` ||
    pathname === `/${lang}/app-store`;

  useEffect(() => {
    const main = document.getElementById("main");
    if (collapsed && !isMobile) {
      main!.classList.add("main-padding");
    } else {
      main!.classList.remove("main-padding");
    }
  }, [collapsed, isMobile, lang]);

  //Handel outsideClick in mobile
  const sidebarRefChatPdf = useRef<HTMLHtmlElement>(null);
  useOutsideClick(sidebarRefChatPdf, isMobile, setIsSidePanelOpen);
  const router = useRouter();

  const isOpen = !collapsed || isHoverOnSidePanel;

  const { data, isLoading, refetch, isSuccess } = useGetUploadedPdf();

  return (
    <>
      <div>
        <Sidebar
          ref={sidebarRefChatPdf}
          collapsed={collapsed}
          collapsedWidth={
            isMobile ? "0" : isHoverOnSidePanel ? "240px" : "68px"
          }
          width="240px"
          transitionDuration={500}
          backgroundColor={getHslColorByVar("--background")}
          rootStyles={{
            overflow: "hidden",
            borderRightWidth: isLtr ? "1px" : 0,
            borderLeftWidth: isLtr ? 0 : "1px",
            borderColor: getHslColorByVar("--border"),
            // position: isMobile || collapsed ? "static" : "sticky",
            position: "static",
            top: 0,
            bottom: 0,
            zIndex: 30,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // border:"1px solid"
          }}
        >
          <div
            className={cn(
              "row gap-4 border-b bg-[#9373EE] py-2",
              !collapsed || isHoverOnSidePanel
                ? "px-4 "
                : "!w-full overflow-hidden px-3",
              isMainHeader ? "h-header" : "h-apps-header",
            )}
          >
            {!isOpen && (
              <div className="w-11 text-center ">
                <TbLayoutSidebarLeftExpand
                  onClick={() => setIsHoverOnSidePanel(true)}
                  className={` text-white ${isOpen ? " md:h-5 md:w-5" : " w-11 md:h-5"}`}
                />
              </div>
            )}
            <h1 className=" whitespace-nowrap pr-5 text-lg font-bold text-white md:text-xl">
              History Upload
            </h1>
            {isOpen && (
              <div className="w-11 text-center ">
                <TbLayoutSidebarLeftCollapse
                  onClick={() => setIsHoverOnSidePanel(false)}
                  className={` text-white ${isOpen ? " md:h-5 md:w-5" : "me-2 w-11 md:h-5"}`}
                />
              </div>
            )}
          </div>
          <div
            className={cn(
              "row gap-4 border-b py-2",
              !collapsed || isHoverOnSidePanel
                ? "px-4 "
                : "!w-full overflow-hidden px-3",
            )}
          >
            {isOpen ? (
              <div className="h-auto  w-full text-center ">
                <PdfUploadSection />
              </div>
            ) : (
              <div
                onClick={() => setIsHoverOnSidePanel(true)}
                className=" rounded-lg border-2 border-dashed  text-center  "
              >
                <Badge className="w-11 rounded-lg bg-[#F9F6FF] p-3 text-[#9373EE]">
                  <LuPlus className=" h-5 w-5" />
                </Badge>
              </div>
            )}
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
                padding: isOpen ? "1px 10px" : "",
                height: "var(--spacing-element-height)",
                width: "100%",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "var(--hover)",
                },
                // border:"1px solid "
              }),
              icon: {
                margin: "0 auto",
              },
            }}
          >
            {!isLoading
              ? isSuccess &&
                data?.map(({ path, title, id }: any) => {
                  return (
                    <span
                      key={id}
                      onClick={() => {
                        setIsHoverOnSidePanel(true);
                        refetch();
                      }}
                    >
                      <SidePanelItemPdf
                        title={title.substring(0, 20)}
                        id={id}
                        to={path}
                        icon={TbPdf}
                        refetch={refetch}
                      />
                    </span>
                  );
                })
              : ""}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
