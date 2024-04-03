import React from "react";
import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

import { i18n, type Locale } from "../../../i18n.config";

import "../globals.css";
import "../theme.css";
import { langDir } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: {
    template: "Nerd Studio | %s",
    default: "Nerd Studio | Home",
  },
  description: "AI",
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} dir={langDir[params.lang]}>
      <body suppressHydrationWarning className="h-dvh w-dvw">
        <NextAuthProvider>
          <Providers>{children}</Providers>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
