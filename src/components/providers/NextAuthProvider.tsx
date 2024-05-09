"use client";
import React from "react";
import { SessionProvider, signOut } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  children?: React.ReactNode;
  session: Session | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
