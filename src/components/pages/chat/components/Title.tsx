"use client"
import { useGetDictionary } from "@/hooks";
// import type { Locale } from "../../../../../i18n.config";
import Image from "next/image";

export function Title() {
  const {
    page: { chat },
  } = useGetDictionary();

  return (
    <div className="col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <h3 className="text-2xl font-medium leading-[18px]">
          {chat.title_nerd_welcome}
        </h3>
        <Image
          src="/images/logo.png"
          alt="nerd logo"
          width={50}
          height={40}
          className="w-10"
        />
      </div>
      <p className="text-center text-muted-foreground">
        {chat.description_nerd_welcome}
      </p>
    </div>
  );
}
