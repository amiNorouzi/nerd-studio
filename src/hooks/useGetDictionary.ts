"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "../../i18n.config";
import defaultLang from "@/dictionaries/en.json";
export function useGetDictionary() {
  const { lang } = useParams();
  const [dictionary, setDictionary] = useState(defaultLang);
  useEffect(() => {
    const fetchDictionary = async () =>
      setDictionary(await getDictionary(lang as Locale));

    fetchDictionary();
  }, [lang]);

  return dictionary;
}
