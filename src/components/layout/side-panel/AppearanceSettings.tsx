"use client";
import Image from "next/image";

import { BsCheck2 } from "react-icons/bs";

import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

import type { PrimaryColor, Theme } from "@/stores/browser-storage/types";

import { primaryColors, themes } from "@/constants/theme";

export function AppearanceSettings() {
  const { activePrimaryColor, activeTheme, changeTheme } = useTheme();

  return (
    <div className="col gap-2">
      <h2>Themes</h2>
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

      <h2>Accent Colors</h2>
      <div className="row gap-2">
        {primaryColors.map(primary => (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            style={{ backgroundColor: primary.color }}
            key={primary.id}
            onClick={() =>
              changeTheme({
                primaryColorClass: primary.key as PrimaryColor,
              })
            }
          >
            <RenderIf isTrue={primary.key === activePrimaryColor}>
              <BsCheck2 size="1.5rem" />
            </RenderIf>
          </Button>
        ))}
      </div>
    </div>
  );
}
