"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdLanguage } from "react-icons/md";
import { CgLoadbarDoc } from "react-icons/cg";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useLocation } from "@/hooks/useLocation";

import { headerContent } from "@/constants/header-content";
import { useGetDictionary } from "@/hooks";

interface IProps {
  headerDescription: string;
}
export function HeaderDescription(props: IProps) {
  const { headerDescription } = props;
  const href = useLocation()?.href ?? "";
  const pathName = usePathname().split("/").pop() ?? "";
  const {
    components: { apps_header },
  } = useGetDictionary();
  const title =
    pathName in headerContent.apps
      ? headerContent.apps[pathName as keyof typeof headerContent.apps].title
      : "not_found";

  return (
    <div className="flex w-full  flex-col gap-5 overflow-hidden">
      <h3 className="text-[24px] font-semibold">{apps_header[title]}</h3>
      <p className="text-sm text-muted-foreground">{headerDescription}</p>
      <Link href={href} className="w-full">
        <Button
          type="button"
          className="w-full justify-start gap-1 p-0 text-sm text-primary hover:bg-inherit hover:text-primary hover:underline"
          variant="ghost"
        >
          <MdLanguage color="inherit" />
          <p className="truncate text-ellipsis"> {href}</p>
        </Button>
      </Link>
      <div className="flex gap-1">
        {/* fetch these badges from api*/}
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          <CgLoadbarDoc />
          Quick App
        </Badge>
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          <MdLanguage color="inherit" />
          English
        </Badge>
      </div>
    </div>
  );
}
