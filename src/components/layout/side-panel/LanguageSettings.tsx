"use client";

import { GrLanguage } from "react-icons/gr";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";

const languages = [
  {
    value: "en",
    title: "English",
    englishTitle: "English",
  },
  {
    value: "fa",
    title: "فارسی",
    englishTitle: "Persian",
  },
];

export function LanguageSettings() {
  const [selectedValue, setSelectedValue] = useState("en");

  return (
    <Select value={selectedValue} onValueChange={val => setSelectedValue(val)}>
      <SelectTrigger className="w-60">
        <div className="row gap-2.5">
          <GrLanguage size="1rem" />
          <p>{languages.find(l => l.value === selectedValue)?.title}</p>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="col gap-1">
          {languages.map(lang => (
            <SelectItem
              key={lang.value}
              value={lang.value}
              className={
                lang.value === selectedValue ? "!bg-active !text-primary" : ""
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
