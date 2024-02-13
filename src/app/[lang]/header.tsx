"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n } from "../../../i18n.config";
import { redirectedPathName } from "@/lib/redirectedPathName";
import { useGetDictionary } from "@/hooks/useGetDictionary";
export function Header() {
  const pathName = usePathname();
  const { navigation } = useGetDictionary();
  return (
    <ul className="flex gap-x-3">
      <li>{navigation.home}</li>
      {i18n.locales.map(locale => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(pathName, locale)}
              className="rounded-md border bg-black px-3 py-2 text-white"
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
