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
      <Header className="h-apps-header" />
      <div style={{ height: "var(--apps-main-height" }} className="bg-image">
        {children}
      </div>
    </section>
  );
}
