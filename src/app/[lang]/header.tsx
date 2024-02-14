"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n } from "../../../i18n.config";
import { redirectedPathName } from "@/lib/redirectedPathName";
import { useGetDictionary } from "@/hooks/useGetDictionary";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeDir } from "@/hooks/useChangeDir";
import { langDir } from "@/lib/dictionary";
export function Header() {
  const pathName = usePathname();
  const { navigation, dir } = useGetDictionary();
  const { changeDir, dirState } = useChangeDir();
  return (
    <div className="m-2 flex gap-x-1">
      <p>{navigation.home}</p>
      {i18n.locales.map(locale => {
        return (
          <Link
            href={redirectedPathName(pathName, locale)}
            className=" bg-black px-3 py-2 text-white"
            onClick={() => changeDir(langDir[locale])}
            key={locale}
          >
            <Button>{locale}</Button>
          </Link>
        );
      })}

      <Select
        value={dirState}
        onValueChange={(v: typeof dirState) => changeDir(v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="direction" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>direction</SelectLabel>
            <SelectItem value="ltr">ltr</SelectItem>
            <SelectItem value="rtl">rtl</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
