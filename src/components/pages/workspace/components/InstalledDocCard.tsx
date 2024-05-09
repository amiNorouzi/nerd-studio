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

import type { WorkspaceDocument } from "@/services/types";

/**
 * installed document card used in workspace app list tab
 * @param document - document item
 * @constructor
 */
function InstalledDocCard({ document }: { document: WorkspaceDocument }) {
  // get language from url for adding start of link href
  const { lang } = useParams();
  const {
    page: { workspace: workspaceDictionary },
  } = useGetDictionary();

  return (
    // Link to app detail page
    <Link href={`/${lang}/template/custom-template/create?app_id=${document.id}`}>
      <article className="row group w-full cursor-pointer gap-2 rounded-md border bg-background p-4 transition-all duration-300 hover:shadow-card-hover">
        {/*app icon*/}
        <Image
          src={""}
          alt={""}
          width={80}
          height={80}
          className="h-10 w-10 rounded-md"
        />
        <h3>{document.name}</h3>
        {/*hover card that show all action of installed app*/}
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
            {/*
              delete action
              with danger text and background color
            */}
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

export default InstalledDocCard;
