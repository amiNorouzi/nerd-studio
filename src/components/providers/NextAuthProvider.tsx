"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider refetchInterval={1*60*60}>{children}</SessionProvider>;
};
