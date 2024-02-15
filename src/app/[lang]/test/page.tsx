import { getDictionary } from "@/lib/dictionary";
import { Header } from "@/app/[lang]/header";
import { i18n } from "../../../../i18n.config";

export default async function Page({
  params: { lang },
}: {
  params: { lang: "en" | "fr" | "de" };
}) {
  const { navigation } = await getDictionary(lang);
  return (
    <div>
      <Header />
      <p>{navigation.home}</p>
    </div>
  );
}
