"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import { MdDeleteOutline } from "react-icons/md";
import { IoMdMore } from "react-icons/io";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

import type { AppItem } from "@/services/types";

function InstalledAppCard({ app }: { app: AppItem }) {
  const { lang } = useParams();
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  return (
    <Link href={`/${lang}${app.url}`}>
      <article className="row group w-full cursor-pointer gap-2 rounded-md border bg-background p-4 transition-all duration-300 hover:shadow-card-hover">
        <Image
          src={app.imageUrl}
          alt={app.title}
          width={80}
          height={80}
          className="h-10 w-10 rounded-md"
        />
        <h3>{app.title}</h3>
        <HoverCard openDelay={10} closeDelay={50}>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              className="fit ms-auto p-1 opacity-0 transition-all duration-200 group-hover:opacity-100 data-[state=open]:opacity-100"
            >
              <IoMdMore size="1rem" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent side="bottom" className="col max-w-36 p-1">
            <Button
              variant="ghost"
              className="row h-fit w-full justify-start gap-2 px-2.5 py-2 text-foreground/70
              hover:bg-destructive/10 hover:text-destructive focus-visible:ring-offset-0"
            >
              <MdDeleteOutline size="1rem" />
              {workspaceDictionary.delete_app_button_label}
            </Button>
          </HoverCardContent>
        </HoverCard>
      </article>
    </Link>
  );
}

export default InstalledAppCard;
