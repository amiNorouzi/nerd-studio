import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ParamsType } from "@/services/types";
import { getDictionary } from "@/lib/dictionary";
interface IProps {
  params: ParamsType;
}
export async function Header({ params }: IProps) {
  const {
    common,
    page: { signup },
  } = await getDictionary(params.lang);
  return (
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
      <div className="flex items-center justify-start gap-2">
        <span>{`Already playing with ClickUp?`}</span>
        <Link href="login">
          <Button size="lg" className="text-sm font-bold shadow-2xl">
            {signup.login}
          </Button>
        </Link>
      </div>
    </header>
  );
}
