import React, { Suspense } from "react";
import type { Locale } from "../../../../i18n.config";
import { SidePanel } from "@/components/layout/side-panel";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <div className="flex h-dvh w-dvw">
      <SidePanel />
      <div id="main" className="flex h-full w-full flex-col overflow-x-hidden">
        <Suspense>
          <main className="h-full w-full">{children}</main>
        </Suspense>
      </div>
    </div>
  );
}
