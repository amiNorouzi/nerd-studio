import React from "react";
import type { Metadata } from "next";

import { Providers } from "@/components/providers";

import { i18n, type Locale } from "../../../i18n.config";

import "../globals.css";
import "../theme.css";

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

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} dir="ltr">
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
