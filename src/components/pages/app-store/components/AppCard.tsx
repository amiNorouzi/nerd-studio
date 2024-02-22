"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

import { MdInstallDesktop } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

import { separateNumber } from "@/lib/utils";

import type { AppItem } from "@/services/types";

/**
 * use for app list item in app store
 * @param app app item
 * @constructor
 */
function AppCard({ app }: { app: AppItem }) {
  const {
    page: {
      store: { add_button_label },
    },
  } = useGetDictionary();
  const { lang } = useParams();

  return (
    <Link href={`/${lang}${app.url}`}>
      <article className="col w-full cursor-pointer gap-3 rounded-md border bg-background p-4 transition-all duration-300 hover:shadow-card-hover">
        <div className="spacing-row">
          <Image
            src={app.imageUrl}
            alt={app.title}
            width={80}
            height={80}
            className="h-10 w-10 rounded-md"
          />
          <p className="row gap-1 text-xs font-light text-muted-foreground">
            <MdInstallDesktop size=".8rem" />
            {separateNumber(app.installCount.toString())}
          </p>
        </div>
        <h3>{app.title}</h3>
        <p className="line-clamp-2 font-normal text-muted-foreground">
          {app.description}
        </p>
        <div className="spacing-row">
          <span className="rounded-md bg-muted px-3 py-1.5 text-xs capitalize">
            {app.category}
          </span>
          <Button
            className="z-10"
            onClick={e => {
              e.preventDefault();
            }}
          >
            <IoAdd className="me-2 h-4 w-4" /> {add_button_label}
          </Button>
        </div>
      </article>
    </Link>
  );
}

export default AppCard;
