import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionary";
import type { ParamsType } from "@/services/types";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  params: ParamsType;
}
export default async function Layout({ children, params }: IProps) {
  const {
    common,
    page: { login },
  } = await getDictionary(params.lang);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <header className="z-50 flex w-full bg-white p-5 sm:p-8">
        <div className="me-auto flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="nerd"
            width={80}
            height={80}
            className="h-10 w-10"
          />
          <span className="text-lg font-semibold">{common.nerd_studio}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span>{login.dont_have_account}</span>
          <Link href="/signup">
            <Button size="lg" className="text-sm font-bold shadow">
              {login.signup}
            </Button>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
