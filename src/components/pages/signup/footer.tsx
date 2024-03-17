import Link from "next/link";
import type { ParamsType } from "@/services/types";
import { getDictionary } from "@/lib/dictionary";
interface IProps {
  params: ParamsType;
}
export async function Footer({ params }: IProps) {
  const { common } = await getDictionary(params.lang);
  return (
    <footer className="opacity-0">
      <span className="text-xs text-white">
        This site is protected by reCAPTCHA and the Google{" "}
        <Link href="#" className="underline">
          {common.privacy_policy}
        </Link>
        {common.and}{" "}
        <Link href="#" className="underline">
          {common.terms_of_service}
        </Link>{" "}
        {common.apply}
      </span>
    </footer>
  );
}
