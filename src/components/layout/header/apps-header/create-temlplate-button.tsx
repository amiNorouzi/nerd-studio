"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";
import { useParams, usePathname } from "next/navigation";

function CreateTemplateButton() {
  const {
    components: {
      apps_header: { create_prompt_button_label },
    },
  } = useGetDictionary();
  const pathname = usePathname();
  const { lang } = useParams();

  if (pathname !== `/${lang}/template`) return null;

  return (
    <Link href="/template/custom-template/create">
      <Button size="sm">{create_prompt_button_label}</Button>
    </Link>
  );
}

export default CreateTemplateButton;
