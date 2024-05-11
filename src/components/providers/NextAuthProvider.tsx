"use client";
import React, { useEffect } from "react";
import { SessionProvider, signOut } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  children?: React.ReactNode;
  session: Session | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  // redirect user to login page if refreshToken is expired
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
