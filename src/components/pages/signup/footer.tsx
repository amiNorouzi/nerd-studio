import Link from "next/link";
import type { ParamsType } from "@/services/types";
import { getDictionary } from "@/lib/dictionary";
interface IProps {
  params: ParamsType;
}
export async function Footer({ params }: IProps) {
  const {
    common,
    page: { login },
  } = await getDictionary(params.lang);

  return (
    <footer className='pb-5'>
        <span className="text-xs text-white">
          {login.footer_description}
          <Link href="#" className="underline">
            {common.privacy_policy}
          </Link>{" "}
          {common.and}{" "}
          <Link href="#" className="underline">
            {common.terms_of_service}
          </Link>{" "}
          {common.apply}
        </span>
    </footer>
  );
}
