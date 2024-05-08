import NextAuth, { DefaultSession }  from "next-auth";
import { Workspace } from "@/services/types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      sub?: string | null;
      accessToken: string;
      refreshToken: string;
      workspace: Workspace,
      accessTokenExpires: number;
      exp: number;
      iat: number;
      jti: string;
    };
    expires: string,
    error?: "RefreshAccessTokenError";
  }

  interface DefaultUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken: string;
    refreshToken: string;
    workspace: Workspace;
    accessTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    exp: number;
    iat: number;
    jti: string;
    error?: "RefreshAccessTokenError";
  }
}