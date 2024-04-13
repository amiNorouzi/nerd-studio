"use client";
import Image from "next/image";

import { BsCheck2 } from "react-icons/bs";

import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";

import { useTheme } from "@/hooks/useTheme";
import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { PrimaryColor, Theme } from "@/stores/browser-storage/types";

import { primaryColors, themes } from "@/constants/theme";
import { iconVariants } from "@/constants/variants";

/**
 * Appearance settings panel in user panel dialog
 * @constructor
 */
export default function AppearanceSettings() {
  const { activePrimaryColor, activeTheme, changeTheme } = useTheme();
  const userPanelDictionary = useGetDictionary().components.user.panel;

  return (
    <div className="col gap-2">
      {/*
          list of themes
          this change background color, popover background color, overlay color, muted color and text color
      */}
      <h2>{userPanelDictionary.appearance_themes_title}</h2>
      <div className="row mb-4 gap-2">
        {themes.map(theme => (
          <Button
            variant="ghost"
            className={cn(
              "fit overflow-hidden rounded-lg border-2 p-0",
              activeTheme === theme.key && "border-primary",
            )}
            key={theme.id}
            onClick={() => changeTheme({ themeClass: theme.key as Theme })}
          >
            <Image
              src={`/images/themes/${theme.image}`}
              alt={theme.key}
              width={250}
              height={200}
              className="!h-[72px] !w-[104px] object-cover"
            />
          </Button>
        ))}
      </div>

      {/*
            list of primary colors
            this change primary color of the theme
        */}
      <h2>{userPanelDictionary.appearance_colors_title}</h2>
      <div className="row gap-2">
        {primaryColors.map(primary => (
          <Button
            variant="ghost"
            className="centered-col w-element rounded-full p-2"
            style={{ backgroundColor: primary.color }}
            key={primary.id}
            onClick={() =>
              changeTheme({
                primaryColorClass: primary.key as PrimaryColor,
              })
            }
          >
            <RenderIf isTrue={primary.key === activePrimaryColor}>
              <BsCheck2 className={iconVariants({ size: "md" })} />
            </RenderIf>
          </Button>
        ))}
      </div>
    </div>
  );
}
