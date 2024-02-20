"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

import { BsThreeDots } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";
import { CgLoadbarDoc } from "react-icons/cg";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useLocation } from "@/hooks/useLocation";

import { apps } from "@/constants/side-panel";
import { headerContent } from "@/constants/header-content";
interface IProps {
  headerDescription: string;
  mdDescription: string;
}

export function Info({ mdDescription, headerDescription }: IProps) {
  const pathName = usePathname().split("/").pop() ?? "";
  const Icon =
    apps.find(item => item.route.includes(pathName))?.icon ?? apps[1].icon;
  const appsIcon =
    typeof Icon === "string" ? (
      <Image src={Icon} alt={"apps icon "} height={100} width={100} />
    ) : (
      <Icon size={100} />
    );
  const title =
    pathName in headerContent.apps
      ? headerContent.apps[pathName as keyof typeof headerContent.apps].title
      : "";

  const [open, setOpen] = useState(false);
  const location = useLocation()?.href ?? "";
  return (
    <div className="col-span-12 flex h-full w-full items-start justify-center overflow-hidden bg-background">
      <div className="flex h-full w-full  max-w-4xl flex-col items-center justify-start gap-8 overflow-hidden p-0 md:p-5">
        {/* header - actions - icon - description*/}
        <div className="flex w-full items-start justify-between gap-6">
          <span className="rounded-md">{appsIcon}</span>

          {/*header description*/}
          <div className="flex flex-col gap-5">
            <h3 className="text-[24px]">{title}</h3>
            <p className="text-sm text-muted-foreground">{headerDescription}</p>
            <Link href={location}>
              <Button
                type="button"
                className="gap-1 p-0 text-sm text-primary hover:bg-inherit hover:text-primary hover:underline"
                variant="ghost"
              >
                <MdLanguage color="inherit" />
                {location}
              </Button>
            </Link>
            <div className="flex gap-1">
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground"
              >
                <CgLoadbarDoc />
                Quick App
              </Badge>
              <Badge
                variant="secondary"
                className="bg-muted text-muted-foreground"
              >
                <MdLanguage color="inherit" />
                English
              </Badge>
            </div>
          </div>

          {/*actions(delete and add to workspace)  */}
          <div className="flex items-center gap-2">
            <Button className="bg-linearGradient">add to workSpace</Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="h-8 w-8 p-0">
                    <BsThreeDots />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={() => setOpen(true)}
                  >
                    <FiTrash /> Delete
                  </Button>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent className="w-full max-w-[450px]">
                <div className="flex items-start  gap-4">
                  <FiAlertTriangle size={30} color={"#ffa000"} />
                  <div className="flex flex-1 flex-col gap-8">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this app?</AlertDialogTitle>
                      <AlertDialogDescription>
                        It will permanently delete this app and all associated
                        data will be unrecoverable.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setOpen(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="border bg-inherit text-destructive hover:border-destructive hover:bg-inherit"
                        onClick={() => setOpen(false)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </div>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        {/*introduction - markdown viewer*/}
        <div className="flex w-full  flex-col items-start justify-start gap-2 divide-y overflow-hidden">
          <h4 className="ms-3 font-semibold">App Introduction</h4>
          <div className="h-full  overflow-y-auto py-6">
            <Markdown remarkPlugins={[remarkGfm]}>{mdDescription}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
