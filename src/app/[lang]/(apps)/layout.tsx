import React from "react";
import { Header } from "@/components/layout/header";
export default function AppsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full flex-col">
      {/* header for apps that includes share , history , tabs and app title */}
      <Header className="h-apps-header" />
      {/*apps*/}
      <div style={{ height: "var(--apps-main-height" }} className="bg-image">
        {children}
      </div>
    </section>
  );
}
