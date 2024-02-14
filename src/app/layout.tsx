import React from "react";
import type { Metadata } from "next";

import "./globals.css";
import "./theme.css";
import { SidePanel } from "@/components/layout/side-panel";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: {
    template: "Nerd Studio | %s",
    default: "Nerd Studio | Home",
  },
  description: "AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-dvh w-dvw">
          <SidePanel />
          <div id="main" className="flex h-full w-full flex-col">
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
