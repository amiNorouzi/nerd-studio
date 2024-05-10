import Image from "next/image";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "../../../../../i18n.config";

export default async function Title({ lang }: { lang: Locale }) {
  const {
    page: { chat },
  } = await getDictionary(lang);

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
