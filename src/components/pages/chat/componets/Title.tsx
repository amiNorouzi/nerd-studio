import { OpenAiBrand } from "@/components/svg-icons";
import type { Locale } from "../../../../../i18n.config";
import { getDictionary } from "@/lib/dictionary";

export async function Title({ lang }: { lang: Locale }) {
  const {
    page: { chat },
  } = await getDictionary(lang);
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-3">
        <h3 className="text-[36px] font-medium leading-[18px]">
          {chat.title_nerd_welcome}
        </h3>
        <OpenAiBrand />
      </div>
      <p className="text-center text-sm text-muted-foreground lg:text-xl">
        {chat.description_nerd_welcome}
      </p>
    </div>
  );
}
