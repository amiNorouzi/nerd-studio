import React, { Suspense } from "react";
import type { Locale } from "../../../../i18n.config";
import { SidePanel } from "@/components/layout/side-panel";
import SignupQuestions from "@/components/shared/SignupQuestions";
import { getServerSession } from "next-auth";
import { authConfig } from "@/config/auth";
import { redirect } from "next/navigation";
import HomeLoading from "@/app/[lang]/loading";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  // this function get info from Google and if session wasn't valid (user signed out) redirect user to dashboard
  const session = await getServerSession(authConfig);

  if (!session) return redirect("/login");

  return (
    <div className="flex h-full w-full">
      <SidePanel />
      <Suspense fallback={<HomeLoading />}>
        <main id="main" className="main-padding flex h-full w-full flex-col">
          {children}
        </main>
        <SignupQuestions />
      </Suspense>
    </div>
  );
}
