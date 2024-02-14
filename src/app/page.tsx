"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { primaryColors, themes } from "@/constants/theme";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { PrimaryColor, Theme } from "@/stores/browser-storage/types";
import RenderIf from "@/components/shared/RenderIf";
import { BsCheck2 } from "react-icons/bs";

export default function Home() {
  const { activePrimaryColor, activeTheme, changeTheme } = useTheme();

  return (
    <div className="p-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mr-4">Theme</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Change Theme profile</DialogTitle>
          </DialogHeader>
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
                  onClick={() =>
                    changeTheme({ themeClass: theme.key as Theme })
                  }
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
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
