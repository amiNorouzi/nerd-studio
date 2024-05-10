import React from 'react';
import type {Metadata, Viewport} from 'next';

import {Providers} from '@/components/providers';

import {i18n, type Locale} from '../../../i18n.config';

import '../globals.css';
import '../theme.css';
import {langDir} from '@/lib/dictionary';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/auth';

const APP_NAME = "Nerd Studio";
const APP_DEFAULT_TITLE = "Nerd Studio | Home";
const APP_TITLE_TEMPLATE = "Nerd Studio | %s";
const APP_DESCRIPTION = "Nerd Studio AI";

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
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
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
      <body suppressHydrationWarning className="h-screen w-dvw overflow-y-hidden">
        <NextAuthProvider session={session}>
          <Providers>{children}</Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
