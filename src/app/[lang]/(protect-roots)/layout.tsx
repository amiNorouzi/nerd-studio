import React, { Suspense } from "react";
import type { Locale } from "../../../../i18n.config";
import { SidePanel } from "@/components/layout/side-panel";
import SignupQuestions from "@/components/shared/SignupQuestions";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const session = await getServerSession(authConfig);

  if (!session) return redirect("/signup");

  return (
    <div className="flex h-dvh w-dvw">
      <SidePanel />
      <div id="main" className="flex h-full w-full flex-col overflow-x-hidden">
        <Suspense>
          <main className="h-full w-full">{children}</main>
          <SignupQuestions />
        </Suspense>
      </div>
    </div>
  );
}
