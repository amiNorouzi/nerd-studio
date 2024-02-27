import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between ">
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
        <div className="flex items-center justify-between gap-2">
          <span>{`Don't have an account?`}</span>
          <Link href="/signup">
            <Button size="lg" className="text-sm font-bold shadow">
              Sign up
            </Button>
          </Link>
        </div>
      </header>
      {children}
      <footer>
        <span className="text-xs text-white">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link href="#" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline">
            Terms of Service
          </Link>{" "}
          apply.
        </span>
      </footer>
    </div>
  );
}
