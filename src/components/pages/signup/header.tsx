import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
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
        <span className="text-lg font-semibold">Nerd Studio</span>
      </div>
      <div className="flex items-center justify-start gap-2">
        <span>{`Already playing with ClickUp?`}</span>
        <Link href="login">
          <Button size="lg" className="text-sm font-bold shadow-2xl">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}
