import type { Metadata, Viewport } from "next";
import React from "react";

import { Providers } from "@/components/providers";

import { i18n, type Locale } from "../../../i18n.config";

import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import { auth } from "@/config/auth";
import "@/config/globals.css";
import "@/config/theme.css";
import { langDir } from "@/lib/dictionary";
import { APP_DEFAULT_TITLE, APP_DESCRIPTION, APP_NAME, APP_TITLE_TEMPLATE } from "@/constants/app-info";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  other: {
    cryptomus: "4e5e222e",
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
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

  const session = await auth();

  return (
    <html lang={params.lang} dir={langDir[params.lang]}>
      <body
        suppressHydrationWarning
        className="flex h-dvh w-full max-w-[1920px] justify-center"
      >
        <NextAuthProvider session={session}>
          <Providers>{children}</Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
