import React from "react";
import type { Metadata } from "next";

import "./globals.css";
import "./theme.css";

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
      <body className="theme-slate primary-green">{children}</body>
    </html>
  );
}
