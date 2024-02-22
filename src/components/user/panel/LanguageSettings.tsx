"use client";
import { useParams, usePathname, useRouter } from "next/navigation";

import { GrLanguage } from "react-icons/gr";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { useChangeDir } from "@/hooks";

import { redirectedPathName } from "@/lib/redirectedPathName";
import { langDir } from "@/lib/dictionary";
import { languages } from "@/constants/languages";

//Language settings panel in user panel dialog

export default function LanguageSettings() {
  const pathName = usePathname();
  const router = useRouter();
  const currentLang = useParams().lang as string;
  const { changeDir } = useChangeDir();

  /**
   * Change language handler for select component
   * @param lang - target language to select
   */
  const handleChangeLang = (lang: string) => {
    router.replace(redirectedPathName(pathName, lang));
    changeDir(langDir[lang as keyof typeof langDir]);
  };

  return (
    <Select value={currentLang} onValueChange={handleChangeLang}>
      <SelectTrigger className="w-60">
        <div className="row gap-2.5">
          <GrLanguage size="1rem" />
          <p>{languages.find(l => l.value === currentLang)?.title}</p>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="col gap-1">
          {languages.map(lang => (
            <SelectItem
              key={lang.value}
              value={lang.value}
              className={
                lang.value === currentLang ? "!bg-active !text-primary" : ""
              }
            >
              {lang.title} <br />
              <span className="text-xs font-normal text-muted-foreground">
                {lang.englishTitle}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
