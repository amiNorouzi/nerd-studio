import React from "react";
import { Header } from "@/components/layout/header";
export default function AppsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full flex-col">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Header className="h-[3.5rem]" />
      <div style={{ height: "calc(100% - 3.5rem)" }}>{children}</div>
    </section>
  );
}
